<?php
/**
 * Post Strctures - Archive Dynamic CSS
 *
 * @package Astra
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Post Strctures
 */
add_filter( 'astra_dynamic_theme_css', 'astra_post_archive_strcture_dynamic_css' );

/**
 * Archive Dynamic CSS
 *
 * @param  string $dynamic_css          Astra Dynamic CSS.
 * @param  string $dynamic_css_filtered Astra Dynamic CSS Filters.
 * @return String Generated dynamic CSS for Post Strctures.
 *
 * @since x.x.x
 */
function astra_post_archive_strcture_dynamic_css( $dynamic_css, $dynamic_css_filtered = '' ) {

	$post_types        = Astra_Posts_Strctures_Loader::get_supported_post_types();
	$static_css_loaded = false;

	global $post;
	if ( is_null( $post ) ) {
		return $dynamic_css;
	}
	$active_post_type = $post->post_type;

	foreach ( $post_types as $index => $post_type ) {

		if ( $active_post_type !== $post_type ) {
			continue;
		}

		$layout   = astra_get_option( 'ast-archive-' . $post_type . '-layout', 'layout-1' );
		$selector = '.ast-archive-entry-banner[data-post-type="' . $post_type . '"]';

		$horz_alignment    = astra_get_option( 'ast-archive-' . $post_type . '-horizontal-alignment' );
		$deskt_h_alignment = ( isset( $horz_alignment['desktop'] ) ) ? $horz_alignment['desktop'] : '';
		$tab_h_alignment   = ( isset( $horz_alignment['tablet'] ) ) ? $horz_alignment['tablet'] : '';
		$mob_h_alignment   = ( isset( $horz_alignment['mobile'] ) ) ? $horz_alignment['mobile'] : '';

		if ( 'layout-1' === $layout ) {
			$deskt_h_alignment = ( '' !== $deskt_h_alignment ) ? $deskt_h_alignment : 'left';
			$tab_h_alignment   = ( '' !== $tab_h_alignment ) ? $tab_h_alignment : 'left';
			$mob_h_alignment   = ( '' !== $mob_h_alignment ) ? $mob_h_alignment : 'left';
		}

		$elements_gap   = astra_get_option( 'ast-archive-' . $post_type . '-elements-gap', 10 );
		$banner_padding = astra_get_option( 'ast-archive-' . $post_type . '-banner-padding' );
		$banner_margin  = astra_get_option( 'ast-archive-' . $post_type . '-banner-margin' );

		$text_color       = astra_get_option( 'ast-archive-' . $post_type . '-banner-text-color' );
		$title_color      = astra_get_option( 'ast-archive-' . $post_type . '-banner-title-color' );
		$link_color       = astra_get_option( 'ast-archive-' . $post_type . '-banner-link-color' );
		$link_hover_color = astra_get_option( 'ast-archive-' . $post_type . '-banner-link-hover-color' );

		$vert_alignment  = ( 'layout-2' === $layout ) ? astra_get_option( 'ast-archive-' . $post_type . '-vertical-alignment', 'center' ) : 'center';
		$width_type      = astra_get_option( 'ast-archive-' . $post_type . '-banner-width-type', 'fullwidth' );
		$custom_width    = astra_get_option( 'ast-archive-' . $post_type . '-banner-custom-width', 1200 );
		$background_type = astra_get_option( 'ast-archive-' . $post_type . '-banner-image-type', 'none' );


		/**
		 * Desktop CSS.
		 */
		$css_output_desktop = array(
			$selector                           => array(
				'text-align'      => $deskt_h_alignment,
				'justify-content' => $vert_alignment,
				'padding-top'     => astra_responsive_spacing( $banner_padding, 'top', 'desktop' ),
				'padding-right'   => astra_responsive_spacing( $banner_padding, 'right', 'desktop' ),
				'padding-bottom'  => astra_responsive_spacing( $banner_padding, 'bottom', 'desktop' ),
				'padding-left'    => astra_responsive_spacing( $banner_padding, 'left', 'desktop' ),
				'margin-top'      => astra_responsive_spacing( $banner_margin, 'top', 'desktop' ),
				'margin-right'    => astra_responsive_spacing( $banner_margin, 'right', 'desktop' ),
				'margin-bottom'   => astra_responsive_spacing( $banner_margin, 'bottom', 'desktop' ),
				'margin-left'     => astra_responsive_spacing( $banner_margin, 'left', 'desktop' ),
				'color'           => esc_attr( $text_color ),
			),
			$selector . ' h1'                   => array(
				'color' => esc_attr( $title_color ),
			),
			$selector . ' a'                    => array(
				'color' => esc_attr( $link_color ),
			),
			$selector . ' a:hover'              => array(
				'color' => esc_attr( $link_hover_color ),
			),
			$selector . ' > *:not(:last-child)' => array(
				'margin-bottom' => $elements_gap . 'px',
			),
		);

		/* Site width Responsive */
		if ( 'layout-2' === $layout ) {
			$site_content_width = astra_get_option( 'site-content-width', 1200 );
			$container_width    = array(
				$selector . '[data-banner-layout="layout-2"]' => array(
					'max-width' => $site_content_width . 'px',
					'margin'    => '0 auto',
				),
			);

			$dynamic_css .= astra_parse_css( $container_width, astra_get_tablet_breakpoint( '', 1 ) );
		}

		/**
		 * Tablet CSS.
		 */
		$css_output_tablet = array(
			$selector => array(
				'text-align'     => $tab_h_alignment,
				'padding-top'    => astra_responsive_spacing( $banner_padding, 'top', 'tablet' ),
				'padding-right'  => astra_responsive_spacing( $banner_padding, 'right', 'tablet' ),
				'padding-bottom' => astra_responsive_spacing( $banner_padding, 'bottom', 'tablet' ),
				'padding-left'   => astra_responsive_spacing( $banner_padding, 'left', 'tablet' ),
				'margin-top'     => astra_responsive_spacing( $banner_margin, 'top', 'tablet' ),
				'margin-right'   => astra_responsive_spacing( $banner_margin, 'right', 'tablet' ),
				'margin-bottom'  => astra_responsive_spacing( $banner_margin, 'bottom', 'tablet' ),
				'margin-left'    => astra_responsive_spacing( $banner_margin, 'left', 'tablet' ),
			),
		);

		/**
		 * Mobile CSS.
		 */
		$css_output_mobile = array(
			$selector => array(
				'text-align'     => $mob_h_alignment,
				'padding-top'    => astra_responsive_spacing( $banner_padding, 'top', 'mobile' ),
				'padding-right'  => astra_responsive_spacing( $banner_padding, 'right', 'mobile' ),
				'padding-bottom' => astra_responsive_spacing( $banner_padding, 'bottom', 'mobile' ),
				'padding-left'   => astra_responsive_spacing( $banner_padding, 'left', 'mobile' ),
				'margin-top'     => astra_responsive_spacing( $banner_margin, 'top', 'mobile' ),
				'margin-right'   => astra_responsive_spacing( $banner_margin, 'right', 'mobile' ),
				'margin-bottom'  => astra_responsive_spacing( $banner_margin, 'bottom', 'mobile' ),
				'margin-left'    => astra_responsive_spacing( $banner_margin, 'left', 'mobile' ),
			),
		);

		if ( ( 'layout-2' === $layout && 'custom' === $width_type ) || is_customize_preview() ) {
			$css_output_desktop[ $selector . '[data-banner-width-type="custom"]' ]['max-width'] = $custom_width . 'px';
		}

		if ( ( 'layout-1' === $layout ) || is_customize_preview() ) {
			$site_content_width = astra_get_option( 'site-content-width', 1200 );
			$css_output_desktop[ $selector ]['max-width'] = $site_content_width . 'px';
		}

		if ( 'layout-2' === $layout && 'none' !== $background_type ) {
			if ( 'custom' === $background_type ) {
				$custom_background = astra_get_option( 'ast-archive-' . $post_type . '-banner-custom-bg' );
				$css_output_desktop[ $selector . '[data-banner-background-type="custom"]' ] = astra_get_responsive_background_obj( $custom_background, 'desktop' );
				$css_output_tablet[ $selector . '[data-banner-background-type="custom"]' ]  = astra_get_responsive_background_obj( $custom_background, 'tablet' );
				$css_output_mobile[ $selector . '[data-banner-background-type="custom"]' ]  = astra_get_responsive_background_obj( $custom_background, 'mobile' );
			} else {
				$feat_image_src = wp_get_attachment_url( get_post_thumbnail_id( get_the_ID() ) );
				if ( $feat_image_src ) {
					$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ] = array(
						'background'            => 'url( ' . esc_url( $feat_image_src ) . ' )',
						'background-repeat'     => 'no-repeat',
						'background-attachment' => 'scroll',
						'background-position'   => 'center center',
						'background-size'       => 'cover',
					);
					$overlay_color = astra_get_option( 'ast-archive-' . $post_type . '-banner-featured-overlay', '' );
					if ( '' !== $overlay_color ) {
						$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ]['background']            = 'url( ' . esc_url( $feat_image_src ) . ' ) ' . $overlay_color;
						$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ]['background-blend-mode'] = 'multiply';
					}
				}
			}
		}

		if ( false === $static_css_loaded || is_customize_preview() ) {
			$dynamic_css      .= '.ast-archive-entry-banner {
				-js-display: flex;
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				position: relative;
				padding: 50px;
				margin: 0 auto;
				background: #eeeeee;
			}
			.ast-archive-entry-banner[data-banner-layout="layout-1"] {
				text-align: left;
			}';
			$static_css_loaded = true;
		}

		/* Parse CSS from array() */
		$dynamic_css .= astra_parse_css( $css_output_desktop );
		$dynamic_css .= astra_parse_css( $css_output_tablet, '', astra_get_tablet_breakpoint() );
		$dynamic_css .= astra_parse_css( $css_output_mobile, '', astra_get_mobile_breakpoint() );
	}

	return $dynamic_css;
}
