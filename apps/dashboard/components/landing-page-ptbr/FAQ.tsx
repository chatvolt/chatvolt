const faqs = [
  {
    id: 1,
    question: 'Ele suporta outros idiomas?',
    answer:
      'Sim, o Chatvolt suporta mais de 100 idiomas. Você pode ter suas fontes em qualquer idioma e fazer perguntas em qualquer idioma.',
  },
  {
    id: 2,
    question: 'Como posso adicionar meu chatbot ao meu site?',
    answer:
      'Você pode incorporar um iframe ou adicionar uma bubble chat flutuante no canto inferior direito/esquerdo do seu site.',
  },
  {
    id: 3,
    question: 'Onde meus dados serão armazenados?',
    answer:
      'O conteúdo de documentos carregados serão hospedado em servidores seguros da AWS nos EUA.',
  },
  {
    id: 4,
    question: 'Como devem ser os meus dados?',
    answer:
      'Você tem a flexibilidade de fazer upload de uma ampla variedade de tipos de arquivos para um datastore, incluindo PDF, CSV, JSON, documentos de texto, apresentações PowerPoint, documentos Word, planilhas Excel, além de poder adicionar links para seu site ou canal do YouTube. Esses conteúdos serão convertidos em dados de treinamento, enriquecendo as capacidades do seu sistema.',
  },
  {
    id: 5,
    question: 'O chatbot utilizará o ChatGPT?',
    answer:
      'Sim, seu chatbot pode ser configurado para integrar uma variedade de modelos de linguagem de última geração, incluindo ChatGPT 3.5 Turbo, ChatGPT 4 Turbo, Google Gemini, Google Gemma, Microsoft WizardLM 2, Microsoft Phi 3, Cohere Command-R, Claude 3, Mistral, Dolphin, OpenChat e Meta LLama. Além disso, oferecemos a inovadora Volt-Networks, que combina múltiplos modelos para gerar respostas mais abrangentes e precisas.',
  },

  {
    id: 6,
    question: 'Posso dar instruções aos meus chatbots?',
    answer:
      'Sim, além de treinar seu chatbot com dados específicos, você também pode personalizar completamente o prompt base, escolhendo um nome, definindo sua personalidade, e estabelecendo as instruções e regras que preferir. Adicionalmente, você terá acesso a um recurso exclusivo da Chatvolt, que utiliza inteligência artificial para auxiliá-lo na construção do prompt do seu chatbot, garantindo uma configuração otimizada e alinhada com suas necessidades.',
  },

  // More questions...
];

export default function FAQ() {
  return (
    <div className="bg-black">
      <div className="px-6 py-16 mx-auto max-w-7xl sm:py-24 lg:px-8">
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">
          Perguntas frequentes
        </h2>
        <p className="max-w-2xl mt-6 text-base leading-7 text-gray-300">
              Caso você tenha alguma dúvida que não esteja coberta neste FAQ, convidamos você a dialogar com o Franklin, nosso chatbot avançado, desenvolvido com a inovadora tecnologia de IA da Chatvolt. O Franklin está preparado para esclarecer suas questões e, se necessário, direcionará sua dúvida diretamente para nossa equipe especializada.
        </p>
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-base font-semibold leading-7 text-white">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-300">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
