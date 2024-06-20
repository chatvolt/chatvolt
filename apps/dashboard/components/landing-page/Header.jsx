import { Popover, Transition } from '@headlessui/react';
import { CheckIcon, StarIcon } from '@heroicons/react/20/solid';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Button from '@mui/joy/Button';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

// import { Button } from '@app/components/landing-page/Button'
import { Container } from '@app/components/landing-page/Container';
import { Logo } from '@app/components/landing-page/Logo';
import Menu from '@app/components/landing-page/Menu';
import { NavLink } from '@app/components/landing-page/NavLink';

import { appUrl } from '@chatvolt/lib/config';
import { RouteNames } from '@chatvolt/lib/types';

function MobileNavLink({ href, children }) {
  return (
    <Popover.Button as={Link} href={href} className="block p-2 w-full">
      {children}
    </Popover.Button>
  );
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0'
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0'
        )}
      />
    </svg>
  );
}

function MobileNavigation() {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none bg-black"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="flex absolute inset-x-0 top-full flex-col p-4 mt-4 text-lg tracking-tight bg-white rounded-2xl ring-1 shadow-xl origin-top text-slate-900 ring-slate-900/5"
          >
            <MobileNavLink href="/pricing">Pricing</MobileNavLink>

            <MobileNavLink
              href="https://chatvolt.getrewardful.com/"
              target={'_blank'}
            >
              Affiliates
            </MobileNavLink>
            <MobileNavLink href="/help" target={'_blank'}>
              Help Center
            </MobileNavLink>
            <MobileNavLink href="https://docs.chatvolt.ai/" target={'_blank'}>
              API Docs
            </MobileNavLink>
            <MobileNavLink
              href="https://github.com/chatvolt/chatvolt"
              target={'_blank'}
            >
              GitHub
            </MobileNavLink>

            {/* <MobileNavLink href="#testimonials">Testimonials</MobileNavLink> */}
            {/* <MobileNavLink href="#pricing">Pricing</MobileNavLink> */}
            <hr className="m-2 border-slate-300/40" />
            <MobileNavLink href={appUrl}>Sign in</MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

export function Header() {
  const [hostname, setHostname] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHostname(window.location.hostname);
    }
  }, []);

  let logoUrl = '';

  if (hostname?.includes('chatbotgpt.ai')) {
    logoUrl = '/logo-chatbotgpt-dark.png';
  }

  return (
    <>
      {/* #112F8A */}
      {/* <div className="p-1 text-sm text-center text-white bg-[#220E11]  flex-row items-center justify-center hidden sm:flex">
        <div className="flex flex-row space-x-12">
          <div className="inline-flex items-center space-x-1">
            <CheckIcon className="w-4 font-bold text-yellow-400" />

            <span>Founded in France. We respect your privacy.</span>
          </div>
          <div className="inline-flex items-center space-x-1">
            <div className="inline-flex items-center">
              <StarIcon className="w-3 font-bold text-yellow-400" />
              <StarIcon className="w-3 font-bold text-yellow-400" />
              <StarIcon className="w-3 font-bold text-yellow-400" />
              <StarIcon className="w-3 font-bold text-yellow-400" />
              <StarIcon className="w-3 font-bold text-yellow-400" />
            </div>
            <span>Used by 10,042 happy customers</span>
          </div>
        </div>
      </div> */}
      <header className="py-10 bg-transparent">
        <Container>
          <nav className="flex relative z-50 justify-between">
            <div className="flex items-center md:gap-x-12">
              <Link href="/" aria-label="Home">
                {!logoUrl && <Logo className="w-auto h-10" />}
                {logoUrl && (
                  <Image
                    className="w-32"
                    width="80"
                    height="100"
                    // className={clsx(props.className)}
                    // src="/logo-chatbotgpt-dark.png"
                    src={logoUrl}
                    alt=""
                  />
                )}
              </Link>
              <div className="hidden md:flex md:gap-x-6">
                {/* <Link href={RouteNames.CHAT_SITE}>
                <Button
                  href="/products/crisp-plugin"
                  size="sm"
                  variant="outlined"
                  color="success"
                  sx={{ borderRadius: 100 }}
                  endDecorator={<ArrowForwardRoundedIcon />}
                >
                  Discvover ChatSite
                </Button>
              </Link> */}

                {/* <Button
                  href="/products/crisp-plugin"
                  size="sm"
                  variant="outlined"
                  color="success"
                  sx={{ borderRadius: 100 }}
                  endDecorator={<ArrowForwardRoundedIcon />}
                >
                  Discover ResolveAI
                </Button> */}

                {/* <NavLink href="/help">Help Center</NavLink> */}
                <NavLink
                  href="https://chatvolt.getrewardful.com/"
                  target={'_blank'}
                >
                  Affiliates
                </NavLink>
                <NavLink href="/#integrations">Integrations</NavLink>
                <NavLink href="/pricing">Pricing</NavLink>

                <Menu />

                {/* <NavLink href="https://github.com/chatvolt/chatvolt" target={'_blank'}>
                GitHub
              </NavLink> */}
                {/* <NavLink href="https://docs.chatvolt.ai/" target={'_blank'}>
                Docs
              </NavLink> */}

                {/* <NavLink href="#testimonials">Testimonials</NavLink> */}
              </div>
            </div>
            <div className="flex gap-x-5 items-center md:gap-x-8">
              {/* <div className="hidden md:block">
              <NavLink href="https://app.chatvolt.ai">Sign in</NavLink>
            </div> */}
              {/* <Button target="_blank" href="https://app.chatvolt.ai/signin" color="blue">
              <span>
                Sign In
              </span>
            </Button> */}
              {/* Change following link href with /signin for local signin */}
              <Link href={`${appUrl}/signin`}>
                <Button variant="outlined" sx={{ borderRadius: 100 }}>
                  Sign In
                </Button>
              </Link>
              <div className="-mr-1 md:hidden">
                <MobileNavigation />
              </div>
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
}
