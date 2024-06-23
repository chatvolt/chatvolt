import {
  BoltIcon,
  CloudArrowUpIcon,
  LinkIcon,
} from '@heroicons/react/20/solid';
import clsx from 'clsx';
import React from 'react';
const features = [
  {
    name: 'Load data from any source',
    description: `Easily upload documents you'd like to chat with.`,
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Instant answers',
    description:
      'Ask questions, extract information, and summarize documents with AI.',
    icon: BoltIcon,
  },
  {
    name: 'Sources included',
    description:
      'Every response is backed by sources extracted from the uploaded document.',
    icon: LinkIcon,
  },
];

type Props = {
  label?: string | React.ReactNode;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  mediaUrl?: string;
  inversed?: boolean;
  items?: {
    name: string;
    description: string;
    icon: React.ComponentType<any>;
  }[];
};

export default function Feature(props: Props) {
  return (
    <div
      id="for-customer-support"
      className="py-24 overflow-hidden bg-black sm:py-32"
    >
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div
            className={clsx('order-first px-6 md:px-0 lg:pl-4 lg:pt-4', {
              'lg:order-last': !props.inversed,
            })}
          >
            <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-lg">
              {props.label && (
                <h2 className="text-base font-semibold leading-7 text-indigo-500">
                  {props.label}
                </h2>
              )}
              {props.title && (
                <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {props.title}
                </p>
              )}
              {props.description &&
                (typeof props.description === 'string' ? (
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    {props.description}
                  </p>
                ) : (
                  React.cloneElement(props.description as any, {})
                ))}
              <dl className="max-w-xl mt-10 space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
                {props?.items?.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-white">
                      <feature.icon
                        className="absolute w-5 h-5 text-indigo-500 left-1 top-1"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{' '}
                    <br />
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="flex justify-center items-center h-full">

            {props.mediaUrl &&
              (props.mediaUrl.endsWith('.mp4') ? (
                <video
                  src={props.mediaUrl}
                  className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-[30rem] "
                  loop
                  muted
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={props.mediaUrl}
                  alt="Feature Media"
                  className="w-full max-w-none rounded-xl shadow-xl sm:w-[30rem] "
                  width={450}
                  height={450}
                />
              ))}

          </div>
        </div>
      </div>
    </div>
  );
}
