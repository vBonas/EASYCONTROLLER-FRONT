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

  @ViewChild('numeradorEq2') numerador2Element!: ElementRef;
  @ViewChild('barraEq2') barra2Element!: ElementRef;
  @ViewChild('denominadorEq2') denominador2Element!: ElementRef;
  // DEGRAU UNITARIO
  graficoDegrauUnitario: any = [];
  graphData: object[] = [];
  graphDegrauUnitario = {
    data: this.graphData,
    layout: this.layout_title('Resposta ao degrau unitário'),
  };

  //SINAL DE SAIDA
  graficoSinalDeSaida: any = [];
  graphSinalDeSaida = {
    data: this.graphData,
    layout: this.layout_title('Sinal de saída'),
  };

  //SINAL DE CONTROLE
  graficoSinalDeControle: any = [];
  graphSinalDeControle = {
    data: this.graphData,
    layout: this.layout_title('Sinal de controle'),
  };
  stepOne: boolean = false;
  stepTwo: boolean = false;

  inputAmostragem: string = '0.01';
  hasAmostragem: boolean = true;
  inputSaturacao: string = '100';
  hasSaturacao: boolean = true;
  inputReferencia: string = '10';

  inputP: string = '';
  hasP: boolean = false;
  inputI: string = '';
  hasI: boolean = false;
  inputD: string = '';
  hasD: boolean = false;

  //TODO VOLTAR PARA ZN1 E PID
  selectedMetodo: string = 'ZN2'; // ZN1, ZN2, MANUAL-INSERT
  selectedOptionPID: string = 'PI'; // PID, PI, PD, P

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
      .calculaStepOne({
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

        this.graphDegrauUnitario = {
          data: datas,
          layout: this.layout_title('Resposta ao degrau unitário'),
        };
        this.graficoDegrauUnitario.push(this.graphDegrauUnitario.data);

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
      this.selectedOptionPID = 'PID';
      this.hasP = true;
      this.hasI = true;
      this.hasD = true;
    } else if (selectedValue === 'PI') {
      this.selectedOptionPID = 'PI';
      this.hasP = true;
      this.hasI = true;
      this.hasD = false;
    } else if (selectedValue === 'PD') {
      this.selectedOptionPID = 'PD';
      this.hasP = true;
      this.hasI = false;
      this.hasD = true;
    } else if (selectedValue === 'P') {
      this.selectedOptionPID = 'P';
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

  getBody(): any {
    return {
      saturacao1: this.hasSaturacao ? 1 : 0,
      amostragem1: this.hasAmostragem ? 1 : 0,
      controladores: this.getOptionPID(),
      amostragem: this.inputAmostragem,
      referencia: this.inputReferencia,
      saturacao: this.inputSaturacao,
      kp: this.isManualInsert() && this.hasP ? this.inputP : 0,
      ti: this.isManualInsert() && this.hasI ? this.inputI : 0,
      td: this.isManualInsert() && this.hasD ? this.inputD : 0,
      numerador: this.numeradorPs,
      controladorescalc: this.getOptionControlador(),
      denominador: this.denominadorPs,
    };
  }

  calculaStepTwo() {
    this.stepTwo = true;
    if (!this.validacaoStepTwo()) {
      return;
    }

    this.laplaceControllerDomainService
      .calculaStepTwo(this.getBody())
      .then((response: any) => {
        console.log(response);
        const newEquacao = response.newG;
        const numeradorAux = newEquacao[1];
        const barraAux = newEquacao[2];
        const denominadorAux = newEquacao[3];

        this.numerador2Element.nativeElement.textContent = newEquacao[1];
        this.barra2Element.nativeElement.textContent = newEquacao[2];
        this.denominador2Element.nativeElement.textContent = newEquacao[3];

        let kp2 = response.newkp;
        let ti2 = response.newti;
        let td2 = response.newtd;
        let referencia2 = response.newreferencia;
        let amostragem5 = response.newamostragem;
        let saturacao5 = response.newsaturacao;
        let eixo_x = response.newtempo;
        let eixo_yy = response.newsaida;
        let eixo_yu = response.newcontrole;

        let sinalsaida = {
          x: eixo_x,
          y: eixo_yy,
          mode: 'line',
          type: 'scatter',
        };
        let sinalcontrole = {
          x: eixo_x,
          y: eixo_yu,
          mode: 'line',
          type: 'scatter',
        };

        this.showMessageSuccess(`Calculado com sucesso`);

        this.graphSinalDeSaida = {
          data: [sinalsaida],
          layout: this.layout_title('Sinal de saída'),
        };
        this.graficoSinalDeSaida.push(this.graphSinalDeSaida.data);

        this.graphSinalDeControle = {
          data: [sinalcontrole],
          layout: this.layout_title('Sinal de controle'),
        };
        this.graficoSinalDeControle.push(this.graphSinalDeControle.data);
      })
      .catch((err: any) => {
        //TODO ALTERAR MENSAGEM
        this.showMessageError(`Erro ao calcular STEP 2 - ${err.message}`);
        this.stepTwo = false;
      });
  }

  getOptionPID(): string {
    // <option value="4">PID</option>
    // <option value="2">PI</option>
    // <option value="3">PD</option>
    // <option value="1">P</option>
    if (this.selectedOptionPID === 'PID') {
      return '4';
    } else if (this.selectedOptionPID === 'PI') {
      return '2';
    } else if (this.selectedOptionPID === 'PD') {
      return '3';
    } else if (this.selectedOptionPID === 'P') {
      return '1';
    } else {
      return '4';
    }
  }

  getOptionControlador(): string {
    // <option value="1">
    //   Não calcular parâmetros automáticos
    // </option>
    // <option value="2">
    //   Zigler-Nichols primeiro método
    // </option>
    // <option value="3">
    //   Zigler-Nichols Segundo método
    // </option>

    if (this.selectedMetodo === 'MANUAL-INSERT') {
      return '1';
    } else if (this.selectedMetodo === 'ZN1') {
      return '2';
    } else {
      // Zigler-Nichols Segundo método
      return '3';
    }
  }
}
