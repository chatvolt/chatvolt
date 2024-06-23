import TraditionalForm from '@chatvolt/ui/embeds/forms/traditional';

import createElement from '@chatvolt/ui/embeds/common/create-element';

export const name = 'chatvolt-form-standard';

const element = createElement({
  type: 'form',
  widget: (props: any) => {
    return <TraditionalForm {...props} />;
  },
  name,
});

export default element;
