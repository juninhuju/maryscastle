import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, KeyValuePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// -------------------------------------------------------------------------
// 1. Definição das Interfaces (Types)
// -------------------------------------------------------------------------

type PontuacoesAtributos = [
  number, // 1. Estética
  number, // 2. Persuasão
  number, // 3. Decisão
  number, // 4. Aventura
  number, // 5. Consciência
  number, // 6. Elemental
  number, // 7. Disciplina
  number  // 8. Profundidade
];

type DNAReinos = {
  [reino: string]: number[];
};

type ResultadosAfinidade = {
  [reino: string]: number;
};

// -------------------------------------------------------------------------
// 2. DNA dos Reinos (Pesos) e Descrições (Dados Estáticos)
// -------------------------------------------------------------------------

const dnaDosReinos: DNAReinos = {
  Lira:           [0.25, 0.25, 0.10, 0.05, 0.05, 0.05, 0.05, 0.15], // (Festeiro)
  Encruzilhada:   [0.05, 0.10, 0.25, 0.25, 0.10, 0.05, 0.10, 0.10], // (Guia)
  Natural:        [0.10, 0.05, 0.05, 0.10, 0.25, 0.25, 0.05, 0.15], // (Feitiçaria)
  Cemitério:      [0.05, 0.05, 0.15, 0.05, 0.15, 0.05, 0.25, 0.25]  // (Sombrio)
};

// Constante com as descrições de personalidade para cada Reino
const REINOS_DESCRICOES: { [key: string]: { titulo: string, texto: string } } = {
  'Lira': {
      titulo: 'Sua Alma Chamou pelo Reino da Lira!',
      texto: 'Você é a encarnação do carisma e da beleza. Sua vida é uma obra de arte em constante exibição. Você prospera na interação social, usa sua Estética e Persuasão como ferramentas de conexão e cura, e vê a vida como uma série de prazeres a serem desfrutados intensamente. Você busca a harmonia e o luxo, e sua presença tem o poder de iluminar qualquer ambiente. Enquanto alguns procuram a sabedoria no silêncio, você a encontra no pulsar da vida e no desejo despertado nos corações.'
  },
  'Encruzilhada': {
      titulo: 'Sua Alma Chamou pelo Reino da Encruzilhada!',
      texto: 'Você é o desbravador nato, o mestre do mapa e o guia daqueles que se perdem. Sua personalidade é definida por sua ambição de ir sempre além e sua incrível capacidade de tomar Decisões rápidas e pragmáticas. Você é focado no futuro e vê o passado apenas como um trampolim (ou uma âncora a ser descartada). Sua natureza é de Aventura, sempre buscando o próximo caminho e ajudando os outros a encontrarem os seus. O caos não o assusta; ele apenas lhe dá uma rota para traçar.'
  },
  'Natural': {
      titulo: 'Sua Alma Chamou pelo Reino Natural!',
      texto: 'Você é a ponte entre o mundo humano e as energias primordiais. Sua essência é de Consciência e profundo respeito pelo ciclo de vida, morte e renovação. Você não se move pelo luxo ou pela pressa, mas pela busca incessante de sabedoria e pelo domínio dos Elementos. Você irradia uma paz calma, derivada da sua compreensão do segredo da vida no silêncio da natureza. Você se importa em entender a raiz de todos os problemas, preferindo neutralizar a origem em vez de apenas tratar o sintoma.'
  },
  'Cemitério': {
      titulo: 'Sua Alma Chamou pelo Reino do Cemitério!',
      texto: 'Sua força reside na Profundidade e na Disciplina implacável. Você é a voz da verdade austera e o guardião da ordem final. Você vê o mundo com um foco sombrio e elegante, onde a lei e a justiça (mesmo que frias) devem prevalecer acima de tudo. O passado é um legado de lições importantes, e sua busca por conhecimento antigo e por impor ordem interna é incessante. Sua magia é a da transmutação, purificando o que não serve, e sua postura impõe respeito e silêncio.'
  }
};

// -------------------------------------------------------------------------
// 3. Componente Angular Principal (QuizComponent)
// -------------------------------------------------------------------------

