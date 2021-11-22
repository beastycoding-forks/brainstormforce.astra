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
 * Generate dark palette CSS variable styles for the front end.
 *
 * @since x.x.x
 * @return string
 */
function astra_generate_dark_palette_style() {

	$variable_prefix    = Astra_Global_Palette::get_css_variable_prefix();
	$dark_palette       = astra_get_option( 'dark-mode-palette', 'palette_2' );
	$ast_palette_config = astra_get_palette_colors();
	$palette_style      = array();
	$palette_css_vars   = array();
	$css                = '';

	if ( isset( $ast_palette_config['palettes'][ $dark_palette ] ) ) {
		foreach ( $ast_palette_config['palettes'][ $dark_palette ] as $key => $color ) {
			$palette_key = str_replace( '--', '-', $variable_prefix ) . $key;

			$palette_style[ 'html.ast-dark-site .has' . $palette_key . '-color' ] = array(
				'color' => 'var(' . $variable_prefix . $key . ')',
			);

			$palette_style[ 'html.ast-dark-site .has' . $palette_key . '-background-color' ] = array(
				'background-color' => 'var(' . $variable_prefix . $key . ')',
			);

			$palette_style[ 'html.ast-dark-site .wp-block-button .has' . $palette_key . '-color' ] = array(
				'color' => 'var(' . $variable_prefix . $key . ')',
			);

			$palette_style[ 'html.ast-dark-site .wp-block-button .has' . $palette_key . '-background-color' ] = array(
				'background-color' => 'var(' . $variable_prefix . $key . ')',
			);

			$palette_css_vars[ $variable_prefix . $key ] = $color;
		}
	}

	$palette_style['html.ast-dark-site'] = $palette_css_vars;
	$css                                 = astra_parse_css( $palette_style );

	return $css;
}

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

	$_section      = 'header-section-mode-switcher';
	$selector      = '.ast-header-mode-switcher';
	$data_selector = '[data-section="header-section-mode-switcher"]';

	$light_color = astra_get_option( 'header-dark-mode-switcher-light-color' );
	$dark_color  = astra_get_option( 'header-dark-mode-switcher-dark-color' );

	$icon_size     = astra_get_option( 'header-mode-switcher-icon-size' );
	$border_radius = esc_attr( astra_get_option( 'header-mode-switcher-border-radius' ) );
	$margin        = astra_get_option( $_section . '-margin' );

	/**
	 * Mode Switcher - Desktop CSS.
	 */
	$css_output_desktop = array(
		$selector . ', ' . $selector . ':hover, ' . $selector . ':focus, ' . $selector . ':active' => array(
			'color'            => esc_attr( $light_color ),
			'background-color' => esc_attr( $dark_color ),
		),
		'.ast-dark-mode ' . $selector          => array(
			'color'            => esc_attr( $dark_color ),
			'background-color' => esc_attr( $light_color ),
		),
		$selector . ' .ast-mode-switcher-icon' => array(
			'height' => astra_get_css_value( $icon_size['desktop'], 'px' ),
			'width'  => astra_get_css_value( $icon_size['desktop'], 'px' ),
		),
		$selector                              => array(
			'border-radius' => astra_get_css_value( $border_radius, 'px' ),
		),
		$data_selector                         => array(
			'margin-top'    => astra_responsive_spacing( $margin, 'top', 'desktop' ),
			'margin-bottom' => astra_responsive_spacing( $margin, 'bottom', 'desktop' ),
			'margin-left'   => astra_responsive_spacing( $margin, 'left', 'desktop' ),
			'margin-right'  => astra_responsive_spacing( $margin, 'right', 'desktop' ),
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
		$data_selector                         => array(
			'margin-top'    => astra_responsive_spacing( $margin, 'top', 'tablet' ),
			'margin-bottom' => astra_responsive_spacing( $margin, 'bottom', 'tablet' ),
			'margin-left'   => astra_responsive_spacing( $margin, 'left', 'tablet' ),
			'margin-right'  => astra_responsive_spacing( $margin, 'right', 'tablet' ),
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
		$data_selector                         => array(
			'margin-top'    => astra_responsive_spacing( $margin, 'top', 'mobile' ),
			'margin-bottom' => astra_responsive_spacing( $margin, 'bottom', 'mobile' ),
			'margin-left'   => astra_responsive_spacing( $margin, 'left', 'mobile' ),
			'margin-right'  => astra_responsive_spacing( $margin, 'right', 'mobile' ),
		),
	);

	/* Parse CSS from array() */
	$css_output  = astra_parse_css( $css_output_desktop );
	$css_output .= astra_parse_css( $css_output_tablet, '', strval( astra_get_tablet_breakpoint() ) );
	$css_output .= astra_parse_css( $css_output_mobile, '', strval( astra_get_mobile_breakpoint() ) );

	$dynamic_css .= $css_output;

	$dynamic_css .= Astra_Builder_Base_Dynamic_CSS::prepare_advanced_typography_css( $_section, $data_selector );

	return $dynamic_css;
}
