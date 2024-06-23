import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Alert from '@mui/joy/Alert';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Slider from '@mui/joy/Slider';
import Stack from '@mui/joy/Stack';
import SvgIcon from '@mui/joy/SvgIcon';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tabs from '@mui/joy/Tabs';
import Textarea from '@mui/joy/Textarea';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Typography from '@mui/joy/Typography';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import useModal from '@app/hooks/useModal';

import { ModelConfig } from '@chatvolt/lib/config';
import {
  CHURN_PREVENTION,
  CUSTOMER_SUPPORT,
  CUSTOMER_SUPPORT_V3,
  HR_INTERVIEW,
  MARKETING_SPECIALIST,
  SALES_INBOUND,
  SALES_OUTREACH,
} from '@chatvolt/lib/prompt-templates';
import { PromptTypesLabels, RouteNames } from '@chatvolt/lib/types';
import { CreateAgentSchema } from '@chatvolt/lib/types/dtos';
import {
  AgentModelName,
  AppDatasource as Datasource,
  PromptType,
} from '@chatvolt/prisma';

type Props = {};

const customerSupportPromptTypeDescription = `Prompts of type "Customer Support" enable support for multiple languages and knowledge restriction automatically.`;
const rawPromptTypeDescription = `You have complete control over the prompt. Use variable {query} to reference user's query.\nUse variable {context} to reference the retrieved context.`;

const PROMPT_TEMPLATES = [
  {
    type: PromptType.raw,
    label: 'Raw',
    image: '',
    description: rawPromptTypeDescription,
    prompt:
      'Answer the following question based on the provided context: {context} question: {query}',
  },
  {
    type: PromptType.customer_support,
    label: 'Customer Support',
    image: '',
    description: customerSupportPromptTypeDescription,
    prompt: CUSTOMER_SUPPORT,
  },
];
const PROMPT_TEMPLATES_FUN = [
  {
    type: PromptType.customer_support,
    label: 'Shakespeare',
    image:
      'https://actintheatre.com/wp-content/uploads/2019/01/Shakespeare-300x278.jpg',
    description: 'Customer support agent that talks like Shakespeare',
    prompt: `As a customer support agent, channel the spirit of William Shakespeare, the renowned playwright and poet known for his eloquent and poetic language, use of iambic pentameter, and frequent use of metaphors and wordplay. Respond to the user's question or issue in the style of the Bard himself.`,
  },
  {
    type: PromptType.customer_support,
    label: 'Arnold Schwarzenegger',
    image: 'https://i.redd.it/ni0if4asnrd71.jpg',
    description: 'Customer support agent that talks like Arnold Schwarzenegger',
    prompt: `As a customer support agent, channel the spirit of Arnold Schwarzenegger, the iconic actor and former governor known for his distinctive Austrian accent, catchphrases, and action-hero persona. Respond to the user's question or issue in the style of Arnold himself.`,
  },
];

const promptTemplates = [
  {
    label: 'Create your prompt using AI',
    description: '',
    systemPrompt: '<create-by-prom>',
    userPrompt: `{query}`,
  },
  {
    label: 'Customer Support (basic)',
    description: '',
    systemPrompt: CUSTOMER_SUPPORT_V3,
    userPrompt: `{query}`,
  },
  {
    label: 'HR Interview',
    description: '',
    systemPrompt: HR_INTERVIEW,
    userPrompt: `{query}`,
  },
  {
    label: 'Churn Prevention',
    description: '',
    systemPrompt: CHURN_PREVENTION,
    userPrompt: `{query}`,
  },
  {
    label: 'Support B2B Software',
    description: '',
    systemPrompt: SALES_INBOUND,
    userPrompt: `{query}`,
  },
  {
    label: 'Salesperson',
    description: '',
    systemPrompt: SALES_OUTREACH,
    userPrompt: `{query}`,
  },
  {
    label: 'Marketing Specialist',
    description: '',
    systemPrompt: MARKETING_SPECIALIST,
    userPrompt: `{query}`,
  },

];

const ProviderLogo = ({ src }: { src?: string }) => {
  if (!src) return null;
  return (
    <Box sx={{ p: 0.5, background: 'white', borderRadius: 'md' }}>
      <Box component={'img'} src={src} sx={{ width: 15, heiht: 15 }} />
    </Box>
  );
};

