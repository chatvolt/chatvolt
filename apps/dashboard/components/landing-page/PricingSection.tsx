import { CheckIcon } from '@heroicons/react/20/solid';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import { useColorScheme } from '@mui/joy/styles';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import accountConfig from '@chatvolt/lib/account-config';
import { appUrl } from '@chatvolt/lib/config';

let formatter = Intl.NumberFormat('en');

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
];
const tiers = [
  {
    name: 'Discover',
    id: 'tier-free',
    href: `${appUrl}/settings/billing`,
    price: { monthly: '$0', annually: '$0' },
    description: 'Get started quickly for free. Ideal for initial testing.',
    features: [
      `${accountConfig['level_0'].limits.maxAgents} agent(s)`,
      `${accountConfig['level_0'].limits.maxDatastores} datastore(s)`,
      `${accountConfig['level_0'].limits.maxAgentsQueries} message credits/month`,
      `${formatter.format(
        accountConfig['level_0'].limits.maxStoredTokens
      )} words storage`,
      `File upload limited to ${
        accountConfig['level_0'].limits.maxFileSize / 1000000
      }MB / file`,

      // `Data processing limited to ${accountConfig['level_0'].limits
      //   .maxDataProcessing / 1000000}MB / month`,
      // 'ChatGPT plugin',
    ],
    mostPopular: false,
  },
  // {
  //   name: 'Hobby',
  //   id: 'tier-hobby',
  //   href: `${appUrl}/settings/billing`,
  //   price: { monthly: '$17', annually: '$179' },
  //   description: 'The essentials to get started quickly.',
  //   features: [
  //     `${accountConfig['level_0_5'].limits.maxAgents} agent(s)`,
  //     `${accountConfig['level_0_5'].limits.maxDatastores} datastore(s)`,
  //     `${accountConfig['level_0_5'].limits.maxAgentsQueries} message credits/month`,
  //     `${formatter.format(
  //       accountConfig['level_0_5'].limits.maxStoredTokens
  //     )} words storage`,
  //     `File upload limited to ${
  //       accountConfig['level_0_5'].limits.maxFileSize / 1000000
  //     }MB / file`,

  //     // `Data processing limited to ${accountConfig['level_0_5'].limits
  //     //   .maxDataProcessing / 1000000}MB / month`,
  //     `Website loader limited to  ${accountConfig['level_0_5'].limits.maxWebsiteURL} Pages`,
  //     'Access to WhatsApp Plugin',
  //     'Access to Crisp Plugin',
  //     'Access to Slack Plugin',
  //     `${accountConfig['level_0_5'].limits.maxSeats} Team seat(s) included`,
  //   ],
  //   mostPopular: false,
  // },
  {
    name: 'Growth',
    id: 'tier-startup',
    href: 'https://app.chatvolt.ai/settings/billing',
    price: { monthly: '$25', annually: '$259' },
    description: 'Scale your business with advanced, affordable features.',
    features: [
      `${accountConfig['level_1'].limits.maxAgents} agent(s)`,
      `${accountConfig['level_1'].limits.maxDatastores} datastore(s)`,
      `${accountConfig['level_1'].limits.maxAgentsQueries} message credits/month`,
      `${formatter.format(
        accountConfig['level_1'].limits.maxStoredTokens
      )} words storage`,
      `File upload limited to ${
        accountConfig['level_1'].limits.maxFileSize / 1000000
      }MB / file`,
      // `Data processing limited to ${accountConfig['level_1'].limits
      //   .maxDataProcessing / 1000000}MB / month`,
      // 'ChatGPT plugin',
      `+Website loader limited to  ${accountConfig['level_1'].limits.maxWebsiteURL} Pages`,
      '+Access to WhatsApp Plugin',
      //'+Access to Crisp Plugin',
      //'+Access to Slack Plugin',
      `${accountConfig['level_1'].limits.maxSeats} Team seat(s) included`,
    ],
    mostPopular: false,
  },
  {
    name: 'Plus',
    id: 'tier-plus',
    href: 'https://app.chatvolt.ai/settings/billing',
    price: { monthly: '$65', annually: '$657' },
    description: 'Offers larger limits and enhanced features beyond Growth.',
    features: [
      `${accountConfig['level_1_5'].limits.maxAgents} agent(s)`,
      `${accountConfig['level_1_5'].limits.maxDatastores} datastore(s)`,
      `${accountConfig['level_1_5'].limits.maxAgentsQueries} message credits/month`,
      `${formatter.format(
        accountConfig['level_1_5'].limits.maxStoredTokens
      )} words storage`,
      `File upload limited to ${
        accountConfig['level_1_5'].limits.maxFileSize / 1000000
      }MB / file`,
      // `Data processing limited to ${accountConfig['level_1_5'].limits
      //   .maxDataProcessing / 1000000}MB / month`,
      // 'ChatGPT plugin',
      'Access to WhatsApp Plugin',
      //'Access to Crisp Plugin',
      `+Website loader limited to  ${accountConfig['level_1_5'].limits.maxWebsiteURL} Pages`,
      //'+Access to Slack Plugin',
      `${accountConfig['level_1_5'].limits.maxSeats} Team seat(s) included`,
    ],
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: `${appUrl}/settings/billing`,
    price: { monthly: '$99', annually: '$999' },
    description: 'For power users seeking more robust features.',
    features: [
      `${accountConfig['level_2'].limits.maxAgents} agent(s)`,
      `${accountConfig['level_2'].limits.maxDatastores} datastore(s)`,
      `${accountConfig['level_2'].limits.maxAgentsQueries} message credits/month`,
      `${formatter.format(
        accountConfig['level_2'].limits.maxStoredTokens
      )} words storage`,
      `File upload limited to ${
        accountConfig['level_2'].limits.maxFileSize / 1000000
      }MB / file`,
      // `Data processing limited to ${accountConfig['level_2'].limits
      //   .maxDataProcessing / 1000000}MB / month`,
      //'Access to Chatvolt API',
      // 'ChatGPT plugin',
      'Access to WhatsApp Plugin',
      //'Access to Crisp Plugin',
      //'Access to Slack Plugin',
      `+Website loader limited to  ${accountConfig['level_2'].limits.maxWebsiteURL} Pages`,
      //'+Google Drive as datasources',
      '+Auto synch datasources',
      `${accountConfig['level_2'].limits.maxSeats} Team seat(s) included`,
    ],
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: `${appUrl}/settings/billing`,
    price: { monthly: '$527', annually: '$5297' },
    description: 'Dedicated support and comprehensive features for large teams.',
    features: [
      `${accountConfig['level_3'].limits.maxAgents} agent(s)`,
      `${accountConfig['level_3'].limits.maxDatastores} datastore(s)`,
      `${accountConfig['level_3'].limits.maxAgentsQueries} message credits/month`,
      `${formatter.format(
        accountConfig['level_3'].limits.maxStoredTokens
      )} words storage`,
      `File upload limited to ${
        accountConfig['level_3'].limits.maxFileSize / 1000000
      }MB / file`,
      // `Data processing limited to ${accountConfig['level_3'].limits
      //   .maxDataProcessing / 1000000}MB / month`,
      //'Access to Chatvolt API',
      // 'ChatGPT plugin',
      'Access to WhatsApp Plugin',
      //'Access to Crisp Plugin',
      //'Access to Slack Plugin',
      `+Website loader limited to  ${accountConfig['level_3'].limits.maxWebsiteURL} Pages`,
      //'Google Drive as datasources',
      'Auto synch datasources',
      `${accountConfig['level_3'].limits.maxSeats} Team seat(s) included`,
    ],
    mostPopular: false,
  },
  // {
  //   name: 'Ultimate',
  //   id: 'tier-ultimate',
  //   href: `${appUrl}/settings/billing`,
  //   price: { monthly: '$997', annually: '$9970' },
  //   description: 'Large-scale features for peak performance and growth.',
  //   features: [
  //     `${accountConfig['level_4'].limits.maxAgents} agent(s)`,
  //     `${accountConfig['level_4'].limits.maxDatastores} datastore(s)`,
  //     `${accountConfig['level_4'].limits.maxAgentsQueries} message credits/month`,
  //     `${formatter.format(
  //       accountConfig['level_4'].limits.maxStoredTokens
  //     )} words storage`,
  //     `File upload limited to ${
  //       accountConfig['level_4'].limits.maxFileSize / 1000000
  //     }MB / file`,
  //     // `Data processing limited to ${accountConfig['level_4'].limits
  //     //   .maxDataProcessing / 1000000}MB / month`,
  //     'Access to Chatvolt API',
  //     // 'ChatGPT plugin',
  //     'Access to WhatsApp Plugin',
  //     'Access to Crisp Plugin',
  //     'Access to Slack Plugin',
  //     `+Website loader limited to  ${accountConfig['level_4'].limits.maxWebsiteURL} Pages`,
  //     '+Google Drive as datasources',
  //     'Auto synch datasources',
  //     `${accountConfig['level_4'].limits.maxSeats} Team seat(s) included`,
  //   ],
  //   mostPopular: false,
  // },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const ForceDarkMode = () => {
  const { setMode } = useColorScheme();

  useEffect(() => {
    setMode('dark');
  }, []);

  return null;
};

