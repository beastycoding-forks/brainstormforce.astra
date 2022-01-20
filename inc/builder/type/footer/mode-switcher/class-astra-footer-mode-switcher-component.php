<?php
/**
 * Dark|Light mode switcher for Astra theme.
 *
 * @package     astra-builder
 * @author      Astra
 * @copyright   Copyright (c) 2021, Astra
 * @link        https://wpastra.com/
 * @since       x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'ASTRA_FOOTER_MODE_SWITCHER_DIR', ASTRA_THEME_DIR . 'inc/builder/type/footer/mode-switcher' );
define( 'ASTRA_FOOTER_MODE_SWITCHER_URI', ASTRA_THEME_URI . 'inc/builder/type/footer/mode-switcher' );

/**
 * Mode Switcher Initial Setup
 *
 * @since x.x.x
 */
class Astra_Footer_Mode_Switcher_Component {

	/**
	 * Constructor function that initializes required actions and hooks.
	 */
	public function __construct() {

		// @codingStandardsIgnoreStart WPThemeReview.CoreFunctionality.FileInclude.FileIncludeFound
		require_once ASTRA_FOOTER_MODE_SWITCHER_DIR . '/class-astra-footer-mode-switcher-loader.php';

		// Include front end files.
		if ( ! is_admin() ) {
			require_once ASTRA_FOOTER_MODE_SWITCHER_DIR . '/dynamic-css/dynamic.css.php';
		}
		// @codingStandardsIgnoreEnd WPThemeReview.CoreFunctionality.FileInclude.FileIncludeFound
	}
}

/**
 *  Kicking this off by creating 'new' instance.
 */
new Astra_Footer_Mode_Switcher_Component();
