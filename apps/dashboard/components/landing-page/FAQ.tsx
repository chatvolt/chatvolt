const faqs = [
  {
    id: 1,
    question: 'Does it support other languages?',
    answer:
      'Yes, Chatvolt supports about +100 languages. You can have your sources in any language and ask it questions in any language.',
  },
  {
    id: 2,
    question: 'How can I add my chatbot to my website?',
    answer:
      'You can embed an iframe or add a chat bubble to the bottom right/left of your website.',
  },
  {
    id: 3,
    question: 'Where is my data stored ?',
    answer:
      'The content of the document is hosted on secure AWS servers in USA.',
  },

  {
    id: 4,
    question: 'What should my data look like?',
    answer:
      'You have the flexibility to upload a wide variety of file types to a datastore, including PDF, CSV, JSON, text documents, PowerPoint presentations, Word documents, and Excel spreadsheets, as well as the ability to add links to your website or YouTube channel. These contents will be converted into training data, enhancing the capabilities of your system.',
  },
  {
    id: 5,
    question: 'Does it use ChatGPT ?',
    answer:
      'Yes, your chatbot can be configured to integrate a variety of cutting-edge language models, including ChatGPT 3.5 Turbo, ChatGPT 4 Turbo, Google Gemini, Google Gemma, Microsoft WizardLM 2, Microsoft Phi 3, Cohere Command-R, Claude 3, Mistral, Dolphin, OpenChat, and Meta LLama. Additionally, we offer the innovative Volt-Networks, which combines multiple models to generate more comprehensive and accurate responses.',
  },

  {
    id: 6,
    question: 'Can I give my chatbots instructions?',
    answer:
      'Yes, in addition to training your chatbot with specific data, you can also fully customize the base prompt by choosing a name, defining its personality, and setting any instructions and rules you prefer. Additionally, you will have access to an exclusive feature from Chatvolt that uses artificial intelligence to assist you in constructing your chatbot`s prompt, ensuring an optimized setup tailored to your needs.',
  },

  // More questions...
];

export default function FAQ() {
  return (
    <div className="bg-black">
      <div className="px-6 py-16 mx-auto max-w-7xl sm:py-24 lg:px-8">
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">
          Frequently asked questions
        </h2>
        <p className="max-w-2xl mt-6 text-base leading-7 text-gray-300">
            If you have any questions not covered in this FAQ, we invite you to engage with Franklin, our advanced chatbot, developed using Chatvolt`s innovative AI technology. Franklin is equipped to clarify your queries and, if necessary, will direct your question straight to our specialized team.
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
