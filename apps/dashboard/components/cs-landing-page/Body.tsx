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
import React, { useEffect } from 'react';

import { Header } from '@app/components/landing-page/Header';

import { Spotlight } from '@chatvolt/ui/Spotlight';

import Cta from '../landing-page/Cta';
import FAQ from '../landing-page/FAQ';
import { Footer } from '../landing-page/Footer';
import Integrations from '../landing-page/Integrations';
import Languages from '../landing-page/Languages';
import PartnerLogos from '../PartnerLogos';

import Feature from './Feature';
import Hero from './Hero';
import Hero2 from './Hero2';

type Props = {
  hero2?: boolean;
};

function Body({ hero2 }: Props) {
  return (
    <div>
      <div className="w-full dark:bg-black bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.2] relative flex flex-col  ">
        <Spotlight
          className="left-0 -top-20 md:left-60 md:top-12"
          fill="white"
        />

        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute top-0 pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {/* <p className="relative z-20 py-8 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b sm:text-7xl from-neutral-200 to-neutral-500">
        Backgrounds
      </p> */}
        <Header />

        {/* <div className="absolute top-0 z-0 inset-0 h-screen pointer-events-none w-full bg-black bg-[linear-gradient(to_right,#80808022_1px,transparent_1px),linear-gradient(to_bottom,#80808022_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,white_70%,transparent_100%)] "></div> */}
        {/* 
      <svg
        className="animate-spotlight-mobile sm:animate-spotlight pointer-events-none absolute z-[1] h-[16´9%] w-[138%] lg:w-[84%] opacity-0 -top-40 left-0 md:left-60 md:-top-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3787 2842"
        fill="none"
      >
        <g filter="url(#filter)">
          <ellipse
            cx="1924.71"
            cy="273.501"
            rx="1924.71"
            ry="273.501"
            transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
            className="fill-white/[0.4] fill-transparent"
            fill-opacity="0.31"
          ></ellipse>
        </g>
        <defs>
          <filter
            id="filter"
            x="0.860352"
            y="0.838989"
            width="3785.16"
            height="2840.26"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="151"
              result="effect1_foregroundBlur_1065_8"
            ></feGaussianBlur>
          </filter>
        </defs>
      </svg> */}

        {hero2 ? <Hero2 /> : <Hero />}
      </div>

      {/*<PartnerLogos />*/}

      <Feature
        label="Productivity Boost"
        title={'Drastically reduce support and service costs'}
        items={[
          {
            name: 'Continuous availability',
            description: `Our AI agents, powered by the best LLMs in the market, are available 24/7, ready to sell, assist, and clarify doubts of your customers on any subject they have been trained for.`,
            icon: Battery100Icon,
          },

          {
            name: 'Delegation of routine inquiries',
            description:
              'Our AI manages routine queries and common issues that make up the majority of inquiries, freeing up your support team to focus on more complex and high-priority tasks.',
            icon: ArrowTrendingUpIcon,
          },
          {
            name: "Increase customer satisfaction",
            description:
              'With quick, accurate responses, always presented in an extremely polite manner, you will see a significant increase in your customers satisfaction.',
            icon: FaceSmileIcon,
          },
        ]}
        mediaUrl="/landing-page/productivity_boost.png"
        inversed
      />

      <Feature
        label="Tailored to your business"
        title={'Reliable AI, trained based on your data'}
        // description={
        //   "Chatvolt's AI is trained on your data to provide the best answers to your customers."
        // }
        items={[
          {
            name: 'Import data from any source',
            description: `Easily connect your data, applications, upload documents, and even learn from the content of your website or YouTube channel.`,
            icon: CloudArrowUpIcon,
          },
          {
            name: 'Multilingual',
            description:
              'Conduct training in your language and let us handle translations of your content in over 100 languages automatically.',
            icon: LanguageIcon,
          },
          // {
          //   name: 'No misleading answers',
          //   description:
          //     'Our AI has been trained to avoid hallucinations and misleading answers.',
          //   icon: CheckBadgeIcon,
          // },
          {
            name: 'Embedded sources',
            description:
              'Each response is supported by sources extracted from the information and documents of your submitted training.',
            icon: LinkIcon,
          },
        ]}
        mediaUrl="/landing-page/tailored_business.png"
      />

      <Languages />

      <Feature
        label="You are in control"
        title={'Smart Transition to Human Assistance'}
        // description="Our AI technology adeptly navigates complex issues, funneling them to your human support teams for a personalized touch—amplifying customer satisfaction."
        items={[
          {
            name: 'Focus on complex issues',
            description: `Our AI intuitively redirects the conversation to your human support team as needed.`,
            icon: HandRaisedIcon,
          },
          {
            name: 'Conversation Summary',
            description: `We provide a detailed summary of the interaction to your support team, allowing them to pick up exactly where the AI left off.`,
            icon: LightBulbIcon,
          },
          {
            name: 'Your reinforced support team',
            description: `Maintain high-quality engagement with the customer, blending AI efficiency with a human touch, ensuring no question goes unanswered and every customer interaction is satisfactory.`,
            icon: BoltIcon,
          },
        ]}
        // description="When a query surpasses the scope of our autonomous agent, it intuitively redirects the conversation to your human support team. This ensures that your customers continue to receive personalized attention without any hitches. Our AI not only identifies the precise moment for handoff but also provides a comprehensive summary of the interaction to your support personnel, enabling them to pick up right where the AI left off. Maintain high-quality customer engagement with the perfect blend of AI efficiency and human touch, ensuring that no query goes unanswered and every customer interaction is satisfactory."
        //mediaUrl="/landing-page/demo-handoff.mp4"
        mediaUrl="/landing-page/you_control.png"
        inversed
      />

      <Feature
        label="Tranform visitors into customers"
        title={'Generate Leads'}
        description="Maximize the capabilities of our autonomous customer support agent to not only resolve inquiries but also identify and register potential leads."
        mediaUrl="/landing-page/visitors_customers.png"
      />

      <Feature
        label="Fine-tuning"
        title={'Analysis and Optimization of Your AI'}
        // description="Our AI technology adeptly navigates complex issues, funneling them to your human support teams for a personalized touch—amplifying customer satisfaction."
        // description="Easily review your AI's performance in real-time, identify areas for enhancement, and iteratively train it to meet your support objectives. Our intuitive interface facilitates continuous improvement, making your autonomous agent increasingly adept at delivering exceptional customer experiences."
        items={[
          {
            name: 'Answers Rating',
            description: `You can evaluate the responses provided by the AI, providing valuable feedback for the continuous improvement of your AI.`,
            icon: HandThumbUpIcon,
          },
          {
            name: 'Review and Enhancement',
            description: `Easily review and enhance the responses generated by the AI.`,
            icon: MagnifyingGlassIcon,
          },
          {
            name: 'Automatic Resolution',
            description: `You have the option to manually mark a conversation as resolved or let the AI do it for you.`,
            icon: CheckCircleIcon,
          },
        ]}
        mediaUrl="/landing-page/inbox.png"
        inversed
      />

      {/* 
      <Feature
        label="No-coding required"
        title={'Plug & Play in minutes'}
        description="GPT-4 powered AI agents scale on demand to help you handle more requests faster so you can ditch deflection and containment KPIs and, instead, embrace resolution as the ultimate mark of success."
        mediaUrl="/landing-page/vs.png"
        
      /> */}

      {/* <Feature
        label="Deploy Anywhere"
        title={'Omnichannel'}
        // description="GPT-4 powered AI agents scale on demand to help you handle more requests faster so you can ditch deflection and containment KPIs and, instead, embrace resolution as the ultimate mark of success."
        description={
          <div className="mt-6 space-y-4 text-lg leading-8 text-gray-300">
            <p>{'Automatically support your customers wherever they are.'}</p>
            <p>
              {
                'Our autonomous agent seamlessly integrates across multiple communication platforms—be it email, chat, social media, or phone—providing a consistent and efficient support experience.'
              }
            </p>
            <p>
              {
                'Elevate your customer service to a new level of excellence, with streamlined operations and satisfied customers across all channels.'
              }
            </p>
          </div>
        }
        // description="Our autonomous agent seamlessly integrates across multiple communication platforms—be it email, chat, social media, or phone—providing a consistent and efficient support experience. No matter where your customers reach out, our AI-driven agent is there to assist, ensuring every interaction is handled with precision and understanding. Elevate your customer service to a new level of excellence, with streamlined operations and satisfied customers across all channels."
        mediaUrl="/landing-page/deploy.jpg"
      /> */}

      {/* <Feature
        label="Amazing Experience"
        title={'More than a FAQ Chatbot'}
        // description="GPT-4 powered AI agents scale on demand to help you handle more requests faster so you can ditch deflection and containment KPIs and, instead, embrace resolution as the ultimate mark of success."
        // description="Discover a new realm of customer support with our autonomous agent that goes beyond mere FAQ interactions. Unlike standard chatbots that offer canned responses to common queries, our AI-driven agent dives deeper to understand the nuanced needs of your customers. It learns from each interaction, continually refining its responses to provide more precise and personalized assistance over time. With the ability to tackle complex queries and seamlessly escalate to human support when necessary, it's not just an FAQ chatbot—it's your round-the-clock, intelligent customer support companion. Elevate your customer service to a new pinnacle, ensuring your clients receive insightful and accurate support whenever they need it."
        mediaUrl="/landing-page/vs.png"
        items={[
          {
            name: 'AI Revolution',
            description: `Unlike standard chatbots that offer canned responses to common queries, our AI-driven agent dives deeper to understand the nuanced needs of your customers.`,
            icon: SparklesIcon,
          },
          {
            name: 'Beyond canned responses',
            description: `Discover a new realm of customer support with our autonomous agent that goes beyond mere FAQ interactions.`,
            icon: ArrowsPointingOutIcon,
          },
          {
            name: 'Smart Assistant',
            description: `With the ability to tackle complex queries and seamlessly escalate to human support when necessary, it's not just an FAQ chatbot—it's your round-the-clock, intelligent customer support companion.`,
            icon: CpuChipIcon,
          },
        ]}
        inversed
      /> */}

      <Integrations />

      {/* <Feature
        label="We respect your privacy"
        title={'LGPD Compliant'}
        mediaUrl="/landing-page/eu-flag.png"
        items={[
          {
            name: 'Founded in Brazil',
            description: `All servers and databases are located in USA.`,
            icon: CircleStackIcon,
          },
          {
            name: 'Secure by design',
            description: 'All data is encrypted at rest and in transit.',
            icon: ShieldCheckIcon,
          },
          {
            name: 'You own your data',
            description:
              'You data is only used to train your AI and is never shared with third parties.',
            icon: FaceSmileIcon,
          },
        ]}
      /> */}

      <FAQ />

      <Cta />
    </div>
  );
}

export default Body;
