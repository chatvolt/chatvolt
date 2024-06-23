import { CustomContact } from '@chatvolt/lib/types';

export interface chatvoltFactory {
  initBubble: (props: {
    agentId: string;
    onMarkedAsResolved?(): any;
    contact?: CustomContact;
  }) => void;
}
