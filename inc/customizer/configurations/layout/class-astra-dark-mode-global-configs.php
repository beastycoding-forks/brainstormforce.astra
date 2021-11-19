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

			/**
			 * Option: Color palette selection.
			 */
			array(
				'name'     => ASTRA_THEME_SETTINGS . '[dark-mode-palette]',
				'default'  => astra_get_option( 'dark-mode-palette' ),
				'section'  => $_section,
				'priority' => 5,
				'title'    => __( 'Dark Color Palette', 'astra' ),
				'type'     => 'control',
				'control'  => 'ast-select',
				'choices'  => array(
					'palette_1' => __( 'Palette 1', 'astra' ),
					'palette_2' => __( 'Palette 2', 'astra' ),
					'palette_3' => __( 'Palette 3', 'astra' ),
				),
				'context'  => Astra_Builder_Helper::$general_tab,
			),

			/**
			* Option: Colors section quick link.
			*/
			array(
				'name'      => ASTRA_THEME_SETTINGS . '[color-palette-colors-section-link]',
				'default'   => astra_get_option( 'color-palette-colors-section-link' ),
				'type'      => 'control',
				'control'   => 'ast-customizer-link',
				'section'   => $_section,
				'priority'  => 10,
				'link_type' => 'control',
				'linked'    => 'astra-color-palettes',
				'link_text' => __( 'Configure Palette from Here.', 'astra' ),
				'context'   => Astra_Builder_Helper::$general_tab,
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
		);

		return array_merge( $configurations, $_configs );
	}
}

/**
 * Kicking this off by creating 'new' instance.
 */
new Astra_Dark_Mode_Global_Configs();
