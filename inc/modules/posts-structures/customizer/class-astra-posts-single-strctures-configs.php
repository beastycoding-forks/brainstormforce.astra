<?php
/**
 * Posts Strctures Options for our theme.
 *
 * @package     Astra
 * @author      Brainstorm Force
 * @copyright   Copyright (c) 2022, Brainstorm Force
 * @link        https://www.brainstormforce.com
 * @since       Astra x.x.x
 */

// Block direct access to the file.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Bail if Customizer config base class does not exist.
if ( ! class_exists( 'Astra_Customizer_Config_Base' ) ) {
	return;
}

/**
 * Register Posts Strctures Customizer Configurations.
 *
 * @since x.x.x
 */
class Astra_Posts_Single_Strctures_Configs extends Astra_Customizer_Config_Base {

	/**
	 * Register Posts Strctures Customizer Configurations.
	 *
	 * @param Array                $configurations Astra Customizer Configurations.
	 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
	 * @since x.x.x
	 * @return Array Astra Customizer Configurations with updated configurations.
	 */
	public function register_configuration( $configurations, $wp_customize ) {

		$post_types            = Astra_Posts_Strctures_Loader::get_supported_post_types();
		$responsive_bg_default = array(
			'desktop' => array(
				'background-color'      => '',
				'background-image'      => '',
				'background-repeat'     => 'repeat',
				'background-position'   => 'center center',
				'background-size'       => 'auto',
				'background-attachment' => 'scroll',
				'background-type'       => '',
				'background-media'      => '',
			),
			'tablet'  => array(
				'background-color'      => '',
				'background-image'      => '',
				'background-repeat'     => 'repeat',
				'background-position'   => 'center center',
				'background-size'       => 'auto',
				'background-attachment' => 'scroll',
				'background-type'       => '',
				'background-media'      => '',
			),
			'mobile'  => array(
				'background-color'      => '',
				'background-image'      => '',
				'background-repeat'     => 'repeat',
				'background-position'   => 'center center',
				'background-size'       => 'auto',
				'background-attachment' => 'scroll',
				'background-type'       => '',
				'background-media'      => '',
			),
		);
		$spacing_default       = array(
			'desktop'      => array(
				'top'    => '',
				'right'  => '',
				'bottom' => '',
				'left'   => '',
			),
			'tablet'       => array(
				'top'    => '',
				'right'  => '',
				'bottom' => '',
				'left'   => '',
			),
			'mobile'       => array(
				'top'    => '',
				'right'  => '',
				'bottom' => '',
				'left'   => '',
			),
			'desktop-unit' => 'px',
			'tablet-unit'  => 'px',
			'mobile-unit'  => 'px',
		);

		foreach ( $post_types as $index => $post_type ) {

			$raw_taxonomies     = array_diff(
				get_object_taxonomies( $post_type ),
				array( 'post_format' )
			);

			// Filter out taxonomies in index-value format.
			$taxonomies = array();
			foreach ( $raw_taxonomies as $index => $value ) {
				$taxonomies[] = array(
					'label' => ucfirst( $value ),
					'value' => $value,
				);
			}
			$taxonomies = array_reverse( $taxonomies );

			$section = 'ast-single-' . $post_type;

			if ( 'product' === $post_type ) {
				$parent_section = 'section-woo-shop-single';
			} elseif ( 'post' === $post_type ) {
				$taxonomies[] = array(
					'label' => __( 'Category + Tag', 'astra' ),
					'value' => 'category-tag',
				);
				$parent_section             = 'section-blog-single';
			} else {
				$parent_section = 'section-posttype-' . $post_type;
			}

			$_configs = array(

				/**
				 * Single Post section.
				 */
				array(
					'name'     => $section,
					'title'    => ucfirst( $post_type ) . __( ' Title', 'astra' ),
					'section'  => $parent_section,
					'type'     => 'section',
					'priority' => 5,
				),

				/**
				 * Option: Builder Tabs
				 */
				array(
					'name'        => $section . '-ast-context-tabs',
					'section'     => $section,
					'type'        => 'control',
					'control'     => 'ast-builder-header-control',
					'priority'    => 0,
					'description' => '',
					'context'     => array(),
				),

				/**
				 * Layout option.
				 */
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[' . $section . '-layout]',
					'type'              => 'control',
					'control'           => 'ast-radio-image',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_choices' ),
					'section'           => $section,
					'default'           => astra_get_option( $section . '-layout', 'layout-1' ),
					'priority'          => 5,
					'context'           => Astra_Builder_Helper::$general_tab,
					'title'             => __( 'Title Layout', 'astra-addon' ),
					'choices'           => array(
						'layout-1' => array(
							'label' => __( 'Layout 1', 'astra' ),
							'path'  => Astra_Builder_UI_Controller::fetch_svg_icon( 'post-banner' ),
						),
						'layout-2' => array(
							'label' => __( 'Layout 2', 'astra-addon' ),
							'path'  => Astra_Builder_UI_Controller::fetch_svg_icon( 'post-banner', false ),
						),
					),
				),

				/**
				 * Option: Banner Content Width.
				 */
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-width-type]',
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => $section,
					'default'    => astra_get_option( $section . '-banner-width-type', 'fullwidth' ),
					'priority'   => 10,
					'title'      => __( 'Container Width', 'astra' ),
					'choices'    => array(
						'fullwidth' => __( 'Full Width', 'astra' ),
						'custom'    => __( 'Custom', 'astra' ),
					),
					'divider'    => array( 'ast_class' => 'ast-top-divider' ),
					'responsive' => false,
					'renderAs'   => 'text',
					'context'    => array(
						Astra_Builder_Helper::$general_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-layout]',
							'operator' => '===',
							'value'    => 'layout-2',
						),
					),
				),

				/**
				 * Option: Enter Width
				 */
				array(
					'name'        => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-custom-width]',
					'type'        => 'control',
					'control'     => 'ast-slider',
					'section'     => $section,
					'transport'   => 'postMessage',
					'default'     => astra_get_option( $section . '-banner-custom-width', 1200 ),
					'context'     => array(
						Astra_Builder_Helper::$general_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-layout]',
							'operator' => '===',
							'value'    => 'layout-2',
						),
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-width-type]',
							'operator' => '===',
							'value'    => 'custom',
						),
					),
					'priority'    => 15,
					'title'       => __( 'Custom Width', 'astra' ),
					'suffix'      => 'px',
					'input_attrs' => array(
						'min'  => 768,
						'step' => 1,
						'max'  => 1920,
					),
				),

				/**
				 * Option: Display Post Structure
				 */
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[' . $section . '-structure]',
					'type'              => 'control',
					'control'           => 'ast-sortable',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_multi_choices' ),
					'section'           => $section,
					'context'           => Astra_Builder_Helper::$general_tab,
					'default'           => astra_get_option( $section . '-structure', array( $section . '-title', $section . '-breadcrumb' ) ),
					'priority'          => 20,
					'title'             => __( 'Elements', 'astra' ),
					'divider'           => array( 'ast_class' => 'ast-top-divider' ),
					'choices'           => array(
						$section . '-title'      => __( 'Title', 'astra' ),
						$section . '-breadcrumb' => __( 'Breadcrumb', 'astra' ),
						$section . '-meta'       => __( 'Meta', 'astra' ),
						$section . '-image'      => __( 'Featured Image', 'astra' ),
						$section . '-excerpt'    => __( 'Excerpt', 'astra' ),
					),
				),

				array(
					'name'              => ASTRA_THEME_SETTINGS . '[' . $section . '-metadata]',
					'type'              => 'control',
					'control'           => 'ast-sortable',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_multi_choices' ),
					'default'           => astra_get_option( $section . '-metadata', array( 'comments', 'author', 'date' ) ),
					'context'           => array(
						Astra_Builder_Helper::$general_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-structure]',
							'operator' => 'contains',
							'value'    => $section . '-meta',
						),
					),
					'section'           => $section,
					'priority'          => 25,
					'title'             => __( 'Meta', 'astra' ),
					'choices'           => array(
						'comments' => __( 'Comments', 'astra' ),
						'taxonomy' => __( 'Taxonomy', 'astra' ),
						'author'   => __( 'Author', 'astra' ),
						'date'     => __( 'Publish Date', 'astra' ),
					),
				),

				/**
				 * Option: Taxonomy Selection.
				 */
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[' . $section . '-taxonomy]',
					'default'    => astra_get_option( $section . '-taxonomy', '' ),
					'section'    => $section,
					'title'      => __( 'Select Taxonomy', 'astra' ),
					'type'       => 'control',
					'control'    => 'ast-select2',
					'priority'   => 26,
					'choices'    => $taxonomies,
					'context'    => array(
						Astra_Builder_Helper::$general_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-metadata]',
							'operator' => 'contains',
							'value'    => 'taxonomy',
						),
					),
				),

				/**
				 * Option: Banner Content Width.
				 */
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-image-type]',
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => $section,
					'default'    => astra_get_option( $section . '-banner-image-type', 'none' ),
					'priority'   => 30,
					'context'    => array(
						Astra_Builder_Helper::$general_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-layout]',
							'operator' => '===',
							'value'    => 'layout-2',
						),
					),
					'title'      => __( 'Container Background', 'astra' ),
					'choices'    => array(
						'none'     => __( 'None', 'astra' ),
						'custom'   => __( 'Custom', 'astra' ),
						'featured' => __( 'Featured Image', 'astra' ),
					),
					'divider'    => array( 'ast_class' => 'ast-top-divider' ),
					'responsive' => false,
					'renderAs'   => 'text',
				),

				/**
				 * Option: Featured Image Custom Banner BG.
				 */
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-custom-bg]',
					'default'   => astra_get_option( $section . '-banner-custom-bg', $responsive_bg_default ),
					'type'      => 'control',
					'control'   => 'ast-responsive-background',
					'section'   => $section,
					'title'     => __( 'Background', 'astra' ),
					'transport' => 'postMessage',
					'priority'  => 35,
					'context'   => array(
						Astra_Builder_Helper::$general_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-layout]',
							'operator' => '===',
							'value'    => 'layout-2',
						),
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-image-type]',
							'operator' => '===',
							'value'    => 'custom',
						),
					),
				),

				/**
				 * Option: Featured Image Overlay Color.
				 */
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-featured-overlay]',
					'type'     => 'control',
					'control'  => 'ast-color',
					'section'  => $section,
					'default'  => astra_get_option( $section . '-banner-featured-overlay', '' ),
					'priority' => 40,
					'title'    => __( 'Overlay Color', 'astra' ),
					'context'  => array(
						Astra_Builder_Helper::$general_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-layout]',
							'operator' => '===',
							'value'    => 'layout-2',
						),
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-image-type]',
							'operator' => '===',
							'value'    => 'featured',
						),
					),
				),

				/**
				 * Option: Horizontal Alignment.
				 */
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $section . '-horizontal-alignment]',
					'default'   => astra_get_option( $section . '-horizontal-alignment' ),
					'type'      => 'control',
					'control'   => 'ast-selector',
					'section'   => $section,
					'priority'  => 45,
					'title'     => __( 'Content Alignment', 'astra' ),
					'context'   => Astra_Builder_Helper::$general_tab,
					'transport' => 'postMessage',
					'choices'   => array(
						'left'   => 'align-left',
						'center' => 'align-center',
						'right'  => 'align-right',
					),
					'divider'   => array( 'ast_class' => 'ast-top-divider' ),
				),

				/**
				 * Option: Vertical Alignment
				 */
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[' . $section . '-vertical-alignment]',
					'default'    => astra_get_option( $section . '-vertical-alignment', 'center' ),
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => $section,
					'priority'   => 50,
					'title'      => __( 'Vertical Alignment', 'astra' ),
					'choices'    => array(
						'flex-start' => __( 'Top', 'astra' ),
						'center'     => __( 'Middle', 'astra' ),
						'flex-end'   => __( 'Bottom', 'astra' ),
					),
					'context'    => array(
						Astra_Builder_Helper::$general_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-layout]',
							'operator' => '===',
							'value'    => 'layout-2',
						),
					),
					'transport'  => 'postMessage',
					'renderAs'   => 'text',
					'responsive' => false,
				),

				/**
				 * Option: Elements gap.
				 */
				array(
					'name'        => ASTRA_THEME_SETTINGS . '[' . $section . '-elements-gap]',
					'type'        => 'control',
					'control'     => 'ast-slider',
					'section'     => $section,
					'transport'   => 'postMessage',
					'default'     => astra_get_option( $section . '-elements-gap', 10 ),
					'context'     => Astra_Builder_Helper::$design_tab,
					'priority'    => 1,
					'title'       => __( 'Inner Elements Spacing', 'astra' ),
					'suffix'      => 'px',
					'input_attrs' => array(
						'min'  => 0,
						'step' => 1,
						'max'  => 100,
					),
					'divider'     => array( 'ast_class' => 'ast-bottom-divider' ),
				),

				/**
				 * Option: Text Color
				 */
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-text-color]',
					'type'      => 'control',
					'control'   => 'ast-color',
					'section'   => $section,
					'default'   => astra_get_option( $section . '-banner-text-color' ),
					'priority'  => 5,
					'title'     => __( 'Text Color', 'astra' ),
					'transport' => 'postMessage',
					'context'   => Astra_Builder_Helper::$design_tab,
				),

				/**
				 * Option: Title Color
				 */
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-title-color]',
					'type'      => 'control',
					'control'   => 'ast-color',
					'section'   => $section,
					'default'   => astra_get_option( $section . '-banner-title-color' ),
					'transport' => 'postMessage',
					'priority'  => 10,
					'title'     => __( 'Title Color', 'astra' ),
					'context'   => Astra_Builder_Helper::$design_tab,
				),

				/**
				 * Option: Link Color
				 */
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-link-color]',
					'type'      => 'control',
					'control'   => 'ast-color',
					'section'   => $section,
					'default'   => astra_get_option( $section . '-banner-link-color' ),
					'transport' => 'postMessage',
					'priority'  => 15,
					'title'     => __( 'Link Color', 'astra' ),
					'context'   => Astra_Builder_Helper::$design_tab,
				),

				/**
				 * Option: Link Hover Color
				 */
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-link-hover-color]',
					'type'      => 'control',
					'control'   => 'ast-color',
					'section'   => $section,
					'default'   => astra_get_option( $section . '-banner-link-hover-color' ),
					'transport' => 'postMessage',
					'priority'  => 20,
					'title'     => __( 'Link Hover Color', 'astra' ),
					'divider'   => array( 'ast_class' => 'ast-bottom-divider' ),
					'context'   => Astra_Builder_Helper::$design_tab,
				),

				array(
					'name'              => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-margin]',
					'default'           => astra_get_option( $section . '-banner-margin', $spacing_default ),
					'type'              => 'control',
					'control'           => 'ast-responsive-spacing',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_spacing' ),
					'section'           => $section,
					'title'             => __( 'Margin', 'astra' ),
					'linked_choices'    => true,
					'transport'         => 'postMessage',
					'unit_choices'      => array( 'px', 'em', '%' ),
					'choices'           => array(
						'top'    => __( 'Top', 'astra' ),
						'right'  => __( 'Right', 'astra' ),
						'bottom' => __( 'Bottom', 'astra' ),
						'left'   => __( 'Left', 'astra' ),
					),
					'context'           => Astra_Builder_Helper::$design_tab,
					'priority'          => 100,
					'connected'         => false,
				),

				array(
					'name'              => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-padding]',
					'default'           => astra_get_option( $section . '-banner-padding', $spacing_default ),
					'type'              => 'control',
					'control'           => 'ast-responsive-spacing',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_spacing' ),
					'section'           => $section,
					'title'             => __( 'Padding', 'astra' ),
					'linked_choices'    => true,
					'transport'         => 'postMessage',
					'unit_choices'      => array( 'px', 'em', '%' ),
					'choices'           => array(
						'top'    => __( 'Top', 'astra' ),
						'right'  => __( 'Right', 'astra' ),
						'bottom' => __( 'Bottom', 'astra' ),
						'left'   => __( 'Left', 'astra' ),
					),
					'context'           => Astra_Builder_Helper::$design_tab,
					'priority'          => 120,
					'connected'         => false,
				),
			);

			$configurations = array_merge( $configurations, $_configs );
		}

		return $configurations;
	}
}

/**
 * Kicking this off by creating new object.
 */
new Astra_Posts_Single_Strctures_Configs();
