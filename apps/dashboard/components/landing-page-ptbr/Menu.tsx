import { Popover, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from '@heroicons/react/20/solid';
import {
  ArrowPathIcon,
  ChartPieIcon,
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleLeftEllipsisIcon,
  CpuChipIcon,
  CursorArrowRaysIcon,
  DocumentTextIcon,
  FingerPrintIcon,
  LinkIcon,
  RectangleGroupIcon,
  ServerIcon,
  SquaresPlusIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { Fragment } from 'react';

import products from '@chatvolt/lib/data/products';

const solutions = [

  // ...products.map((product) => ({
  //   name: product.name,
  //   description: product.description,
  //   href: `/products/${product.slug}`,
  //   icon: (props: any) => (
  //     <img {...props} src={product.logo} alt={`${product.name} Logo}`} />
  //   ),
  // })),

  {
    name: 'Todos os Melhores LLMs estão Disponíveis',
    description:
    'ChatGPT 3.5 Turbo, ChatGPT 4 Turbo, Google Gemini, Google Gemma, Microsoft WizardLM 2, Microsoft Phi 3, Cohere Command-R, Claude 3, Mistral, Dolphin, OpenChat, e Meta LLama são alguns dos modelos de ponta que oferecemos. Além destes, destacamos a Volt-Networks, a nossa rede mais avançada, que integra múltiplos modelos para produzir respostas não só abrangentes, mas também extremamente precisas.',
    href: '/#best-llms',
    icon: RectangleGroupIcon,
  },

  {
    name: 'Geração de Prompts Impulsionada por IA',
    description:
    'Agilize e aprimore a criação de prompts com nossa ferramenta exclusiva de geração de prompts com IA. Gere prompts personalizados rapidamente, elevando a eficiência e criatividade dos seus assistentes virtuais.',
    href: '/#for-customer-support',
    icon: DocumentTextIcon,
  },

  {
    name: 'Integre um Agente ao seu site',
    description:
    'Automatize seu suporte ao cliente com um ChatBot baseado em IA, treinado com seus próprios dados e integrado aos mais avançados modelos de linguagem do mundo.',
    href: '/#for-customer-support',
    icon: ChatBubbleLeftEllipsisIcon,
  },

  {
    name: 'Integração com Plataformas',
    description:
    'Integre facilmente seu chatbot em seu Website, Notion, YouTube, WhatsApp, Telegram, Shopify, entre outras (em breve).',
    href: '/#integrations',
    icon: LinkIcon,
  },



  // {
  //   name: 'Crisp Plugin',
  //   description:
  //     'Connect your agent to Crisp. Summarize conversations and more!',
  //   href: 'https://www.chatvolt.ai/products/crisp-plugin',
  //   icon: (props: any) => (
  //     <img
  //       {...props}
  //       src="https://www.freelance-stack.io/wp-content/uploads/2022/07/crispchat-logo.png"
  //       alt="Crisp Logo"
  //     />
  //   ),
  // },
  // {
  //   name: 'Slack',
  //   description: 'Deploy an Agent trained on your data to Slack',
  //   href: 'https://www.chatvolt.ai/products/slack-bot',
  //   icon: (props: any) => (
  //     <img
  //       {...props}
  //       src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
  //       alt="Slack Logo"
  //     />
  //   ),
  // },
  // {
  //   name: 'ChatGPT Plugin',
  //   description:
  //     'Build your own ChatGPT Plugin to connect custom data to your ChatGPT',
  //   href: '/#chatgpt-plugin',
  //   icon: (props: any) => (
  //     <img
  //       {...props}
  //       src="https://static.vecteezy.com/system/resources/previews/021/495/996/original/chatgpt-openai-logo-icon-free-png.png"
  //       alt="OpenAI Logo"
  //     />
  //   ),
  // },
  // {
  //   name: 'Create your digital self chatbot',
  //   description:
  //     'Automate customer support with a ChatGPT Bot trained on your data',
  //   href: '/products/clone',
  //   icon: UserPlusIcon,
  // },
  // {
  //   name: 'ChatGPT Plugin',
  //   description:
  //     'Build your own ChatGPT Plugin to connect custom data to your ChatGPT',
  //   href: '/#chatgpt-plugin',
  //   icon: (props: any) => (
  //     <img
  //       {...props}
  //       src="https://static.vecteezy.com/system/resources/previews/021/495/996/original/chatgpt-openai-logo-icon-free-png.png"
  //       alt="OpenAI Logo"
  //     />
  //   ),
  // },


  // {
  //   name: 'Chatvolt API',
  //   description: 'Acess the Chatvolt API to build your own workflows',
  //   href: 'https://docs.chatvolt.ai/introduction',
  //   icon: ServerIcon,
  // },
  // {
  //   name: 'On Premise',
  //   description: 'Install Chatvolt on your own infrastructure',
  //   href: 'https://github.com/',
  //   icon: CpuChipIcon,
  // },


];
const callsToAction = [
  {
    name: 'Demonstração',
    href: 'https://www.youtube.com/watch?v=Zwj4AOI2D2M',
    icon: PlayCircleIcon,
  },
  {
    name: 'Fale conosco',
    href: 'https://www.chatvolt.ai/@help',
    icon: ChatBubbleBottomCenterTextIcon,
  },
];

export default function Example() {
  return (
    <Popover className="relative">
      <Popover.Button className="popover-button inline-flex items-center text-sm font-semibold leading-6 text-violet-400 gap-x-1 !bg-none">
        <span>Soluções</span>
        <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="flex absolute left-1/2 z-10 px-4 mt-5 w-screen max-w-max -translate-x-1/2">
          <div className="overflow-hidden flex-auto w-screen max-w-md text-sm leading-6 bg-white rounded-3xl ring-1 shadow-lg ring-gray-900/5">
            <div className="p-4">
              {solutions.map((item) => (
                <div
                  key={item.name}
                  className="flex relative gap-x-6 p-4 rounded-lg group hover:bg-gray-50"
                >
                  <div className="flex flex-none justify-center items-center mt-1 w-11 h-11 bg-gray-50 rounded-lg group-hover:bg-white">
                    <item.icon
                      className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 bg-gray-50 divide-x divide-gray-900/5">
              {callsToAction.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                >
                  <item.icon
                    className="flex-none w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}