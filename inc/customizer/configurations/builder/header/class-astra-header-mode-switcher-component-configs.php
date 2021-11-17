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

		$_section = 'header-section-mode-switcher';
		$_configs = array(

			/*
			* Header Builder section
			*/
			array(
				'name'     => $_section,
				'type'     => 'section',
				'priority' => 90,
				'title'    => __( 'Dark Mode Switcher', 'astra' ),
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
			 * Option: Color palette selection.
			 */
			array(
				'name'     => ASTRA_THEME_SETTINGS . '[header-dark-mode-switch-type]',
				'default'  => astra_get_option( 'header-dark-mode-switch-type' ),
				'section'  => $_section,
				'priority' => 5,
				'title'    => __( 'Switch Type', 'astra' ),
				'type'     => 'control',
				'control'  => 'ast-select',
				'partial'  => array(
					'selector'        => '.ast-header-mode-switcher',
					'render_callback' => array( 'Astra_Builder_UI_Controller', 'render_mode_switcher' ),
				),
				'choices'  => array(
					'icon'            => __( 'Icon', 'astra' ),
					'label'           => __( 'Label', 'astra' ),
					'icon-with-label' => __( 'Icon with Label', 'astra' ),
				),
				'context'  => Astra_Builder_Helper::$general_tab,
				'divider'  => array( 'ast_class' => 'ast-bottom-divider' ),
			),

			/**
			 * Option: Icon Type
			 */
			array(
				'name'       => ASTRA_THEME_SETTINGS . '[header-mode-switcher-light-icon]',
				'default'    => astra_get_option( 'header-mode-switcher-light-icon' ),
				'type'       => 'control',
				'control'    => 'ast-selector',
				'section'    => $_section,
				'priority'   => 10,
				'title'      => ( class_exists( 'Astra_Ext_Extension' ) && Astra_Ext_Extension::is_active( 'dark-mode-switch' ) ) ? __( 'Light Mode Icon', 'astra' ) : __( 'Select Icon', 'astra' ),
				'choices'    => array(
					'light-switcher-1' => 'light-switcher-1',
					'light-switcher-2' => 'light-switcher-2',
					'light-switcher-3' => 'light-switcher-3',
					'light-switcher-4' => 'light-switcher-4',
				),
				'transport'  => 'postMessage',
				'partial'    => array(
					'selector'        => '.ast-header-mode-switcher',
					'render_callback' => array( 'Astra_Builder_UI_Controller', 'render_mode_switcher' ),
				),
				'context'    => array(
					Astra_Builder_Helper::$general_tab_config,
					array(
						'relation' => 'OR',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[header-dark-mode-switch-type]',
							'operator' => '==',
							'value'    => 'icon',
						),
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[header-dark-mode-switch-type]',
							'operator' => '==',
							'value'    => 'icon-with-label',
						),
					),
				),
				'responsive' => false,
			),

			/**
			 * Option: Icon Size
			 */
			array(
				'name'        => ASTRA_THEME_SETTINGS . '[header-mode-switcher-icon-size]',
				'section'     => $_section,
				'priority'    => 18,
				'transport'   => 'postMessage',
				'default'     => astra_get_option( 'header-mode-switcher-icon-size' ),
				'title'       => __( 'Icon Size', 'astra' ),
				'type'        => 'control',
				'suffix'      => 'px',
				'control'     => 'ast-responsive-slider',
				'input_attrs' => array(
					'min'  => 0,
					'step' => 1,
					'max'  => 200,
				),
				'context'     => array(
					Astra_Builder_Helper::$design_tab_config,
					array(
						'relation' => 'OR',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[header-dark-mode-switch-type]',
							'operator' => '==',
							'value'    => 'icon',
						),
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[header-dark-mode-switch-type]',
							'operator' => '==',
							'value'    => 'icon-with-label',
						),
					),
				),
			),

			/**
			 * Option: Button border radius.
			 */
			array(
				'name'        => ASTRA_THEME_SETTINGS . '[header-mode-switcher-border-radius]',
				'section'     => $_section,
				'priority'    => 20,
				'transport'   => 'postMessage',
				'default'     => astra_get_option( 'header-mode-switcher-border-radius' ),
				'title'       => __( 'Border Radius', 'astra' ),
				'type'        => 'control',
				'suffix'      => 'px',
				'control'     => 'ast-slider',
				'context'     => Astra_Builder_Helper::$design_tab,
				'input_attrs' => array(
					'min'  => 0,
					'step' => 1,
					'max'  => 200,
				),
			),

			/**
			 * Option: Switcher Custom Light Mode Label
			 */
			array(
				'name'      => ASTRA_THEME_SETTINGS . '[header-mode-switcher-light-label]',
				'transport' => 'postMessage',
				'partial'   => array(
					'selector'        => '.ast-header-mode-switcher',
					'render_callback' => array( 'Astra_Builder_UI_Controller', 'render_mode_switcher' ),
				),
				'default'   => astra_get_option( 'header-mode-switcher-light-label' ),
				'section'   => $_section,
				'priority'  => 30,
				'title'     => __( 'Light Mode Label', 'astra' ),
				'type'      => 'control',
				'control'   => 'text',
				'divider'   => array( 'ast_class' => 'ast-top-divider' ),
				'context'   => array(
					Astra_Builder_Helper::$general_tab_config,
					array(
						'relation' => 'OR',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[header-dark-mode-switch-type]',
							'operator' => '==',
							'value'    => 'label',
						),
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[header-dark-mode-switch-type]',
							'operator' => '==',
							'value'    => 'icon-with-label',
						),
					),
				),
			),

			/**
			 * Option: Switcher Custom Dark Mode Label
			 */
			array(
				'name'      => ASTRA_THEME_SETTINGS . '[header-mode-switcher-dark-label]',
				'transport' => 'postMessage',
				'partial'   => array(
					'selector'        => '.ast-header-mode-switcher',
					'render_callback' => array( 'Astra_Builder_UI_Controller', 'render_mode_switcher' ),
				),
				'default'   => astra_get_option( 'header-mode-switcher-dark-label' ),
				'section'   => $_section,
				'priority'  => 31,
				'title'     => __( 'Dark Mode Label', 'astra' ),
				'type'      => 'control',
				'control'   => 'text',
				'divider'   => array( 'ast_class' => 'ast-bottom-divider' ),
				'context'   => array(
					Astra_Builder_Helper::$general_tab_config,
					array(
						'relation' => 'OR',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[header-dark-mode-switch-type]',
							'operator' => '==',
							'value'    => 'label',
						),
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[header-dark-mode-switch-type]',
							'operator' => '==',
							'value'    => 'icon-with-label',
						),
					),
				),
			),

			/**
			 * Option: Color palette selection.
			 */
			array(
				'name'     => ASTRA_THEME_SETTINGS . '[dark-mode-palette]',
				'default'  => astra_get_option( 'dark-mode-palette' ),
				'section'  => $_section,
				'priority' => 40,
				'title'    => __( 'Dark Color Palette', 'astra' ),
				'type'     => 'control',
				'control'  => 'ast-select',
				'choices'  => array(
					'palette_1' => __( 'Palette 1', 'astra' ),
					'palette_2' => __( 'Palette 2', 'astra' ),
					'palette_3' => __( 'Palette 3', 'astra' ),
				),
				'context'  => Astra_Builder_Helper::$general_tab,
				'divider'  => array( 'ast_class' => 'ast-top-divider' ),
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
				'priority'  => 45,
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
				'priority'  => 50,
				'title'     => __( 'OS Aware', 'astra' ),
				'context'   => Astra_Builder_Helper::$general_tab,
				'transport' => 'postMessage',
				'divider'   => array( 'ast_class' => 'ast-top-divider' ),
			),

			// Option: OS Aware help info.
			array(
				'name'     => ASTRA_THEME_SETTINGS . '[mode-os-aware-description]',
				'type'     => 'control',
				'control'  => 'ast-description',
				'section'  => $_section,
				'priority' => 51,
				'label'    => '',
				'help'     => __( 'Use users system settings to choose default palette on site load.', 'astra' ),
				'context'  => Astra_Builder_Helper::$general_tab,
			),

			/**
			 * Option: Switcher Color.
			 */
			array(
				'name'      => ASTRA_THEME_SETTINGS . '[header-mode-switcher-color-group-control]',
				'default'   => astra_get_option( 'header-mode-switcher-color-group-control' ),
				'type'      => 'control',
				'control'   => 'ast-color-group',
				'title'     => __( 'Colors', 'astra' ),
				'section'   => $_section,
				'transport' => 'postMessage',
				'priority'  => 9,
				'context'   => Astra_Builder_Helper::$design_tab,
				'divider'   => array( 'ast_class' => 'ast-bottom-divider' ),
			),

			/**
			 * Normal mode witcher light color.
			 */
			array(
				'name'      => 'header-dark-mode-switcher-light-color',
				'default'   => astra_get_option( 'header-dark-mode-switcher-light-color' ),
				'type'      => 'sub-control',
				'parent'    => ASTRA_THEME_SETTINGS . '[header-mode-switcher-color-group-control]',
				'section'   => $_section,
				'priority'  => 1,
				'transport' => 'postMessage',
				'control'   => 'ast-color',
				'title'     => __( 'Light', 'astra' ),
				'context'   => Astra_Builder_Helper::$design_tab,
			),

			/**
			 * Normal mode witcher dark color.
			 */
			array(
				'name'      => 'header-dark-mode-switcher-dark-color',
				'default'   => astra_get_option( 'header-dark-mode-switcher-dark-color' ),
				'type'      => 'sub-control',
				'parent'    => ASTRA_THEME_SETTINGS . '[header-mode-switcher-color-group-control]',
				'section'   => $_section,
				'priority'  => 2,
				'transport' => 'postMessage',
				'control'   => 'ast-color',
				'title'     => __( 'Dark', 'astra' ),
				'context'   => Astra_Builder_Helper::$design_tab,
			),
		);

		$required_condition = array(
			'relation' => 'AND',
			Astra_Builder_Helper::$design_tab_config,
			array(
				'relation' => 'OR',
				array(
					'setting'  => ASTRA_THEME_SETTINGS . '[header-dark-mode-switch-type]',
					'operator' => '==',
					'value'    => 'label',
				),
				array(
					'setting'  => ASTRA_THEME_SETTINGS . '[header-dark-mode-switch-type]',
					'operator' => '==',
					'value'    => 'icon-with-label',
				),
			),
		);

		// Added typography settings for switcher label.
		$_configs = array_merge( $_configs, Astra_Builder_Base_Configuration::prepare_typography_options( $_section, $required_condition ) );

		// Added advanced (margin|padding) settings for switcher element.
		$_configs = array_merge( $_configs, Astra_Builder_Base_Configuration::prepare_advanced_tab( $_section ) );

		return array_merge( $configurations, $_configs );
	}
}

/**
 * Kicking this off by creating object of this class.
 */

new Astra_Header_Mode_Switcher_Component_Configs();
