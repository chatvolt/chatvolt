import { NextApiRequest, NextApiResponse } from 'next';

import products from '@chatvolt/lib/data/products';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  // const baseUrl = 'https://www.chatvolt.ai';

  // const paths = [
  //   '/',
  //   '/pricing',
  //   '/tools/youtube-summarizer',
  //   ...products.map((product) => `/products/${product.slug}`),
  // ].map((each) => `${baseUrl}${each}`);

  // // generate sitemap here
  // const xml = `<?xml version="1.0" encoding="UTF-8"?>
  //     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 

  //     ${paths
  //       .map(
  //         (url) => `<url>
  //     <loc>${url}</loc>
  //   </url>`
  //       )
  //       .join('\n')}
  //     </urlset>`;


      const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
        <url>
          <loc>http://www.chatvolt.ai/</loc>
        </url>
        <url>
          <loc>http://www.chatvolt.ai/pricing</loc>
        </url>
        
        <url>
          <loc>http://www.chatvolt.ai/br</loc>
        </url>
        <url>
          <loc>http://www.chatvolt.ai/br/pricing</loc>
        </url>
        
        <url>
          <loc>https://app.chatvolt.ai/auth/signin</loc>
        </url>
        
        <url>
          <loc>http://www.chatvolt.ai/tools/youtube-summarizer</loc>
        </url>
        
        <url>
          <loc>http://docs.chatvolt.ai/</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/agent/get-started</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/datastore/get-started</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/form/get-started</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/integrations/google-drive</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/widgets/chatbot/bubble</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/authentication</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/privacy/lgpd</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/introduction</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/platform</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/agent</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/datastore</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/form</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/agent/human-handoff</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/agent/fine-tuning</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/agent/conversation-file-upload</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/agent/answer-sources</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/agent/message-suggestions</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/agent/optimize-ai-answers</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/agent/rate-limit</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/agent/debug</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/widgets/chatbot/standard</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/agent/tools/quick-start</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/widgets/form/fields</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/widgets/form/hosted-form</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/widgets/form/standard</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/integrations/langchain</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/integrations/whatsapp</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/widgets/chatbot/reference</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint/agents/query</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint/agents/create</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint/agents/get</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint/agents/update</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint/agents/delete</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint/datasources/create</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint/datasources/get</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint/datasources/delete</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint/datastores/query</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint/datastores/create</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint/datastores/get</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint/datastores/update</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/api-reference/endpoint/datastores/delete</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/privacy/br-lgpd</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/privacy/cookie-policy</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/privacy/br-cookie-policy</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/privacy/privacy-policy</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/privacy/br-privacy-policy</loc>
        </url>
        <url>
          <loc>http://docs.chatvolt.ai/privacy/terms</loc>
        </url>
      </urlset>`;



  res.end(xml);
}
