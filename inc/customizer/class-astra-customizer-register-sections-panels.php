<?php
/**
 * Register customizer panels & sections.
 *
 * @package     Astra
 * @author      Astra
 * @copyright   Copyright (c) 2020, Astra
 * @link        https://wpastra.com/
 * @since       Astra 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'Astra_Customizer_Register_Sections_Panels' ) ) {

	/**
	 * Customizer Sanitizes Initial setup
	 */
	class Astra_Customizer_Register_Sections_Panels extends Astra_Customizer_Config_Base {

		/**
		 * Register Panels and Sections for Customizer.
		 *
		 * @param Array                $configurations Astra Customizer Configurations.
		 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
		 * @since 1.4.3
		 * @return Array Astra Customizer Configurations with updated configurations.
		 */
		public function register_configuration( $configurations, $wp_customize ) {

			$configs = array(

				/**
				 * Layout Panel
				 */

				array(
					'name'     => 'panel-global',
					'type'     => 'panel',
					'priority' => 10,
					'title'    => __( 'Global', 'astra' ),
				),

				array(
					'name'               => 'section-container-layout',
					'type'               => 'section',
					'priority'           => 17,
					'title'              => __( 'Container', 'astra' ),
					'panel'              => 'panel-global',
					'description_hidden' => true,
					'description'        => $this->section_get_description(
						array(
							'description' => '<p><b>' . __( 'Helpful Information', 'astra' ) . '</b></p>',
							'links'       => array(
								array(
									'text'  => __( 'Site Layout Overview', 'astra' ) . ' &#187;',
									'attrs' => array(
										'href' => astra_get_pro_url( 'https://wpastra.com/docs/site-layout-overview/', 'customizer', 'helpful_information', 'astra_theme' ),
									),
								),
								array(
									'text'  => __( 'Container Overview', 'astra' ) . ' &#187;',
									'attrs' => array(
										'href' => astra_get_pro_url( 'https://wpastra.com/docs/container-overview/', 'customizer', 'helpful_information', 'astra_theme' ),
									),
								),
							),
						)
					),
				),

				/*
				 * Header section
				 *
				 * @since 1.4.0
				 */
				array(
					'name'     => 'panel-header-group',
					'type'     => 'panel',
					'priority' => 20,
					'title'    => __( 'Header', 'astra' ),
				),

				/*
				 * Update the Site Identity section inside Layout -> Header
				 *
				 * @since 1.4.0
				 */
				array(
					'name'               => 'title_tagline',
					'type'               => 'section',
					'priority'           => 5,
					'title'              => __( 'Site Identity', 'astra' ),
					'panel'              => 'panel-header-group',
					'description_hidden' => true,
					'description'        => $this->section_get_description(
						array(
							'description' => '<p><b>' . __( 'Helpful Information', 'astra' ) . '</b></p>',
							'links'       => array(
								array(
									'text'  => __( 'Site Identity Overview', 'astra' ) . ' &#187;',
									'attrs' => array(
										'href' => astra_get_pro_url( 'https://wpastra.com/docs/site-identity-free/', 'customizer', 'helpful_information', 'astra_theme' ),
									),
								),
							),
						)
					),
				),

				/*
				 * Update the Primary Header section
				 *
				 * @since 1.4.0
				 */
				array(
					'name'               => 'section-header',
					'type'               => 'section',
					'priority'           => 15,
					'title'              => __( 'Primary Header', 'astra' ),
					'panel'              => 'panel-header-group',
					'description_hidden' => true,
					'description'        => $this->section_get_description(
						array(
							'description' => '<p><b>' . __( 'Helpful Information', 'astra' ) . '</b></p>',
							'links'       => array(
								array(
									'text'  => __( 'Primary Header Overview', 'astra' ) . ' &#187;',
									'attrs' => array(
										'href' => astra_get_pro_url( 'https://wpastra.com/docs/header-overview/', 'customizer', 'helpful_information', 'astra_theme' ),
									),
								),
							),
						)
					),
				),

				array(
					'name'     => 'section-primary-menu',
					'type'     => 'section',
					'priority' => 15,
					'title'    => __( 'Primary Menu', 'astra' ),
					'panel'    => 'panel-header-group',
				),
				array(
					'name'     => 'section-footer-group',
					'type'     => 'section',
					'title'    => __( 'Footer', 'astra' ),
					'priority' => 55,
				),

				array(
					'name'             => 'section-separator',
					'type'             => 'section',
					'ast_type'         => 'ast-section-separator',
					'priority'         => 70,
					'section_callback' => 'Astra_WP_Customize_Separator',
				),

				/**
				 * Footer Widgets Section
				 */

				array(
					'name'     => 'section-footer-adv',
					'type'     => 'section',
					'title'    => __( 'Footer Widgets', 'astra' ),
					'section'  => 'section-footer-group',
					'priority' => 5,
				),

				array(
					'name'               => 'section-footer-small',
					'type'               => 'section',
					'title'              => __( 'Footer Bar', 'astra' ),
					'section'            => 'section-footer-group',
					'priority'           => 10,
					'description_hidden' => true,
					'description'        => $this->section_get_description(
						array(
							'description' => '<p><b>' . __( 'Helpful Information', 'astra' ) . '</b></p>',
							'links'       => array(
								array(
									'text'  => __( 'Footer Bar Overview', 'astra' ) . ' &#187;',
									'attrs' => array(
										'href' => astra_get_pro_url( 'https://wpastra.com/docs/footer-bar/', 'customizer', 'helpful_information', 'astra_theme' ),
									),
								),
							),
						)
					),
				),

				// Should be removed
				array(
					'name'     => 'section-test-group',
					'type'     => 'section',
					'priority' => 40,
					'title'    => __( 'Test', 'astra' ),
				),

				
			// /**
			//  * Option: Heading 1 (H1) Font Size
			//  */
			// array(
			// 	'name'        => ASTRA_THEME_SETTINGS . '[font-size-h1-test]',
			// 	'type'        => 'control',
			// 	'control'     => 'ast-responsive',
			// 	'section'     => 'section-test-group',
			// 	'default'     => astra_get_option( 'font-size-h1-test' ),
			// 	'transport'   => 'postMessage',
			// 	'priority'    => 28,
			// 	'title'       => __( 'Size', 'astra' ),
			// 	'input_attrs' => array(
			// 		'min' => 0,
			// 	),
			// 	'units'       => array(
			// 		'px' => 'px',
			// 		'em' => 'em',
			// 	),
			// ),



		/**
			 * Option: Heading <H1> Line Height
			 */
			array(
				'name'              => ASTRA_THEME_SETTINGS . '[line-height-h1-test]',
				'default'           => astra_get_option( 'line-height-h1-test' ),
				'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_number_n_blank' ),
				'type'              => 'control',
				'section'     		=> 'section-test-group',
				'control'           => 'ast-slider',
				'title'             => __( 'Line Height', 'astra' ),
				'transport'         => 'postMessage',
				'priority'          => 28,
				'suffix'            => 'em',
				'input_attrs'       => array(
					'min'  => 1,
					'step' => 0.01,
					'max'  => 5,
				),
			),


				/**
				 * Option - Content Space
				 */
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[container-outside-spacing-test]',
					'default'           => astra_get_option( 'container-outside-spacing-test' ),
					'type'              => 'control',
					'control'           => 'ast-responsive-spacing',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_spacing' ),
					'transport'         => 'postMessage',
					'section'     		=> 'section-test-group',
					'divider'           => array( 'ast_class' => 'ast-bottom-divider' ),
					'priority'          => 95,
					'title'             => __( 'Outside Container Spacing', 'astra-addon' ),
					'linked_choices'    => true,
					'unit_choices'      => array( 'px', 'em', '%' ),
					'choices'           => array(
						'top'    => __( 'Top', 'astra-addon' ),
						'right'  => __( 'Right', 'astra-addon' ),
						'bottom' => __( 'Bottom', 'astra-addon' ),
						'left'   => __( 'Left', 'astra-addon' ),
					),
				),
	/**
				 * Option: Logo Width
				 */
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[ast-header-responsive-logo-width-test]',
					'type'              => 'control',
					'control'           => 'ast-responsive-slider',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_slider' ),
					'section'           => 'section-test-group',
					'transport'         => 'postMessage',
					'default'           => astra_get_option( 'ast-header-responsive-logo-width-test' ),
					'priority'          => 7,
					'title'             => __( 'Logo Width test', 'astra' ),
					'suffix'            => 'px',
					'unit_choices'  	=> array( 'px', 'em', '%' ),
					'input_attrs'       => array(
						'min'  => 0,
						'step' => 1,
						'max'  => 600,
					),
					'divider'           => array( 'ast_class' => 'ast-bottom-divider ast-top-divider' ),
				),

				array(
					'name'     => 'section-blog-group',
					'type'     => 'section',
					'priority' => 40,
					'title'    => __( 'Blog', 'astra' ),
				),
				array(
					'name'     => 'section-blog',
					'type'     => 'section',
					'priority' => 5,
					'title'    => __( 'Blog / Archive', 'astra' ),
					'section'  => 'section-blog-group',
				),
				array(
					'name'     => 'section-blog-single',
					'type'     => 'section',
					'priority' => 10,
					'title'    => __( 'Single Post', 'astra' ),
					'section'  => 'section-blog-group',
				),

				array(
					'name'               => 'section-sidebars',
					'type'               => 'section',
					'priority'           => 50,
					'title'              => __( 'Sidebar', 'astra' ),
					'description_hidden' => true,
					'description'        => $this->section_get_description(
						array(
							'description' => '<p><b>' . __( 'Helpful Information', 'astra' ) . '</b></p>',
							'links'       => array(
								array(
									'text'  => __( 'Sidebar Overview', 'astra' ) . ' &#187;',
									'attrs' => array(
										'href' => astra_get_pro_url( 'https://wpastra.com/docs/sidebar-free/', 'customizer', 'helpful_information', 'astra_theme' ),
									),
								),
							),
						)
					),
				),

				/**
				 * Performance Panel
				 *
				 * @since 3.6.0
				 */
				array(
					'name'     => 'section-performance',
					'type'     => 'section',
					'priority' => 65,
					'title'    => __( 'Performance', 'astra' ),
				),

				/**
				 * Colors Panel
				 */
				array(
					'name'               => 'section-colors-background',
					'type'               => 'section',
					'priority'           => 16,
					'title'              => __( 'Colors', 'astra' ),
					'description_hidden' => true,
					'description'        => $this->section_get_description(
						array(
							'description' => '<p><b>' . __( 'Helpful Information', 'astra' ) . '</b></p>',
							'links'       => array(
								array(
									'text'  => __( 'Colors & Background Overview', 'astra' ) . ' &#187;',
									'attrs' => array(
										'href' => astra_get_pro_url( 'https://wpastra.com/docs/colors-background/', 'customizer', 'helpful_information', 'astra_theme' ),
									),
								),
							),
						)
					),
					'panel'              => 'panel-global',
				),

				array(
					'name'     => 'section-colors-body',
					'type'     => 'section',
					'title'    => __( 'Base Colors', 'astra' ),
					'panel'    => 'panel-global',
					'priority' => 1,
					'section'  => 'section-colors-background',
				),

				array(
					'name'     => 'section-footer-adv-color-bg',
					'type'     => 'section',
					'title'    => __( 'Footer Widgets', 'astra' ),
					'panel'    => 'panel-colors-background',
					'priority' => 55,
				),

				/**
				 * Typography Panel
				 */
				array(
					'name'               => 'section-typography',
					'type'               => 'section',
					'title'              => __( 'Typography', 'astra' ),
					'priority'           => 15,
					'description_hidden' => true,
					'description'        => $this->section_get_description(
						array(
							'description' => '<p><b>' . __( 'Helpful Information', 'astra' ) . '</b></p>',
							'links'       => array(
								array(
									'text'  => __( 'Typography Overview', 'astra' ) . ' &#187;',
									'attrs' => array(
										'href' => astra_get_pro_url( 'https://wpastra.com/docs/typography-free/', 'customizer', 'helpful_information', 'astra_theme' ),
									),
								),
							),
						)
					),
					'panel'              => 'panel-global',
				),

				array(
					'name'     => 'section-body-typo',
					'type'     => 'section',
					'title'    => __( 'Base Typography', 'astra' ),
					'section'  => 'section-typography',
					'priority' => 1,
					'panel'    => 'panel-global',
				),

				array(
					'name'     => 'section-content-typo',
					'type'     => 'section',
					'title'    => __( 'Headings', 'astra' ),
					'section'  => 'section-typography',
					'priority' => 35,
					'panel'    => 'panel-global',
				),

				/**
				 * Buttons Section
				 */
				array(
					'name'     => 'section-buttons',
					'type'     => 'section',
					'priority' => 50,
					'title'    => __( 'Buttons', 'astra' ),
					'panel'    => 'panel-global',
				),

				/**
				 * Header Buttons
				 */
				array(
					'name'     => 'section-header-button',
					'type'     => 'section',
					'priority' => 10,
					'title'    => __( 'Header Button', 'astra' ),
					'section'  => 'section-buttons',
				),

				/**
				 * Header Button - Default
				 */
				array(
					'name'     => 'section-header-button-default',
					'type'     => 'section',
					'priority' => 10,
					'title'    => __( 'Primary Header Button', 'astra' ),
					'section'  => 'section-header-button',
				),

				/**
				 * Header Button - Transparent
				 */
				array(
					'name'     => 'section-header-button-transparent',
					'type'     => 'section',
					'priority' => 10,
					'title'    => __( 'Transparent Header Button', 'astra' ),
					'section'  => 'section-header-button',
				),

			);
			return array_merge( $configurations, $configs );
		}
	}
}


/**
 * Kicking this off by calling 'get_instance()' method
 */
new Astra_Customizer_Register_Sections_Panels();