@Component({
  selector: 'app-root', // Mantido como app-root para execução
  standalone: true,
  imports: [CommonModule, KeyValuePipe, FormsModule, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush, 
  templateUrl: './quiz.component.html', // APONTA PARA O ARQUIVO HTML SEPARADO
  styleUrls: ['./quiz.component.scss'], // ADICIONADO: Aponta para o arquivo SCSS
})
export class QuizComponent implements OnInit { 

  // Injeção de dependência moderna (resolve o erro NG0202)
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('questionarioForm') questionarioForm!: ElementRef<HTMLFormElement>;
  
  // URL de destino fixa do quiz para compartilhamento
  private readonly QUIZ_URL = 'https://livroocastelodasmarias.netlify.app/quiz';
  
  public readonly REINOS_IMAGENS: { [key: string]: string } = {
    'Lira': '/guardiao-padilha.jpeg', 
    'Encruzilhada': '/guardiao-sete.jpeg', 
    'Natural': '/guardiao-esdras.jpeg', 
    'Cemitério': '/guardiao-caveira.jpeg'
  };

  private readonly ORDEM_ATRIBUTOS = [
    'estetica', 'persuasao', 'decisao', 'aventura',
    'consciencia', 'elemental', 'disciplina', 'profundidade'
  ];
  
  private readonly REINOS_NOMES_COMPLETOS: { [key: string]: string } = {
    'Lira': 'Reino da Lira (Estética e Persuasão)',
    'Encruzilhada': 'Reino da Encruzilhada (Aventura e Decisão)',
    'Natural': 'Reino Natural (Consciência e Elemental)',
    'Cemitério': 'Reino do Cemitério (Disciplina e Profundidade)',
  };

  // Variáveis de estado do componente
  reinoFinal: string = '';
  pontuacoesDoLeitor: PontuacoesAtributos = [0, 0, 0, 0, 0, 0, 0, 0];
  resultadosFinais: ResultadosAfinidade = {};
  erroValidacao: boolean = false; 
  questoesFaltando: number[] = []; 

  ngOnInit(): void {}

  getReinoNomeCompleto(reinoChave: string): string {
    return this.REINOS_NOMES_COMPLETOS[reinoChave] || reinoChave;
  }

  getReinoImagemUrl(reinoChave: string): string {
    return this.REINOS_IMAGENS[reinoChave] || '';
  }

  getReinoDescricao(reinoChave: string): { titulo: string, texto: string } {
      return REINOS_DESCRICOES[reinoChave] || { titulo: 'Reino Desconhecido', texto: 'Não foi possível carregar a descrição deste Reino.' };
  }

  getReinoApelido(reinoChave: string): string {
    const nomeCompleto = this.REINOS_NOMES_COMPLETOS[reinoChave] || ''; 
    const match = nomeCompleto.match(/\(([^)]+)\)/); 
    return match ? match[1] : reinoChave;
  }

  /**
   * Função para gerar e disparar o compartilhamento nas redes sociais.
   */
  compartilhar(rede: 'twitter' | 'facebook' | 'whatsapp') {
    if (!this.reinoFinal) {
      console.error('Resultado ainda não disponível para compartilhamento.');
      return; 
    }

    const urlQuizEncoded = encodeURIComponent(this.QUIZ_URL); 
    const reinoNomeCompleto = this.getReinoNomeCompleto(this.reinoFinal);
    
    const mensagem = `Acabei de descobrir que meu destino é o ${reinoNomeCompleto}! Qual Reino de Chamado você responderá? Faça o teste e descubra.`;
    const mensagemEncoded = encodeURIComponent(mensagem);

    let shareUrl = '';

    switch (rede) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${mensagemEncoded}&url=${urlQuizEncoded}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${urlQuizEncoded}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${mensagemEncoded} ${urlQuizEncoded}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  private extrairPontuacoes(form: HTMLFormElement): { [key: string]: number } {
    const pontuacoes: { [key: string]: number } = {};
    const incrementoPorQuestao = 9 / 12; // 0.75

    this.ORDEM_ATRIBUTOS.forEach(attr => pontuacoes[attr] = 1); 

    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i] as HTMLInputElement;

        if (element.type === 'radio' && element.checked) {
            const value = element.value; 
            const atributos = value.split('-');
            
            atributos.forEach(attr => {
                const attrKey = attr.toLowerCase();
                if (pontuacoes.hasOwnProperty(attrKey)) {
                    pontuacoes[attrKey] = Math.min(10, pontuacoes[attrKey] + incrementoPorQuestao);
                }
            });
        }
    }
    
    const pontuacoesFinais: { [key: string]: number } = {};
    for (const key in pontuacoes) {
      if (pontuacoes.hasOwnProperty(key)) {
        pontuacoesFinais[key] = parseFloat(pontuacoes[key].toFixed(2));
      }
    }

    return pontuacoesFinais;
  }
  
  private calcularAfinidade(pontuacoes: { [key: string]: number }): ResultadosAfinidade {
    const resultados: ResultadosAfinidade = {};
    
    const pontuacoesArray: PontuacoesAtributos = this.ORDEM_ATRIBUTOS.map(attr => pontuacoes[attr] as number) as PontuacoesAtributos;
    this.pontuacoesDoLeitor = pontuacoesArray;

    for (const reino in dnaDosReinos) {
      if (dnaDosReinos.hasOwnProperty(reino)) {
        const pesos: number[] = dnaDosReinos[reino];
        let total = 0;

        for (let i = 0; i < pontuacoesArray.length; i++) {
          total += pontuacoesArray[i] * pesos[i];
        }
        resultados[reino] = total;
      }
    }
    
    return resultados;
  }
  
  private encontrarReinoFinal(resultados: ResultadosAfinidade): string {
    const reinoFinal = Object.entries(resultados).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    return reinoFinal;
  }
