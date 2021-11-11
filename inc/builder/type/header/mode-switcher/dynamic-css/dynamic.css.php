<?php
/**
 * Mode Switcher - Dynamic CSS
 *
 * @package Astra
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Mode Switcher
 */
add_filter( 'astra_dynamic_theme_css', 'astra_mode_switcher_dynamic_css' );

/**
 * Dynamic CSS
 *
 * @param  string $dynamic_css          Astra Dynamic CSS.
 * @param  string $dynamic_css_filtered Astra Dynamic CSS Filters.
 * @return String Generated dynamic CSS for Mode Switcher.
 *
 * @since x.x.x
 */
function astra_mode_switcher_dynamic_css( $dynamic_css, $dynamic_css_filtered = '' ) {

	if ( ! Astra_Builder_Helper::is_component_loaded( 'mode-switcher', 'header' ) ) {
		return $dynamic_css;
	}

	$astra_mode_switcher_static_css = '
		.ast-mode-switcher-trigger {
			cursor: pointer;
		}
		.ast-mode-switcher-icon {
			margin-right: 5px;
		}
		.ast-mode-switcher-trigger .ahfb-svg-iconset {
			vertical-align: middle;
		}
	';

	$dynamic_css .= Astra_Enqueue_Scripts::trim_css( $astra_mode_switcher_static_css );

	$_section = 'section-mode-switcher';
	$selector = '.ast-mode-switcher-trigger';

	$icon_size         = astra_get_option( 'mode-switcher-icon-size' );

	/**
	 * Mode Switcher - Desktop CSS.
	 */
	$css_output_desktop = array(
		$selector . ' .ast-mode-switcher-icon' => array(
			'height' => astra_get_css_value( $icon_size['desktop'], 'px' ),
			'width'  => astra_get_css_value( $icon_size['desktop'], 'px' ),
		),
	);

	/**
	 * Mode Switcher - Tablet CSS.
	 */
	$css_output_tablet = array(
		$selector . ' .ast-mode-switcher-icon' => array(
			'height' => astra_get_css_value( $icon_size['tablet'], 'px' ),
			'width'  => astra_get_css_value( $icon_size['tablet'], 'px' ),
		),
	);

	/**
	 * Mode Switcher - Mobile CSS.
	 */
	$css_output_mobile = array(
		$selector . ' .ast-mode-switcher-icon' => array(
			'height' => astra_get_css_value( $icon_size['mobile'], 'px' ),
			'width'  => astra_get_css_value( $icon_size['mobile'], 'px' ),
		),
	);

	/* Parse CSS from array() */
	$css_output  = astra_parse_css( $css_output_desktop );
	$css_output .= astra_parse_css( $css_output_tablet, '', strval( astra_get_tablet_breakpoint() ) );
	$css_output .= astra_parse_css( $css_output_mobile, '', strval( astra_get_mobile_breakpoint() ) );

	$dynamic_css .= $css_output;

	if ( ! empty( astra_get_option( 'mode-switcher-label' ) ) ) {
		$dynamic_css .= Astra_Builder_Base_Dynamic_CSS::prepare_advanced_typography_css( $_section, $selector );
	}

	$dynamic_css .= Astra_Builder_Base_Dynamic_CSS::prepare_advanced_margin_padding_css( $_section, $selector );

	return $dynamic_css;
}
