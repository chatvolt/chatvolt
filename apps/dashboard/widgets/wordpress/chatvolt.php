<?php
/**
 * @package Chatvolt
 * @version 1.0
 * Plugin Name: Chatvolt
 * Plugin URI: http://wordpress.org/plugins/chatvolt/
 * Description: Build ChatGPT Chat Bots trained on custom data
 * Author: Chatvolt
 * Version: 1.0
 * Author URI: https://chatvolt.ai
 *
 * Text Domain: Chatvolt
 * Domain Path: /languages/
*/

if (! defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

add_action('admin_menu', 'chatvolt_create_menu');

function chatvolt_create_menu()
{
    add_menu_page(__('Chatvolt Settings', 'chatvolt'), __('Chatvolt Settings', 'chatvolt'), 'administrator', __FILE__, 'chatvolt_plugin_settings_page', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjE3IiBoZWlnaHQ9IjE5NSIgdmlld0JveD0iMCAwIDIxNyAxOTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF83Nl8xMDkpIj4KPHBhdGggZD0iTTIxNyAxMzAuMDY3QzIxNyAxNjUuODA2IDE4Ny44NDIgMTk1IDE1MS44OTcgMTk1SDBWNjQuOTMzNEMwIDI5LjE5MzUgMjkuMTU4MiAwIDY1LjEwMyAwSDE1MS44OTdDMTUxLjk0NyAwIDE1MS45OTcgMCAxNTIuMDQ3IDBDMTg3Ljk0MiAwLjAxOTk4ODcgMjE3LjAyIDI5LjA5MzYgMjE2Ljk5IDY0LjkzMzRWMTMwLjA2N0gyMTdaTTY1LjEwMyA4Ni42NzExVjEwOC4zMzlIODYuODA0Vjg2LjY3MTFINjUuMTAzWk0xMzAuMjA2IDg2LjY3MTFWMTA4LjMzOUgxNTEuOTA3Vjg2LjY3MTFIMTMwLjIwNloiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl83Nl8xMDkpIi8+CjwvZz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl83Nl8xMDkiIHgxPSItMjIuMDQxMyIgeTE9Ijk3LjQ5NSIgeDI9IjIwMi41NjYiIHkyPSI5Ny40OTUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agb2Zmc2V0PSIwLjI0IiBzdG9wLWNvbG9yPSIjNjc2NUU5Ii8+CjxzdG9wIG9mZnNldD0iMC4zNSIgc3RvcC1jb2xvcj0iIzc5NjJEQyIvPgo8c3RvcCBvZmZzZXQ9IjAuNzIiIHN0b3AtY29sb3I9IiNCQTU4QjAiLz4KPHN0b3Agb2Zmc2V0PSIwLjkiIHN0b3AtY29sb3I9IiNENDU1OUYiLz4KPC9saW5lYXJHcmFkaWVudD4KPGNsaXBQYXRoIGlkPSJjbGlwMF83Nl8xMDkiPgo8cmVjdCB3aWR0aD0iMjE3IiBoZWlnaHQ9IjE5NSIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K');
    add_action('admin_init', 'chatvolt_register_plugin_settings');
    add_action('admin_init', 'chatvolt_register_plugin_onboarding');
}

function chatvolt_register_plugin_onboarding()
{
    $onboarding = get_option('chatvolt_onboarding');
    $agent_id = get_option('chatvolt_agent_id');

    if (empty($agent_id) && (empty($onboarding) || !$onboarding)) {
        update_option("chatvolt_onboarding", true);
        wp_redirect(admin_url('admin.php?page='.plugin_basename(__FILE__)));
    }
}

function chatvolt_register_plugin_settings()
{
    register_setting('chatvolt-plugin-settings-group', 'chatvolt_agent_id');
    register_setting('chatvolt-plugin-settings-group', 'chatvolt_verify');
    add_option('chatvolt_onboarding', false);
}

function chatvolt_plugin_settings_page()
{
    if (isset($_GET["agentId"]) && !empty($_GET["agentId"])) {
        $sanitized_agent_id = sanitize_text_field($_GET["agentId"]);
        update_option("chatvolt_agent_id", $sanitized_agent_id);
    }

    if (isset($_GET["chatvolt_verify"]) && !empty($_GET["chatvolt_verify"])) {
        $sanitized_verify = sanitize_text_field($_GET["chatvolt_verify"]);
        update_option("chatvolt_verify", $sanitized_verify);
    }

    $agent_id = get_option('chatvolt_agent_id');
    // echo("-------------------------->");
    // echo(get_option('siteurl'));
    // update_option("agent_id", null);

    $is_chatvolt_working = isset($agent_id) && !empty($agent_id);
    // Check if the connection is secure
    $is_secure = $_SERVER['SERVER_PORT'] == 443;

    // Construct and sanitize the different parts of the URL
    $protocol = $is_secure ? "https://" : "http://";
    $host = sanitize_text_field($_SERVER['HTTP_HOST']);
    $request_uri = sanitize_text_field($_SERVER['REQUEST_URI']);
    $http_callback = esc_url($protocol . $host . $request_uri);

    // $base_url = "http://localhost:3000";
    $base_url = "https://app.chatvolt.ai";
    $add_to_chatvolt_link = $base_url."/integrations/wordpress/config?callback=$http_callback&siteurl=".get_option('siteurl')."&agentId=".$agent_id;


    wp_enqueue_style('chatvolt-style', plugins_url('assets/style.css', __FILE__));



    if ($is_chatvolt_working) {
        ?>

  <div class="wrap chatvolt-wrap">
    <div class="chatvolt-modal">
      <h2 class="chatvolt-title"><?php _e('Connected with Chatvolt.', 'chatvolt'); ?></h2>
      <p class="chatvolt-subtitle"><?php _e('You can now use Chatvolt from your homepage.', 'chatvolt'); ?></p>

      <a class="chatvolt-button chatvolt-neutral" href="<?php echo esc_url($add_to_chatvolt_link);  ?>"><?php _e('Reconfigure', 'chatvolt'); ?></a>

      
    </div>

    <!-- <p class="chatvolt-notice"><?php _e('Loving Chatvolt <b style="color:red">♥</b> ? Rate us on the <a target="_blank" href="https://wordpress.org/support/plugin/chatvolt/reviews/?filter=5">Wordpress Plugin Directory</a>', 'chatvolt'); ?></p> -->
  </div>

  <?php
    } else {
        ?>
  <div class="wrap chatvolt-wrap">
    <div class="chatvolt-modal">
      <h2 class="chatvolt-title"><?php _e('Connect with Chatvolt', 'chatvolt'); ?></h2>
      <p class="chatvolt-subtitle"><?php _e('This link will redirect you to Chatvolt and configure your Wordpress.', 'chatvolt'); ?></p>
      <a class="chatvolt-button chatvolt" href="<?php echo esc_url($add_to_chatvolt_link); ?>"><?php _e('Connect with Chatvolt', 'chatvolt'); ?></a>
    </div>
  </div>
  <?php
    }
}

add_action('wp_head', 'chatvolt_hook_head', 1);

function chatvolt_hook_head()
{
    // Sanitize and validate the agent ID.
    $agent_id = get_option('chatvolt_agent_id');
    $agent_id = sanitize_text_field($agent_id);

    $locale = str_replace("_", "-", strtolower(get_locale()));

    if (!in_array($locale, array("pt-br", "pt-pr"))) {
        $locale = substr($locale, 0, 2);
    }

    // Check if the script is already enqueued.
    if (!empty($agent_id) && !wp_script_is($agent_id, 'enqueued')) {

        $agent_id_escaped = esc_attr($agent_id);
        $output = "<script 
            data-cfasync='false' 
            data-name='chatvolt-chat-bubble'
            id='$agent_id_escaped'
            src='https://cdn.jsdelivr.net/npm/@chatvolt/chat-bubble@latest'
        >";

        $output .= "</script>";
        
        echo $output;
    }
}
