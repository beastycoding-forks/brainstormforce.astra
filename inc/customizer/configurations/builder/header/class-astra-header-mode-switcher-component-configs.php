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
				 * Option: Color palette selection.
				 */
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[dark-mode-switch-style]',
					'default'   => astra_get_option( 'dark-mode-switch-style', 'icon' ),
					'section'   => $_section,
					'priority'  => 5,
					'title'     => __( 'Switch Style', 'astra' ),
					'type'      => 'control',
					'control'   => 'ast-select',
					'transport' => 'postMessage',
					'partial'   => array(
						'selector'        => '.ast-header-mode-switcher',
						'render_callback' => array( 'Astra_Builder_UI_Controller', 'render_mode_switcher' ),
					),
					'choices'   => array(
						'icon'            => __( 'Icon', 'astra' ),
						'label'           => __( 'Label', 'astra' ),
						'icon-with-label' => __( 'Icon with Label', 'astra' ),
					),
					'context'   => Astra_Builder_Helper::$general_tab,
					'divider'   => array( 'ast_class' => 'ast-bottom-divider' ),
				),

				/**
				 * Option: Icon Type
				 */
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[mode-switcher-light-icon]',
					'default'    => astra_get_option( 'mode-switcher-light-icon' ),
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => $_section,
					'priority'   => 10,
					'title'      => defined( 'ASTRA_EXT_VER' ) ? __( 'Light Mode Icon', 'astra' ) : __( 'Select Icon', 'astra' ),
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
								'setting'  => ASTRA_THEME_SETTINGS . '[dark-mode-switch-style]',
								'operator' => '==',
								'value'    => 'icon',
							),
							array(
								'setting'  => ASTRA_THEME_SETTINGS . '[dark-mode-switch-style]',
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
					'name'        => ASTRA_THEME_SETTINGS . '[mode-switcher-icon-size]',
					'section'     => $_section,
					'priority'    => 18,
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
					'context'     => array(
						Astra_Builder_Helper::$design_tab_config,
						array(
							'relation' => 'OR',
							array(
								'setting'  => ASTRA_THEME_SETTINGS . '[dark-mode-switch-style]',
								'operator' => '==',
								'value'    => 'icon',
							),
							array(
								'setting'  => ASTRA_THEME_SETTINGS . '[dark-mode-switch-style]',
								'operator' => '==',
								'value'    => 'icon-with-label',
							),
						),
					),
				),

				/**
				 * Option: Switcher Custom Light Mode Label
				 */
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[mode-switcher-light-label]',
					'transport' => 'postMessage',
					'partial'   => array(
						'selector'        => '.ast-header-mode-switcher',
						'render_callback' => array( 'Astra_Builder_UI_Controller', 'render_mode_switcher' ),
					),
					'default'   => astra_get_option( 'mode-switcher-light-label' ),
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
								'setting'  => ASTRA_THEME_SETTINGS . '[dark-mode-switch-style]',
								'operator' => '==',
								'value'    => 'label',
							),
							array(
								'setting'  => ASTRA_THEME_SETTINGS . '[dark-mode-switch-style]',
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
					'name'      => ASTRA_THEME_SETTINGS . '[mode-switcher-dark-label]',
					'transport' => 'postMessage',
					'partial'   => array(
						'selector'        => '.ast-header-mode-switcher',
						'render_callback' => array( 'Astra_Builder_UI_Controller', 'render_mode_switcher' ),
					),
					'default'   => astra_get_option( 'mode-switcher-dark-label' ),
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
								'setting'  => ASTRA_THEME_SETTINGS . '[dark-mode-switch-style]',
								'operator' => '==',
								'value'    => 'label',
							),
							array(
								'setting'  => ASTRA_THEME_SETTINGS . '[dark-mode-switch-style]',
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
			);

			$required_condition = array(
				'relation' => 'AND',
				Astra_Builder_Helper::$design_tab_config,
				array(
					'relation' => 'OR',
					array(
						'setting'  => ASTRA_THEME_SETTINGS . '[dark-mode-switch-style]',
						'operator' => '==',
						'value'    => 'label',
					),
					array(
						'setting'  => ASTRA_THEME_SETTINGS . '[dark-mode-switch-style]',
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
}
