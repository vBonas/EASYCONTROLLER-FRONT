import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LaplaceControllerDomainService } from './laplace-controller-domain.service';

import { Layout } from 'plotly.js-dist-min';

@Component({
  selector: 'app-laplace-controller-domain',
  templateUrl: './laplace-controller-domain.component.html',
  styleUrls: ['./laplace-controller-domain.component.css'],
})
export class LaplaceControllerDomainComponent {
  constructor(
    private laplaceControllerDomainService: LaplaceControllerDomainService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  isLargeScreen = window.innerWidth >= 768; // Defina o valor inicial com base na largura atual

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isLargeScreen = window.innerWidth >= 768;
  }

  public isExpanded = true;

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
  numeradorPs: string = '1';
  denominadorPs: string = '1,2';
  numeradorDs: string = '1';
  denominadorDs: string = '1';
  @ViewChild('numeradoreq1') numeradorElement!: ElementRef;
  @ViewChild('barraeq1') barraElement!: ElementRef;
  @ViewChild('denominadoreq1') denominadorElement!: ElementRef;
  graficoDegrauUnitario: any = [];
  graphData: object[] = [];

  graph = { data: this.graphData, layout: this.layout() };

  layout() {
    return this.layout_title('Resposta ao degrau unitário');
  }

  layout_title(title: string) {
    return {
      title: title,
      titlefont: {
        family: 'Arial, sans-serif',
        size: 16,
        color: 'black',
      },
      xaxis: {
        title: 'Tempo',
        titlefont: {
          family: 'Arial, sans-serif',
          size: 15,
          color: 'black',
        },
        showticklabels: true,
        tickangle: 'auto',
        tickfont: {
          family: 'Arial, sans-serif',
          size: 12,
          color: 'black',
        },
      },
      yaxis: {
        title: 'Amplitude',
        titlefont: {
          family: 'Arial, sans-serif',
          size: 15,
          color: 'black',
        },
        showticklabels: true,
        tickangle: 0,
        tickfont: {
          family: 'Arial, sans-serif',
          size: 12,
          color: 'black',
        },
        exponentformat: 'e',
        showexponent: 'all',
      },
    };
  }

  focusNext(nextElementId: string) {
    const nextElement = document.querySelector(
      `#${nextElementId}`
    ) as HTMLElement | null;
    if (nextElement) {
      nextElement.focus();
    }
  }

  calc() {
    this.graficoDegrauUnitario = [];
    if (
      this.numeradorPs === '' ||
      this.denominadorPs === '' ||
      this.numeradorDs === '' ||
      this.denominadorDs === ''
    ) {
      this.showMessageError('Preencha todos os campos');
      return;
    }
    console.log('calculando');
    this.laplaceControllerDomainService
      .calcula({
        numerador: this.numeradorPs,
        denominador: this.denominadorPs,
      })
      .then((res: any) => {
        const eixoY = res['newY'];
        const eixoX = res['newX'];
        const newEquacao = res['newEquacao'];

        this.numeradorElement.nativeElement.textContent = newEquacao[1];
        this.barraElement.nativeElement.textContent = newEquacao[2];
        this.denominadorElement.nativeElement.textContent = newEquacao[3];



        var datas = [
          {
            x: eixoX,
            y: eixoY,
            mode: 'lines',
            type: 'scatter',
            connectgaps: true,
          },
        ];

        this.graph = {
          data: datas,
          layout: this.layout(),
        };
        this.graficoDegrauUnitario.push(this.graph.data);

        this.showMessageSuccess(`Calculado com sucesso`);
      })
      .catch((err: any) => {
        //TODO ALTERAR MENSAGEM
        this.limparInput();
        this.showMessageError(`Erro ao calcular - ${err.message}`);
      });
  }

  limparInput() {
    this.numeradorPs = '';
    this.denominadorPs = '';
    this.numeradorDs = '';
    this.denominadorDs = '';
  }

  showMessageError(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['red-snackbar'],
      politeness: 'assertive',
    });
  }

  showMessageSuccess(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['green-snackbar'],
      politeness: 'assertive',
    });
  }
}
