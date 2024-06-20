import ChatBoxFrame from '@app/components/ChatBoxFrame';
import ChatboxNavBarLayout from '@app/components/ChatboxNavBarLayout';

import { cn } from '@chatvolt/ui/utils/cn';

import createElement from '../common/create-element';

export const name = 'chatvolt-chatbox-standard';

const element = createElement({
  widget: (props: any) => (
    <ChatBoxFrame
      layout={ChatboxNavBarLayout}
      {...props}
      className={cn('chatvolt-widget', props.className)}
    />
  ),
  name,
});

export default element;
