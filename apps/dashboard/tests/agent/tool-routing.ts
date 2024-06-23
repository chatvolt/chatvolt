import axios from 'axios';

(async () => {
  /*
    Agent config: 
    - datastore tool
    - lead capture tool (email, required to continue conversation)
    - http tool (cat)
    - mark as resolved tool
    - request human tool
  */

  const queries = [
    'Hi',
    `What's Chatvolt?`,
    `marcos@chatvolt.ai +5500987654321`,
    `Yes that's correct`,
    `What's Chatvolt?`,
    `Perfect that's all I need`,
  ];
  const url =
    'http://localhost:3000/api/agents/clw0wuhp6000hpbgjnpivm3ni/query';

  let conversationId = '';

  for (const q of queries) {
    const r = await axios.post(url, {
      query: q,
      conversationId,
    });
    conversationId = r.data.conversationId;

    console.log(`Q: ${q}\nA: ${r.data.answer}`);
  }
})();
