import {
  ArrowsPointingOutIcon,
  ArrowTrendingUpIcon,
  Battery100Icon,
  BoltIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  CircleStackIcon,
  CloudArrowUpIcon,
  CpuChipIcon,
  FaceSmileIcon,
  HandRaisedIcon,
  HandThumbUpIcon,
  LanguageIcon,
  LightBulbIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/20/solid';
import { useColorScheme } from '@mui/joy';
import Head from 'next/head';
import React, { useEffect } from 'react';

import Cta from '../landing-page-ptbr/Cta';
import FAQ from '../landing-page-ptbr/FAQ';
import { Footer } from '../landing-page-ptbr/Footer';
import Languages from '../landing-page-ptbr/Languages';
import PartnerLogos from '../PartnerLogos';
import SEO from '../SEO';

import Body from './Body';
import Feature from './Feature';
import { Header } from './Header';
import Hero from './Hero';

type Props = {};

function CSLandingPage({}: Props) {
  const { setMode } = useColorScheme();

  useEffect(() => {
    setMode('dark');
  }, []);

  return (
    <>
      <SEO
        title="Chatvolt IA: Transformando Comunicação Empresarial com Chatbots Avançados"
        description="Descubra os chatbots de IA de ponta da Chatvolt que revolucionam a interação e o crescimento empresarial. Experimente o futuro da comunicação digital hoje!"
        baseUrl="https://www.chatvolt.ai"
        ogImage="https://www.chatvolt.ai/api/og"
        uri="/"
      />

      {/* <Header /> */}

      {/* <script
        defer
        src="https://cdn.jsdelivr.net/npm/@chatvolt/chat-bubble@latest"
        id="clq6g5cuv000wpv8iddswwvnd"
        data-name="chatvolt-chat-bubble"
      ></script> */}

      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          body {
            width: 100dvw;
            max-width: 100d%;
            overflow-x: hidden;
          }
          `,
          }}
        />
      </Head>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `import Chatbox from 'https://cdn.jsdelivr.net/npm/@chatvolt/embeds@latest/dist/chatbox/index.js';

  Chatbox.initBubble({
    agentId: 'clw0wuhp6000hpbgjnpivm3ni',
  });`,
        }}
      />

      <Body />

      <Footer disableProductColumn />
    </>
  );
}

export default CSLandingPage;
