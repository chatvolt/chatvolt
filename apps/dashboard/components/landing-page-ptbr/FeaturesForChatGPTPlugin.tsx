import {
  ArrowDownOnSquareStackIcon,
  ArrowPathIcon,
  ChartPieIcon,
  ChatBubbleLeftRightIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
  SparklesIcon,
  StarIcon,
} from '@heroicons/react/20/solid';

const features = [
  {
    name: 'Talk to your data with ChatGPT',
    description: `Imagine the sheer power of conversing with personal documents through ChatGPT.`,
    icon: ArrowDownOnSquareStackIcon,
  },
  {
    name: 'Brand Awareness',
    description: `Leverage the Plugin Store to captivate users and skyrocket your brand awareness. `,
    icon: StarIcon,
  },
  {
    name: 'Stats (Coming soon)',
    description: `Get insights and statistics on how users are interacting with your Plugin!`,
    icon: ChartPieIcon,
  },
];

export default function Example() {
  return (
    <div id="chatgpt-plugin" className="py-24 bg-black sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto sm:text-center">
          {/* <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Everything you need
          </h2> */}
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ChatGPT Plugin in minutes
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Connect you custom data to ChatGPT, no-code required
          </p>
          <p className="mt-6 text-lg text-gray-300"></p>
        </div>
      </div>

      <div className="px-6 mx-auto mt-16 max-w-7xl sm:mt-20 md:mt-24 lg:px-8">
        <dl className="grid max-w-2xl grid-cols-1 mx-auto text-base leading-7 text-gray-300 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-white">
                <feature.icon
                  className="absolute w-5 h-5 text-indigo-500 left-1 top-1"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>
              <br />
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
