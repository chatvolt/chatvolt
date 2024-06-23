-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AgentModelName" ADD VALUE 'claude_3_haiku';
ALTER TYPE "AgentModelName" ADD VALUE 'mixtral_8x7b';
ALTER TYPE "AgentModelName" ADD VALUE 'dolphin_mixtral_8x7b';

ALTER TYPE "AgentModelName" ADD VALUE 'gemini_pro';
ALTER TYPE "AgentModelName" ADD VALUE 'gemini_pro_vision';
ALTER TYPE "AgentModelName" ADD VALUE 'gemma_7b_it';
ALTER TYPE "AgentModelName" ADD VALUE 'mistral_7b_instruct';
ALTER TYPE "AgentModelName" ADD VALUE 'openchat_8b';
ALTER TYPE "AgentModelName" ADD VALUE 'command_r';
ALTER TYPE "AgentModelName" ADD VALUE 'llama_3_8b_instruct';
ALTER TYPE "AgentModelName" ADD VALUE 'llama_3_70b_instruct';
ALTER TYPE "AgentModelName" ADD VALUE 'volt_networks_1';
ALTER TYPE "AgentModelName" ADD VALUE 'volt_tests_free';
ALTER TYPE "AgentModelName" ADD VALUE 'mythomax_l2_13b';
ALTER TYPE "AgentModelName" ADD VALUE 'firellava_13b';
ALTER TYPE "AgentModelName" ADD VALUE 'gemini_pro_1_5';
ALTER TYPE "AgentModelName" ADD VALUE 'gemini_flash_1_5';
ALTER TYPE "AgentModelName" ADD VALUE 'phi_3_mini';
ALTER TYPE "AgentModelName" ADD VALUE 'phi_3_medium';
ALTER TYPE "AgentModelName" ADD VALUE 'wizardlm_2';

