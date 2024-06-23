import pMap from 'p-map';

import AgentManager from '@chatvolt/lib/agent';
import prisma from '@chatvolt/prisma/client';

const customerSupportDataset = [
  {
    question: 'Qui est tu?',
  },
  {
    question: "What's nuclear fusion?",
  },
  {
    question: '¿eres mi amigo?',
  },
  {
    question: "C'est quoi chatvolt?",
  },
  {
    question: '什么是 chatvolt.ai？',
  },
  {
    question: 'Combien ca coute?',
  },
  {
    question: 'Comment créer un site internet?',
  },
  {
    question: "Est-il possible d'evaluer la réponse des agents?",
  },
];

(async () => {
  const agent = await prisma.agent.findUnique({
    where: {
      id: 'clw0wuhp6000hpbgjnpivm3ni',
    },
    include: {
      tools: {
        include: {
          datastore: true,
        },
      },
    },
  });

  const manager = new AgentManager({
    agent: agent as any,
  });

  await pMap(
    customerSupportDataset,
    async ({ question }) => {
      const { answer } = await manager.query({
        input: question,
      });

      console.log(`---\n${question}: ${answer}\n`);
    },
    {
      concurrency: 1,
    }
  );
})();
