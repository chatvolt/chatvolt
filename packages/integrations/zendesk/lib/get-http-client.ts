import { ServiceProviderZendesk } from '@chatvolt/lib/types/dtos';
import axios from 'axios';
import formatAuthHeader from './format-auth-header';

const getHttpClient = (config: ServiceProviderZendesk['config']) =>
  axios.create({
    baseURL: `https://${config?.domain}.zendesk.com`,
    headers: {
      Authorization: formatAuthHeader(config),
    },
  });

export default getHttpClient;
