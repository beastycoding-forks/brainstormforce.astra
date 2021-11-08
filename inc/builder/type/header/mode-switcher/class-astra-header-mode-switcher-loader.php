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
		add_action( 'wp', array( $this, 'mode_preference_script' ) );
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
	 * Adding head frontend script for avoiding jerk while landing on site initially.
	 *
	 * @since x.x.x
	 */
	public function mode_preference_script() {
		if ( is_admin() ) {
			return;
		}
		?>
			<script type="text/javascript">
				var siteView = localStorage.getItem( "astra-prefers-color" );

				if ( siteView && siteView === "dark" ) {
					document.documentElement.classList.add( "ast-dark-site" );
				}

				if ( siteView && siteView === "light" && document.documentElement.classList.contains( "ast-dark-site" ) ) {
					document.documentElement.classList.remove( "ast-dark-site" );
				}
			</script>
		<?php
	}
}

/**
*  Kicking this off by creating 'new' instance.
*/
new Astra_Header_Mode_Switcher_Loader();
