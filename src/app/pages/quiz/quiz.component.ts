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
      texto: 'Você é o encanto em forma de gente. Sua alma vibra com a música da vida, e sua presença transforma qualquer espaço em palco. Você não passa despercebido — você é o centro das atenções, não por vaidade, mas por natureza. Você é alegria, beleza e magnetismo. Usa o prazer como ponte para a cura, e a arte como ferramenta de revelação. Você entende que o desejo não é pecado — é linguagem. E você fala fluentemente. Você pertence ao Reino da Lira, onde o riso é ritual, o toque é cura e a festa é sagrada. Lá, cada gargalhada é um feitiço, cada dança é uma oração. Você é feito de sedução e sensibilidade, e sua alma canta mesmo em silêncio. Você encanta, provoca, transforma. Sua força está na leveza, na estética e na capacidade de fazer os outros se enxergarem através do prazer. Você é como o vento que acaricia, como o perfume que marca, como a música que não se esquece. “Seu riso é um feitiço, sua presença, um espetáculo.”'
  },
  'Encruzilhada': {
      titulo: 'Sua Alma Chamou pelo Reino da Encruzilhada!',
      texto: 'Você é o mestre dos caminhos. Sua alma é feita de escolhas, e sua mente, de possibilidades. Você não teme o caos — você o organiza. Não foge da dúvida — você a transforma em decisão. Você é estrategista, conselheiro, provocador. Sabe que cada passo tem um preço, e que o livre-arbítrio é tanto bênção quanto responsabilidade. Você não impõe — você propõe. E quem te escuta, encontra direção. Você pertence ao Reino da Encruzilhada, onde o tempo hesita, os caminhos se cruzam e a sabedoria veste cartola. Lá, cada rua tem uma história, cada esquina guarda um segredo. Você é como o mapa que se desenha sozinho, como o guia que aparece quando tudo parece perdido. Sua força está na astúcia, na empatia e na coragem de seguir em frente mesmo sem garantias. Você é aquele que ajuda, que provoca, que transforma. Um amigo raro, um inimigo temido, um espírito livre. “Você não segue caminhos — você os cria.”'
  },
  'Natural': {
      titulo: 'Sua Alma Chamou pelo Reino Natural!',
      texto: 'Você é feito de raiz e vento. Sua alma pulsa com os ciclos da terra, e sua sabedoria vem do silêncio das árvores. Você não busca respostas prontas — você escuta o mundo e entende que tudo é troca. Você é bruxo, feiticeira, curandeiro. Carrega o poder dos elementos e a consciência de que tudo se transforma. Sua força está na introspecção, na conexão com o invisível e na capacidade de curar com o que é simples. Você pertence ao Reino Natural, onde a floresta fala, a água ensina e a magia é feita de verdade. Lá, o tempo não corre — ele respira. O sol sempre nasce, e a natureza observa em silêncio. Você é como o riacho que acalma, mas também pode inundar. Como a folha que cai, mas alimenta o solo. Sua energia é instável, poderosa, sábia. Você não se move por vaidade, mas por propósito. E quando age, é para transformar. Você é aquele que cura sem alarde, que protege sem pedir aplausos, que ensina sem precisar falar. “A natureza te chama pelo nome, e você responde com magia.”'
  },
  'Cemitério': {
      titulo: 'Sua Alma Chamou pelo Reino do Cemitério!',
      texto: '"Você é introspectivo, firme e poderoso. Sua presença impõe respeito, e sua energia é como a terra: densa, ancestral, implacável. Não busca redenção — você busca justiça. E quando ela não vem, a faz com as próprias mãos. Você pertence ao Reino do Cemitério, onde a noite é eterna e o nevoeiro carrega memórias. Lá, cada passo é uma sentença, cada silêncio é um julgamento. Você é guardião da ordem, da consequência e da memória. Não teme o fim, pois sabe que ele é apenas o início de uma nova travessia. Sua força está na disciplina, na austeridade e na capacidade de purificar o que não serve mais. Você é como a lápide que não se move, mas guarda histórias. Como o solo que não fala, mas cobra. “Não teme a escuridão, pois aprendeu a enxergar nela.”'
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
