<?php
/**
 * Astra Admin Loader
 *
 * @package Astra
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Astra_Admin_Loader
 *
 * @since x.x.x
 */
class Astra_Admin_Loader {

	/**
	 * Instance
	 *
	 * @access private
	 * @var null $instance
	 * @since x.x.x
	 */
	private static $instance;

	/**
	 * Initiator
	 *
	 * @since x.x.x
	 * @return object initialized object of class.
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			/** @psalm-suppress InvalidPropertyAssignmentValue */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			self::$instance = new self();
			/** @psalm-suppress InvalidPropertyAssignmentValue */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		}
		return self::$instance;
	}

	/**
	 * Constructor
	 *
	 * @since x.x.x
	 */
	public function __construct() {
		define( 'ASTRA_THEME_ADMIN_DIR', ASTRA_THEME_DIR . 'admin/' );
		define( 'ASTRA_THEME_ADMIN_URL', ASTRA_THEME_URI . 'admin/' );

		$this->includes();
	}

	/**
	 * Include required classes.
	 *
	 * @since x.x.x
	 */
	public function includes() {
		/* Ajax init */
		require_once ASTRA_THEME_ADMIN_DIR . 'includes/class-astra-admin-ajax.php';

		/* Setup Menu */
		require_once ASTRA_THEME_ADMIN_DIR . 'includes/class-astra-menu.php';
	}
}

Astra_Admin_Loader::get_instance();
