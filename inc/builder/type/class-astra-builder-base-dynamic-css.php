<?php
/**
 * Astra Builder Base Dynamic CSS.
 *
 * @package astra-builder
 */

// No direct access, please.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Astra_Builder_Base_Dynamic_CSS' ) ) {

	/**
	 * Class Astra_Builder_Base_Dynamic_CSS.
	 */
	final class Astra_Builder_Base_Dynamic_CSS {

		/**
		 * Member Variable
		 *
		 * @var instance
		 */
		private static $instance = null;


		/**
		 *  Initiator
		 */
		public static function get_instance() {

			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/**
		 * Constructor
		 */
		public function __construct() {

			add_action( 'wp_print_scripts', array( $this, 'mode_preference_script' ) );

			add_filter( 'astra_dynamic_theme_css', array( $this, 'footer_dynamic_css' ) );
			add_filter( 'astra_dynamic_theme_css', array( $this, 'mobile_header_logo_css' ) );
			add_filter( 'astra_dynamic_theme_css', array( $this, 'dark_color_palette_css' ) );
		}

		/**
		 * Prepare Advanced Margin / Padding Dynamic CSS.
		 *
		 * @param string $section_id section id.
		 * @param string $selector selector.
		 * @return string $css_output Parsed CSS
		 */
		public static function prepare_advanced_margin_padding_css( $section_id, $selector ) {

			if ( isset( $section_id ) && isset( $selector ) ) {

				$padding = astra_get_option( $section_id . '-padding' );
				$margin  = astra_get_option( $section_id . '-margin' );

				// Desktop CSS.
				$css_output_desktop = array(

					$selector => array(

						// Padding CSS.
						'padding-top'    => astra_responsive_spacing( $padding, 'top', 'desktop' ),
						'padding-bottom' => astra_responsive_spacing( $padding, 'bottom', 'desktop' ),
						'padding-left'   => astra_responsive_spacing( $padding, 'left', 'desktop' ),
						'padding-right'  => astra_responsive_spacing( $padding, 'right', 'desktop' ),

						// Margin CSS.
						'margin-top'     => astra_responsive_spacing( $margin, 'top', 'desktop' ),
						'margin-bottom'  => astra_responsive_spacing( $margin, 'bottom', 'desktop' ),
						'margin-left'    => astra_responsive_spacing( $margin, 'left', 'desktop' ),
						'margin-right'   => astra_responsive_spacing( $margin, 'right', 'desktop' ),
					),
				);

				// Tablet CSS.
				$css_output_tablet = array(

					$selector => array(

						// Padding CSS.
						'padding-top'    => astra_responsive_spacing( $padding, 'top', 'tablet' ),
						'padding-bottom' => astra_responsive_spacing( $padding, 'bottom', 'tablet' ),
						'padding-left'   => astra_responsive_spacing( $padding, 'left', 'tablet' ),
						'padding-right'  => astra_responsive_spacing( $padding, 'right', 'tablet' ),

						// Margin CSS.
						'margin-top'     => astra_responsive_spacing( $margin, 'top', 'tablet' ),
						'margin-bottom'  => astra_responsive_spacing( $margin, 'bottom', 'tablet' ),
						'margin-left'    => astra_responsive_spacing( $margin, 'left', 'tablet' ),
						'margin-right'   => astra_responsive_spacing( $margin, 'right', 'tablet' ),
					),
				);

				// Mobile CSS.
				$css_output_mobile = array(

					$selector => array(

						// Padding CSS.
						'padding-top'    => astra_responsive_spacing( $padding, 'top', 'mobile' ),
						'padding-bottom' => astra_responsive_spacing( $padding, 'bottom', 'mobile' ),
						'padding-left'   => astra_responsive_spacing( $padding, 'left', 'mobile' ),
						'padding-right'  => astra_responsive_spacing( $padding, 'right', 'mobile' ),

						// Margin CSS.
						'margin-top'     => astra_responsive_spacing( $margin, 'top', 'mobile' ),
						'margin-bottom'  => astra_responsive_spacing( $margin, 'bottom', 'mobile' ),
						'margin-left'    => astra_responsive_spacing( $margin, 'left', 'mobile' ),
						'margin-right'   => astra_responsive_spacing( $margin, 'right', 'mobile' ),
					),
				);

				$css_output  = astra_parse_css( $css_output_desktop );
				$css_output .= astra_parse_css( $css_output_tablet, '', astra_get_tablet_breakpoint() );
				$css_output .= astra_parse_css( $css_output_mobile, '', astra_get_mobile_breakpoint() );

				return $css_output;
			}

			return '';
		}

		/**
		 * Prepare Advanced Margin / Padding Dynamic CSS.
		 *
		 * @param string $section_id section id.
		 * @param string $selector selector.
		 * @return string $css_output Parsed CSS.
		 */
		public static function prepare_advanced_typography_css( $section_id, $selector ) {

			$font_size = astra_get_option( 'font-size-' . $section_id );

			/**
			 * Typography CSS.
			 */
			$css_output_desktop = array(

				$selector => array(

					// Typography.
					'font-size' => astra_responsive_font( $font_size, 'desktop' ),
				),
			);

			$css_output_tablet = array(

				$selector => array(

					'font-size' => astra_responsive_font( $font_size, 'tablet' ),
				),
			);

			$css_output_mobile = array(

				$selector => array(

					'font-size' => astra_responsive_font( $font_size, 'mobile' ),
				),
			);

			/* Parse CSS from array() */
			$css_output  = astra_parse_css( $css_output_desktop );
			$css_output .= astra_parse_css( $css_output_tablet, '', astra_get_tablet_breakpoint() );
			$css_output .= astra_parse_css( $css_output_mobile, '', astra_get_mobile_breakpoint() );

			return $css_output;
		}

		/**
		 * Prepare Footer Dynamic CSS.
		 *
		 * @param string $dynamic_css Appended dynamic CSS.
		 * @param string $dynamic_css_filtered Filtered dynamic CSS.
		 * @return array
		 */
		public static function footer_dynamic_css( $dynamic_css, $dynamic_css_filtered = '' ) {

			/**
			 * Tablet CSS.
			 */
			$css_output_tablet = array(
				'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-3-firstrow .ast-builder-grid-row > *:first-child, .ast-builder-grid-row-container.ast-builder-grid-row-tablet-3-lastrow .ast-builder-grid-row > *:last-child' => array(
					'grid-column' => '1 / -1',
				),
			);

			/**
			 * Mobile CSS.
			 */
			$css_output_mobile = array(
				'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-3-firstrow .ast-builder-grid-row > *:first-child, .ast-builder-grid-row-container.ast-builder-grid-row-mobile-3-lastrow .ast-builder-grid-row > *:last-child' => array(
					'grid-column' => '1 / -1',
				),
			);

			/* Parse CSS from array() */
			$css_output  = astra_parse_css( $css_output_tablet, '', astra_get_tablet_breakpoint() );
			$css_output .= astra_parse_css( $css_output_mobile, '', astra_get_mobile_breakpoint() );

			if ( is_customize_preview() ) {

				/**
				 * Desktop CSS
				 */
				$css_output_desktop = array(
					'.ast-builder-grid-row-6-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 6, 1fr )',
					),
					'.ast-builder-grid-row-5-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 5, 1fr )',
					),
					'.ast-builder-grid-row-4-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 4, 1fr )',
					),
					'.ast-builder-grid-row-4-lheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '2fr 1fr 1fr 1fr',
					),
					'.ast-builder-grid-row-4-rheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 1fr 1fr 2fr',
					),
					'.ast-builder-grid-row-3-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 3, 1fr )',
					),
					'.ast-builder-grid-row-3-lheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '2fr 1fr 1fr',
					),
					'.ast-builder-grid-row-3-rheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 1fr 2fr',
					),
					'.ast-builder-grid-row-3-cheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 2fr 1fr',
					),
					'.ast-builder-grid-row-3-cwide .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 3fr 1fr',
					),
					'.ast-builder-grid-row-2-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 2, 1fr )',
					),
					'.ast-builder-grid-row-2-lheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '2fr 1fr',
					),
					'.ast-builder-grid-row-2-rheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 2fr',
					),
					'.ast-builder-grid-row-2-full .ast-builder-grid-row' => array(
						'grid-template-columns' => '2fr',
					),
					'.ast-builder-grid-row-full .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr',
					),
				);

				/**
				 * Tablet CSS.
				 */
				$css_output_tablet = array(
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-6-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 6, 1fr )',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-5-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 5, 1fr )',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-4-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 4, 1fr )',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-4-lheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '2fr 1fr 1fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-4-rheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 1fr 1fr 2fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-3-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 3, 1fr )',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-3-lheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '2fr 1fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-3-rheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 1fr 2fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-3-cheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 2fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-3-cwide .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 3fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-3-firstrow .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-3-lastrow .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-2-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 2, 1fr )',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-2-lheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '2fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-2-rheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 2fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-tablet-full .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr',
					),
				);

				/**
				 * Mobile CSS
				 */
				$css_output_mobile = array(
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-6-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 6, 1fr )',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-5-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 5, 1fr )',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-4-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 4, 1fr )',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-4-lheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '2fr 1fr 1fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-4-rheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 1fr 1fr 2fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-3-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 3, 1fr )',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-3-lheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '2fr 1fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-3-rheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 1fr 2fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-3-cheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 2fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-3-cwide .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 3fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-3-firstrow .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-3-lastrow .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-2-equal .ast-builder-grid-row' => array(
						'grid-template-columns' => 'repeat( 2, 1fr )',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-2-lheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '2fr 1fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-2-rheavy .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr 2fr',
					),
					'.ast-builder-grid-row-container.ast-builder-grid-row-mobile-full .ast-builder-grid-row' => array(
						'grid-template-columns' => '1fr',
					),
				);

				/* Parse CSS from array() */
				$css_output .= astra_parse_css( $css_output_desktop );
				$css_output .= astra_parse_css( $css_output_tablet, '', astra_get_tablet_breakpoint() );
				$css_output .= astra_parse_css( $css_output_mobile, '', astra_get_mobile_breakpoint() );
			}

			$dynamic_css .= $css_output;

			return $dynamic_css;
		}

		/**
		 * Different logo for mobile static CSS.
		 *
		 * @param string $dynamic_css Appended dynamic CSS.
		 * @since 3.5.0
		 * @return string
		 */
		public static function mobile_header_logo_css( $dynamic_css ) {

			$mobile_header_logo            = astra_get_option( 'mobile-header-logo' );
			$different_mobile_header_order = astra_get_option( 'different-mobile-logo' );

			if ( '' !== $mobile_header_logo && '1' == $different_mobile_header_order ) {
				$mobile_header_css = '
				.ast-header-break-point .ast-has-mobile-header-logo .custom-logo-link {
					display: none;
				}
				.ast-header-break-point .ast-has-mobile-header-logo .custom-mobile-logo-link {
					display: inline-block;
				}
				.ast-header-break-point.ast-mobile-inherit-site-logo .ast-has-mobile-header-logo .custom-logo-link,
				.ast-header-break-point.ast-mobile-inherit-site-logo .ast-has-mobile-header-logo .astra-logo-svg {
					display: block;
				}';

				$dynamic_css .= Astra_Enqueue_Scripts::trim_css( $mobile_header_css );
			}
			return $dynamic_css;
		}

		/**
		 * Prepare Element visibility Dynamic CSS.
		 *
		 * @param string $section_id section id.
		 * @param string $selector selector.
		 * @param string $default_property Section default CSS property.
		 * @param string $mobile_tablet_default Mobile/Tabled display property.
		 * @return array
		 */
		public static function prepare_visibility_css( $section_id, $selector, $default_property = 'flex', $mobile_tablet_default = '' ) {

			$css_output_desktop = array();
			$css_output_tablet  = array();
			$css_output_mobile  = array();

			// For Mobile/Tablet we need display grid property to display elements centerd alignment.
			$mobile_tablet_default = ( $mobile_tablet_default ) ? $mobile_tablet_default : $default_property;

			$hide_desktop = ( ! astra_get_option( $section_id . '-hide-desktop' ) ) ? $default_property : 'none';
			$hide_tablet  = ( ! astra_get_option( $section_id . '-hide-tablet' ) ) ? $mobile_tablet_default : 'none';
			$hide_mobile  = ( ! astra_get_option( $section_id . '-hide-mobile' ) ) ? $mobile_tablet_default : 'none';

			$css_output_desktop = array(
				$selector => array(
					'display' => $hide_desktop,
				),
			);

			$css_output_tablet = array(
				'.ast-header-break-point ' . $selector => array(
					'display' => $hide_tablet,
				),
			);

			$css_output_mobile = array(
				'.ast-header-break-point ' . $selector => array(
					'display' => $hide_mobile,
				),
			);

			/* Parse CSS from array() */
			$css_output  = astra_parse_css( $css_output_desktop );
			$css_output .= astra_parse_css( $css_output_tablet, '', astra_get_tablet_breakpoint() );
			$css_output .= astra_parse_css( $css_output_mobile, '', astra_get_mobile_breakpoint() );

			return $css_output;
		}

		/**
		 * Generate dark palette CSS variable styles for the front end.
		 *
		 * @since x.x.x
		 * @return string
		 */
		public static function generate_dark_palette_style() {

			$variable_prefix    = Astra_Global_Palette::get_css_variable_prefix();
			$dark_palette       = astra_get_option( 'dark-mode-palette', 'palette_2' );
			$ast_palette_config = astra_get_palette_colors();
			$palette_style      = array();
			$palette_css_vars   = array();
			$css                = '';

			if ( isset( $ast_palette_config['palettes'][ $dark_palette ] ) ) {
				foreach ( $ast_palette_config['palettes'][ $dark_palette ] as $key => $color ) {
					$palette_key = str_replace( '--', '-', $variable_prefix ) . $key;

					$palette_style[ '.ast-dark-mode .has' . $palette_key . '-color' ] = array(
						'color' => 'var(' . $variable_prefix . $key . ')',
					);

					$palette_style[ '.ast-dark-mode .has' . $palette_key . '-background-color' ] = array(
						'background-color' => 'var(' . $variable_prefix . $key . ')',
					);

					$palette_style[ '.ast-dark-mode .wp-block-button .has' . $palette_key . '-color' ] = array(
						'color' => 'var(' . $variable_prefix . $key . ')',
					);

					$palette_style[ '.ast-dark-mode .wp-block-button .has' . $palette_key . '-background-color' ] = array(
						'background-color' => 'var(' . $variable_prefix . $key . ')',
					);

					$palette_css_vars[ $variable_prefix . $key ] = $color;
				}
			}

			$palette_style['.ast-dark-mode'] = $palette_css_vars;
			$css                             = astra_parse_css( $palette_style );

			return $css;
		}

		/**
		 * Render dark mode color palette CSS.
		 *
		 * @since x.x.x
		 *
		 * @param string $dynamic_css Appended dynamic CSS.
		 * @param string $dynamic_css_filtered Filtered dynamic CSS.
		 * @return string $dynamic_css Appended dynamic CSS.
		 */
		public static function dark_color_palette_css( $dynamic_css, $dynamic_css_filtered = '' ) {

			if ( Astra_Builder_Helper::is_component_loaded( 'mode-switcher', 'header' ) || Astra_Builder_Helper::is_component_loaded( 'mode-switcher', 'footer' ) || true === astra_get_option( 'enable-fixed-switch-mode', false ) ) {

				$astra_mode_switcher_static_css = '
					.ast-mode-switcher-trigger, .ast-mode-switcher-trigger:hover, .ast-mode-switcher-trigger:focus, .ast-mode-switcher-trigger:active {
						cursor: pointer;
						background: none;
						border: none;
						padding: 0.6em;
					}
					.ast-mode-switcher-trigger, .ast-mode-label {
						position: relative;
					}
					.ast-switcher-icon-with-label-type, .ast-switcher-label-type {
						margin: 0 10px;
					}
					[data-section="header-section-mode-switcher"], [data-section="footer-section-mode-switcher"], .ast-fixed-switch-wrapper {
						display: flex;
					}
					.ast-mode-switcher-icon {
						fill: currentColor;
					}
					.ast-mode-switcher-trigger .ahfb-svg-iconset {
						vertical-align: middle;
					}
					.ast-light-mode-wrap, .ast-dark-mode .ast-dark-mode-wrap {
						display: none;
					}
					.ast-dark-mode .ast-light-mode-wrap {
						display: block;
					}
				';

				$dynamic_css .= Astra_Enqueue_Scripts::trim_css( $astra_mode_switcher_static_css );

				$dynamic_css .= self::generate_dark_palette_style();
			}

			return $dynamic_css;
		}

		/**
		 * Adding head frontend script for avoiding jerk while landing on site initially.
		 *
		 * @since x.x.x
		 */
		public function mode_preference_script() {
			?>
				<script type="text/javascript">
					var siteView = localStorage.getItem( "astra-color-mode" );

					if ( siteView && siteView === "dark" ) {
						document.documentElement.classList.add( "ast-dark-mode" );
					}

					if ( siteView && siteView === "light" && document.documentElement.classList.contains( "ast-dark-mode" ) ) {
						document.documentElement.classList.remove( "ast-dark-mode" );
					}
				</script>
			<?php
		}
	}

	/**
	 *  Prepare if class 'Astra_Builder_Base_Dynamic_CSS' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	Astra_Builder_Base_Dynamic_CSS::get_instance();
}
