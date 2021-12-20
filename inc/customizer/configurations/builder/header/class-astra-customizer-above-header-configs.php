<?php
/**
 * Astra Theme Customizer Configuration Above Header.
 *
 * @package     astra-builder
 * @author      Astra
 * @copyright   Copyright (c) 2020, Astra
 * @link        https://wpastra.com/
 * @since       3.0.0
 */

// No direct access, please.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( class_exists( 'Astra_Customizer_Config_Base' ) ) {

	/**
	 * Register Above Header Customizer Configurations.
	 *
	 * @since 3.0.0
	 */
	class Astra_Customizer_Above_Header_Configs extends Astra_Customizer_Config_Base {

		/**
		 * Register Builder Above Customizer Configurations.
		 *
		 * @param Array                $configurations Astra Customizer Configurations.
		 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
		 * @since 3.0.0
		 * @return Array Astra Customizer Configurations with updated configurations.
		 */
		public function register_configuration( $configurations, $wp_customize ) {

			$_section = 'section-above-header-builder';

			$_configs = array(

				// Section: Above Header.
				array(
					'name'     => $_section,
					'type'     => 'section',
					'title'    => __( 'Above Header', 'astra' ),
					'panel'    => 'panel-header-builder-group',
					'priority' => 30,
				),

				/**
				 * Option: Header Builder Tabs
				 */
				array(
					'name'        => $_section . '-ast-context-tabs',
					'section'     => $_section,
					'type'        => 'control',
					'control'     => 'ast-builder-header-control',
					'priority'    => 0,
					'description' => '',
				),

				/**
				 * Notice - Transparent meta header enabled on page.
				 */
				array(
					'name'            => ASTRA_THEME_SETTINGS . '[ast-above-header-transparent-header-callback-notice]',
					'type'            => 'control',
					'control'         => 'ast-description',
					'section'         => $_section,
					'priority'        => 1,
					'active_callback' => array( Astra_Builder_Base_Configuration::get_instance(), 'is_transparent_header_enabled' ),
					'help'            => '<div class="ast-customizer-notice wp-ui-highlight"><p>The header on this page is set from the Transparent Header.</p> <p> Please click the link below to customize Transparent Header </p></div>',
				),

				/**
				 * Notice Link - Transparent meta header enabled on page.
				 */
				array(
					'name'            => ASTRA_THEME_SETTINGS . '[ast-above-header-transparent-header-callback-notice-link]',
					'type'            => 'control',
					'control'         => 'ast-customizer-link',
					'section'         => $_section,
					'priority'        => 1,
					'link_type'       => 'section',
					'linked'          => 'section-transparent-header',
					'link_text'       => '<u>' . __( 'Customize Transparent Header.', 'astra' ) . '</u>',
					'active_callback' => array( Astra_Builder_Base_Configuration::get_instance(), 'is_transparent_header_enabled' ),
				),

				// Section: Above Header Height.
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[hba-header-height]',
					'section'           => $_section,
					'transport'         => 'postMessage',
					'default'           => astra_get_option( 'hba-header-height' ),
					'priority'          => 30,
					'title'             => __( 'Height', 'astra' ),
					'type'              => 'control',
					'control'           => 'ast-responsive-slider',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_slider' ),
					'suffix'            => 'px',
					'input_attrs'       => array(
						'min'  => 30,
						'step' => 1,
						'max'  => 600,
					),
					'context'           => Astra_Builder_Helper::$general_tab,
				),

				// Section: Above Header Border.
				array(
					'name'        => ASTRA_THEME_SETTINGS . '[hba-header-separator]',
					'section'     => $_section,
					'priority'    => 40,
					'transport'   => 'postMessage',
					'default'     => astra_get_option( 'hba-header-separator' ),
					'title'       => __( 'Bottom Border Size', 'astra' ),
					'type'        => 'control',
					'control'     => 'ast-slider',
					'suffix'      => 'px',
					'input_attrs' => array(
						'min'  => 0,
						'step' => 1,
						'max'  => 10,
					),
					'context'     => Astra_Builder_Helper::$design_tab,
				),

				// Section: Above Header Border Color.
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[hba-header-bottom-border-color]',
					'transport'         => 'postMessage',
					'default'           => astra_get_option( 'hba-header-bottom-border-color' ),
					'type'              => 'control',
					'control'           => 'ast-color',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_alpha_color' ),
					'section'           => $_section,
					'priority'          => 50,
					'title'             => __( 'Bottom Border Color', 'astra' ),
					'divider'           => array( 'ast_class' => 'ast-bottom-divider' ),
					'context'           => array(
						Astra_Builder_Helper::$design_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[hba-header-separator]',
							'operator' => '>=',
							'value'    => 1,
						),
					),
				),

				// Option: Above Header Background styling.
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[hba-header-bg-obj-responsive]',
					'type'      => 'control',
					'section'   => $_section,
					'control'   => 'ast-responsive-background',
					'transport' => 'postMessage',
					'default'   => astra_get_option( 'hba-header-bg-obj-responsive' ),
					'title'     => __( 'Background', 'astra' ),
					'priority'  => 70,
					'context'   => Astra_Builder_Helper::$design_tab,
				),
			);

			$_configs = array_merge( $_configs, Astra_Builder_Base_Configuration::prepare_advanced_tab( $_section ) );

			$_configs = array_merge( $_configs, Astra_Builder_Base_Configuration::prepare_visibility_tab( $_section ) );

			return array_merge( $configurations, $_configs );
		}
	}

	/**
	 * Kicking this off by creating object of this class.
	 */
	new Astra_Customizer_Above_Header_Configs();
}
