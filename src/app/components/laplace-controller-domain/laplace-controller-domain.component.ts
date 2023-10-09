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
  @ViewChild('numeradorEq1') numeradorElement!: ElementRef;
  @ViewChild('barraEq1') barraElement!: ElementRef;
  @ViewChild('denominadorEq1') denominadorElement!: ElementRef;
  graficoDegrauUnitario: any = [];
  graphData: object[] = [];
  stepOne: boolean = false;

  inputAmostragem: string = '1';
  hasAmostragem: boolean = true;
  inputSaturacao: string = '2';
  hasSaturacao: boolean = true;
  inputReferencia: string = '3';

  inputP: string = '';
  hasP: boolean = true;
  inputI: string = '';
  hasI: boolean = true;
  inputD: string = '';
  hasD: boolean = true;

  selectedMetodo: string = 'ZN1'; // ZN1, ZN2, MANUAL-INSERT

  changeAmostragem() {
    if (!this.hasAmostragem) {
      this.inputAmostragem = 'N/A';
    } else {
      this.inputAmostragem = '1';
    }
  }

  changeSaturacao() {
    if (!this.hasSaturacao) {
      this.inputSaturacao = 'N/A';
    } else {
      this.inputSaturacao = '1';
    }
  }

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
    this.stepOne = true;
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

        //adicionar na posicao 0 o valor -1
        if (eixoX[0] === '[0.0' && eixoY[0] === '[0.0') {
          eixoX.unshift(0.0);
          eixoY.unshift(0.0);
        }
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
    this.stepOne = false;
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

  hasStepOne() {
    return this.stepOne;
  }

  selectPID(event: any) {
    const selectedValue = event.target.value;

    if (selectedValue === 'PID') {
      this.hasP = true;
      this.hasI = true;
      this.hasD = true;
    } else if (selectedValue === 'PI') {
      this.hasP = true;
      this.hasI = true;
      this.hasD = false;
    } else if (selectedValue === 'PD') {
      this.hasP = true;
      this.hasI = false;
      this.hasD = true;
    } else if (selectedValue === 'P') {
      this.hasP = true;
      this.hasI = false;
      this.hasD = false;
    }
  }

  selectMetodo(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'ZN1') {
      this.selectedMetodo = 'ZN1';
    } else if (selectedValue === 'ZN2') {
      this.selectedMetodo = 'ZN2';
    } else if (selectedValue === 'MANUAL-INSERT') {
      this.selectedMetodo = 'MANUAL-INSERT';
    }
  }

  isManualInsert(): boolean {
    console.log(this.selectedMetodo === 'MANUAL-INSERT');
    return this.selectedMetodo === 'MANUAL-INSERT';
  }

  validacaoStepTwo(): boolean {
    const fields = [
      {
        field: this.hasAmostragem,
        input: this.inputAmostragem,
        fieldName: 'Período de amostragem',
      },
      {
        field: this.hasSaturacao,
        input: this.inputSaturacao,
        fieldName: 'Valor de saturação',
      },
      {
        field: true,
        input: this.inputReferencia,
        fieldName: 'Valor de referência',
      },
    ];

    if (this.isManualInsert()) {
      fields.push({
        field: this.hasP,
        input: this.inputP,
        fieldName: 'Kp',
      });
      fields.push({
        field: this.hasI,
        input: this.inputI,
        fieldName: 'Ki',
      });
      fields.push({
        field: this.hasD,
        input: this.inputD,
        fieldName: 'Kd',
      });
    }

    const regex = /^[0-9]+(\.[0-9]+)?$/;

    for (const { field, input, fieldName } of fields) {
      if (field && input === '') {
        this.showMessageError(`Informe o ${fieldName}`);
        return false;
      }

      if (field && !regex.test(input)) {
        this.showMessageError(
          `${fieldName} inválido. Digite apenas números decimais. Exemplo: 2.5`
        );
        return false;
      }
    }

    return true;
  }

  calculaStepTwo() {
    if (!this.validacaoStepTwo()) {
      return;
    }
    this.showMessageSuccess('SUCESSO');
  }
}