copiarResultado() {
    const elemento = document.getElementById('texto-para-copiar');
    if (elemento) {
      const textoParaCopiar = elemento.innerText;
      
      // Usa a API Clipboard (moderna e assíncrona)
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textoParaCopiar).then(() => {
          alert('Resultado copiado com sucesso! Agora você pode colar no Facebook ou em qualquer lugar.');
        }).catch(err => {
          console.error('Erro ao copiar usando a API Clipboard: ', err);
          // Tenta o método de fallback em caso de erro (navegadores antigos ou restrições)
          this.fallbackCopyTextToClipboard(textoParaCopiar);
        });
      } else {
        // Método de fallback para navegadores sem suporte ao 'navigator.clipboard'
        this.fallbackCopyTextToClipboard(textoParaCopiar);
      }
    }
  }

  // Função de fallback para cópia (método antigo e síncrono)
  private fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Evita que o teclado virtual apareça em dispositivos móveis
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'com sucesso' : 'com erro';
      alert('Resultado copiado ' + msg + '! Agora você pode colar no Facebook ou em qualquer lugar.');
    } catch (err) {
      console.error('Falha ao tentar copiar o texto de fallback: ', err);
      alert('Não foi possível copiar o texto automaticamente. Por favor, selecione e copie manualmente: \n' + text);
    }

    document.body.removeChild(textArea);
  }
  /**
   * Função principal chamada ao enviar o formulário.
   */
  calcular(event: Event): void {
    event.preventDefault(); 
    const form = event.target as HTMLFormElement;
    
    this.questoesFaltando = [];
    const totalQuestoes = 12;

    for (let i = 1; i <= totalQuestoes; i++) {
        const radioGroupName = `q${i}`;
        const radios = form.querySelectorAll(`input[name="${radioGroupName}"]:checked`);
        
        if (radios.length === 0) {
            this.questoesFaltando.push(i); // Adiciona o número da questão
        }
    }
    
    if (this.questoesFaltando.length > 0) {
        this.erroValidacao = true; 
        console.error(`Faltam respostas nas questões: ${this.questoesFaltando.join(', ')}`);
        // Força a atualização da view
        this.cdr.detectChanges(); 
        
        // Rola a tela para o topo do formulário para o usuário ver o erro
        document.getElementById('questionario')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

        return;
    }

    this.erroValidacao = false; 

    const pontuacoes = this.extrairPontuacoes(form);
    const resultados = this.calcularAfinidade(pontuacoes);
    this.resultadosFinais = resultados;

    this.reinoFinal = this.encontrarReinoFinal(resultados);

    console.log('Pontuações de Atributos:', pontuacoes);
    console.log('Reino final:', this.reinoFinal);
  }

  /**
   * Reseta o estado do componente e o formulário HTML.
   */
  reiniciaCalculo(): void {
    this.reinoFinal = '';
    this.pontuacoesDoLeitor = [0, 0, 0, 0, 0, 0, 0, 0];
    this.resultadosFinais = {};
    this.erroValidacao = false; 
    this.questoesFaltando = []; // Limpa lista de questões faltando
    
    if (this.questionarioForm) {
      this.questionarioForm.nativeElement.reset(); 
    }
    // Rola para o topo do quiz
    document.getElementById('questionario')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
