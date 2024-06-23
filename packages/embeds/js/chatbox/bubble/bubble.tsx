import ChatBoxLoader from '@chatvolt/ui/ChatBoxLoader';
import ChatBubble from '@chatvolt/ui/embeds/chat-bubble';
import { cn } from '@chatvolt/ui/utils/cn';

import createElement from '@chatvolt/ui/embeds/common/create-element';

const name = 'chatvolt-chatbox-bubble';

const element = createElement({
  type: 'chatbox',
  widget: (props: any) => (
    <ChatBoxLoader
      {...props}
      className={cn('chatvolt-widget', props.className)}
      // eslint-disable-next-line
      children={ChatBubble}
    />
  ),
  name,
});

customElements.define(name, element);

export default element;
