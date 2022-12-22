/**
 * This file adds some LIVE to the Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. Your javascript should grab settings from customizer controls, and
 * then make any necessary changes to the page using jQuery.
 *
 * @package Astra
 * @since x.x.x
 */

function astra_dynamic_build_css( addon, control, css_property, selector, unitSupport = false ) {
	var tablet_break_point    = AstraPostStrcturesData.tablet_break_point || 768,
		mobile_break_point    = AstraPostStrcturesData.mobile_break_point || 544,
		unitSuffix = unitSupport || '';

	wp.customize( control, function( value ) {
		value.bind( function( value ) {
			if ( value.desktop || value.mobile || value.tablet ) {
				// Remove <style> first!
				control = control.replace( '[', '-' );
				control = control.replace( ']', '' );
				jQuery( 'style#' + control + '-dynamic-preview-css' ).remove();

				var DeskVal = '',
					TabletFontVal = '',
					MobileVal = '';

				if ( '' != value.desktop ) {
					DeskVal = css_property + ': ' + value.desktop;
				}
				if ( '' != value.tablet ) {
					TabletFontVal = css_property + ': ' + value.tablet;
				}
				if ( '' != value.mobile ) {
					MobileVal = css_property + ': ' + value.mobile;
				}

				// Concat and append new <style>.
				jQuery( 'head' ).append(
					'<style id="' + control + '-dynamic-preview-css">'
					+ selector + ' { ' + DeskVal + unitSuffix + ' }'
					+ '@media (max-width: ' + tablet_break_point + 'px) {' + selector + ' { ' + TabletFontVal + unitSuffix + ' } }'
					+ '@media (max-width: ' + mobile_break_point + 'px) {' + selector + ' { ' + MobileVal + unitSuffix + ' } }'
					+ '</style>'
				);
			} else {
				jQuery( 'style#' + control + '-' + addon ).remove();
			}
		} );
	} );
}

function astra_refresh_customizer( control ) {
	wp.customize( control, function( value ) {
		value.bind( function( value ) {
			wp.customize.preview.send( 'refresh' );
		} );
	} );
}

