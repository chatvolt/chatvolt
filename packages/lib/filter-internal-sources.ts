import { Source } from './types/document';

const filterInternalSources = (sources: Source[]) => {
  return (sources || [])?.filter(
    (each) =>
      !each?.source_url?.includes('s3.chatvolt.ai') &&
      !each?.source_url?.includes('chatvolt.s3.amazonaws.com') &&
      !each?.source_url?.includes('minio:9000')
  );
};

export default filterInternalSources;
