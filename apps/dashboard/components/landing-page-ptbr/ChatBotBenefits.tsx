import {
  BoltIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CurrencyDollarIcon,
  HeartIcon,
  PencilSquareIcon,
  SparklesIcon,
  SwatchIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Eficiência',
    description:
    'Chatbots fornecem uma comunicação rápida e eficiente que pode otimizar fluxos de trabalho e reduzir os tempos de resposta para os clientes.',
    icon: BoltIcon,
  },
  {
    name: 'Personalização',
    description:
      'Com chatbots, você pode criar uma experiência personalizada para o seu público, permitindo que eles interajam com a sua marca de uma forma mais significativa.',
    icon: SwatchIcon,
  },
  {
    name: 'Automação',
    description:
      'Chatbots podem automatizar tarefas repetitivas, permitindo que sua equipe se concentre em trabalhos de maior nível e aumentando a produtividade geral.',
    icon: SparklesIcon,
  },
  {
    name: 'Redução de custo',
    description:
      'Chatbots podem proporcionar economia de custos ao reduzir a necessidade de grandes equipes de suporte ou atendimento ao cliente, e estão disponíveis 24 horas por dia, 7 dias por semana, para consultas de clientes.',
    icon: CurrencyDollarIcon,
  },
];

export default function Example() {
  return (
    <div className="py-24 bg-black sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Por Que os Chatbots de IA Generativa são o Futuro?
          </h2>
          <dl className="grid grid-cols-1 col-span-2 gap-x-8 gap-y-16 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-base font-semibold leading-7 text-white">
                  <div className="flex items-center justify-center w-10 h-10 mb-6 bg-indigo-600 rounded-lg">
                    <feature.icon
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-300">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
