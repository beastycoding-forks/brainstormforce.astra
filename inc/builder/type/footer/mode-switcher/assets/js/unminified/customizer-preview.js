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
		isProDarkModeActive   = astraFooterModeSwitcherPreview.isDarkModeProActive || false,
		isTooltipEnabled   	  = astraFooterModeSwitcherPreview.isTooltipEnabled,
		section = 'footer-section-mode-switcher',
		selector = '.ast-footer-mode-switcher';

	// Icon Size.
	wp.customize( 'astra-settings[footer-mode-switcher-icon-size]', function( value ) {
		value.bind( function( size ) {
			if( size.desktop != '' || size.tablet != '' || size.mobile != '' ) {
				var dynamicStyle = '',
					modeSwitcherStyle = wp.customize( 'astra-settings[footer-dark-mode-switch-style]' ).get() || 'button';

				dynamicStyle += selector + ' .ast-mode-switcher-icon {';
				dynamicStyle += 'height: ' + size.desktop + 'px' + ';';
				dynamicStyle += 'width: ' + size.desktop + 'px' + ';';
				dynamicStyle += '} ';
				if( 'toggle' === modeSwitcherStyle ) {
					dynamicStyle += '[data-section="footer-section-mode-switcher"] .ast-switcher-toggle-style:not(.ast-switcher-label-type):after {';
					dynamicStyle += 'width: calc( ' + size.desktop + 'px' + ' + 0.4em );';
					dynamicStyle += 'height: calc( ' + size.desktop + 'px' + ' + 0.4em );';
					dynamicStyle += '} ';
				}

				dynamicStyle +=  '@media (max-width: ' + tablet_break_point + 'px) {';
				dynamicStyle += selector + ' .ast-mode-switcher-icon {';
				dynamicStyle += 'height: ' + size.tablet + 'px' + ';';
				dynamicStyle += 'width: ' + size.tablet + 'px' + ';';
				dynamicStyle += '} ';
				if( 'toggle' === modeSwitcherStyle ) {
					dynamicStyle += '[data-section="footer-section-mode-switcher"] .ast-switcher-toggle-style:not(.ast-switcher-label-type):after {';
					dynamicStyle += 'width: calc( ' + size.tablet + 'px' + ' + 0.4em );';
					dynamicStyle += 'height: calc( ' + size.tablet + 'px' + ' + 0.4em );';
					dynamicStyle += '} ';
				}
				dynamicStyle += '} ';

				dynamicStyle +=  '@media (max-width: ' + mobile_break_point + 'px) {';
				dynamicStyle += selector + ' .ast-mode-switcher-icon {';
				dynamicStyle += 'height: ' + size.mobile + 'px' + ';';
				dynamicStyle += 'width: ' + size.mobile + 'px' + ';';
				dynamicStyle += '} ';
				if( 'toggle' === modeSwitcherStyle ) {
					dynamicStyle += '[data-section="footer-section-mode-switcher"] .ast-switcher-toggle-style:not(.ast-switcher-label-type):after {';
					dynamicStyle += 'width: calc( ' + size.mobile + 'px' + ' + 0.4em );';
					dynamicStyle += 'height: calc( ' + size.mobile + 'px' + ' + 0.4em );';
					dynamicStyle += '} ';
				}
				dynamicStyle += '} ';
				astra_add_dynamic_css( 'footer-mode-switcher-icon-size', dynamicStyle );
			}
		} );
	} );

	// Switch colors - Light color.
	wp.customize( 'astra-settings[footer-dark-mode-switcher-light-color]', function( setting ) {
		setting.bind( function( color ) {
			if( isProDarkModeActive && isTooltipEnabled ) {
				wp.customize.preview.send( 'refresh' );
			} else {
				var dynamicStyle = '';
				dynamicStyle += selector + ', ' + selector + ':hover {';
				dynamicStyle += 'color: ' + color + ';';
				dynamicStyle += '} ';
				dynamicStyle += '.ast-dark-mode ' + selector + ' {';
				dynamicStyle += 'background-color: ' + color + ';';
				dynamicStyle += '} ';
				astra_add_dynamic_css( 'footer-dark-mode-switcher-light-color', dynamicStyle );
			}
		});
	});

	// Switch colors - Dark color.
	wp.customize( 'astra-settings[footer-dark-mode-switcher-dark-color]', function( setting ) {
		setting.bind( function( color ) {
			if( isProDarkModeActive && isTooltipEnabled ) {
				wp.customize.preview.send( 'refresh' );
			} else {
				var dynamicStyle = '';
				dynamicStyle += selector + ', ' + selector + ':hover {';
				dynamicStyle += 'background-color: ' + color + ';';
				dynamicStyle += '} ';
				dynamicStyle += '.ast-dark-mode ' + selector + ' {';
				dynamicStyle += 'color: ' + color + ';';
				dynamicStyle += '} ';
				astra_add_dynamic_css( 'footer-dark-mode-switcher-dark-color', dynamicStyle );
			}
		});
	});

	// Misc preview support.
	astra_css( 'astra-settings[footer-mode-switcher-border-radius]', 'border-radius', selector, 'px' );

	// Label font settings.
	astra_responsive_font_size( 'astra-settings[font-size-footer-section-mode-switcher]', selector );

	// Advanced CSS Generation.
	astra_builder_advanced_css( section, selector );

} )( jQuery );
