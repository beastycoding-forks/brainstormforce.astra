<?php
/**
 * Astra Global Button Learndash Compatibility - Dynamic CSS
 *
 * @package astra
 * @since 3.7.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

add_filter( 'astra_dynamic_theme_css', 'astra_global_button_learndash_compatibility_css', 11 );

/**
 * Astra Global Button Learndash Compatibility- Dynamic CSS
 *
 * @param  string $dynamic_css          Astra Dynamic CSS.
 * @return String Generated dynamic CSS for content background.
 *
 * @since 3.2.0
 */
function astra_global_button_learndash_compatibility_css( $dynamic_css ) {
	$theme_color        = astra_get_option( 'theme-color' );
	$link_h_color = astra_get_option( 'link-h-color' );
	$btn_text_color = astra_get_option( 'button-color' );
	$btn_h_color = astra_get_option( 'button-h-color' );
	$btn_bg_color   = astra_get_option( 'button-bg-color');
	$btn_bg_h_color = astra_get_option( 'button-bg-h-color');
	$get_btn_width = astra_get_option( 'theme-button-border-group-border-size' );
	$btn_border_color                 = astra_get_option( 'theme-button-border-group-border-color' );
	$btn_border_h_color               = astra_get_option( 'theme-button-border-group-border-h-color' );
	$btn_border_radius     = astra_get_option( 'button-radius');
	$selector = '.learndash .learndash-wrapper';
	// Learndash Colors.
	$ld_global_button_css = array(

		$selector . '.ld-expand-button,' . $selector . ' .learndash_mark_complete_button, ' . $selector . ' .ld-expand-button, '.$selector.' .ld-button, '.$selector.' .ld-course-status .ld-status.ld-status-progress, '.$selector.' .ld-breadcrumbs .ld-status.ld-status-progress, ' .$selector. ' .wpProQuiz_content .wpProQuiz_button' => array(
			'color' => esc_attr($btn_text_color),
			'background-color' => esc_attr( $btn_bg_color),
			'border-radius' => esc_attr( $btn_border_radius ).'px',
			'border-top-width' => esc_attr( $get_btn_width['top']).'px',
			'border-right-width ' => esc_attr( $get_btn_width['right'] ).'px',
			'border-bottom-width' => esc_attr( $get_btn_width['bottom'] ).'px',
			'border-left-width' => esc_attr( $get_btn_width['left'] ).'px',
			
			'border-style' => 'solid',
		),
		$selector . '.ld-expand-button:hover, ' .$selector.' .learndash_mark_complete_button:hover, ' .$selector.' .ld-button:hover, .learndash-wrapper .ld-status.ld-status-progress.ld-primary-background:hover, '.$selector.' .wpProQuiz_content .wpProQuiz_button:hover' => array(
			'color'        => esc_attr($btn_h_color),
			'background-color' => esc_attr($btn_bg_h_color),
		),
		$selector . '.ld-course-status .ld-status.ld-status-progress' => array(
			'color'            => 'unset',
			'background-color' => 'unset',
		),
		// $selector . ' .ast-woo-header-cart-info-wrap' => array(
		// 	'color' => esc_attr( $icon_color ),
		// ),
		// $selector . ' .ast-addon-cart-wrap i.astra-icon:after' => array(
		// 	'color'            => esc_attr( $theme_h_color ),
		// 	'background-color' => esc_attr( $icon_color ),
		// ),
		// $selector . ' a.cart-container *'             => array(
		// 	'transition' => 'none',
		// ),
		// $selector . ' .ast-site-header-cart-li:hover .ast-addon-cart-wrap i.astra-icon:after' => array(
		// 	'color'            => esc_attr( $theme_h_color ),
		// 	'background-color' => $icon_hover_color,
		// ),
		
	);
	
		$dynamic_css        .= astra_parse_css( $ld_global_button_css );

	return $dynamic_css;
}