( function( $ ) {

	var postTypesCount = AstraPostStrcturesData.post_types.length || false,
		postTypes = AstraPostStrcturesData.post_types || [],
		tablet_break_point    = AstraPostStrcturesData.tablet_break_point || 768,
		mobile_break_point    = AstraPostStrcturesData.mobile_break_point || 544;

	/**
	 * For single layouts.
	 */
	for ( var index = 0; index < postTypesCount; index++ ) {
		var postType = postTypes[ index ],
			layoutType = ( undefined !== wp.customize( 'astra-settings[ast-dynamic-single-' + postType + '-layout]' ) ) ? wp.customize( 'astra-settings[ast-dynamic-single-' + postType + '-layout]' ).get() : 'both',
			postTypeSelector = 'page' === postType ? '.page' : '.single-' + postType;

		if( 'layout-2' === layoutType ) {
			var selector = '.ast-single-entry-banner[data-post-type="' + postType + '"]';
		} else if( 'layout-1' === layoutType ) {
			var selector =  postTypeSelector + ' header.entry-header';
		} else {
			var selector = '.ast-single-entry-banner[data-post-type="' + postType + '"], ' + postTypeSelector + ' header.entry-header';
		}

		astra_refresh_customizer(
			'astra-settings[ast-dynamic-single-' + postType + '-taxonomy]'
		);

		astra_refresh_customizer(
			'astra-settings[ast-dynamic-single-' + postType + '-taxonomy-1]'
		);

		astra_refresh_customizer(
			'astra-settings[ast-dynamic-single-' + postType + '-taxonomy-2]'
		);

		astra_dynamic_build_css(
			'ast-dynamic-single-' + postType + '-horizontal-alignment',
			'astra-settings[ast-dynamic-single-' + postType + '-horizontal-alignment]',
			'text-align',
			selector
		);

		astra_dynamic_build_css(
			'ast-dynamic-single-' + postType + '-banner-height',
			'astra-settings[ast-dynamic-single-' + postType + '-banner-height]',
			'min-height',
			selector,
			'px'
		);

		astra_refresh_customizer(
			'astra-settings[ast-dynamic-single-' + postType + '-featured-as-background]'
		);

		astra_refresh_customizer(
			'astra-settings[ast-dynamic-single-' + postType + '-banner-featured-overlay]'
		);

		astra_apply_responsive_background_css( 'astra-settings[ast-dynamic-single-' + postType + '-banner-background]', postTypeSelector + ' .ast-single-entry-banner[data-post-type="' + postType + '"]', 'desktop' );
		astra_apply_responsive_background_css( 'astra-settings[ast-dynamic-single-' + postType + '-banner-background]', postTypeSelector + ' .ast-single-entry-banner[data-post-type="' + postType + '"]', 'tablet' );
		astra_apply_responsive_background_css( 'astra-settings[ast-dynamic-single-' + postType + '-banner-background]', postTypeSelector + ' .ast-single-entry-banner[data-post-type="' + postType + '"]', 'mobile' );

		astra_css(
			'astra-settings[ast-dynamic-single-' + postType + '-vertical-alignment]',
			'justify-content',
			'.ast-single-entry-banner[data-post-type="' + postType + '"]'
		);

		astra_css(
			'astra-settings[ast-dynamic-single-' + postType + '-banner-custom-width]',
			'max-width',
			'.ast-single-entry-banner[data-post-type="' + postType + '"][data-banner-width-type="custom"]',
			'px'
		);

		astra_css(
			'astra-settings[ast-dynamic-single-' + postType + '-elements-gap]',
			'margin-bottom',
			postTypeSelector + ' header.entry-header > *:not(:last-child), .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container > *:not(:last-child)',
			'px'
		);

		astra_css(
			'astra-settings[ast-dynamic-single-' + postType + '-banner-text-color]',
			'color',
			postTypeSelector + ' header.entry-header *, .ast-single-entry-banner[data-post-type="' + postType + '"] *',
		);

		astra_css(
			'astra-settings[ast-dynamic-single-' + postType + '-banner-title-color]',
			'color',
			postTypeSelector + ' header.entry-header .entry-title, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-title',
		);

		astra_css(
			'astra-settings[ast-dynamic-single-' + postType + '-banner-link-color]',
			'color',
			'.ast-single-entry-banner[data-post-type="' + postType + '"] a, ' + postTypeSelector + ' header.entry-header a, .ast-single-entry-banner[data-post-type="' + postType + '"] a *, ' + postTypeSelector + ' header.entry-header a *'
		);

		astra_css(
			'astra-settings[ast-dynamic-single-' + postType + '-banner-link-hover-color]',
			'color',
			'.ast-single-entry-banner[data-post-type="' + postType + '"] a:hover, ' + postTypeSelector + ' header.entry-header a:hover, .ast-single-entry-banner[data-post-type="' + postType + '"] a:hover *, ' + postTypeSelector + ' header.entry-header a:hover *'
		);

		astra_responsive_spacing( 'astra-settings[ast-dynamic-single-' + postType + '-banner-padding]','.ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container', 'padding',  ['top', 'right', 'bottom', 'left' ] );
		astra_responsive_spacing( 'astra-settings[ast-dynamic-single-' + postType + '-banner-margin]','.ast-single-entry-banner[data-post-type="' + postType + '"]', 'margin',  ['top', 'right', 'bottom', 'left' ] );

		// Banner - Title.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-single-' + postType + '-title-font-family]', postTypeSelector + ' header.entry-header .entry-title, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-title' );
		astra_generate_font_weight_css( 'astra-settings[ast-dynamic-single-' + postType + '-title-font-family]', 'astra-settings[ast-dynamic-single-' + postType + '-title-font-weight]', 'font-weight', postTypeSelector + ' header.entry-header .entry-title, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-title' );
		astra_css( 'astra-settings[ast-dynamic-single-' + postType + '-title-font-weight]', 'font-weight', postTypeSelector + ' header.entry-header .entry-title, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-title' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-single-' + postType + '-title-font-size]', postTypeSelector + ' header.entry-header .entry-title, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-title' );
		astra_font_extras_css( 'ast-dynamic-single-' + postType + '-title-font-extras', postTypeSelector + ' header.entry-header .entry-title, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-title' );

		// Banner - Text.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-single-' + postType + '-text-font-family]', postTypeSelector + ' header.entry-header *, .ast-single-entry-banner[data-post-type="' + postType + '"] *' );
		astra_generate_font_weight_css( 'astra-settings[ast-dynamic-single-' + postType + '-text-font-family]', 'astra-settings[ast-dynamic-single-' + postType + '-text-font-weight]', 'font-weight', postTypeSelector + ' header.entry-header *, .ast-single-entry-banner[data-post-type="' + postType + '"] *' );
		astra_css( 'astra-settings[ast-dynamic-single-' + postType + '-text-font-weight]', 'font-weight', postTypeSelector + ' header.entry-header *, .ast-single-entry-banner[data-post-type="' + postType + '"] *' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-single-' + postType + '-text-font-size]', postTypeSelector + ' header.entry-header *, .ast-single-entry-banner[data-post-type="' + postType + '"] *' );
		astra_font_extras_css( 'ast-dynamic-single-' + postType + '-text-font-extras', postTypeSelector + ' header.entry-header *, .ast-single-entry-banner[data-post-type="' + postType + '"] .ast-container *' );

		// Banner - Meta.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-single-' + postType + '-meta-font-family]', postTypeSelector + ' header.entry-header .entry-meta, ' + postTypeSelector + ' header.entry-header .entry-meta *, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta *' );
		astra_generate_font_weight_css( 'astra-settings[ast-dynamic-single-' + postType + '-meta-font-family]', 'astra-settings[ast-dynamic-single-' + postType + '-meta-font-weight]', 'font-weight', postTypeSelector + ' header.entry-header .entry-meta, ' + postTypeSelector + ' header.entry-header .entry-meta *, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta *' );
		astra_css( 'astra-settings[ast-dynamic-single-' + postType + '-meta-font-weight]', 'font-weight', postTypeSelector + ' header.entry-header .entry-meta, ' + postTypeSelector + ' header.entry-header .entry-meta *, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta *' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-single-' + postType + '-meta-font-size]', postTypeSelector + ' header.entry-header .entry-meta, ' + postTypeSelector + ' header.entry-header .entry-meta *, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta *' );
		astra_font_extras_css( 'ast-dynamic-single-' + postType + '-meta-font-extras', postTypeSelector + ' header.entry-header .entry-meta, ' + postTypeSelector + ' header.entry-header .entry-meta *, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta, .ast-single-entry-banner[data-post-type="' + postType + '"] .entry-meta *' );
	}

	/**
	 * For archive layouts.
	 */
	for ( var index = 0; index < postTypesCount; index++ ) {
		var postType = postTypes[ index ],
			layoutType = ( undefined !== wp.customize( 'astra-settings[ast-dynamic-archive-' + postType + '-layout]' ) ) ? wp.customize( 'astra-settings[ast-dynamic-archive-' + postType + '-layout]' ).get() : 'both';

		if( 'layout-2' === layoutType ) {
			var selector = '.ast-archive-entry-banner[data-post-type="' + postType + '"]';
		} else if( 'layout-1' === layoutType ) {
			var selector = 'body.archive .ast-archive-description';
		} else {
			var selector = '.ast-archive-entry-banner[data-post-type="' + postType + '"], body.archive .ast-archive-description';
		}

		astra_refresh_customizer(
			'astra-settings[ast-dynamic-archive-' + postType + '-custom-title]'
		);

		astra_refresh_customizer(
			'astra-settings[ast-dynamic-archive-' + postType + '-custom-description]'
		);

		astra_dynamic_build_css(
			'ast-dynamic-archive-' + postType + '-horizontal-alignment',
			'astra-settings[ast-dynamic-archive-' + postType + '-horizontal-alignment]',
			'text-align',
			selector
		);

		astra_dynamic_build_css(
			'ast-dynamic-archive-' + postType + '-banner-height',
			'astra-settings[ast-dynamic-archive-' + postType + '-banner-height]',
			'min-height',
			selector,
			'px'
		);

		wp.customize( 'astra-settings[ast-dynamic-archive-' + postType + 'banner-width-type]', function( value ) {
			value.bind( function( type ) {
				if ( 'custom' === type ) {
					jQuery('.ast-archive-entry-banner[data-post-type="' + postType + '"]').attr( 'data-banner-width-type', 'custom' );
					var customWidthSize = wp.customize( 'astra-settings[ast-dynamic-archive-' + postType + 'banner-custom-width]' ).get(),
						dynamicStyle = '';
						dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-width-type="custom"] {';
						dynamicStyle += 'max-width: ' + customWidthSize + 'px;';
						dynamicStyle += '} ';
					astra_add_dynamic_css( 'ast-dynamic-archive-' + postType + '-banner-width-type', dynamicStyle );
				} else {
					jQuery('.ast-archive-entry-banner[data-post-type="' + postType + '"]').attr( 'data-banner-width-type', 'full' );
				}
			} );
		} );

		wp.customize( 'astra-settings[ast-dynamic-archive-' + postType + '-banner-height]', function( value ) {
			value.bind( function( size ) {

				if( size.desktop != '' || size.tablet != '' || size.mobile != '' ) {
					var dynamicStyle = '';
					dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"] {';
					dynamicStyle += 'min-height: ' + size.desktop + 'px;';
					dynamicStyle += '} ';

					dynamicStyle +=  '@media (max-width: ' + tablet_break_point + 'px) {';
					dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"] {';
					dynamicStyle += 'min-height: ' + size.tablet + 'px;';
					dynamicStyle += '} ';
					dynamicStyle += '} ';

					dynamicStyle +=  '@media (max-width: ' + mobile_break_point + 'px) {';
					dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"] {';
					dynamicStyle += 'min-height: ' + size.mobile + 'px;';
					dynamicStyle += '} ';
					dynamicStyle += '} ';

					astra_add_dynamic_css( 'ast-dynamic-archive-' + postType + '-banner-height', dynamicStyle );
				}
			} );
		} );

		astra_css(
			'astra-settings[ast-dynamic-archive-' + postType + '-vertical-alignment]',
			'justify-content',
			selector
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-' + postType + '-banner-custom-width]',
			'max-width',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-width-type="custom"]',
			'px'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-' + postType + '-elements-gap]',
			'margin-bottom',
			'body.archive .ast-archive-description > *:not(:last-child), .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container > *:not(:last-child)',
			'px'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-' + postType + '-banner-text-color]',
			'color',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"] *, body.archive .ast-archive-description *'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-' + postType + '-banner-title-color]',
			'color',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"] h1, body.archive .ast-archive-description h1, .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *, body.archive .ast-archive-description h1 *'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-' + postType + '-banner-link-color]',
			'color',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"] a, body.archive .ast-archive-description a, .ast-archive-entry-banner[data-post-type="' + postType + '"] a *, body.archive .ast-archive-description a *'
		);

		astra_css(
			'astra-settings[ast-dynamic-archive-' + postType + '-banner-link-hover-color]',
			'color',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"] a:hover, body.archive .ast-archive-description a:hover, .ast-archive-entry-banner[data-post-type="' + postType + '"] a:hover *, body.archive .ast-archive-description a:hover *'
		);

		astra_apply_responsive_background_css( 'astra-settings[ast-dynamic-archive-' + postType + '-banner-custom-bg]', '.ast-archive-entry-banner[data-post-type="' + postType + '"], body.archive .ast-archive-description', 'desktop' );
		astra_apply_responsive_background_css( 'astra-settings[ast-dynamic-archive-' + postType + '-banner-custom-bg]', '.ast-archive-entry-banner[data-post-type="' + postType + '"], body.archive .ast-archive-description', 'tablet' );
		astra_apply_responsive_background_css( 'astra-settings[ast-dynamic-archive-' + postType + '-banner-custom-bg]', '.ast-archive-entry-banner[data-post-type="' + postType + '"], body.archive .ast-archive-description', 'mobile' );

		astra_responsive_spacing( 'astra-settings[ast-dynamic-archive-' + postType + '-banner-padding]', '.ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container, body.archive .ast-archive-description', 'padding',  ['top', 'right', 'bottom', 'left' ] );
		astra_responsive_spacing( 'astra-settings[ast-dynamic-archive-' + postType + '-banner-margin]', '.ast-archive-entry-banner[data-post-type="' + postType + '"], body.archive .ast-archive-description', 'margin',  ['top', 'right', 'bottom', 'left' ] );

		// Banner - Title.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-archive-' + postType + '-title-font-family]', '.ast-archive-entry-banner[data-post-type="' + postType + '"] h1, body.archive .ast-archive-description h1, .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *, body.archive .ast-archive-description h1 *' );
		astra_generate_font_weight_css( 'astra-settings[ast-dynamic-archive-' + postType + '-title-font-family]', 'astra-settings[ast-dynamic-archive-' + postType + '-title-font-weight]', 'font-weight', '.ast-archive-entry-banner[data-post-type="' + postType + '"] h1, body.archive .ast-archive-description h1, .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *, body.archive .ast-archive-description h1 *' );
		astra_css( 'astra-settings[ast-dynamic-archive-' + postType + '-title-font-weight]', 'font-weight', '.ast-archive-entry-banner[data-post-type="' + postType + '"] h1, body.archive .ast-archive-description h1, .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *, body.archive .ast-archive-description h1 *' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-archive-' + postType + '-title-font-size]', '.ast-archive-entry-banner[data-post-type="' + postType + '"] h1, body.archive .ast-archive-description .ast-archive-title, .ast-archive-entry-banner[data-post-type="' + postType + '"] h1 *, body.archive .ast-archive-description .ast-archive-title *' );
		astra_font_extras_css( 'ast-dynamic-archive-' + postType + '-title-font-extras', '.ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container h1, body.archive .ast-archive-description .ast-archive-title, .ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container h1 *, body.archive .ast-archive-description h1 *' );

		// Banner - Text.
		astra_generate_outside_font_family_css( 'astra-settings[ast-dynamic-archive-' + postType + '-text-font-family]', '.ast-archive-entry-banner[data-post-type="' + postType + '"], .ast-archive-entry-banner[data-post-type="' + postType + '"] *, body.archive .ast-archive-description, body.archive .ast-archive-description *' );
		astra_generate_font_weight_css( 'astra-settings[ast-dynamic-archive-' + postType + '-text-font-family]', 'astra-settings[ast-dynamic-archive-' + postType + '-text-font-weight]', 'font-weight', '.ast-archive-entry-banner[data-post-type="' + postType + '"], .ast-archive-entry-banner[data-post-type="' + postType + '"] *, body.archive .ast-archive-description, body.archive .ast-archive-description *' );
		astra_css( 'astra-settings[ast-dynamic-archive-' + postType + '-text-font-weight]', 'font-weight', '.ast-archive-entry-banner[data-post-type="' + postType + '"], .ast-archive-entry-banner[data-post-type="' + postType + '"] *, body.archive .ast-archive-description, body.archive .ast-archive-description *' );
		astra_responsive_font_size( 'astra-settings[ast-dynamic-archive-' + postType + '-text-font-size]', '.ast-archive-entry-banner[data-post-type="' + postType + '"], .ast-archive-entry-banner[data-post-type="' + postType + '"] *, body.archive .ast-archive-description, body.archive .ast-archive-description *' );
		astra_font_extras_css( 'ast-dynamic-archive-' + postType + '-text-font-extras', '.ast-archive-entry-banner[data-post-type="' + postType + '"] .ast-container *, body.archive .ast-archive-description *' );
	}

} )( jQuery );
