import { CustomContact } from '@app/hooks/useChat';

export interface chatvoltFactory {
  initBubble: (props: {
    agentId: string;
    onMarkedAsResolved?(): any;
    contact?: CustomContact;
  }) => void;
}
