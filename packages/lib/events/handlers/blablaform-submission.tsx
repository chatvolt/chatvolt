import cuid from 'cuid';

import { FormSubmission, render } from '@chatvolt/emails';
import mailer from '@chatvolt/lib/mailer';
import { AppEventSchema, FormConfigSchema } from '@chatvolt/lib/types/dtos';
import { FormStatus, MembershipRole } from '@chatvolt/prisma';
import prisma from '@chatvolt/prisma/client';

type AppEventHandler<T extends AppEventSchema> = (event: T) => Promise<void>;

const handler: AppEventHandler<
  Extract<AppEventSchema, { type: 'blablaform-submission' }>
> = async function (event) {
  const submissionId = event?.submissionId || cuid();

  const { form, ...submission } = await prisma.formSubmission.upsert({
    where: {
      id: submissionId,
    },
    create: {
      conversationId: event.conversationId,
      formId: event.formId,
      data: event.formValues as any,
      status: FormStatus.COMPLETED,
    },
    update: {
      data: event.formValues as any,
      status: FormStatus.COMPLETED,
    },
    include: {
      form: {
        include: {
          organization: {
            select: {
              memberships: {
                where: {
                  role: MembershipRole.OWNER,
                },
                include: {
                  user: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const config = form?.publishedConfig as FormConfigSchema;

  const ownerEmail = form?.organization?.memberships?.[0].user?.email;

  await mailer.sendMail({
    from: {
      name: 'Chatvolt',
      address: process.env.EMAIL_FROM!,
    },
    to: ownerEmail!,
    subject: `📬 New form submission from "${form?.name}"`,
    html: render(
      <FormSubmission
        ctaLink={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/forms/${event?.formId}/admin?tab=submissions&limit=25&offset=0`}
        values={event.formValues}
        formName={form?.name!}
      />
    ),
  });

  const webhookUrl = config?.webhook?.url;

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });
    } catch (e) {
      console.log('error', e);
    }
  }
};

export default handler;
