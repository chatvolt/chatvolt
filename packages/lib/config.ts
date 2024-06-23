import { AgentModelName, ConversationChannel } from '@chatvolt/prisma';

const config = {
  defaultDatasourceChunkSize: 1024,
  datasourceTable: {
    limit: 20,
  },
  demoBookingURL: 'https://book.chatvolt.ai/alexander',
};

export const XPBNPLabels = {
  qa: 'Question/Réponse sur documents',
  writing: 'Rédaction',
  summary: "Résumé d'un document",
};

export const ModelConfig: Record<
  AgentModelName,
  {
    name: string;
    name_fallback: string;
    maxTokens: number;
    cost: number;
    providerPriceByInputToken: number;
    providerPricePriceByOutputToken: number;
    baseUrl?: string;
    isVisionSupported?: boolean;
    isToolCallingSupported?: boolean;
    hasVision?: boolean;
    icon?: string;
  }
> = {
  
  [AgentModelName.gpt_3_5_turbo]: {
    name: 'gpt-3.5-turbo-0125',
    name_fallback: '',
    maxTokens: 16385,
    cost: 2,
    providerPriceByInputToken: 0.0000005,
    providerPricePriceByOutputToken: 0.0000015,
    isToolCallingSupported: true,
    icon: '/shared/images/logos/openai.svg',
  },

  [AgentModelName.gpt_4_o]: {
    name: 'gpt-4o',
    name_fallback: '',
    maxTokens: 128000,
    cost: 25,
    providerPriceByInputToken: 0.000005,
    providerPricePriceByOutputToken: 0.000015,
    isToolCallingSupported: true,
    icon: '/shared/images/logos/openai.svg',
    hasVision: true,
  },

  [AgentModelName.claude_3_haiku]: {
    name: 'anthropic/claude-3-haiku',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 200000,
    cost: 2,
    providerPriceByInputToken: 0.00000025,
    providerPricePriceByOutputToken: 0.00000125,
    isToolCallingSupported: false,
    icon: '/shared/images/logos/anthropic.svg',
  },
  [AgentModelName.claude_3_sonnet]: {
    name: 'anthropic/claude-3.5-sonnet',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 200000,
    cost: 20,
    providerPriceByInputToken: 0.000003,
    providerPricePriceByOutputToken: 0.000015,
    isToolCallingSupported: false,
    icon: '/shared/images/logos/anthropic.svg',
    hasVision: true,
  },
  [AgentModelName.claude_3_opus]: {
    name: 'anthropic/claude-3-opus',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 200000,
    cost: 100,
    providerPriceByInputToken: 0.000015,
    providerPricePriceByOutputToken: 0.000075,
    isToolCallingSupported: false,
    icon: '/shared/images/logos/anthropic.svg',
    hasVision: true,
  },
  [AgentModelName.mixtral_8x7b]: {
    name: 'mistralai/mixtral-8x7b-instruct',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 32768,
    cost: 1,
    providerPriceByInputToken: 0.00000025,
    providerPricePriceByOutputToken: 0.00000041,
    isToolCallingSupported: false,
    icon: '/shared/images/logos/mistral.svg',
  },
  [AgentModelName.dolphin_mixtral_8x7b]: {
    name: 'cognitivecomputations/dolphin-mixtral-8x7b',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 32000,
    cost: 2,
    providerPriceByInputToken: 0.00000027,
    providerPricePriceByOutputToken: 0.00000027,
    isToolCallingSupported: false,
    icon: '/shared/images/logos/mistral.svg',
  },

  [AgentModelName.gemini_pro]: {
    name: 'google/gemini-pro',
    name_fallback: 'meta-llama/llama-3-8b-instruct',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 91728,
    cost: 1,
    providerPriceByInputToken: 0.000000125,
    providerPricePriceByOutputToken: 0.000000375,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/google.svg',
  },
  [AgentModelName.gemini_pro_vision]: {
    name: 'google/gemini-pro-vision',
    name_fallback: 'meta-llama/llama-3-8b-instruct',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 45000,
    cost: 2,
    providerPriceByInputToken: 0.000000125,
    providerPricePriceByOutputToken: 0.000000375,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/google.svg',
    hasVision: true,
  },

  [AgentModelName.gemini_pro_1_5]: {
    name: 'google/gemini-pro-1.5',
    name_fallback: 'openai/gpt-4o',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 1000000, //Talvez seja 2.800.000
    cost: 20,
    providerPriceByInputToken: 0.0000025,
    providerPricePriceByOutputToken: 0.0000075,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/google.svg',
    hasVision: true,
  },

  [AgentModelName.gemini_flash_1_5]: {
    name: 'google/gemini-flash-1.5',
    name_fallback: 'openai/gpt-3.5-turbo-0125',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 1000000, //Talvez seja 2.800.000
    cost: 4,
    providerPriceByInputToken: 0.00000025,
    providerPricePriceByOutputToken: 0.00000075,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/google.svg',
    hasVision: true,
  },

  [AgentModelName.gemma_7b_it]: {
    name: 'google/gemma-7b-it',
    name_fallback: 'meta-llama/llama-3-8b-instruct',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 8192,
    cost: 1,
    providerPriceByInputToken: 0.00000013,
    providerPricePriceByOutputToken: 0.00000013,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/google.svg',
  },
  [AgentModelName.mistral_7b_instruct]: {
    name: 'mistralai/mistral-7b-instruct',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 32768,
    cost: 1,
    providerPriceByInputToken: 0.00000013,
    providerPricePriceByOutputToken: 0.00000013,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/mistral.svg',
  },
  [AgentModelName.openchat_8b]: {
    name: 'openchat/openchat-8b',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 8192,
    cost: 1,
    providerPriceByInputToken: 0.00000008,
    providerPricePriceByOutputToken: 0.00000008,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/openchat.png',
  },
  [AgentModelName.llama_3_8b_instruct]: {
    name: 'meta-llama/llama-3-8b-instruct',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 8192,
    cost: 1,
    providerPriceByInputToken: 0.0000002,
    providerPricePriceByOutputToken: 0.0000002,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/meta.svg',
  },
  [AgentModelName.llama_3_70b_instruct]: {
    name: 'meta-llama/llama-3-70b-instruct',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 8192,
    cost: 3,
    providerPriceByInputToken: 0.00000081,
    providerPricePriceByOutputToken: 0.00000081,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/meta.svg',
  },
  [AgentModelName.volt_networks_1]: {
    name: 'microsoft/wizardlm-2-8x22b',
    name_fallback: 'meta-llama/llama-3-70b-instruct',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 65536,
    cost: 3,
    providerPriceByInputToken: 0.000001,
    providerPricePriceByOutputToken: 0.000001,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/chatvolt.png',
  },
  [AgentModelName.volt_tests_free]: {
    name: 'microsoft/phi-3-medium-128k-instruct:free',
    name_fallback: 'gryphe/mythomist-7b:free',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 32768,
    cost: 0,
    providerPriceByInputToken: 0,
    providerPricePriceByOutputToken: 0,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/chatvolt.png',
  },
  [AgentModelName.command_r]: {
    name: 'cohere/command-r',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 128000,
    cost: 3,
    providerPriceByInputToken: 0.0000005,
    providerPricePriceByOutputToken: 0.0000015,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/cohere.png',
  },
  [AgentModelName.mixtral_8x22b]: {
    name: 'mistralai/mixtral-8x22b',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 65536,
    cost: 4,
    providerPriceByInputToken: 0.000001,
    providerPricePriceByOutputToken: 0.000001,
    isToolCallingSupported: false,
    icon: '/shared/images/logos/mistral.svg',
  },
  [AgentModelName.mythomax_l2_13b]: {
    name: 'gryphe/mythomax-l2-13b',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 4096,
    cost: 1,
    providerPriceByInputToken: 0.0000002,
    providerPricePriceByOutputToken: 0.0000002,
    isToolCallingSupported: false,
    icon: '/shared/images/logos/gryphe.png',
  },
  [AgentModelName.firellava_13b]: {
    name: 'fireworks/firellava-13b',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 4096,
    cost: 1,
    providerPriceByInputToken: 0.0000002,
    providerPricePriceByOutputToken: 0.0000002,
    isToolCallingSupported: false,
    icon: '/shared/images/logos/fireworks.png',
    hasVision: true,
  },

  [AgentModelName.wizardlm_2]: {
    name: 'microsoft/wizardlm-2-8x22b',
    name_fallback: 'meta-llama/llama-3-70b-instruct',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 65536,
    cost: 3,
    providerPriceByInputToken: 0.000001,
    providerPricePriceByOutputToken: 0.000001,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/microsoft.png',
  },
  [AgentModelName.phi_3_medium]: {
    name: 'microsoft/phi-3-medium-128k-instruct',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 128000,
    cost: 3,
    providerPriceByInputToken: 0.000001,
    providerPricePriceByOutputToken: 0.000001,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/microsoft.png',
  },
  [AgentModelName.phi_3_mini]: {
    name: 'microsoft/phi-3-mini-128k-instruct',
    name_fallback: 'google/gemini-pro',
    baseUrl: 'https://openrouter.ai/api/v1',
    maxTokens: 128000,
    cost: 1,
    providerPriceByInputToken: 0.0000001,
    providerPricePriceByOutputToken: 0.0000001,
    isToolCallingSupported: false,
	  icon: '/shared/images/logos/microsoft.png',
  },

};

export const appUrl = 'https://app.chatvolt.ai';
export const apiUrl = 'https://api.chatvolt.ai';
// export const appUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL as string;
// export const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export const youtubeSummaryTool = {
  sitemapPageSize: 1000,
  paginationLimit: 100,
};

export const channelConfig = {
  [ConversationChannel.api]: {
    isMarkdownCompatible: true,
  },
  [ConversationChannel.crisp]: {
    isMarkdownCompatible: false,
  },
  [ConversationChannel.dashboard]: {
    isMarkdownCompatible: true,
  },
  [ConversationChannel.form]: {
    isMarkdownCompatible: true,
  },
  [ConversationChannel.mail]: {
    isMarkdownCompatible: false,
  },
  [ConversationChannel.slack]: {
    isMarkdownCompatible: false,
  },
  [ConversationChannel.website]: {
    isMarkdownCompatible: true,
  },
  [ConversationChannel.whatsapp]: {
    isMarkdownCompatible: false,
  },
  [ConversationChannel.zapier]: {
    isMarkdownCompatible: true,
  },
} as Record<
  ConversationChannel,
  {
    isMarkdownCompatible: boolean;
  }
>;

export default config;
