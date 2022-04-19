<?php
/**
 * Posts Strctures Options for our theme.
 *
 * @package     Astra
 * @author      Brainstorm Force
 * @copyright   Copyright (c) 2022, Brainstorm Force
 * @link        https://www.brainstormforce.com
 * @since       Astra x.x.x
 */

// Block direct access to the file.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Bail if Customizer config base class does not exist.
if ( ! class_exists( 'Astra_Customizer_Config_Base' ) ) {
	return;
}

/**
 * Register Posts Strctures Customizer Configurations.
 *
 * @since x.x.x
 */
class Astra_Posts_Strctures_Configs extends Astra_Customizer_Config_Base {

	/**
	 * Register Posts Strctures Customizer Configurations.
	 *
	 * @param Array                $configurations Astra Customizer Configurations.
	 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
	 * @since x.x.x
	 * @return Array Astra Customizer Configurations with updated configurations.
	 */
	public function register_configuration( $configurations, $wp_customize ) {

		$post_types = Astra_Posts_Strctures_Loader::get_supported_post_types();

		if ( ! empty( $post_types ) ) {
			/**
			 * Individual post types main section.
			 */
			$_configs = array();
			$ignore_single_for_posttypes = array( 'post', 'product' );
			$ignore_archive_for_posttypes = array( 'post', 'product' );
			foreach ( $post_types as $index => $label ) {
				$_configs[] = array(
					'name'    => 'section-posttype-' . $label,
					'type'    => 'section',
					'title'   => ucfirst( $label ),
					'priority' => 69,
				);
				if ( in_array( $label, $ignore_single_for_posttypes ) ) {
					$_configs[] = array(
						'name'    => 'single-posttype-' . $label,
						'type'    => 'section',
						'title'   => __( 'Single', 'astra' ) . ' ' . ucfirst( $label ),
						'section'    => 'section-posttype-' . $label,
						'priority' => 5,
					);
				}
				if ( in_array( $label, $ignore_archive_for_posttypes ) ) {
					$_configs[] = array(
						'name'    => 'archive-posttype-' . $label,
						'type'    => 'section',
						'title'   => __( 'Archive', 'astra' ) . ' ' .ucfirst( $label ),
						'section'    => 'section-posttype-' . $label,
						'priority' => 10,
					);
				}
			}

			$configurations = array_merge( $configurations, $_configs );
		}

		return $configurations;
	}
}

/**
 * Kicking this off by creating new object.
 */
new Astra_Posts_Strctures_Configs();
