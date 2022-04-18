<?php
/**
 * Astra Global color palette
 *
 * @package     Astra
 * @subpackage  Class
 * @author      Astra
 * @link        https://wpastra.com/
 * @since       3.7.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Global palette class
 */
class Astra_Global_Palette {

	/**
	 * Constructor
	 *
	 * @since 3.7.0
	 */
	public function __construct() {
		add_filter( 'astra_theme_customizer_js_localize', array( $this, 'localize_variables' ) );
		add_filter( 'astra_before_foreground_color_generation', array( $this, 'get_color_by_palette_variable' ) );
		$this->includes();
	}

	/**
	 * Format color palette data required to pass for Gutenberg palette.
	 *
	 * @since 3.7.0
	 * @param array $global_palette global palette data.
	 * @return array
	 */
	public function format_global_palette( $global_palette ) {
		$editor_palette = array();
		$labels         = self::get_palette_labels();

		if ( isset( $global_palette['palette'] ) ) {
			foreach ( $global_palette['palette'] as $key => $color ) {

				$label = 'Theme ' . $labels[ $key ];

				$editor_palette[] = array(
					'name'  => $label,
					'slug'  => str_replace( '--', '', self::get_css_variable_prefix() ) . $key,
					'color' => 'var(' . self::get_css_variable_prefix() . $key . ')',
				);
			}
		}
		return $editor_palette;
	}

	/**
	 * Get CSS variable prefix used for styling.
	 *
	 * @since 3.7.0
	 * @return string variable prefix
	 */
	public static function get_css_variable_prefix() {
		return '--ast-global-color-';
	}

	/**
	 * Localize variables used in the customizer.
	 *
	 * @since 3.7.0
	 * @param array $object localize object.
	 * @return array<array-key, mixed> $object localize object.
	 */
	public function localize_variables( $object ) {

		if ( isset( $object['customizer'] ) ) {
			$object['customizer']['globalPaletteStylePrefix']       = self::get_css_variable_prefix();
			$object['customizer']['isElementorActive']              = astra_is_elemetor_active();
			$object['customizer']['isGlobalColorElementorDisabled'] = astra_maybe_disable_global_color_in_elementor();
			$object['customizer']['globalPaletteSlugs']             = self::get_palette_slugs();
			$object['customizer']['globalPaletteLabels']            = self::get_palette_labels();
		}
		return $object;
	}

	/**
	 * Default global palette options.
	 *
	 * @since 3.7.0
	 * @return array Palette options.
	 */
	public static function get_default_color_palette() {
		return array(
			'currentPalette' => 'palette_1',
			'palettes'       => array(
				'palette_1' => array(
					'#0170B9',
					'#3a3a3a',
					'#3a3a3a',
					'#4B4F58',
					'#F5F5F5',
					'#FFFFFF',
					'#F2F5F7',
					'#424242',
					'#000000',
				),
				'palette_2' => array(
					'#0170B9',
					'#3a3a3a',
					'#3a3a3a',
					'#4B4F58',
					'#F5F5F5',
					'#FFFFFF',
					'#F2F5F7',
					'#424242',
					'#000000',
				),
				'palette_3' => array(
					'#0170B9',
					'#3a3a3a',
					'#3a3a3a',
					'#4B4F58',
					'#F5F5F5',
					'#FFFFFF',
					'#F2F5F7',
					'#424242',
					'#000000',
				),
			),
		);
	}

	/**
	 * Get labels for palette colors.
	 *
	 * @since 3.7.0
	 * @return array Palette labels.
	 */
	public static function get_palette_labels() {
		return array(
			__( 'Color  1', 'astra' ),
			__( 'Color  2', 'astra' ),
			__( 'Color  3', 'astra' ),
			__( 'Color  4', 'astra' ),
			__( 'Color  5', 'astra' ),
			__( 'Color  6', 'astra' ),
			__( 'Color  7', 'astra' ),
			__( 'Color  8', 'astra' ),
			__( 'Color  9', 'astra' ),
		);
	}

	/**
	 * Get slugs for palette colors.
	 *
	 * @since 3.7.0
	 * @return array Palette slugs.
	 */
	public static function get_palette_slugs() {
		return array(
			'ast-global-color-0',
			'ast-global-color-1',
			'ast-global-color-2',
			'ast-global-color-3',
			'ast-global-color-4',
			'ast-global-color-5',
			'ast-global-color-6',
			'ast-global-color-7',
			'ast-global-color-8',
		);
	}

	/**
	 * Include required files.
	 *
	 * @since 3.7.0
	 */
	public function includes() {
		require_once ASTRA_THEME_DIR . 'inc/dynamic-css/global-color-palette.php';// PHPCS:ignore WPThemeReview.CoreFunctionality.FileInclude.FileIncludeFound
	}

	/**
	 * Generate palette CSS required to display on front end.
	 *
	 * @since 3.7.0
	 * @return array palette style array.
	 */
	public static function generate_global_palette_style() {
		$palette_data = astra_get_option( 'global-color-palette' );

		$palette_style = array();

		if ( isset( $palette_data['palette'] ) ) {
			foreach ( $palette_data['palette'] as $key => $color ) {
				$palette_key                   = self::get_css_variable_prefix() . $key;
				$palette_style[ $palette_key ] = $color;
			}
		}

		return $palette_style;
	}

	/**
	 * Pass hex value for global palette to process forground color.
	 *
	 * @since 3.7.0
	 * @param string $color hex color / css variable.
	 * @return string
	 */
	public function get_color_by_palette_variable( $color ) {
		// Check if color is CSS variable.
		if ( 0 === strpos( $color, 'var(--' ) ) {

			$global_palette = astra_get_option( 'global-color-palette' );

			if ( isset( $global_palette['palette'] ) ) {
				foreach ( $global_palette['palette'] as $palette_index => $value ) {

					if ( 'var(' . self::get_css_variable_prefix() . $palette_index . ')' === $color ) {
						return $value;
					}
				}
			}
		}

		return $color;
	}
}

new Astra_Global_Palette();
