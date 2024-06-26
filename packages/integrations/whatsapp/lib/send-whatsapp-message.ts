import axios from 'axios';

import { WhatsAppSendMessageSchema } from '@chatvolt/lib/types/dtos';
import { ServiceProviderWhatsapp } from '@chatvolt/lib/types/dtos';

type Props<T> = {
  to: string;
  message: WhatsAppSendMessageSchema;
  credentials: T;
};

type WhatsAppSendMessageResponse = {
  messaging_product: 'whatsapp';
  contacts: {
    input: string;
    wa_id: string;
  }[];
  messages: {
    id: string;
  }[];
};

export const sendWhatsAppMessage = async <T extends ServiceProviderWhatsapp>({
  to,
  message,
  credentials,
}: Props<T>) => {
  // Verificar se a mensagem tem o tipo 'text' e se o body existe
  if (message && message.type === 'text' && message.text && typeof message.text.body === 'string') {
    // Truncar o body se for maior que 4000 caracteres
    if (message.text.body.length > 4000) {
      message.text.body = message.text.body.substring(0, 4000);
    }
  }

  return axios.post<WhatsAppSendMessageResponse>(
    `https://graph.facebook.com/v17.0/${credentials.config.phoneNumberId}/messages`,
    {
      to,
      messaging_product: 'whatsapp',
      ...message,
    },
    {
      headers: {
        Authorization: `Bearer ${credentials.accessToken}`,
      },
    }
  );
};

export default sendWhatsAppMessage;
