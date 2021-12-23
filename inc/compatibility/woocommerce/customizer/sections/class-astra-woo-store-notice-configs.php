<?php
/**
 * Store Notice options for Astra Theme.
 *
 * @package     Astra
 * @author      Astra
 * @copyright   Copyright (c) 2021, Astra
 * @link        https://wpastra.com/
 * @since       Astra x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Customizer WooCommerece store notice - customizer config initial setup.
 */
class Astra_Woo_Store_Notice_Configs extends Astra_Customizer_Config_Base {

	/**
	 * Register Astra-WooCommerce Shop Cart Layout Customizer Configurations.
	 *
	 * @param Array                $configurations Astra Customizer Configurations.
	 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
	 * @since x.x.x
	 * @return Array Astra Customizer Configurations with updated configurations.
	 */
	public function register_configuration( $configurations, $wp_customize ) {

		$_configs = array(

			// Option: Store Notice Text Color.
			array(
				'name'              => ASTRA_THEME_SETTINGS . '[store-notice-text-color]',
				'default'           => astra_get_option( 'store-notice-text-color' ),
				'parent'            => ASTRA_THEME_SETTINGS . '[woo-store-notice-colors-group]',
				'type'              => 'control',
				'control'           => 'ast-color',
				'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_alpha_color' ),
				'section'           => 'woocommerce_store_notice',
				'transport'         => 'postMessage',
				'priority'          => 50,
				'title'             => __( 'Text', 'astra' ),
				'context'           => array(
					array(
						'setting'  => 'woocommerce_demo_store',
						'operator' => '==',
						'value'    => true,
					),
				),
			),

			// Option: Store Notice Background Color.
			array(
				'name'              => ASTRA_THEME_SETTINGS . '[store-notice-background-color]',
				'default'           => astra_get_option( 'store-notice-background-color' ),
				'parent'            => ASTRA_THEME_SETTINGS . '[woo-store-notice-colors-group]',
				'type'              => 'control',
				'control'           => 'ast-color',
				'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_alpha_color' ),
				'section'           => 'woocommerce_store_notice',
				'transport'         => 'postMessage',
				'priority'          => 55,
				'title'             => __( 'Background', 'astra' ),
				'context'           => array(
					array(
						'setting'  => 'woocommerce_demo_store',
						'operator' => '==',
						'value'    => true,
					),
				),
			),
		);

		return array_merge( $configurations, $_configs );
	}
}

new Astra_Woo_Store_Notice_Configs();
