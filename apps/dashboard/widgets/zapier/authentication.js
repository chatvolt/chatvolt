const baseApiUrl = process.env.API_URL
  ? process.env.API_URL
  : 'https://app.chatvolt.ai';

module.exports = {
  type: 'custom',
  test: {
    headers: { Authorization: 'Bearer {{bundle.authData.api_key}}' },
    removeMissingValuesFrom: { params: true },
    url: `${baseApiUrl}/api/me`,
  },
  connectionLabel: (z, bundle) => {
    const { name } = bundle.inputData;
    return `Oganization: ${name}`;
  },
  fields: [
    {
      computed: false,
      key: 'api_key',
      required: false,
      label: 'Chatvolt API Key',
      type: 'password',
      helpText:
        'Your Chatvolt API Key can be found here https://app.chatvolt.ai/settings/api-keys',
    },
  ],
  customConfig: {},
};
