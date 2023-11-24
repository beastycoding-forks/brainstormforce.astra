<?php
/**
 * Astra Theme Customizer Configuration Above footer.
 *
 * @package     astra-builder
 * @author      Astra
 * @copyright   Copyright (c) 2020, Astra
 * @link        https://wpastra.com/
 * @since       3.0.0
 */

// No direct access, please.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register header related Customizer Configurations.
 *
 * @since x.x.x
 */
class Astra_Footer_Configs_Base {

	/**
	 * Menu Configs.
	 *
	 * @var array
	 * @since x.x.x
	 * @access private
	 */
	private static $menu_configs = array();

	/**
	 * Register Configurations.
	 *
	 * @since x.x.x
	 * @return array Astra Customizer Configurations with updated configurations.
	 */
	public static function footer_menu_configuration() {

		if ( ! empty( self::$menu_configs ) ) {
			return self::$menu_configs;
		}

		self::$menu_configs = astra_menu_footer_configuration();
		return self::$menu_configs;
	}
}

/**
 * Kicking this off by creating object of this class.
 */
new Astra_Footer_Configs_Base();
