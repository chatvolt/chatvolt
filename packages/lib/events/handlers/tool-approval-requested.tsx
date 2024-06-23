import {
  ActionApprovalTemplate,
  FormSubmission,
  render,
} from '@chatvolt/emails';
import mailer from '@chatvolt/lib/mailer';
import { AppEventSchema } from '@chatvolt/lib/types/dtos';
import { MembershipRole } from '@chatvolt/prisma';
import prisma from '@chatvolt/prisma/client';

import { AppEventHandler } from '../type';

const handler: AppEventHandler<
  Extract<AppEventSchema, { type: 'tool-approval-requested' }>
> = async function (event) {
  const conversation = await prisma.conversation.findUniqueOrThrow({
    where: {
      id: event.conversationId,
    },
    include: {
      organization: {
        include: {
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
      messages: {
        take: -5,
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  const ownerEmail = conversation?.organization?.memberships?.[0]?.user?.email;
  event.approvals;

  await mailer.sendMail({
    from: {
      name: 'Chatvolt AI',
      address: process.env.EMAIL_FROM!,
    },
    to: ownerEmail!,
    subject: `⚠️ Approval Needed`,
    html: render(
      <ActionApprovalTemplate
        history={conversation.messages}
        agentName={event.agentName}
        approvals={(event.approvals || [])?.map((each) => ({
          name: (each?.tool as any)?.config?.name || 'Untitled',
          payload: each?.payload,
        }))}
        ctaLink={`${
          process.env.NEXT_PUBLIC_DASHBOARD_URL
        }/logs?tab=all&targetConversationId=${encodeURIComponent(
          event.conversationId
        )}&targetOrgId=${encodeURIComponent(conversation?.organizationId!)}`}
      />
    ),
  });
};

export default handler;
