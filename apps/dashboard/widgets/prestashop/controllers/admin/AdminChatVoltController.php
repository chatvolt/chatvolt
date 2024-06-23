<?php
/**
 * AdminChatVoltController.php
 *
 * This file contains the AdminChatVoltController class, which is responsible for handling
 * administrative functions related to the Chatvolt module in PrestaShop.
 *
 * @author chatvolt
 * @copyright chatvolt
 * @license MIT License
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

class AdminChatVoltController extends ModuleAdminController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function initContent()
    {
        $agentId = $this->getAgentIdFromUrl();

        $this->assignTemplateData($agentId);

        $this->content .= $this->context->smarty->fetch(
            $this->getTemplatePath() . 'chatvolt.tpl'
        );

        parent::initContent();
    }

    private function getAgentIdFromUrl()
    {
        if (Tools::getIsset('agentId')) {
            $sanitizedAgentId = pSQL(Tools::getValue('agentId'));
            Configuration::updateValue('chatvolt_AGENT_ID', $sanitizedAgentId);

            return $sanitizedAgentId;
        }

        return Configuration::get('chatvolt_AGENT_ID');
    }

    private function assignTemplateData($agentId)
    {
        $this->context->smarty->assign([
            'add_to_chatvolt_link' => $this->generateChatVoltLink(),
            'agentId' => $agentId,
        ]);
    }

    private function generateChatVoltLink()
    {
        $agentId = Configuration::get('chatvolt_AGENT_ID');
        $http_callback = Tools::getShopDomainSsl(true, true) . $_SERVER['REQUEST_URI'];
        $base_url = 'https://app.chatvolt.ai'; // Use single quotes for simple strings

        return $base_url . '/integrations/prestashop/config?callback=' . urlencode($http_callback) . '&siteurl=' . urlencode(Tools::getShopDomainSsl(true, true)) . '&agentId=' . $agentId;
    }
}