export default function PricingSection() {
  const { setMode } = useColorScheme();
  const router = useRouter();
  const [frequency] = useState(frequencies[0]);

  useEffect(() => {
    const handleRouteChange = (newPath: string) => {
      window.location.href = router.basePath + newPath;
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    setMode('dark');
  }, []);

  return (
    <div className="py-24 bg-black sm:py-32">
      {/* <ForceDarkMode key={Date.now()} /> */}
      <div className="px-6 mx-auto max-w-[1500px] lg:px-8">

        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Pricing plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-center text-gray-300">
          Choose an affordable plan that’s packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </p>


        <div className="grid isolate grid-cols-1 gap-8 mx-auto mt-16 max-w-md lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={classNames(
                tier.mostPopular
                  ? 'bg-white/5 ring-2 ring-indigo-500'
                  : 'ring-1 ring-white/10',
                'rounded-3xl p-8 xl:p-10'
              )}
            >
              <div className="flex gap-x-4 justify-between items-center">
                <h3
                  id={tier.id}
                  className="text-lg font-semibold leading-8 text-white"
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                {tier.description}
              </p>
              <p className="flex gap-x-1 items-baseline mt-6">
                <span className="text-4xl font-bold tracking-tight text-white">
                  {tier.id === 'tier-free'
                    ? 'Free'
                    : (tier as any).price[frequency.value]}
                </span>
                {tier.id !== 'tier-free' && (
                  <span className="text-sm font-semibold leading-6 text-gray-300">
                    {frequency.priceSuffix}
                  </span>
                )}
              </p>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                    : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                )}
              >
                {tier.id === 'tier-free' ? 'Sign Up' : 'Subscribe'}
              </Link>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-300 xl:mt-10"
              >
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className={clsx('flex gap-x-3', {
                      'text-green-400':
                        feature.includes('+') || feature.includes('Team seat'),
                    })}
                  >
                    <CheckIcon
                      className={clsx('flex-none w-5 h-6 text-white')}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>


        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            <br /><br />Exclusive<br />
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
             Implementation Service
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-center text-gray-300">
          We also offer the additional service of implementing the Chatvolt solution, 
          ideal for ensuring a complete and efficient integration within your company. 
          For more information, schedule a meeting by clicking the button below.
        </p>
        <br />

        <div className="flex justify-center items-center h-full">
          <Link target="_blank" href="https://book.chatvolt.ai/alexander">
            <Button
              variant="solid"
              size="lg"
              sx={{ borderRadius: 100 }}
            >{`☎  Book a meeting`}</Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