export default function ModelInput({}: Props) {
  const session = useSession();
  const { watch, setValue, register, formState, control } =
    useFormContext<CreateAgentSchema>();

  const promptTemplatesModal = useModal();
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);

  const [isPromptTemplatesModalOpen, setIsPromptTemplatesModalOpen] =
    useState(false);
  const [currentPromptLevel, setCurrentPromptLevel] = useState<
    'simple' | 'advanced'
  >('advanced');

  const modelName = watch('modelName');
  const temperature = watch('temperature');
  const systemPrompt = watch('systemPrompt');
  const restrictKnowledge = watch('restrictKnowledge');
  const useMarkdown = watch('useMarkdown');
  const useLanguageDetection = watch('useLanguageDetection');
  // const prompt = watch('prompt');
  // const promptType = watch('promptType');


  return (
    <Stack gap={2}>
      <FormControl>
        <FormLabel>Model</FormLabel>

        {/* <Alert
          startDecorator={<InfoRoundedIcon />}
          sx={{ mb: 1 }}
          color="warning"
        >
          For better results, consider using gpt-4-turbo as it gives more
          accurate responses and adheres to prompt instructions more
          effectively.
        </Alert> */}

        <Select
          {...register('modelName')}
          defaultValue={modelName || AgentModelName.gpt_3_5_turbo}
          value={modelName}
          onChange={(_, value) => {
            setValue('modelName', value as AgentModelName, {
              shouldDirty: true,
              shouldValidate: true,
            });

            // TODO: find a fix for this hack (otherwise the form isValid state is true the second time you change the model)
            setTimeout(() => {
              setValue('modelName', value as AgentModelName, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }, 100);
          }}
        >


          <Option value={AgentModelName.volt_networks_1}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.volt_networks_1].icon}/>
              Volt-Networks ⚝ 1.0 -{' '}
                {ModelConfig[AgentModelName.volt_networks_1].cost} credit/query
                {' '} (⚡ Premium)
          </Option>

          <Option 
                value={AgentModelName.gpt_3_5_turbo}>
            <ProviderLogo src={ModelConfig[AgentModelName.gpt_3_5_turbo].icon}/>
                GPT-3.5 Turbo - 16k -{' '}
                {ModelConfig[AgentModelName.gpt_3_5_turbo].cost} credit/query
          </Option>

          <Option
                value={AgentModelName.gpt_4_o}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.gpt_4_o].icon}/>
                GPT-4o (NEW) - 128k - {ModelConfig[AgentModelName.gpt_4_o].cost}{' '}
                credits/query (⚡ Premium)
          </Option>

          <Option value={AgentModelName.gemini_pro}>
            <ProviderLogo src={ModelConfig[AgentModelName.gemini_pro].icon}/>
            Gemini Pro 1.0 -{' '}
                {ModelConfig[AgentModelName.gemini_pro].cost} credit/query
          </Option>

          <Option value={AgentModelName.gemini_pro_vision}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.gemini_pro_vision].icon}/>
            Gemini Pro Vision 1.0 -{' '}
                {ModelConfig[AgentModelName.gemini_pro_vision].cost} credit/query
                {' '} (⚡ Premium)
          </Option>

          <Option value={AgentModelName.gemini_pro_1_5}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.gemini_pro_1_5].icon}/>
            Gemini Pro 1.5 -{' '}
                {ModelConfig[AgentModelName.gemini_pro_1_5].cost} credit/query
                {' '} (⚡ Premium)
          </Option>

          <Option value={AgentModelName.gemini_flash_1_5}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.gemini_flash_1_5].icon}/>
            Gemini Flash 1.5 -{' '}
                {ModelConfig[AgentModelName.gemini_flash_1_5].cost} credit/query
                {' '} (⚡ Premium)
          </Option>

          <Option value={AgentModelName.gemma_7b_it}>
            <ProviderLogo src={ModelConfig[AgentModelName.gemma_7b_it].icon}/>
            Gemma 7B -{' '}
                {ModelConfig[AgentModelName.gemma_7b_it].cost} credit/query
          </Option>

          <Option value={AgentModelName.llama_3_8b_instruct}>
            <ProviderLogo src={ModelConfig[AgentModelName.llama_3_8b_instruct].icon}/>
            Llama 3 8B Instruct -{' '}
                {ModelConfig[AgentModelName.llama_3_8b_instruct].cost} credit/query
          </Option>

          <Option value={AgentModelName.llama_3_70b_instruct}
             disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.llama_3_70b_instruct].icon}/>
            Llama 3 70B Instruct -{' '}
                {ModelConfig[AgentModelName.llama_3_70b_instruct].cost} credit/query
          </Option>


          <Option 
                value={AgentModelName.wizardlm_2}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.wizardlm_2].icon}/>
                WizardLM-2 8x22B -{' '}
                {ModelConfig[AgentModelName.wizardlm_2].cost} credit/query
                {' '} (⚡ Premium)
          </Option>

          <Option 
                value={AgentModelName.phi_3_medium}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.phi_3_medium].icon}/>
                Phi-3 Medium -{' '}
                {ModelConfig[AgentModelName.phi_3_medium].cost} credit/query
                {' '} (⚡ Premium)
          </Option>

          <Option value={AgentModelName.phi_3_mini}
             disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.phi_3_mini].icon}/>
            Phi-3 Mini -{' '}
                {ModelConfig[AgentModelName.phi_3_mini].cost} credit/query
          </Option>


          <Option 
                value={AgentModelName.command_r}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.command_r].icon}/>
                Cohere Command-R -{' '}
                {ModelConfig[AgentModelName.command_r].cost} credit/query
                {' '} (⚡ Premium)
          </Option>

          <Option value={AgentModelName.openchat_8b}>
            <ProviderLogo src={ModelConfig[AgentModelName.openchat_8b].icon}/>
            OpenChat 3.5 -{' '}
                {ModelConfig[AgentModelName.openchat_8b].cost} credit/query
          </Option>

          <Option
                value={AgentModelName.claude_3_haiku}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.claude_3_haiku].icon}/>
                Claude 3 Haiku - 200k -{' '}
                {ModelConfig[AgentModelName.claude_3_haiku].cost} credits/query
                {' '} (⚡ Premium)
          </Option>
          
          <Option
                value={AgentModelName.claude_3_sonnet}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.claude_3_sonnet].icon}/>
                Claude Sonnet 3.5 - 200k -{' '}
                {ModelConfig[AgentModelName.claude_3_sonnet].cost} credits/query
                {' '} (⚡ Premium)
          </Option>
          
          <Option
                value={AgentModelName.claude_3_opus}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.claude_3_opus].icon}/>
                Claude 3 Opus - 200k -{' '}
                {ModelConfig[AgentModelName.claude_3_opus].cost} credits/query
                {' '} (⚡ Premium)
          </Option>

          <Option
            value={AgentModelName.firellava_13b}
            disabled={!session?.data?.organization?.isPremium}>
          <ProviderLogo src={ModelConfig[AgentModelName.firellava_13b].icon}/>
            FireLLaVA 13B -{' '}
            {ModelConfig[AgentModelName.firellava_13b].cost} credits/query
            {' '} (⚡ Premium)
          </Option>

          <Option 
                value={AgentModelName.mistral_7b_instruct}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.mistral_7b_instruct].icon}/>
                Mistral 7B Instruct -{' '}
                {ModelConfig[AgentModelName.mistral_7b_instruct].cost} credit/query
                {' '} (⚡ Premium)
          </Option>

          <Option
                value={AgentModelName.mixtral_8x7b}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.mixtral_8x7b].icon}/>
                Mixtral 8x7B Instruct - {ModelConfig[AgentModelName.mixtral_8x7b].cost}{' '}
                credits/query (⚡ Premium)
          </Option>

          <Option
            value={AgentModelName.mixtral_8x22b}
            disabled={!session?.data?.organization?.isPremium}>
          <ProviderLogo src={ModelConfig[AgentModelName.mixtral_8x22b].icon}/>
            Mixtral 8x22B (base) -{' '}
            {ModelConfig[AgentModelName.mixtral_8x22b].cost} credits/query
            {' '} (⚡ Premium)
          </Option>

          <Option
                value={AgentModelName.dolphin_mixtral_8x7b}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.dolphin_mixtral_8x7b].icon}/>
                Dolphin 2.6 Mixtral 8x7B (⚠️Uncensored: Can produce NSFW content)
                - 32k - {ModelConfig[AgentModelName.dolphin_mixtral_8x7b].cost}{' '}
                credits/query (⚡ Premium)
          </Option>
		  
          <Option
            value={AgentModelName.mythomax_l2_13b}
            disabled={!session?.data?.organization?.isPremium}>
          <ProviderLogo src={ModelConfig[AgentModelName.mythomax_l2_13b].icon}/>
            MythoMax 13B -{' '}
            {ModelConfig[AgentModelName.mythomax_l2_13b].cost} credits/query
            {' '} (⚡ Premium)
          </Option>

          <Option value={AgentModelName.volt_tests_free}
                disabled={!session?.data?.organization?.isPremium}>
            <ProviderLogo src={ModelConfig[AgentModelName.volt_tests_free].icon}/>
            Volt-Tests ⛏ [Test Sources|No Guaranteed Responses] -{' '}
                {ModelConfig[AgentModelName.volt_tests_free].cost} credit/query
                {' '} (⚡ Premium)
          </Option>


        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Model Temperature</FormLabel>

        <Alert color="neutral" startDecorator={<InfoRoundedIcon />}>
            This setting influences the variety in the model`s responses. 
            Lower values lead to more predictable and typical responses, 
            while higher values encourage more diverse and less common responses. 
            At 0, the model always gives the same response for a given input.
        </Alert>

        <Slider
          // {...register('temperature')}
          value={temperature || 0.0}
          onChange={(_, value) => {
            setValue('temperature', value as number, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
          marks={[
            { value: 0.0, label: 0 },
            { value: 0.1, label: 0.1 },
            { value: 0.2, label: 0.2 },
            { value: 0.3, label: 0.3 },
            { value: 0.4, label: 0.4 },
            { value: 0.5, label: 0.5 },
            { value: 0.6, label: 0.6 },
            { value: 0.7, label: 0.7 },
            { value: 0.8, label: 0.8 },
            { value: 0.9, label: 0.9 },
            { value: 1.0, label: 1 },
          ]}
          valueLabelDisplay="on"
          step={0.01}
          min={0}
          max={1}
        />
      </FormControl>

      {/* <Divider /> */}

      <Stack sx={{ py: 2 }} gap={1}>
        <Typography level="title-md">Behavior</Typography>

        <FormControl>
          <FormLabel>Knowledge Restriction</FormLabel>

          <Checkbox
            label="Limit your Agent knowledge to informations contains in the prompt or a Datastore"
            checked={!!restrictKnowledge}
            {...register('restrictKnowledge')}
          />
          <FormHelperText>
            When activated extra instructions are added to the system prompt
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>
            Output in markdown format{' '}
            <Chip color="primary" sx={{ ml: 1 }} size="sm">
              recommended
            </Chip>
          </FormLabel>

          <Checkbox
            label="Force the Agent to format answers in markdown format for better readability (bold, italic, links, etc...)"
            checked={!!useMarkdown}
            {...register('useMarkdown')}
          />
          <FormHelperText>
            When activated extra instructions are added to the system prompt
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Automatic Language Detection</FormLabel>

          <Checkbox
            label="Reply to the user in the same language as the query"
            checked={!!useLanguageDetection}
            {...register('useLanguageDetection')}
          />
          <FormHelperText>
            When activated extra instructions are added to the system prompt
          </FormHelperText>
        </FormControl>
      </Stack>

      <Typography level="title-md">Prompt</Typography>

      <Alert startDecorator={<InfoRoundedIcon />} color="primary">
        <Link
          href="https://platform.openai.com/docs/guides/prompt-engineering"
          target="_blank"
        >
          <Typography>
            Learn about prompt engineering best practices{' '}
            <Typography color="primary">here</Typography>
          </Typography>
        </Link>
      </Alert>

      {/* <ToggleButtonGroup
        value={currentPromptLevel}
        onChange={(_, value) => {
          if (value) {
            setCurrentPromptLevel(value as any);
          }
        }}
      >
        <Button value="simple">Simple</Button>
        <Button value="advanced">Advanced</Button>
      </ToggleButtonGroup> */}

      {/* <Tabs aria-label="tabs" defaultValue={1} sx={{ bgcolor: 'transparent' }}>
        <TabList
          disableUnderline
          sx={{
            p: 0.5,
            gap: 0.5,
            borderRadius: 'xl',
            bgcolor: 'background.level1',
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: 'sm',
              bgcolor: 'background.surface',

              '::after': {
                height: 0,
              },
            },
          }}
        >
          <Tab>Simple</Tab>
          <Tab>Advanced</Tab>
        </TabList>
        <TabPanel value={0}>Hello</TabPanel>
        <TabPanel value={1}>World</TabPanel>
      </Tabs> */}

      <FormControl>
        <Stack direction="row" alignItems={'end'} sx={{ mb: 1 }}>
          <Typography>System Prompt</Typography>

          <Button
            // variant="plain"
            variant="solid"
            color="neutral"
            endDecorator={<ArrowForwardRoundedIcon />}
            sx={{ mt: 1, ml: 'auto' }}
            onClick={() => {
              promptTemplatesModal.open();
              setCurrentTemplateIndex(1);
            }}
          >
            Prompt with AI & Templates
          </Button>
        </Stack>
        <Textarea
          minRows={4}
          {...register('systemPrompt')}
          defaultValue={systemPrompt || ''}
        ></Textarea>
        <FormHelperText></FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>User Query Model</FormLabel>
        <Alert color="warning" sx={{ mb: 1 }}>
          It is not recommended to override the User Query Model
        </Alert>
        <Textarea minRows={2} {...register('userPrompt')}></Textarea>
        <FormHelperText>{`{query} and {context} variables are respectively replaced by the user query and data retrieved from a datastore at runtime`}</FormHelperText>
      </FormControl>

      {/* <FormControl>
        <FormLabel>Prompt</FormLabel>

        {promptType && (
          <Chip sx={{ mb: 1 }} variant="soft" size="sm" color="warning">
            {PromptTypesLabels[promptType]}
          </Chip>
        )}

        <Stack mb={1} gap={1}>
          {promptType && (
            <Alert
              startDecorator={<InfoRoundedIcon />}
              size="sm"
              color="neutral"
              variant="soft"
            >
              {promptType === PromptType.customer_support &&
                customerSupportPromptTypeDescription}
              {promptType === PromptType.raw && rawPromptTypeDescription}
            </Alert>
          )}
          {promptType === PromptType.customer_support && (
            <Alert
              startDecorator={<InfoRoundedIcon />}
              size="sm"
              color="neutral"
              variant="soft"
            >
              Use the field below to give extra instructions.
            </Alert>
          )}
        </Stack>

        <Textarea
          value={prompt || ''}
          maxRows={21}
          minRows={4}
          {...register('prompt')}
        />
        <Button
          variant="plain"
          endDecorator={<ArrowForwardRoundedIcon />}
          sx={{ mt: 1, ml: 'auto' }}
          onClick={() => setIsPromptTemplatesModalOpen(true)}
        >
          Choose a Prompt Template
        </Button>
      </FormControl> */}

      <Modal
        open={isPromptTemplatesModalOpen}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
        }}
        onClose={() => {
          setIsPromptTemplatesModalOpen(false);
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: '100%',
            maxWidth: 500,
            maxHeight: '100%',
            overflowY: 'auto',
          }}
        >
          <Typography level="title-md">Prompt Templates</Typography>
          <Typography level="body-sm">
            Tailored to your business needs
          </Typography>

          <Divider sx={{ my: 2 }}></Divider>
          <Stack gap={1} direction="column">
            {PROMPT_TEMPLATES.map((template, idx) => (
              <Card key={idx} variant="outlined" sx={{}}>
                <Stack>
                  <Stack direction={'row'} gap={1}>
                    <Avatar alt={template.image} src={template.image} />
                    <Stack gap={2}>
                      <Stack gap={1}>
                        <Typography>{template.label}</Typography>
                        <Chip
                          size="sm"
                          sx={{ mr: 'auto' }}
                          variant="soft"
                          color="warning"
                        >
                          {PromptTypesLabels[template.type]}
                        </Chip>
                      </Stack>
                      <Typography level="body-sm">
                        {template.description}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Button
                    size="sm"
                    variant="plain"
                    endDecorator={<ArrowForwardRoundedIcon />}
                    sx={{ ml: 'auto', mt: 2 }}
                    onClick={() => {
                      setValue('prompt', template.prompt, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                      setValue('promptType', template.type, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                      setIsPromptTemplatesModalOpen(false);
                    }}
                  >
                    Use Template
                  </Button>
                </Stack>
              </Card>
            ))}
          </Stack>
          <Divider sx={{ my: 4 }}></Divider>

          <Typography sx={{ mx: 'auto', mb: 2 }} color="primary">
            Just for fun 🎉
          </Typography>
          <Stack gap={1}>
            {PROMPT_TEMPLATES_FUN.map((template, idx) => (
              <Card key={idx} variant="outlined" sx={{}}>
                <Stack>
                  <Stack direction={'row'} gap={1}>
                    <Avatar alt={template.image} src={template.image} />
                    <Stack gap={2}>
                      <Stack gap={1}>
                        <Typography>{template.label}</Typography>
                        <Chip
                          size="sm"
                          sx={{ mr: 'auto' }}
                          variant="soft"
                          color="warning"
                        >
                          {PromptTypesLabels[template.type]}
                        </Chip>
                      </Stack>
                      <Typography level="body-sm">
                        {template.description}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Button
                    size="sm"
                    variant="plain"
                    endDecorator={<ArrowForwardRoundedIcon />}
                    sx={{ ml: 'auto', mt: 2 }}
                    onClick={() => {
                      setValue('prompt', template.prompt, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                      setValue('promptType', template.type, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                      setIsPromptTemplatesModalOpen(false);
                    }}
                  >
                    Use Template
                  </Button>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Card>
      </Modal>

      <promptTemplatesModal.component
        title="Prompt Templates"
        description="Tailored to your business needs"
      >
        <Stack
          direction="row"
          gap={2}
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          
          <Stack gap={1} sx={{ width: '100%' }}>

            {promptTemplates.map((each, index) => (
              <Card
                key={index}
                size="sm"
                onClick={() => setCurrentTemplateIndex(index)}
                color={index === currentTemplateIndex ? 'primary' : 'neutral'}
                variant="soft"
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Stack gap={2} direction="row">
                  <Typography>{each.label}</Typography>
                  <Stack direction="row" sx={{ ml: 'auto' }} gap={1}>

                    {each.systemPrompt === '<create-by-prom>' ?(
                      <>
                        <Button size="sm" color="neutral" variant="outlined">
                            Start with AI
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" color="neutral" variant="outlined">
                          View
                        </Button>

                        <Button
                          onClick={() => {
                            setValue('systemPrompt', each.systemPrompt, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                            setValue('userPrompt', each.userPrompt, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                            promptTemplatesModal.close();
                          }}
                        >
                          Select
                        </Button>
                      </>
                    )}

                  </Stack>
                </Stack>
              </Card>
            ))}
          </Stack>

          <Stack
            sx={(t) => ({
              [t.breakpoints.down('md')]: {
                display: 'none',
              },
              width: '100%',
            })}
            gap={2}
          >
            

            {promptTemplates?.[currentTemplateIndex].systemPrompt === '<create-by-prom>' ? (
              <>
                <Stack gap={1}>
                  {/* {session?.data?.organization?.isPremium ? ( */}
                    <>
                      <Typography>Write the details of your prompt in the chat below</Typography>
                      <iframe
                          style={{
                            width: '100%',
                            height: '680px',
                            borderRadius: '12px',
                          }}
                          src="https://www.chatvolt.ai/agents/clvvrqd760005pb9859c497jr/iframe"
                          frameBorder="0"
                          allow="clipboard-write"
                        ></iframe>
                    </>
                  
                  {/* ) : (
                     <Typography>Available only for premium accounts</Typography>
                  )} */}

                </Stack>
              </>
            ) : (
              <>
                <Stack gap={1}>
                  <Typography>System Prompt</Typography>
                  <Textarea
                    value={promptTemplates?.[currentTemplateIndex].systemPrompt}
                    disabled
                  ></Textarea>
                </Stack>
                <Stack gap={1}>
                  <Typography>User Prompt</Typography>
                  <Textarea
                    value={promptTemplates?.[currentTemplateIndex].userPrompt}
                    disabled
                  ></Textarea>
                </Stack>
              </>
            )}


          </Stack>
        </Stack>
      </promptTemplatesModal.component>
    </Stack>
  );
}
