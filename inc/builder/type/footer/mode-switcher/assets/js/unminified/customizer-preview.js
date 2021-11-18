/**
 * This file adds some LIVE to the Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. Your javascript should grab settings from customizer controls, and
 * then make any necessary changes to the page using jQuery.
 *
 * @package Astra
 * @since x.x.x
 */

( function( $ ) {

	var tablet_break_point    = astraBuilderPreview.tablet_break_point || 768,
		mobile_break_point    = astraBuilderPreview.mobile_break_point || 544,
		section = 'footer-section-mode-switcher',
		selector = '.ast-footer-mode-switcher';

	// Icon Size.
	wp.customize( 'astra-settings[footer-mode-switcher-icon-size]', function( value ) {
		value.bind( function( size ) {
			if( size.desktop != '' || size.tablet != '' || size.mobile != '' ) {
				var dynamicStyle = '';
				dynamicStyle += '.ast-mode-switcher-footer-icon {';
				dynamicStyle += 'height: ' + size.desktop + 'px' + ';';
				dynamicStyle += 'width: ' + size.desktop + 'px' + ';';
				dynamicStyle += '} ';

				dynamicStyle +=  '@media (max-width: ' + tablet_break_point + 'px) {';
				dynamicStyle += '.ast-mode-switcher-footer-icon {';
				dynamicStyle += 'height: ' + size.tablet + 'px' + ';';
				dynamicStyle += 'width: ' + size.tablet + 'px' + ';';
				dynamicStyle += '} ';
				dynamicStyle += '} ';

				dynamicStyle +=  '@media (max-width: ' + mobile_break_point + 'px) {';
				dynamicStyle += '.ast-mode-switcher-footer-icon {';
				dynamicStyle += 'height: ' + size.mobile + 'px' + ';';
				dynamicStyle += 'width: ' + size.mobile + 'px' + ';';
				dynamicStyle += '} ';
				dynamicStyle += '} ';
				astra_add_dynamic_css( 'footer-mode-switcher-icon-size', dynamicStyle );
			}
		} );
	} );

	// Switch colors - Light color.
	astra_css( 'astra-settings[footer-dark-mode-switcher-light-color]', 'color', selector + ', ' + selector + ':hover' );
	astra_css( 'astra-settings[footer-dark-mode-switcher-light-color]', 'background-color', '.ast-dark-site ' + selector );

	// Switch colors - Dark color.
	astra_css( 'astra-settings[footer-dark-mode-switcher-dark-color]', 'background-color', selector + ', ' + selector + ':hover' );
	astra_css( 'astra-settings[footer-dark-mode-switcher-dark-color]', 'color', '.ast-dark-site ' + selector );

	// Misc preview support.
	astra_css( 'astra-settings[footer-mode-switcher-border-radius]', 'border-radius', selector, 'px' );

	// Label font settings.
	astra_responsive_font_size( 'astra-settings[font-size-footer-section-mode-switcher]', selector );

	// Advanced CSS Generation.
	astra_builder_advanced_css( section, selector );

} )( jQuery );
