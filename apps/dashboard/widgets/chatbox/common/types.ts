import { SxProps } from '@mui/joy/styles/types';

import { CustomContact } from '@app/hooks/useChat';

import { AgentInterfaceConfig } from '@chatvolt/lib/types/models';
import { Agent } from '@chatvolt/prisma';

export type InitWidgetProps = {
  id?: string;
  initConfig?: AgentInterfaceConfig;
  agentId?: string;
  contact?: Omit<CustomContact, 'metadata'>;
  styles?: SxProps;
  context?: string;
  className?: string;
  onMarkedAsResolved?(): any;
  onAgentLoaded?: (agent: Agent) => any;
};
