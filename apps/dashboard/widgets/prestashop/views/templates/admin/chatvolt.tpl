{*
 * chatvolt.tpl
 *
 * This template file is used for displaying Chatvolt-related content in PrestaShop's admin area.
 *
 * @author chatvolt
 * @copyright chatvolt
 * @license MIT License 
 *}

{if $agentId}
<div class="bootstrap container"> 
    <div class="alert alert-success text-center mt-2">
        <h2>{l s='Connected with Chatvolt.' d='chatvolt'}</h2>
        <p>{l s='You can now use Chatvolt from your homepage.' d='chatvolt'}</p>
        <a href="{$add_to_chatvolt_link}" class="btn btn-primary pointer ">{l s='Reconfigure' d='chatvolt'}</a>
    </div>
{else}
<div class="alert alert-info">
    <h2>{l s='Connect with Chatvolt' d='chatvolt'}</h2>
    <p>{l s='This link will redirect you to Chatvolt and configure your PrestaShop.' d='chatvolt'}</p>
    <a href="{$add_to_chatvolt_link}" class="btn btn-primary">{l s='Connect with Chatvolt' d='chatvolt'}</a>
</div>
</div>
{/if}
