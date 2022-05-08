<?php
/**
 * Astra is a very powerful theme and virtually anything can be customized
 * via a child theme.
 *
 * @package     Astra
 * @author      Astra
 * @copyright   Copyright (c) 2022, Astra
 * @link        https://wpastra.com/
 * @since       Astra x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Astra_Setup_Theme initial setup for Full Site Editing.
 *
 * @since x.x.x
 */
if ( ! class_exists( 'Astra_Setup_Theme' ) ) {

	/**
	 * Astra_Setup_Theme initial setup
	 */
	class Astra_Setup_Theme {

		/**
		 * Constructor
		 */
		public function __construct() {
			add_action( 'after_setup_theme', array( $this, 'setup_theme' ), 2 );
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 1 );
		}

		/**
		 * Dequeue theme assets when FSE is enabled.
		 *
		 * @since x.x.x
		 */
		public function enqueue_scripts() {
			/* Directory and Extension */
			/** @psalm-suppress RedundantCondition */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			$file_prefix = ( SCRIPT_DEBUG ) ? '' : '.min';
			/** @psalm-suppress RedundantCondition */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			$dir_name = ( SCRIPT_DEBUG ) ? 'unminified' : 'minified';
			$css_uri  = ASTRA_THEME_URI . 'assets/css/' . $dir_name . '/';

			// Register theme stylesheet.
			wp_register_style( 'astra-fse-css', $css_uri . 'fse-main' . $file_prefix . '.css', array(), ASTRA_THEME_VERSION, 'all' );

			// Enqueue theme stylesheet.
			wp_enqueue_style( 'astra-fse-css' );
		}

		/**
		 * Setup theme
		 *
		 * @since 1.0.0
		 */
		public function setup_theme() {

			do_action( 'astra_class_loaded' );

			/**
			 * Make theme available for translation.
			 * Translations can be filed in the /languages/ directory.
			 * If you're building a theme based on Next, use a find and replace
			 * to change 'astra' to the name of your theme in all the template files.
			 */
			load_theme_textdomain( 'astra', ASTRA_THEME_DIR . '/languages' );

			/**
			 * Theme Support
			 */

			// Gutenberg wide images.
			add_theme_support( 'align-wide' );

			// Add default posts and comments RSS feed links to head.
			add_theme_support( 'automatic-feed-links' );

			// Let WordPress manage the document title.
			add_theme_support( 'title-tag' );

			// Enable support for Post Thumbnails on posts and pages.
			add_theme_support( 'post-thumbnails' );

			// Switch default core markup for search form, comment form, and comments.
			// to output valid HTML5.
			// Added a new value in HTML5 array 'navigation-widgets' as this was introduced in WP5.5 for better accessibility.
			add_theme_support(
				'html5',
				array(
					'navigation-widgets',
					'search-form',
					'gallery',
					'caption',
					'style',
					'script',
				)
			);

			// Post formats.
			add_theme_support(
				'post-formats',
				array(
					'gallery',
					'image',
					'link',
					'quote',
					'video',
					'audio',
					'status',
					'aside',
				)
			);

			// Add theme support for Custom Logo.
			add_theme_support(
				'custom-logo',
				array(
					'width'       => 180,
					'height'      => 60,
					'flex-width'  => true,
					'flex-height' => true,
				)
			);

			// Customize Selective Refresh Widgets.
			add_theme_support( 'customize-selective-refresh-widgets' );

			/**
			 * This theme styles the visual editor to resemble the theme style,
			 * specifically font, colors, icons, and column width.
			 */
			/* Directory and Extension */
			$dir_name    = 'minified';
			$file_prefix = '';
			/** @psalm-suppress RedundantCondition */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			if ( SCRIPT_DEBUG ) {
				$dir_name    = 'unminified';
				$file_prefix = '.min';
			}
			if ( apply_filters( 'astra_theme_editor_style', true ) ) {
				add_editor_style( 'assets/css/' . $dir_name . '/editor-style' . $file_prefix . '.css' );
			}

			if ( apply_filters( 'astra_fullwidth_oembed', true ) ) {
				// Filters the oEmbed process to run the responsive_oembed_wrapper() function.
				add_filter( 'embed_oembed_html', array( $this, 'responsive_oembed_wrapper' ), 10, 3 );
			}

			// WooCommerce.
			add_theme_support( 'woocommerce' );

			// Rank Math Breadcrumb.
			add_theme_support( 'rank-math-breadcrumbs' );

			// Native AMP Support.
			if ( true === apply_filters( 'astra_amp_support', true ) ) {
				add_theme_support(
					'amp',
					apply_filters(
						'astra_amp_theme_features',
						array(
							'paired' => true,
						)
					)
				);
			}
		}

		/**
		 * Adds a responsive embed wrapper around oEmbed content
		 *
		 * @param  string $html The oEmbed markup.
		 * @param  string $url The URL being embedded.
		 * @param  array  $attr An array of attributes.
		 *
		 * @return string       Updated embed markup.
		 */
		public function responsive_oembed_wrapper( $html, $url, $attr ) {

			$add_astra_oembed_wrapper = apply_filters( 'astra_responsive_oembed_wrapper_enable', true );

			$allowed_providers = apply_filters(
				'astra_allowed_fullwidth_oembed_providers',
				array(
					'vimeo.com',
					'youtube.com',
					'youtu.be',
					'wistia.com',
					'wistia.net',
				)
			);

			if ( astra_strposa( $url, $allowed_providers ) ) {
				if ( $add_astra_oembed_wrapper ) {
					$html = ( '' !== $html ) ? '<div class="ast-oembed-container">' . $html . '</div>' : '';
				}
			}

			return $html;
		}
	}
}

/**
 * Kicking this off by calling 'get_instance()' method
 */
new Astra_Setup_Theme();
