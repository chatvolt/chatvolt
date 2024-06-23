import React from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import {
  DatasourceSchema,
  DatasourceWebPage,
} from '@chatvolt/lib/types/models';
import { DatasourceType } from '@chatvolt/prisma';
import Input from '@chatvolt/ui/Input';

import Base from './Base';
import type { DatasourceFormProps } from './types';

type Props = DatasourceFormProps<DatasourceWebPage> & {};

function Nested() {
  const { control, register } = useFormContext<DatasourceWebPage>();

  return (
    <Input
      label="Web Page URL"
      helperText="e.g.: https://en.wikipedia.org/wiki/Nuclear_fusion"
      control={control as any}
      {...register('config.source_url')}
    />
  );
}

export default function WebPageForm(props: Props) {
  const { defaultValues, ...rest } = props;

  return (
    <Base
      schema={DatasourceSchema}
      {...rest}
      defaultValues={{
        ...props.defaultValues!,
        type: DatasourceType.web_page,
      }}
    >
      <Nested />
    </Base>
  );
}
