import { SendVerificationRequestParams } from 'next-auth/providers';
import { render, SignIn } from '@chatvolt/emails';
import mailer from './mailer';

async function sendVerificationRequest(params: SendVerificationRequestParams) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);

  const result = await mailer.sendMail({
    from: {
      name: 'Chatvolt AI',
      address: process.env.EMAIL_FROM!, //provider.from
    },
    to: identifier,
    subject: `🔐 Sign In to Chatvolt AI`,
    html: render(<SignIn host={host} url={url} />),
    text: render(<SignIn host={host} url={url} />, {
      plainText: true,
    }),
  });

  const failed = result?.rejected?.concat(result?.pending)?.filter(Boolean);
  if (failed?.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
  }
}

export default sendVerificationRequest;