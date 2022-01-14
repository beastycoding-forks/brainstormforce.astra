<?php
/**
 * Global Dark Mode Options for Astra Theme.
 *
 * @package     Astra
 * @author      Astra
 * @copyright   Copyright (c) 2021, Astra
 * @link        https://wpastra.com/
 * @since       Astra x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Astra_Customizer_Config_Base' ) ) {
	return;
}

/**
 * Register Global Dark Mode Customizer Configurations.
 */
class Astra_Dark_Mode_Global_Configs extends Astra_Customizer_Config_Base {

	/**
	 * Register Global Dark Mode Customizer Configurations.
	 *
	 * @param Array                $configurations Astra Customizer Configurations.
	 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
	 * @since 1.4.3
	 * @return Array Astra Customizer Configurations with updated configurations.
	 */
	public function register_configuration( $configurations, $wp_customize ) {

		$_section = 'dark-mode-global-section';

		$_configs = array(

			array(
				'name'      => ASTRA_THEME_SETTINGS . '[dark-color-palette]',
				'type'      => 'control',
				'control'   => 'ast-hidden',
				'section'   => $_section,
				'priority'  => 5,
				'title'     => __( 'Dark Palette', 'astra' ),
				'default'   => astra_get_option( 'dark-color-palette' ),
				'transport' => 'postMessage',
			),

			/**
			 * Option: Color palette selection.
			 */
			array(
				'name'     => ASTRA_THEME_SETTINGS . '[dark-mode-palette]',
				'default'  => astra_get_palette_colors(),
				'section'  => $_section,
				'priority' => 5,
				'title'    => __( 'Dark Color Palette', 'astra' ),
				'type'     => 'control',
				'control'  => 'ast-color-palette',
				'context'  => Astra_Builder_Helper::$general_tab,
			),

			/**
			 * Option: OS Aware.
			 */
			array(
				'name'      => ASTRA_THEME_SETTINGS . '[mode-switcher-carry-os-palette]',
				'default'   => astra_get_option( 'mode-switcher-carry-os-palette' ),
				'type'      => 'control',
				'control'   => 'ast-toggle-control',
				'section'   => $_section,
				'priority'  => 15,
				'divider'   => array( 'ast_class' => 'ast-top-divider' ),
				'title'     => __( 'OS Aware', 'astra' ),
				'context'   => Astra_Builder_Helper::$general_tab,
				'transport' => 'postMessage',
			),

			// Option: OS Aware help info.
			array(
				'name'     => ASTRA_THEME_SETTINGS . '[mode-os-aware-description]',
				'type'     => 'control',
				'control'  => 'ast-description',
				'section'  => $_section,
				'priority' => 20,
				'label'    => '',
				'help'     => __( 'Use users system settings to choose default palette on site load.', 'astra' ),
				'context'  => Astra_Builder_Helper::$general_tab,
			),

			/**
			 * Option: Tooltip message divider.
			 */
			array(
				'name'     => ASTRA_THEME_SETTINGS . '[dark-mode-tooltip-message-divider]',
				'type'     => 'control',
				'control'  => 'ast-heading',
				'section'  => $_section,
				'title'    => __( 'Tooltip Messages', 'astra' ),
				'priority' => 25,
				'settings' => array(),
				'context'  => Astra_Builder_Helper::$general_tab,
			),

			/**
			 * Option: Switcher Custom Light Mode Tooltip Message
			 */
			array(
				'name'      => ASTRA_THEME_SETTINGS . '[mode-switcher-light-tooltip-message]',
				'transport' => 'postMessage',
				'default'   => astra_get_option( 'mode-switcher-light-tooltip-message' ),
				'section'   => $_section,
				'priority'  => 30,
				'title'     => __( 'Light Mode', 'astra' ),
				'type'      => 'control',
				'control'   => 'text',
				'context'   => Astra_Builder_Helper::$general_tab,
			),

			/**
			 * Option: Switcher Custom Dark Mode Tooltip Message
			 */
			array(
				'name'      => ASTRA_THEME_SETTINGS . '[mode-switcher-dark-tooltip-message]',
				'transport' => 'postMessage',
				'default'   => astra_get_option( 'mode-switcher-dark-tooltip-message' ),
				'section'   => $_section,
				'priority'  => 35,
				'title'     => __( 'Dark Mode', 'astra' ),
				'type'      => 'control',
				'control'   => 'text',
				'divider'   => array( 'ast_class' => 'ast-bottom-divider' ),
				'context'   => Astra_Builder_Helper::$general_tab,
			),

			// Option: Tololtip message info.
			array(
				'name'     => ASTRA_THEME_SETTINGS . '[mode-icon-tooltip-description]',
				'type'     => 'control',
				'control'  => 'ast-description',
				'section'  => $_section,
				'priority' => 36,
				'label'    => '',
				'help'     => __( 'Tooltip message appears when Switch Type is set to Icon.', 'astra' ),
				'context'  => Astra_Builder_Helper::$general_tab,
			),
		);

		return array_merge( $configurations, $_configs );
	}
}

/**
 * Kicking this off by creating 'new' instance.
 */
new Astra_Dark_Mode_Global_Configs();
