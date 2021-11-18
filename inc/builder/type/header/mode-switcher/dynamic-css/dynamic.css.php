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

	$ltr_left  = is_rtl() ? 'right' : 'left';
	$ltr_right = is_rtl() ? 'left' : 'right';

	$astra_mode_switcher_static_css = '
		.ast-switcher-icon-with-label-type .ast-mode-switcher-icon {
			margin-' . esc_attr( $ltr_right ) . ': 5px;
		}
	';

	$dynamic_css .= Astra_Enqueue_Scripts::trim_css( $astra_mode_switcher_static_css );

	$_section = 'header-section-mode-switcher';
	$selector = '.ast-header-mode-switcher';

	$light_color = astra_get_option( 'header-dark-mode-switcher-light-color' );
	$dark_color  = astra_get_option( 'header-dark-mode-switcher-dark-color' );

	$icon_size = astra_get_option( 'header-mode-switcher-icon-size' );
	/** @psalm-suppress InvalidArgument */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
	$desktop_icon_size = astra_calculate_spacing( $icon_size['desktop'] . 'px', '+', '0.5', 'em' );
	$border_radius     = esc_attr( astra_get_option( 'header-mode-switcher-border-radius' ) );

	/**
	 * Mode Switcher - Desktop CSS.
	 */
	$css_output_desktop = array(
		$selector . ', ' . $selector . ':hover, ' . $selector . ':focus, ' . $selector . ':active' => array(
			'color'            => esc_attr( $light_color ),
			'background-color' => esc_attr( $dark_color ),
		),
		'.ast-dark-site ' . $selector                  => array(
			'color'            => esc_attr( $dark_color ),
			'background-color' => esc_attr( $light_color ),
		),
		$selector . ' .ast-mode-switcher-icon'         => array(
			'height' => astra_get_css_value( $icon_size['desktop'], 'px' ),
			'width'  => astra_get_css_value( $icon_size['desktop'], 'px' ),
		),
		$selector                                      => array(
			'border-radius' => astra_get_css_value( $border_radius, 'px' ),
		),
		$selector . '.ast-switcher-toggle-style:after' => array(
			'width'  => $desktop_icon_size,
			'height' => $desktop_icon_size,
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

	if ( '' !== astra_get_option( 'header-mode-switcher-light-label' ) && '' !== astra_get_option( 'header-mode-switcher-dark-label' ) ) {
		$dynamic_css .= Astra_Builder_Base_Dynamic_CSS::prepare_advanced_typography_css( $_section, $selector );
	}

	$dynamic_css .= Astra_Builder_Base_Dynamic_CSS::prepare_advanced_margin_padding_css( $_section, $selector );

	return $dynamic_css;
}
