import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface Props {
  url: string;
  host: string;
}

export const SignIn = ({ url, host }: Props) => {
  const previewText = `Sign in to Chatvolt`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto font-sans bg-white">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://www.chatvolt.ai/logo.png`}
                width="100"
                alt="Your App Name"
                className="mx-auto my-0 w-10"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Sign in to <strong>Chatvolt</strong>
            </Heading>
            <Text className="text-black text-[14px] text-center leading-[24px]">
              Please click the button below to access your Chatvolt account. 
              This access is valid only once. If it expires, please visit our website and request access again.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-4 py-3"
                href={url}
              >
                Sign In
              </Button>
            </Section>

            {/* <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:<br />
              <Link
                href={url}
                className="text-blue-600 no-underline"
              >
                {url}
              </Link>
            </Text> */}


            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px] mt-4">
              If you encounter any issues with signing in, please do not hesitate to
              <Link href="mailto:support@chatvolt.ai" className="underline">
                {' '}
                contact us
              </Link>
              .
            </Text>
            
            <Text className="text-[#666666] text-[12px] leading-[24px]">
            In case you were not expecting to receive this sign-in link, 
            you can simply ignore this email. If you have any worries 
            about the safety of your account, please don't hesitate 
            to reach out to us by replying to this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SignIn;
