<?php
/**
 * Astra Theme Customizer Configuration Builder.
 *
 * @package     astra-builder
 * @author      Astra
 * @copyright   Copyright (c) 2021, Astra
 * @link        https://wpastra.com/
 * @since       x.x.x
 */

// No direct access, please.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Astra_Customizer_Config_Base' ) ) {
	return;
}

/**
 * Register Builder Customizer Configurations.
 *
 * @since x.x.x
 */
class Astra_Header_Mode_Switcher_Component_Configs extends Astra_Customizer_Config_Base {

	/**
	 * Register Builder Customizer Configurations.
	 *
	 * @param Array                $configurations Astra Customizer Configurations.
	 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
	 * @since x.x.x
	 * @return Array Astra Customizer Configurations with updated configurations.
	 */
	public function register_configuration( $configurations, $wp_customize ) {

		$_section = 'section-mode-switcher';

		$_configs = array(

			/*
			* Header Builder section
			*/
			array(
				'name'     => $_section,
				'type'     => 'section',
				'priority' => 90,
				'title'    => __( 'Mode Switcher', 'astra' ),
				'panel'    => 'panel-header-builder-group',
			),

			/**
			 * Option: Header Builder Tabs
			 */
			array(
				'name'        => ASTRA_THEME_SETTINGS . '[header-mode-switcher-tabs]',
				'section'     => $_section,
				'type'        => 'control',
				'control'     => 'ast-builder-header-control',
				'priority'    => 0,
				'description' => '',
			),

			/**
			 * Option: Dummy heading
			 */
			array(
				'name'        => ASTRA_THEME_SETTINGS . '[header-mode-switcher-heading]',
				'type'        => 'control',
				'control'     => 'ast-heading',
				'section'     => $_section,
				'priority'    => 1,
				'title'       => __( 'Mode Swticher', 'astra' ),
				'settings'    => array(),
				'input_attrs' => array(
					'class' => 'ast-control-reduce-top-space',
				),
			),
		);

		return array_merge( $configurations, $_configs );
	}
}

/**
 * Kicking this off by creating object of this class.
 */

new Astra_Header_Mode_Switcher_Component_Configs();


