<?php
/**
 * Mode Switcher Loader for Astra theme.
 *
 * @package     astra-builder
 * @author      Astra
 * @copyright   Copyright (c) 2021, Astra
 * @link        https://wpastra.com/
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Customizer Initialization
 *
 * @since x.x.x
 */
class Astra_Header_Mode_Switcher_Loader {

	/**
	 * Constructor.
	 *
	 * @since x.x.x
	 */
	public function __construct() {
		add_action( 'customize_preview_init', array( $this, 'preview_scripts' ), 110 );
		add_filter( 'body_class', array( $this, 'update_site_mode_class' ) );
	}

	/**
	 * Customizer Preview.
	 *
	 * @since x.x.x
	 */
	public function preview_scripts() {
		/**
		 * Load unminified if SCRIPT_DEBUG is true.
		 */
		/* Directory and Extension */
		$dir_name    = ( true === SCRIPT_DEBUG ) ? 'unminified' : 'minified';
		$file_prefix = ( true === SCRIPT_DEBUG ) ? '' : '.min';
		wp_enqueue_script( 'astra-builder-mode-switcher-customizer-preview-js', ASTRA_HEADER_MODE_SWITCHER_URI . '/assets/js/' . $dir_name . '/customizer-preview' . $file_prefix . '.js', array( 'customize-preview', 'astra-customizer-preview-js' ), ASTRA_THEME_VERSION, true );
	}

	/**
	 * Add site set mode class to body
	 *
	 * @param array $classes body classes.
	 * @return array $classes body classes.
	 */
	public function update_site_mode_class( $classes ) {

		if ( isset( $_COOKIE["astraPaletteCookie"] ) && 'dark' === $_COOKIE["astraPaletteCookie"] ) {
			$classes[] = 'ast-dark-site';
		}

		return $classes;
	}
}

/**
*  Kicking this off by creating 'new' instance.
*/
new Astra_Header_Mode_Switcher_Loader();
