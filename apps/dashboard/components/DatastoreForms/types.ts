// import type { LoadingButtonProps } from '@mui/lab/LoadingButton';
import type { CreateDatastoreRequestSchema } from '@chatvolt/lib/types/dtos';
import type { Datastore } from '@chatvolt/prisma';

export type DatastoreFormProps = {
  defaultValues?: CreateDatastoreRequestSchema;
  customSubmitButton?: any;
  submitButtonText?: string;
  submitButtonProps?: any;
  onSubmitSuccess?: (datastore: Partial<Datastore>) => any;
};
