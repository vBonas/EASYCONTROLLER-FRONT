import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LaplaceControllerDomainService } from './laplace-controller-domain.service';
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

  isLargeScreen = window.innerWidth >= 768;

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

  outputKp: string = '0';
  outputKi: string = '0';
  outputKd: string = '0';
  outputSaturation: string = '0';
  outputAmostragem: string = '0';
  outputReferencia: string = '0';
  // DEGRAU UNITARIO
  graficoDegrauUnitario: any = [];
  graphData: object[] = [];
  graphDegrauUnitario = {
    data: this.graphData,
    layout: this.layout_title('Resposta ao degrau unitário'),
  };

  codes = 'CODIGO';

  //SINAL DE SAIDA
  graficoSinalDeSaida: any = [];
  graphSinalDeSaida = {
    data: this.graphData,
    layout: this.layout_title('Saída controlada'),
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
  inputSaturacao: string = '1';
  hasSaturacao: boolean = true;
  inputReferencia: string = '1';

  inputP: string = '';
  hasP: boolean = true;
  inputI: string = '';
  hasI: boolean = true;
  inputD: string = '';
  hasD: boolean = true;

  selectedMetodo: string = 'ZN1'; // ZN1, ZN2, MANUAL-INSERT
  selectedOptionPID: string = 'PID'; // PID, PI, PD, P

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
        title: 'Tempo(s)',
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

  calculaStepOne() {
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
      })
      .catch((err: any) => {
        //this.limparInput();
        this.showMessageError(
          `Não é possivel calcular o controlador, verifique os parâmetros informados`
        );
      });
  }

  limparInput() {
    this.stepOne = false;
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
    this.selectedOptionPID = selectedValue;
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
    this.selectedMetodo = selectedValue;
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
        fieldName: 'Ti',
      });
      fields.push({
        field: this.hasD,
        input: this.inputD,
        fieldName: 'Td',
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
      amostragem: this.inputAmostragem === 'N/A' ? 0.01 : this.inputAmostragem,
      referencia: this.inputReferencia,
      saturacao: this.inputSaturacao === 'N/A' ? 999999 : this.inputSaturacao,
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
        const newEquacao = response.newG;
        const numeradorAux = newEquacao[1];
        const barraAux = newEquacao[2];
        const denominadorAux = newEquacao[3];

        this.numerador2Element.nativeElement.textContent = numeradorAux;
        this.barra2Element.nativeElement.textContent = barraAux;
        this.denominador2Element.nativeElement.textContent = denominadorAux;

        let kp2 = response.newkp;
        let ti2 = response.newti;
        let td2 = response.newtd;
        let referencia2 = response.newreferencia;
        let amostragem5 = response.newamostragem;
        let saturacao5 = response.newsaturacao;

        this.outputKp = kp2;
        this.outputKi = ti2;
        this.outputKd = td2;
        this.outputSaturation = saturacao5;
        this.outputAmostragem = amostragem5;
        this.outputReferencia = referencia2;
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

        this.graphSinalDeSaida = {
          data: [sinalsaida],
          layout: this.layout_title('Saída controlada'),
        };
        this.graficoSinalDeSaida = [];
        this.graficoSinalDeSaida.push(this.graphSinalDeSaida.data);

        this.graphSinalDeControle = {
          data: [sinalcontrole],
          layout: this.layout_title('Sinal de controle'),
        };
        this.graficoSinalDeControle = [];
        this.graficoSinalDeControle.push(this.graphSinalDeControle.data);
        this.getOptionPID();
      })
      .catch((err: any) => {
        this.showMessageError(
          `Não é possivel calcular o controlador com os parâmetros informados, tente mudar o controlador`
        );
        this.stepTwo = false;
      });
  }

  getOptionPID(): string {
    // <option value="4">PID</option>
    // <option value="2">PI</option>
    // <option value="3">PD</option>
    // <option value="1">P</option>
    if (this.selectedOptionPID === 'PID') {
      this.codes = this.stringPID();
      return '4';
    } else if (this.selectedOptionPID === 'PI') {
      this.codes = this.stringPI();
      return '2';
    } else if (this.selectedOptionPID === 'PD') {
      this.codes = this.stringPD();
      return '3';
    } else if (this.selectedOptionPID === 'P') {
      this.codes = this.stringP();
      return '1';
    } else {
      this.codes = this.stringPID();
      return '4';
    }
  }

  showCodeValue = false;
  showCode() {
    this.showCodeValue = true;
  }

  copyCode() {
    this.showMessageSuccess('Código copiado com sucesso');
  }

  getOptionControlador(): string {
    // <option value="1">  Não calcular parâmetros automáticos
    // <option value="2"> Zigler-Nichols primeiro método
    // <option value="3"> Zigler-Nichols Segundo método
    if (this.selectedMetodo === 'MANUAL-INSERT') {
      return '1';
    } else if (this.selectedMetodo === 'ZN1') {
      return '2';
    } else {
      // Zigler Segundo método
      return '3';
    }
  }

  stringP() {
    return `// *********************************************** //\
                                \n//   Código gerado por EasyController for Arduino  //\
                                \n//              www.easycontroller.com             //\
                                \n// Usar com Arduinos baseados em processadores AVR //\
                                \n// *********************************************** //\
                                \
                                \n#include <TimerThree.h> \
                                \n\
                                \ndouble kp=${this.outputKp};				//  kp-Inserir valor gerado\
                                \ndouble T=${this.outputAmostragem};				// Período de amostragem-Inserir valor gerado\
                                \ndouble lim_sup=${this.outputSaturation};			// Saturação - Inserir valor gerado\
                                \ndouble ref=${this.outputReferencia};				// Define referência - Inserir valor gerado\
                                \
                                \ndouble erro;				// Vetor de erro\
                                \ndouble u;				// Vetor de controle\
                                \ndouble du;				// Variação do sinal de controle\
                                \ndouble y;				// Saída medida do sist\
                                \n\
                                \n// Para saída PWM\
                                \ndouble minPWM=;				// Define valor mínimo do PWM\
                                \ndouble maxPWM=;				// Define valor máximo do PWM\
                                \ndouble mapf(double val,double in_min,double in_max,double out_min,double out_max) {\
                                  \nreturn (val-in_min)*(out_max-out_min)/(in_max-in_min)+out_min;\
                                \n}\
                                \n\
                                \n// Setup\
                                \nvoid setup() {\
                                  \nTimer3.initialize(T*1000);		// Inicializa Timer3 com período de amostragem (em us)\
                                  \nTimer3.attachInterrupt(controlePID);	// Define a interrupção de tempo\
                                \n}\
                                \
                                \n// Interrupção de tempo\
                                \nvoid controlePID() {\
                                  \nerro[0] = ref -y;\
                                \
                                  \ndu = r0*erro[0] ;\
                                  \nu[0] = du ;			// Sinal de controle (sem saturação)\
                                  \
                                  \n// Calcula sinal de controle saturado\
                                  \nif (u[0] > lim_sup){\
                                    \nu[0] = lim_sup;\
                                  \n} else if (u[0] < 0) {\
                                    \nu[0] = lim_inf;\
                                  \n}\
                                \
                                  \n// Mapeamento (float) do sinal de controle para a saída PWM\
                                  \nu_pwm = mapf(u[0],lim_inf,lim_sup,minPWM,maxPWM);\
                                \
                                  \nanalogWrite(Pino,u_pwm);		// Indicar o número do Pino da saída PWM\
                                \n}\
                                \
                                \n// Loop principal\
                                \nvoid loop() {\
                                  \n// Escrever aqui as leituras, conversões de sinal, etc.\
                                  \ny = ...\
                                \n}`;
  }

  stringPI() {
    return `// *********************************************** //\
                                \n//   Código gerado por EasyController for Arduino  //\
                                \n//              www.easycontroller.com             //\
                                \n// Usar com Arduinos baseados em processadores AVR //\
                                \n// *********************************************** //\
                                \
                                \n#include <TimerThree.h>\
                                \
                                \ndouble kp=${this.outputKp};				// kp-Inserir valor gerado\
                                \ndouble Ti=${this.outputKi};				// Ti- Inserir valor gerado\
                                \ndouble T=${this.outputAmostragem};				// Período de amostragem- Inserir valor gerado\
                                \ndouble lim_sup=${this.outputSaturation};			// Saturação superior- Inserir valor gerado\
                                \ndouble ref=${this.outputReferencia};				// Define referência- Inserir valor gerado\
                                \
                                \ndouble erro;				// Vetor de erro\
                                \ndouble u;				// Vetor de controle\
                                \ndouble du;				// Variação do sinal de controle\
                                \ndouble y;				// Saída medida do sistema\
                                \
                                \
                                \n// Constantes para controle\
                                \nr0 = float(kp*(Ti +T)/Ti)\
                                \nr1 = float(-kp)\
                                \
                                \n// Para saída PWM\
                                \ndouble minPWM=;				// Define valor mínimo do PWM\
                                \ndouble maxPWM=;				// Define valor máximo do PWM\
                                \ndouble mapf(double val,double in_min,double in_max,double out_min,double out_max) {\
                                  \nreturn (val-in_min)*(out_max-out_min)/(in_max-in_min)+out_min;\
                                \n}\
                                \
                                \n// Setup\
                                \nvoid setup() {\
                                  \nTimer3.initialize(T*1000);		// Inicializa Timer3 com período de amostragem (em us)\
                                  \nTimer3.attachInterrupt(controlePID);	// Define a interrupção de tempo\
                                \n}\
                                \
                                \n// Interrupção de tempo\
                                \nvoid controlePID() {\
                                  \nerro[0] = ref -y;\
                                \
                                  \
                                  \nu[0] = u[1] + (r0*erro[0]) + (r1*erro[1]);			// Sinal de controle (sem saturação)\
                                  \
                                  \n// Calcula sinal de controle saturado\
                                  \nif (u[0] > lim_sup){\
                                    \nu[0] = lim_sup;\
                                  \n} else if (u[0] < 0) {\
                                    \nu[0] = lim_inf;\
                                  \n}\
                                \
                                  \n// Mapeamento (float) do sinal de controle para a saída PWM\
                                  \nu_pwm = mapf(u[0],lim_inf,lim_sup,minPWM,maxPWM);\
                                \
                                  \nanalogWrite(Pino,u_pwm);		// Indicar o número do Pino da saída PWM\
                                }\
                                \
                                \n// Loop principal\
                                \nvoid loop() {\
                                  \n// Escrever aqui as leituras, conversões de sinal, etc.\
                                  \ny = ...\
                                \n}`;
  }

  stringPD() {
    return `// *********************************************** //\
                                \n//   Código gerado por EasyController for Arduino  //\
                                \n//              www.easycontroller.com             //\
                                \n// Usar com Arduinos baseados em processadores AVR //\
                                \n// *********************************************** //\
                                \
                                \n#include <TimerThree.h>\
                                \
                                \ndouble kp=${this.outputKd};				// kp-Inserir valor gerado\
                                \ndouble Ti=${this.outputKi};				// td- Inserir valor gerado\
                                \ndouble T=${this.outputAmostragem};				// Período de amostragem- Inserir valor gerado\
                                \ndouble lim_sup=${this.outputSaturation};			// Saturação superior- Inserir valor gerado\
                                \ndouble ref=${this.outputReferencia};				// Define referência- Inserir valor gerado\
                                \
                                \ndouble erro;				// Vetor de erro\
                                \ndouble u;				// Vetor de controle\
                                \ndouble du;				// Variação do sinal de controle\
                                \ndouble y;				// Saída medida do sistema\
                                \
                                \
                                \n// Constantes para controle\
                                \nr0 = float(kp*(Td +T)/T)\
                                \nr1 = float(-kp*Td/T)\
                                \
                                \n// Para saída PWM\
                                \ndouble minPWM=;				// Define valor mínimo do PWM\
                                \ndouble maxPWM=;				// Define valor máximo do PWM\
                                \ndouble mapf(double val,double in_min,double in_max,double out_min,double out_max) {\
                                  \nreturn (val-in_min)*(out_max-out_min)/(in_max-in_min)+out_min;\
                                \n}\
                                \
                                \n// Setup\
                                \nvoid setup() {\
                                  \nTimer3.initialize(T*1000);		// Inicializa Timer3 com período de amostragem (em us)\
                                  \nTimer3.attachInterrupt(controlePID);	// Define a interrupção de tempo\
                                \n}\
                                \
                                \n// Interrupção de tempo\
                                \nvoid controlePID() {\
                                  \nerro[0] = ref -y;\
                                \
                                  \
                                  \nu[0] =  (r0*erro[0]) + (r1*erro[1])			// Sinal de controle (sem saturação)\
                                  \
                                  \n// Calcula sinal de controle saturado\
                                  \nif (u[0] > lim_sup){\
                                    \nu[0] = lim_sup;\
                                  \n} else if (u[0] < 0) {\
                                    \nu[0] = lim_inf;\
                                  \n}\
                                \
                                  \n// Mapeamento (float) do sinal de controle para a saída PWM\
                                  \nu_pwm = mapf(u[0],lim_inf,lim_sup,minPWM,maxPWM);\
                                \
                                  \nanalogWrite(Pino,u_pwm);		// Indicar o número do Pino da saída PWM\
                                \n}\
                                \
                               \n // Loop principal\
                                \nvoid loop() {\
                                  \n// Escrever aqui as leituras, conversões de sinal, etc.\
                                  \ny = ...\
                                \n}\
                                \n     \
                               \n\
                            `;
  }

  stringPID() {
    return `// *********************************************** //\
                                \n//   Código gerado por EasyController for Arduino  //\
                                \n//              www.easycontroller.com             //\
                                \n// Usar com Arduinos baseados em processadores AVR //\
                                \n// *********************************************** //\
                                \
                                \n#include <TimerThree.h>\
                                \
                                \ndouble kp=${this.outputKp};				// Ganho kp\
                                \ndouble Ti=${this.outputKi};				// Tempo integral [s]\
                                \ndouble Td=${this.outputKd};				// Tempo derivativo [s]\
                                \ndouble T=${this.outputAmostragem};				// Período de amostragem\
                                \ndouble lim_sup=${this.outputSaturation};			// Saturação superior\
                                \ndouble lim_inf=;			// Saturação inferior\
                                \ndouble ref=${this.outputReferencia};				// Define referência\
                                \
                                \ndouble erro;				// Vetor de erro\
                                \ndouble u;				// Vetor de controle\
                                \ndouble du;				// Variação do sinal de controle\
                                \ndouble y;				// Saída medida do sistema\
                                \
                                \
                                \n// Constantes para controle\
                                \ndouble r0 = kp +kp*Td/T;\
                                \ndouble r1 = -kp +kp*T/Ti;\
                                \ndouble r2 = kp*Td/T;\
                                \
                                \n// Para saída PWM\
                                \ndouble minPWM=;				// Define valor mínimo do PWM\
                                \ndouble maxPWM=;				// Define valor máximo do PWM\
                                \ndouble mapf(double val,double in_min,double in_max,double out_min,double out_max) {\
                                  \nreturn (val-in_min)*(out_max-out_min)/(in_max-in_min)+out_min;\
                                \n}\
                                \
                                \n// Setup\
                                \nvoid setup() {\
                                  \nTimer3.initialize(T*1000);		// Inicializa Timer3 com período de amostragem (em us)\
                                  \nTimer3.attachInterrupt(controlePID);	// Define a interrupção de tempo\
                                \n}\
                                \
                                \n// Interrupção de tempo\
                                \nvoid controlePID() {\
                                  \nerro[0] = ref -y;\
                                \
                                  \ndu = r0*erro[0] +r1*erro[1] +r2*erro[2];\
                                  \nu[0] = du +u[1];			// Sinal de controle (sem saturação)\
                                  \
                                  \n// Calcula sinal de controle saturado\
                                  \nif (u[0] > lim_sup){\
                                    \nu[0] = lim_sup;\
                                  \n} else if (u[0] < lim_inf) {\
                                    \nu[0] = lim_inf;\
                                  \n}\
                                \
                                  \n// Mapeamento (float) do sinal de controle para a saída PWM\
                                  \nu_pwm = mapf(u[0],lim_inf,lim_sup,minPWM,maxPWM);\
                                \
                                  \nanalogWrite(Pino,u_pwm);		// Indicar o número do Pino da saída PWM\
                                \n}\
                                \
                                \n// Loop principal\
                                \nvoid loop() {\
                                  \n// Escrever aqui as leituras, conversões de sinal, etc.\
                                  \ny = ...\
                                \n}`;
  }
}
