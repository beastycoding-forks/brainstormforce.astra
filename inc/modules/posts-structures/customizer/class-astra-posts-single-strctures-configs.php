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

		$post_types                 = Astra_Posts_Strctures_Loader::get_supported_post_types();
		$responsive_bg_default      = array(
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
		$spacing_default            = array(
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
		$font_size_defaults         = array(
			'desktop'      => '',
			'tablet'       => '',
			'mobile'       => '',
			'desktop-unit' => 'px',
			'tablet-unit'  => 'px',
			'mobile-unit'  => 'px',
		);
		$responsive_slider_defaults = array(
			'desktop' => '',
			'tablet'  => '',
			'mobile'  => '',
		);

		foreach ( $post_types as $index => $post_type ) {

			$raw_taxonomies     = array_diff(
				get_object_taxonomies( $post_type ),
				array( 'post_format' )
			);
			$raw_taxonomies[''] = __( 'Select', 'astra' );

			// Filter out taxonomies in index-value format.
			$taxonomies = array();
			foreach ( $raw_taxonomies as $index => $value ) {
				if ( '' === $index ) {
					$taxonomies[''] = $value;
				} else {
					$taxonomies[ $value ] = ucfirst( $value );
				}
			}
			$taxonomies = array_reverse( $taxonomies );

			$section = 'ast-single-' . $post_type;

			if ( 'product' === $post_type ) {
				$parent_section = 'section-woo-shop-single';
			} elseif ( 'post' === $post_type ) {
				$taxonomies['category-tag'] = __( 'Category + Tag', 'astra' );
				$parent_section             = 'section-blog-single';
			} else {
				$parent_section = 'section-posttype-' . $post_type;
			}

			$clone_limit = 3;
			$to_clone    = true;
			if ( absint( astra_get_option( $section . '-taxonomy-clone-tracker', 1 ) ) === $clone_limit ) {
				$to_clone = false;
			}

			$taxonomy_meta[ $section . '-taxonomy' ]   = array(
				'clone'         => $to_clone,
				'is_parent'     => true,
				'main_index'    => $section . '-taxonomy',
				'clone_limit'   => $clone_limit,
				'clone_tracker' => ASTRA_THEME_SETTINGS . '[' . $section . '-taxonomy-clone-tracker]',
				'title'         => __( 'Taxonomy', 'astra' ),
			);
			$taxonomy_meta[ $section . '-taxonomy-1' ] = array(
				'clone'         => $to_clone,
				'is_parent'     => true,
				'main_index'    => $section . '-taxonomy',
				'clone_limit'   => $clone_limit,
				'clone_tracker' => ASTRA_THEME_SETTINGS . '[' . $section . '-taxonomy-clone-tracker]',
				'title'         => __( 'Taxonomy', 'astra' ),
			);
			$taxonomy_meta[ $section . '-taxonomy-2' ] = array(
				'clone'         => $to_clone,
				'is_parent'     => true,
				'main_index'    => $section . '-taxonomy',
				'clone_limit'   => $clone_limit,
				'clone_tracker' => ASTRA_THEME_SETTINGS . '[' . $section . '-taxonomy-clone-tracker]',
				'title'         => __( 'Taxonomy', 'astra' ),
			);

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
					'title'             => __( 'Title Layout', 'astra' ),
					'choices'           => array(
						'layout-1' => array(
							'label' => __( 'Layout 1', 'astra' ),
							'path'  => Astra_Builder_UI_Controller::fetch_svg_icon( 'post-banner' ),
						),
						'layout-2' => array(
							'label' => __( 'Layout 2', 'astra' ),
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
					'name'      => ASTRA_THEME_SETTINGS . '[' . $section . '-taxonomy-clone-tracker]',
					'section'   => $section,
					'type'      => 'control',
					'control'   => 'ast-hidden',
					'priority'  => 22,
					'transport' => 'postMessage',
					'partial'   => false,
					'default'   => astra_get_option( $section . '-taxonomy-clone-tracker', 1 ),
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
					'choices'           => array_merge(
						array(
							'comments' => __( 'Comments', 'astra' ),
							'author'   => __( 'Author', 'astra' ),
							'date'     => __( 'Publish Date', 'astra' ),
						),
						$taxonomy_meta
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
					'priority'  => 27,
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
					'priority'   => 28,
					'title'      => __( 'Vertical Alignment', 'astra' ),
					'choices'    => array(
						'flex-start' => __( 'Top', 'astra' ),
						'center'     => __( 'Middle', 'astra' ),
						'flex-end'   => __( 'Bottom', 'astra' ),
					),
					'divider'    => array( 'ast_class' => 'ast-top-divider' ),
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
				 * Option: Container min height.
				 */
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-height]',
					'type'              => 'control',
					'control'           => 'ast-responsive-slider',
					'section'           => $section,
					'transport'         => 'postMessage',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_slider' ),
					'default'           => astra_get_option( $section . '-banner-height', $responsive_slider_defaults ),
					'context'           => array(
						Astra_Builder_Helper::$design_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-layout]',
							'operator' => '===',
							'value'    => 'layout-2',
						),
					),
					'priority'          => 1,
					'title'             => __( 'Banner Min Height', 'astra' ),
					'suffix'            => 'px',
					'input_attrs'       => array(
						'min'  => 0,
						'step' => 1,
						'max'  => 1000,
					),
					'divider'           => array( 'ast_class' => 'ast-bottom-divider' ),
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
					'priority'    => 5,
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
				 * Option: Title Color
				 */
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-title-color]',
					'type'      => 'control',
					'control'   => 'ast-color',
					'section'   => $section,
					'default'   => astra_get_option( $section . '-banner-title-color' ),
					'transport' => 'postMessage',
					'priority'  => 5,
					'title'     => __( 'Title Color', 'astra' ),
					'context'   => Astra_Builder_Helper::$design_tab,
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
					'priority'  => 10,
					'title'     => __( 'Text Color', 'astra' ),
					'transport' => 'postMessage',
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
					'context'   => Astra_Builder_Helper::$design_tab,
				),

				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-title-typography-group]',
					'type'      => 'control',
					'priority'  => 25,
					'control'   => 'ast-settings-group',
					'context'   => array(
						Astra_Builder_Helper::$design_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-structure]',
							'operator' => 'contains',
							'value'    => $section . '-title',
						),
					),
					'divider'   => array( 'ast_class' => 'ast-top-divider' ),
					'title'     => __( 'Title Font', 'astra' ),
					'section'   => $section,
					'transport' => 'postMessage',
				),

				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-text-typography-group]',
					'type'      => 'control',
					'priority'  => 30,
					'control'   => 'ast-settings-group',
					'context'   => Astra_Builder_Helper::$design_tab,
					'title'     => __( 'Text Font', 'astra' ),
					'section'   => $section,
					'transport' => 'postMessage',
				),

				/**
				 * Option: Text Font Family
				 */
				array(
					'name'      => $section . '-text-font-family',
					'parent'    => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-text-typography-group]',
					'section'   => $section,
					'type'      => 'sub-control',
					'control'   => 'ast-font',
					'font_type' => 'ast-font-family',
					'default'   => astra_get_option( $section . '-text-font-family', 'inherit' ),
					'title'     => __( 'Family', 'astra' ),
					'connect'   => ASTRA_THEME_SETTINGS . '[' . $section . '-text-font-weight]',
				),

				/**
				 * Option: Text Font Size
				 */

				array(
					'name'              => $section . '-text-font-size',
					'parent'            => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-text-typography-group]',
					'section'           => $section,
					'type'              => 'sub-control',
					'control'           => 'ast-responsive-slider',
					'default'           => astra_get_option( $section . '-text-font-size', $font_size_defaults ),
					'transport'         => 'postMessage',
					'title'             => __( 'Size', 'astra' ),
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_slider' ),
					'suffix'            => array( 'px', 'em' ),
					'input_attrs'       => array(
						'px' => array(
							'min'  => 0,
							'step' => 1,
							'max'  => 100,
						),
						'em' => array(
							'min'  => 0,
							'step' => 1,
							'max'  => 20,
						),
					),
				), 
				/**
				 * Option: Text Font Weight
				 */
				array(
					'name'              => $section . '-text-font-weight',
					'parent'            => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-text-typography-group]',
					'section'           => $section,
					'type'              => 'sub-control',
					'control'           => 'ast-font',
					'font_type'         => 'ast-font-weight',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_font_weight' ),
					'default'           => astra_get_option( $section . '-text-font-weight', 'inherit' ),
					'title'             => __( 'Weight', 'astra' ),
					'connect'           => $section . '-text-font-family',
				),

				/**
				 * Option: Text Text Transform
				 */
				array(
					'name'      => $section . '-text-transform',
					'parent'    => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-text-typography-group]',
					'section'   => $section,
					'type'      => 'sub-control',
					'title'     => __( 'Text Transform', 'astra' ),
					'default'   => astra_get_option( $section . '-text-transform', '' ),
					'transport' => 'postMessage',
					'control'   => 'ast-select',
					'choices'   => array(
						''           => __( 'Inherit', 'astra' ),
						'none'       => __( 'None', 'astra' ),
						'capitalize' => __( 'Capitalize', 'astra' ),
						'uppercase'  => __( 'Uppercase', 'astra' ),
						'lowercase'  => __( 'Lowercase', 'astra' ),
					),
				),

				/**
				 * Option: Text Line Height
				 */
				array(
					'name'              => $section . '-text-line-height',
					'parent'            => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-text-typography-group]',
					'section'           => $section,
					'type'              => 'sub-control',
					'transport'         => 'postMessage',
					'default'           => astra_get_option( $section . '-text-line-height' ),
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_number_n_blank' ),
					'title'             => __( 'Line Height', 'astra' ),
					'control'           => 'ast-slider',
					'suffix'            => '',
					'input_attrs'       => array(
						'min'  => 1,
						'step' => 1,
						'max'  => 5,
					),
				),

				/**
				 * Option: Title Font Family
				 */
				array(
					'name'      => $section . '-title-font-family',
					'parent'    => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-title-typography-group]',
					'section'   => $section,
					'type'      => 'sub-control',
					'control'   => 'ast-font',
					'font_type' => 'ast-font-family',
					'default'   => astra_get_option( $section . '-title-font-family', 'inherit' ),
					'title'     => __( 'Family', 'astra' ),
					'connect'   => ASTRA_THEME_SETTINGS . '[' . $section . '-title-font-weight]',
				),

				/**
				 * Option: Title Font Size
				 */

				array(
					'name'              => $section . '-title-font-size',
					'parent'            => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-title-typography-group]',
					'section'           => $section,
					'type'              => 'sub-control',
					'control'           => 'ast-responsive-slider',
					'default'           => astra_get_option( $section . '-title-font-size', $font_size_defaults ),
					'transport'         => 'postMessage',
					'title'             => __( 'Size', 'astra' ),
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_slider' ),
					'suffix'            => array( 'px', 'em' ),
					'input_attrs'       => array(
						'px' => array(
							'min'  => 0,
							'step' => 1,
							'max'  => 100,
						),
						'em' => array(
							'min'  => 0,
							'step' => 1,
							'max'  => 20,
						),
					),
				),

				/**
				 * Option: Title Font Weight
				 */
				array(
					'name'              => $section . '-title-font-weight',
					'parent'            => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-title-typography-group]',
					'section'           => $section,
					'type'              => 'sub-control',
					'control'           => 'ast-font',
					'font_type'         => 'ast-font-weight',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_font_weight' ),
					'default'           => astra_get_option( $section . '-title-font-weight', 'inherit' ),
					'title'             => __( 'Weight', 'astra' ),
					'connect'           => $section . '-title-font-family',
				),

				/**
				 * Option: Title Text Transform
				 */
				array(
					'name'      => $section . '-title-text-transform',
					'parent'    => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-title-typography-group]',
					'section'   => $section,
					'type'      => 'sub-control',
					'title'     => __( 'Text Transform', 'astra' ),
					'default'   => astra_get_option( $section . '-title-text-transform', '' ),
					'transport' => 'postMessage',
					'control'   => 'ast-select',
					'choices'   => array(
						''           => __( 'Inherit', 'astra' ),
						'none'       => __( 'None', 'astra' ),
						'capitalize' => __( 'Capitalize', 'astra' ),
						'uppercase'  => __( 'Uppercase', 'astra' ),
						'lowercase'  => __( 'Lowercase', 'astra' ),
					),
				),

				/**
				 * Option: Title Line Height
				 */
				array(
					'name'              => $section . '-title-line-height',
					'parent'            => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-title-typography-group]',
					'section'           => $section,
					'type'              => 'sub-control',
					'transport'         => 'postMessage',
					'default'           => astra_get_option( $section . '-title-line-height' ),
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_number_n_blank' ),
					'title'             => __( 'Line Height', 'astra' ),
					'control'           => 'ast-slider',
					'suffix'            => '',
					'input_attrs'       => array(
						'min'  => 1,
						'step' => 1,
						'max'  => 5,
					),
				),

				array(
					'name'      => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-meta-typography-group]',
					'type'      => 'control',
					'priority'  => 35,
					'control'   => 'ast-settings-group',
					'context'   => array(
						Astra_Builder_Helper::$design_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-structure]',
							'operator' => 'contains',
							'value'    => $section . '-meta',
						),
					),
					'title'     => __( 'Meta Font', 'astra' ),
					'section'   => $section,
					'transport' => 'postMessage',
				),

				/**
				 * Option: Meta Font Family
				 */
				array(
					'name'      => $section . '-meta-font-family',
					'parent'    => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-meta-typography-group]',
					'section'   => $section,
					'type'      => 'sub-control',
					'control'   => 'ast-font',
					'font_type' => 'ast-font-family',
					'default'   => astra_get_option( $section . '-meta-font-family', 'inherit' ),
					'title'     => __( 'Family', 'astra' ),
					'connect'   => ASTRA_THEME_SETTINGS . '[' . $section . '-meta-font-weight]',
				),

				/**
				 * Option: Meta Font Size
				 */
		

				array(
					'name'              => $section . '-meta-font-size',
					'parent'            => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-meta-typography-group]',
					'section'           => $section,
					'type'              => 'sub-control',
					'control'           => 'ast-responsive-slider',
					'default'           => astra_get_option( $section . '-meta-font-size', $font_size_defaults ),
					'transport'         => 'postMessage',
					'title'             => __( 'Size', 'astra' ),
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_slider' ),
					'suffix'            => array( 'px', 'em' ),
					'input_attrs'       => array(
						'px' => array(
							'min'  => 0,
							'step' => 1,
							'max'  => 100,
						),
						'em' => array(
							'min'  => 0,
							'step' => 1,
							'max'  => 20,
						),
					),
				), 
				/**
				 * Option: Meta Font Weight
				 */
				array(
					'name'              => $section . '-meta-font-weight',
					'parent'            => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-meta-typography-group]',
					'section'           => $section,
					'type'              => 'sub-control',
					'control'           => 'ast-font',
					'font_type'         => 'ast-font-weight',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_font_weight' ),
					'default'           => astra_get_option( $section . '-meta-font-weight', 'inherit' ),
					'title'             => __( 'Weight', 'astra' ),
					'connect'           => $section . '-meta-font-family',
				),

				/**
				 * Option: Meta Transform
				 */
				array(
					'name'      => $section . '-meta-transform',
					'parent'    => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-meta-typography-group]',
					'section'   => $section,
					'type'      => 'sub-control',
					'title'     => __( 'Text Transform', 'astra' ),
					'default'   => astra_get_option( $section . '-meta-transform', '' ),
					'transport' => 'postMessage',
					'control'   => 'ast-select',
					'choices'   => array(
						''           => __( 'Inherit', 'astra' ),
						'none'       => __( 'None', 'astra' ),
						'capitalize' => __( 'Capitalize', 'astra' ),
						'uppercase'  => __( 'Uppercase', 'astra' ),
						'lowercase'  => __( 'Lowercase', 'astra' ),
					),
				),

				/**
				 * Option: Meta Line Height
				 */
				array(
					'name'              => $section . '-meta-line-height',
					'parent'            => ASTRA_THEME_SETTINGS . '[' . $section . '-banner-meta-typography-group]',
					'section'           => $section,
					'type'              => 'sub-control',
					'transport'         => 'postMessage',
					'default'           => astra_get_option( $section . '-meta-line-height' ),
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_number_n_blank' ),
					'title'             => __( 'Line Height', 'astra' ),
					'control'           => 'ast-slider',
					'suffix'            => '',
					'input_attrs'       => array(
						'min'  => 1,
						'step' => 1,
						'max'  => 5,
					),
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
					'divider'           => array( 'ast_class' => 'ast-top-divider' ),
					'unit_choices'      => array( 'px', 'em', '%' ),
					'choices'           => array(
						'top'    => __( 'Top', 'astra' ),
						'right'  => __( 'Right', 'astra' ),
						'bottom' => __( 'Bottom', 'astra' ),
						'left'   => __( 'Left', 'astra' ),
					),
					'context'           => array(
						Astra_Builder_Helper::$design_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-layout]',
							'operator' => '===',
							'value'    => 'layout-2',
						),
					),
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
					'context'           => array(
						Astra_Builder_Helper::$design_tab_config,
						'relation' => 'AND',
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[' . $section . '-layout]',
							'operator' => '===',
							'value'    => 'layout-2',
						),
					),
					'priority'          => 120,
					'connected'         => false,
				),
			);

			for ( $index = 1; $index <= $clone_limit; $index++ ) {

				$control_suffix = ( 1 === $index ) ? '' : '-' . ( $index - 1 );

				/**
				 * Option: Taxonomy Selection.
				 */
				$_configs[] = array(
					'name'       => $section . '-taxonomy-' . $control_suffix,
					'parent'     => ASTRA_THEME_SETTINGS . '[' . $section . '-metadata]',
					'default'    => astra_get_option( $section . '-taxonomy-' . $control_suffix ),
					'linked'     => $section . '-taxonomy' . $control_suffix,
					'type'       => 'sub-control',
					'control'    => 'ast-select',
					'section'    => $section,
					'priority'   => 5,
					'title'      => __( 'Select Taxonomy', 'astra' ),
					'choices'    => $taxonomies,
					'responsive' => false,
				);
			}

			$configurations = array_merge( $configurations, $_configs );
		}

		return $configurations;
	}
}

/**
 * Kicking this off by creating new object.
 */
new Astra_Posts_Single_Strctures_Configs();
