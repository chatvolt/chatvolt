import ChatBoxLoader from '@chatvolt/ui/ChatBoxLoader';
import ChatboxNavBarLayout from '@chatvolt/ui/ChatboxNavBarLayout';
import { cn } from '@chatvolt/ui/utils/cn';

import createElement from '@chatvolt/ui/embeds/common/create-element';

export const name = 'chatvolt-chatbox-standard';

const element = createElement({
  type: 'chatbox',
  widget: (props: any) => (
    <ChatBoxLoader
      layout={ChatboxNavBarLayout}
      {...props}
      className={cn('chatvolt-widget', props.className)}
    />
  ),
  name,
});

export default element;
