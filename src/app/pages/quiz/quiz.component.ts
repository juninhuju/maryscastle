import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
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
  number  // 8. Profundidade
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
  Lira:          [0.25, 0.25, 0.10, 0.05, 0.05, 0.05, 0.05, 0.15], // (Festeiro)
  Encruzilhada:  [0.05, 0.10, 0.25, 0.25, 0.10, 0.05, 0.10, 0.10], // (Guia)
  Natural:       [0.10, 0.05, 0.05, 0.10, 0.25, 0.25, 0.05, 0.15], // (Feitiçaria)
  Cemitério:     [0.05, 0.05, 0.15, 0.05, 0.15, 0.05, 0.25, 0.25]  // (Sombrio)
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
  selector: 'app-quiz-reinos', // Alterado de 'app-root' para evitar conflitos e ser mais descritivo
  standalone: true,
  imports: [CommonModule, KeyValuePipe, FormsModule], 
  templateUrl: './quiz.component.html', // APONTA PARA O NOVO ARQUIVO HTML
  styleUrls: ['./quiz.component.scss'] // APONTA PARA O NOVO ARQUIVO CSS
})
export class QuizComponent implements OnInit { 

  @ViewChild('questionarioForm') questionarioForm!: ElementRef<HTMLFormElement>;

  // Variável de Mapeamento de Imagens MOVIDA PARA DENTRO DA CLASSE
  // para ser acessível pelo template e métodos do componente.
  // Mapeamento para URLs de imagem (assumindo caminhos relativos à raiz /public/)
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
  
  private readonly REINOS_NOMES: { [key: string]: string } = {
    'Lira': 'Festeiro',
    'Encruzilhada': 'Guia',
    'Natural': 'Feitiçaria',
    'Cemitério': 'Sombrio',
  };

  // Variáveis de estado do componente
  reinoFinal: string = '';
  pontuacoesDoLeitor: PontuacoesAtributos = [0, 0, 0, 0, 0, 0, 0, 0];
  resultadosFinais: ResultadosAfinidade = {};
  erroValidacao: boolean = false; // Variável para controlar a exibição do erro

  ngOnInit(): void {}

  getReinoNomeCompleto(reinoChave: string): string {
    return this.REINOS_NOMES[reinoChave] || reinoChave;
  }

  /**
   * Método para obter o URL da imagem.
   * Agora usa a propriedade da classe 'this.REINOS_IMAGENS'.
   */
  getReinoImagemUrl(reinoChave: string): string {
    return this.REINOS_IMAGENS[reinoChave] || '';
  }

  /**
   * Método para buscar a descrição, acessando a constante global REINOS_DESCRICOES.
   */
  getReinoDescricao(reinoChave: string): { titulo: string, texto: string } {
      return REINOS_DESCRICOES[reinoChave] || { titulo: 'Reino Desconhecido', texto: 'Não foi possível carregar a descrição deste Reino.' };
  }

getReinoApelido(reinoChave: string): string {
  // Certifique-se de que está usando 'this.' para acessar a propriedade REINOS_NOMES
  const nomeCompleto = this.REINOS_NOMES[reinoChave] || ''; 
  
  // Usa regex para encontrar o texto entre parênteses
  const match = nomeCompleto.match(/\(([^)]+)\)/); 
  
  // Retorna o conteúdo dos parênteses (índice 1), ou a chave original se não encontrar.
  return match ? match[1] : reinoChave;
}

  /**
   * Função para Extrair as Pontuações do Formulário
   * @param form O elemento HTMLFormElement do questionário.
   */
  private extrairPontuacoes(form: HTMLFormElement): { [key: string]: number } {
    const pontuacoes: { [key: string]: number } = {};
    const incrementoPorQuestao = 9 / 12; // 0.75

    this.ORDEM_ATRIBUTOS.forEach(attr => pontuacoes[attr] = 1); // Inicializa em 1

    // Itera sobre todos os elementos do formulário para encontrar os rádios selecionados
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i] as HTMLInputElement;

        if (element.type === 'radio' && element.checked) {
            const value = element.value; // Ex: 'persuasao-estetica'
            const atributos = value.split('-');
            
            atributos.forEach(attr => {
                const attrKey = attr.toLowerCase();
                if (pontuacoes.hasOwnProperty(attrKey)) {
                    // Soma o incremento, limitando a 10 (Math.min)
                    pontuacoes[attrKey] = Math.min(10, pontuacoes[attrKey] + incrementoPorQuestao);
                }
            });
        }
    }
    
    // Arredonda o resultado 
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
    
    // Converte o objeto de pontuações para o array na ordem correta
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
    // Retorna o reino com o maior valor
    const reinoFinal = Object.entries(resultados).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    return reinoFinal;
  }
  
  /**
   * Função principal chamada ao enviar o formulário.
   * @param event Evento de submit do formulário (que será prevenido)
   */
  calcular(event: Event): void {
    event.preventDefault(); // Previne o reload
    const form = event.target as HTMLFormElement;
    
    // Verificação se todas as 12 perguntas foram respondidas
    if (form.querySelectorAll('input[type="radio"]:checked').length !== 12) {
        this.erroValidacao = true; // Define a flag para exibir a mensagem no HTML
        console.error('Por favor, responda a todas as 12 perguntas antes de enviar!');
        return;
    }

    this.erroValidacao = false; // Limpa o erro se o formulário for válido

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
    this.erroValidacao = false; // Garante que o erro seja limpo
    
    // Usa o @ViewChild para acessar o elemento e chamar o método reset()
    if (this.questionarioForm) {
      this.questionarioForm.nativeElement.reset(); 
    }
  }
}