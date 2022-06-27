<?php
/**
 * Template part for displaying single post's entry banner.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Astra
 * @since x.x.x
 */

global $post;
$post_type = $post->post_type;

// Conditionally updating data section & class.
$attr = 'class="ast-single-entry-banner"';
if ( is_customize_preview() ) {
	$attr = 'class="ast-single-entry-banner ast-post-banner-highlight site-header-focus-item" data-section="ast-single-' . esc_attr( $post_type ) . '"';
}

$data_attrs = 'data-post-type="' . $post_type . '"';

$layout_type = astra_get_option( 'ast-single-' . $post_type . '-layout', 'layout-1' );
$data_attrs .= 'data-banner-layout="' . $layout_type . '"';

if ( 'custom' === astra_get_option( 'ast-single-' . $post_type . '-banner-width-type', 'fullwidth' ) ) {
	$data_attrs .= 'data-banner-width-type="custom"';
}

$background_type = astra_get_option( 'ast-single-' . $post_type . '-banner-image-type', 'none' );
if ( 'none' !== $background_type ) {
	$data_attrs .= 'data-banner-background-type="' . $background_type . '"';
}

?>

<section <?php echo $attr . ' ' . $data_attrs; ?>>

	<?php
	if ( is_customize_preview() ) {
		Astra_Builder_UI_Controller::render_banner_customizer_edit_button();
	}
	?>

	<?php astra_banner_elements_order(); ?>

</section>
