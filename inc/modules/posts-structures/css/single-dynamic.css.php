<?php
/**
 * Post Structures - Dynamic CSS
 *
 * @package Astra
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Post Structures
 */
add_filter( 'astra_dynamic_theme_css', 'astra_post_single_structure_dynamic_css' );

/**
 * Dynamic CSS
 *
 * @param  string $dynamic_css          Astra Dynamic CSS.
 * @param  string $dynamic_css_filtered Astra Dynamic CSS Filters.
 * @return String Generated dynamic CSS for Post Structures.
 *
 * @since x.x.x
 */
function astra_post_single_structure_dynamic_css( $dynamic_css, $dynamic_css_filtered = '' ) {

	$current_post_type    = strval( get_post_type() );
	$supported_post_types = Astra_Posts_Structure_Loader::get_supported_post_types();

	if ( ! is_singular( $current_post_type ) ) {
		return $dynamic_css;
	}
	if ( ! in_array( $current_post_type, $supported_post_types ) ) {
		return $dynamic_css;
	}
	if ( false === astra_get_option( 'ast-single-' . $current_post_type . '-title', true ) ) {
		return $dynamic_css;
	}

	$layout_type     = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-layout', 'layout-1' );
	$layout_2_active = ( 'layout-2' === $layout_type ) ? true : false;

	if ( $layout_2_active ) {
		$selector = '.ast-single-entry-banner[data-post-type="' . $current_post_type . '"]';
	} elseif ( 'layout-1' === $layout_type && 'product' === $current_post_type ) {
		// For specific post types layout-1 is different, that's why adding this compatibility. Ex: Single Product.
		$selector = '.ast-single-entry-banner[data-post-type="' . $current_post_type . '"]';
	} else {
		$selector = '.entry-header';
	}

	$horz_alignment   = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-horizontal-alignment' );
	$desk_h_alignment = ( isset( $horz_alignment['desktop'] ) ) ? $horz_alignment['desktop'] : '';
	$tab_h_alignment  = ( isset( $horz_alignment['tablet'] ) ) ? $horz_alignment['tablet'] : '';
	$mob_h_alignment  = ( isset( $horz_alignment['mobile'] ) ) ? $horz_alignment['mobile'] : '';

	$banner_padding = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-banner-padding' );
	$banner_margin  = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-banner-margin' );

	$text_color       = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-banner-text-color' );
	$title_color      = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-banner-title-color' );
	$link_color       = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-banner-link-color' );
	$link_hover_color = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-banner-link-hover-color' );

	$elements_gap       = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-elements-gap', 10 );
	$banner_height      = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-banner-height' );
	$desk_banner_height = ( $layout_2_active && isset( $banner_height['desktop'] ) ) ? astra_get_css_value( $banner_height['desktop'], 'px' ) : '';
	$tab_banner_height  = ( $layout_2_active && isset( $banner_height['tablet'] ) ) ? astra_get_css_value( $banner_height['tablet'], 'px' ) : '';
	$mob_banner_height  = ( $layout_2_active && isset( $banner_height['mobile'] ) ) ? astra_get_css_value( $banner_height['mobile'], 'px' ) : '';

	$vert_alignment = ( $layout_2_active ) ? astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-vertical-alignment', 'center' ) : 'center';
	$width_type     = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-banner-width-type', 'fullwidth' );
	$custom_width   = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-banner-custom-width', 1200 );

	$single_structure        = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-structure', 'page' === $current_post_type ? array( 'ast-dynamic-single-' . $current_post_type . '-image', 'ast-dynamic-single-' . $current_post_type . '-title' ) : array( 'ast-dynamic-single-' . $current_post_type . '-title', 'ast-dynamic-single-' . $current_post_type . '-meta' ) );
	$use_featured_background = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-featured-as-background', false );
	$custom_background       = astra_get_option(
		'ast-dynamic-single-' . $current_post_type . '-banner-background',
		array(
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
		)
	);

	// Banner Text typography dynamic stylings.
	$banner_text_font_family = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-text-font-family' );
	$banner_text_font_weight = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-text-font-weight' );
	$banner_text_font_size   = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-text-font-size' );
	$banner_text_line_height = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-text-line-height' );
	$banner_text_transform   = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-text-transform' );

	// Banner Title typography dynamic stylings.
	$banner_title_font_family = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-title-font-family' );
	$banner_title_font_weight = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-title-font-weight' );
	$banner_title_font_size   = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-title-font-size' );
	$banner_title_line_height = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-title-line-height' );
	$banner_title_transform   = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-title-text-transform' );

	// Banner Meta typography dynamic stylings.
	$banner_meta_font_family = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-meta-font-family' );
	$banner_meta_font_weight = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-meta-font-weight' );
	$banner_meta_font_size   = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-meta-font-size' );
	$banner_meta_line_height = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-meta-line-height' );
	$banner_meta_transform   = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-meta-transform' );

	$css_output_min_tablet  = array();
	$narrow_container_width = astra_get_option( 'narrow-container-max-width', apply_filters( 'astra_narrow_container_width', 750 ) );

	// Few settings from banner section are also applicable to 'layout-1' so adding this condition & compatibility.
	if ( 'layout-1' === $layout_type ) {
		/**
		 * Desktop CSS.
		 */
		$css_output_desktop = array(
			$selector                               => array(
				'text-align'     => $desk_h_alignment,
				'padding-top'    => astra_responsive_spacing( $banner_padding, 'top', 'desktop' ),
				'padding-right'  => astra_responsive_spacing( $banner_padding, 'right', 'desktop' ),
				'padding-bottom' => astra_responsive_spacing( $banner_padding, 'bottom', 'desktop' ),
				'padding-left'   => astra_responsive_spacing( $banner_padding, 'left', 'desktop' ),
				'margin-top'     => astra_responsive_spacing( $banner_margin, 'top', 'desktop' ),
				'margin-right'   => astra_responsive_spacing( $banner_margin, 'right', 'desktop' ),
				'margin-bottom'  => astra_responsive_spacing( $banner_margin, 'bottom', 'desktop' ),
				'margin-left'    => astra_responsive_spacing( $banner_margin, 'left', 'desktop' ),
			),
			$selector . ', ' . $selector . ' *'     => array(
				'color'          => esc_attr( $text_color ),
				'font-family'    => astra_get_css_value( $banner_text_font_family, 'font' ),
				'font-weight'    => astra_get_css_value( $banner_text_font_weight, 'font' ),
				'font-size'      => astra_responsive_font( $banner_text_font_size, 'desktop' ),
				'line-height'    => esc_attr( $banner_text_line_height ),
				'text-transform' => esc_attr( $banner_text_transform ),
			),
			$selector . ' .entry-title'             => array(
				'color'          => esc_attr( $title_color ),
				'font-family'    => astra_get_css_value( $banner_title_font_family, 'font' ),
				'font-weight'    => astra_get_css_value( $banner_title_font_weight, 'font' ),
				'font-size'      => astra_responsive_font( $banner_title_font_size, 'desktop' ),
				'line-height'    => esc_attr( $banner_title_line_height ),
				'text-transform' => esc_attr( $banner_title_transform ),
			),
			$selector . ' .entry-meta, ' . $selector . ' .entry-meta *' => array(
				'font-family'    => astra_get_css_value( $banner_meta_font_family, 'font' ),
				'font-weight'    => astra_get_css_value( $banner_meta_font_weight, 'font' ),
				'font-size'      => astra_responsive_font( $banner_meta_font_size, 'desktop' ),
				'line-height'    => esc_attr( $banner_meta_line_height ),
				'text-transform' => esc_attr( $banner_meta_transform ),
			),
			$selector . ' a, ' . $selector . ' a *' => array(
				'color' => esc_attr( $link_color ),
			),
			$selector . ' a:hover, ' . $selector . ' a:hover *' => array(
				'color' => esc_attr( $link_hover_color ),
			),
		);
		/**
		 * Tablet CSS.
		 */
		$css_output_tablet = array(
			$selector                   => array(
				'text-align' => $tab_h_alignment,
			),
			$selector . ' .entry-title' => array(
				'font-size' => astra_responsive_font( $banner_title_font_size, 'tablet' ),
			),
			$selector . ' *'            => array(
				'font-size' => astra_responsive_font( $banner_text_font_size, 'tablet' ),
			),
			$selector . ' .entry-meta, ' . $selector . ' .entry-meta *' => array(
				'font-size' => astra_responsive_font( $banner_meta_font_size, 'tablet' ),
			),
		);

		/**
		 * Mobile CSS.
		 */
		$css_output_mobile = array(
			$selector                   => array(
				'text-align' => $mob_h_alignment,
			),
			$selector . ' .entry-title' => array(
				'font-size' => astra_responsive_font( $banner_title_font_size, 'mobile' ),
			),
			$selector . ' *'            => array(
				'font-size' => astra_responsive_font( $banner_text_font_size, 'mobile' ),
			),
			$selector . ' .entry-meta, ' . $selector . ' .entry-meta *' => array(
				'font-size' => astra_responsive_font( $banner_meta_font_size, 'mobile' ),
			),
		);
	} else {
		/**
		 * Desktop CSS.
		 */
		$css_output_desktop = array(
			$selector                                     => array(
				'text-align'      => $desk_h_alignment,
				'justify-content' => $vert_alignment,
				'min-height'      => $desk_banner_height,
				'padding-top'     => astra_responsive_spacing( $banner_padding, 'top', 'desktop' ),
				'padding-right'   => astra_responsive_spacing( $banner_padding, 'right', 'desktop' ),
				'padding-bottom'  => astra_responsive_spacing( $banner_padding, 'bottom', 'desktop' ),
				'padding-left'    => astra_responsive_spacing( $banner_padding, 'left', 'desktop' ),
				'margin-top'      => astra_responsive_spacing( $banner_margin, 'top', 'desktop' ),
				'margin-right'    => astra_responsive_spacing( $banner_margin, 'right', 'desktop' ),
				'margin-bottom'   => astra_responsive_spacing( $banner_margin, 'bottom', 'desktop' ),
				'margin-left'     => astra_responsive_spacing( $banner_margin, 'left', 'desktop' ),
			),
			$selector . '[data-banner-layout="layout-2"]' => astra_get_responsive_background_obj( $custom_background, 'desktop' ),
			$selector . ', ' . $selector . ' *'           => array(
				'color'          => esc_attr( $text_color ),
				'font-family'    => astra_get_css_value( $banner_text_font_family, 'font' ),
				'font-weight'    => astra_get_css_value( $banner_text_font_weight, 'font' ),
				'font-size'      => astra_responsive_font( $banner_text_font_size, 'desktop' ),
				'line-height'    => esc_attr( $banner_text_line_height ),
				'text-transform' => esc_attr( $banner_text_transform ),
			),
			$selector . ' .ast-container > *:not(:last-child)' => array(
				'margin-bottom' => $elements_gap . 'px',
			),
			'.ast-page-builder-template ' . $selector . ' .ast-container' => array(
				'max-width' => '100%',
			),
			$selector . ' .ast-container'                 => array(
				'width' => '100%',
			),
			$selector . ' .entry-title'                   => array(
				'color'          => esc_attr( $title_color ),
				'font-family'    => astra_get_css_value( $banner_title_font_family, 'font' ),
				'font-weight'    => astra_get_css_value( $banner_title_font_weight, 'font' ),
				'font-size'      => astra_responsive_font( $banner_title_font_size, 'desktop' ),
				'line-height'    => esc_attr( $banner_title_line_height ),
				'text-transform' => esc_attr( $banner_title_transform ),
				'margin-bottom'  => '0',
			),
			$selector . ' .entry-meta, ' . $selector . ' .entry-meta *' => array(
				'font-family'    => astra_get_css_value( $banner_meta_font_family, 'font' ),
				'font-weight'    => astra_get_css_value( $banner_meta_font_weight, 'font' ),
				'font-size'      => astra_responsive_font( $banner_meta_font_size, 'desktop' ),
				'line-height'    => esc_attr( $banner_meta_line_height ),
				'text-transform' => esc_attr( $banner_meta_transform ),
			),
			$selector . ' a, ' . $selector . ' a *'       => array(
				'color' => esc_attr( $link_color ),
			),
			$selector . ' a:hover, ' . $selector . ' a:hover *' => array(
				'color' => esc_attr( $link_hover_color ),
			),
		);

		/**
		 * Min tablet width CSS.
		 */
		$css_output_min_tablet = array(
			'.ast-narrow-container ' . $selector . ' .ast-container' => array(
				'max-width'     => $narrow_container_width . 'px',
				'padding-left'  => '0',
				'padding-right' => '0',
			),
		);

		/**
		 * Tablet CSS.
		 */
		$css_output_tablet = array(
			$selector                                     => array(
				'text-align'     => $tab_h_alignment,
				'min-height'     => $tab_banner_height,
				'padding-top'    => astra_responsive_spacing( $banner_padding, 'top', 'tablet' ),
				'padding-right'  => astra_responsive_spacing( $banner_padding, 'right', 'tablet' ),
				'padding-bottom' => astra_responsive_spacing( $banner_padding, 'bottom', 'tablet' ),
				'padding-left'   => astra_responsive_spacing( $banner_padding, 'left', 'tablet' ),
				'margin-top'     => astra_responsive_spacing( $banner_margin, 'top', 'tablet' ),
				'margin-right'   => astra_responsive_spacing( $banner_margin, 'right', 'tablet' ),
				'margin-bottom'  => astra_responsive_spacing( $banner_margin, 'bottom', 'tablet' ),
				'margin-left'    => astra_responsive_spacing( $banner_margin, 'left', 'tablet' ),
			),
			$selector . '[data-banner-layout="layout-2"]' => astra_get_responsive_background_obj( $custom_background, 'tablet' ),
			$selector . ' .entry-title'                   => array(
				'font-size' => astra_responsive_font( $banner_title_font_size, 'tablet' ),
			),
			$selector . ' .ast-container'                 => array(
				'padding-left'  => '0',
				'padding-right' => '0',
			),
			$selector . ' *'                              => array(
				'font-size' => astra_responsive_font( $banner_text_font_size, 'tablet' ),
			),
			$selector . ' .entry-meta, ' . $selector . ' .entry-meta *' => array(
				'font-size' => astra_responsive_font( $banner_meta_font_size, 'tablet' ),
			),
		);

		/**
		 * Mobile CSS.
		 */
		$css_output_mobile = array(
			$selector                                     => array(
				'text-align'     => $mob_h_alignment,
				'min-height'     => $mob_banner_height,
				'padding-top'    => astra_responsive_spacing( $banner_padding, 'top', 'mobile' ),
				'padding-right'  => astra_responsive_spacing( $banner_padding, 'right', 'mobile' ),
				'padding-bottom' => astra_responsive_spacing( $banner_padding, 'bottom', 'mobile' ),
				'padding-left'   => astra_responsive_spacing( $banner_padding, 'left', 'mobile' ),
				'margin-top'     => astra_responsive_spacing( $banner_margin, 'top', 'mobile' ),
				'margin-right'   => astra_responsive_spacing( $banner_margin, 'right', 'mobile' ),
				'margin-bottom'  => astra_responsive_spacing( $banner_margin, 'bottom', 'mobile' ),
				'margin-left'    => astra_responsive_spacing( $banner_margin, 'left', 'mobile' ),
			),
			$selector . '[data-banner-layout="layout-2"]' => astra_get_responsive_background_obj( $custom_background, 'mobile' ),
			$selector . ' .entry-title'                   => array(
				'font-size' => astra_responsive_font( $banner_title_font_size, 'mobile' ),
			),
			$selector . ' *'                              => array(
				'font-size' => astra_responsive_font( $banner_text_font_size, 'mobile' ),
			),
			$selector . ' .entry-meta, ' . $selector . ' .entry-meta *' => array(
				'font-size' => astra_responsive_font( $banner_meta_font_size, 'mobile' ),
			),
		);

		if ( ( $layout_2_active && 'custom' === $width_type ) || is_customize_preview() ) {
			$css_output_desktop[ $selector . '[data-banner-width-type="custom"]' ]['max-width'] = $custom_width . 'px';
		}

		if ( in_array( 'ast-dynamic-single-' . $current_post_type . '-image', $single_structure ) && $use_featured_background ) {
			/** @psalm-suppress PossiblyFalseArgument */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			$feat_image_src = wp_get_attachment_url( get_post_thumbnail_id( get_the_ID() ) );
			/** @psalm-suppress PossiblyFalseArgument */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			if ( $feat_image_src ) {
				$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ] = array(
					'background'            => 'url( ' . esc_url( $feat_image_src ) . ' )',
					'background-repeat'     => 'no-repeat',
					'background-attachment' => 'scroll',
					'background-position'   => 'center center',
					'background-size'       => 'cover',
				);
				$overlay_color = astra_get_option( 'ast-dynamic-single-' . $current_post_type . '-banner-featured-overlay', '' );
				if ( '' !== $overlay_color && 'unset' !== $overlay_color ) {
					$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ]['background']            = 'url( ' . esc_url( $feat_image_src ) . ' ) ' . $overlay_color;
					$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ]['background-blend-mode'] = 'multiply';
				}
			}
		}
	}

	$site_content_width = astra_get_option( 'site-content-width', 1200 );
	$dynamic_css       .= '
		.ast-single-entry-banner {
			-js-display: flex;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			position: relative;
			padding: 50px;
			background: #eeeeee;
		}
		.ast-single-entry-banner[data-banner-layout="layout-1"] {
			max-width: ' . astra_get_css_value( $site_content_width, 'px' ) . ';
			background: inherit;
			padding: 20px 0;
		}
		.ast-single-entry-banner[data-banner-width-type="custom"] {
			margin: 0 auto;
			width: 100%;
		}
		.ast-single-entry-banner + .site-content .entry-header {
			margin-bottom: 0;
		}
	';

	/* Parse CSS from array() */
	$dynamic_css .= astra_parse_css( $css_output_desktop );
	$dynamic_css .= astra_parse_css( $css_output_min_tablet, astra_get_tablet_breakpoint( '', 1 ) );
	$dynamic_css .= astra_parse_css( $css_output_tablet, '', astra_get_tablet_breakpoint() );
	$dynamic_css .= astra_parse_css( $css_output_mobile, '', astra_get_mobile_breakpoint() );

	return $dynamic_css;
}
