import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import {
  DatasourceSchema,
  DatasourceYoutube,
} from '@chatvolt/lib/types/models';
import YoutubeApi from '@chatvolt/lib/youtube-api';
import { DatasourceType } from '@chatvolt/prisma';
import Input from '@chatvolt/ui/Input';

import Base from './Base';
import type { DatasourceFormProps } from './types';

type Props = DatasourceFormProps<DatasourceYoutube> & {};

function getDatasourceType(url: string) {
  if (url.includes('@') || url.includes('list')) {
    return DatasourceType.youtube_bulk;
  } else if (url.includes('watch')) {
    return DatasourceType.youtube_video;
  } else {
    return null;
  }
}

function Nested() {
  const { control, register, setValue, watch } =
    useFormContext<DatasourceYoutube>();

  const url = watch('config.source_url');

  useEffect(() => {
    const type = getDatasourceType(url || '');
    if (type) {
      console.log(type);
      setValue('type', type, { shouldValidate: true, shouldDirty: true });
    }
  }, [url]);

  return (
    <Input
      label="Youtube URL (video, playlist or channel)"
      helperText="e.g.: https://youtu.be/eH3tiTQM4w0"
      control={control as any}
      {...register('config.source_url')}
    />
  );
}

export default function YoutubeForm(props: Props) {
  const { defaultValues, ...rest } = props;

  return (
    <Base
      schema={DatasourceSchema}
      {...rest}
      hideName
      defaultValues={{
        ...props.defaultValues!,
      }}
    >
      <Nested />
    </Base>
  );
}
