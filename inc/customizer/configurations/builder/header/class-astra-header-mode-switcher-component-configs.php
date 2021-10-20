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

if ( class_exists( 'Astra_Customizer_Config_Base' ) ) {

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
				 * Option: Icon Type
				 */
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[mode-switcher-icon-type]',
					'default'    => astra_get_option( 'mode-switcher-icon-type' ),
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => $_section,
					'priority'   => 10,
					'title'      => __( 'Select Icon', 'astra' ),
					'choices'    => array(
						'switcher-1' => 'switcher-1',
						'switcher-2' => 'switcher-2',
						'switcher-3' => 'switcher-3',
						'switcher-4' => 'switcher-4',
					),
					'transport'  => 'postMessage',
					'partial'    => array(
						'selector'        => '.ast-header-mode-switcher',
						'render_callback' => array( 'Astra_Builder_UI_Controller', 'render_mode_switcher' ),
					),
					'context'    => Astra_Builder_Helper::$general_tab,
					'responsive' => false,
					'divider'    => array( 'ast_class' => 'ast-bottom-divider' ),
				),

				/**
				 * Option: Icon Size
				 */
				array(
					'name'        => ASTRA_THEME_SETTINGS . '[mode-switcher-icon-size]',
					'section'     => $_section,
					'priority'    => 15,
					'transport'   => 'postMessage',
					'default'     => astra_get_option( 'mode-switcher-icon-size' ),
					'title'       => __( 'Icon Size', 'astra' ),
					'type'        => 'control',
					'suffix'      => 'px',
					'control'     => 'ast-responsive-slider',
					'input_attrs' => array(
						'min'  => 0,
						'step' => 1,
						'max'  => 200,
					),
					'context'     => Astra_Builder_Helper::$design_tab,
				),

				/**
				 * Option: Switcher Custom Label
				 */
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[mode-switcher-label]',
					'transport' => 'postMessage',
					'partial'   => array(
						'selector'        => '.ast-header-mode-switcher',
						'render_callback' => array( 'Astra_Builder_UI_Controller', 'render_mode_switcher' ),
					),
					'default'   => astra_get_option( 'mode-switcher-label' ),
					'section'   => $_section,
					'priority'  => 30,
					'title'     => __( 'Label', 'astra' ),
					'type'      => 'control',
					'control'   => 'text',
					'context'   => Astra_Builder_Helper::$general_tab,
					'divider'   => array( 'ast_class' => 'ast-bottom-divider ast-top-divider' ),
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
					'divider'  => array( 'ast_class' => 'ast-top-divider ast-bottom-divider' ),
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
			);

			$required_condition = array(
				Astra_Builder_Helper::$design_tab_config,
				array(
					'setting'  => ASTRA_THEME_SETTINGS . '[mode-switcher-label]',
					'operator' => '!=',
					'value'    => '',
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
}



