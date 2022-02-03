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

	var postTypesCount = AstraPostStrcturesData.post_types.length || false,
		postTypes = AstraPostStrcturesData.post_types || [],
		tablet_break_point    = astraBuilderPreview.tablet_break_point || 768,
		mobile_break_point    = astraBuilderPreview.mobile_break_point || 544;

	// For single layouts.
    for ( var index = 0; index < postTypesCount; index++ ) {
		var postType = postTypes[ index ],
			layoutType = ( undefined !== wp.customize( 'astra-settings[ast-single-' + postType + '-layout]' ) ) ? wp.customize( 'astra-settings[ast-single-' + postType + '-layout]' ).get() : 'both';

		if( 'layout-2' === layoutType ) {
			var selector = '.ast-single-entry-banner[data-post-type="' + postType + '"]';
		} else if( 'layout-1' === layoutType ) {
			var selector = 'header.entry-header';
		} else {
			var selector = '.ast-single-entry-banner[data-post-type="' + postType + '"], header.entry-header';
		}

		wp.customize( 'astra-settings[ast-single-' + postType + 'banner-width-type]', function( value ) {
			value.bind( function( type ) {
				console.error( type );
				if ( 'custom' === type ) {
					jQuery('.ast-single-entry-banner[data-post-type="' + postType + '"]').attr( 'data-banner-width-type', 'custom' );
					var customWidthSize = wp.customize( 'astra-settings[ast-single-' + postType + '-banner-custom-width]' ).get(),
						dynamicStyle = '';
						dynamicStyle += '.ast-single-entry-banner[data-post-type="' + postType + '"][data-banner-width-type="custom"] {';
						dynamicStyle += 'max-width: ' + customWidthSize + 'px;';
						dynamicStyle += '} ';
					astra_add_dynamic_css( 'ast-single-' + postType + '-banner-width-type', dynamicStyle );
				} else {
					jQuery('.ast-single-entry-banner[data-post-type="' + postType + '"]').attr( 'data-banner-width-type', 'full' );
				}
			} );
		} );

		wp.customize( 'astra-settings[ast-single-' + postType + '-horizontal-alignment]', function( value ) {
			value.bind( function( alignment ) {
				if( alignment.desktop != '' || alignment.tablet != '' || alignment.mobile != '' ) {
					var dynamicStyle = '';
					dynamicStyle += selector + ' {';
					dynamicStyle += 'text-align: ' + alignment['desktop'] + ';';
					dynamicStyle += '} ';

					dynamicStyle +=  '@media (max-width: ' + tablet_break_point + 'px) {';
					dynamicStyle += selector + ' {';
					dynamicStyle += 'text-align: ' + alignment['tablet'] + ';';
					dynamicStyle += '} ';
					dynamicStyle += '} ';

					dynamicStyle +=  '@media (max-width: ' + mobile_break_point + 'px) {';
					dynamicStyle += selector + ' {';
					dynamicStyle += 'text-align: ' + alignment['mobile'] + ';';
					dynamicStyle += '} ';
					dynamicStyle += '} ';

					astra_add_dynamic_css( 'ast-single-' + postType + '-horizontal-alignment', dynamicStyle );
				}
			} );
		} );

		astra_css(
			'astra-settings[ast-single-' + postType + '-vertical-alignment]',
			'justify-content',
			'.ast-single-entry-banner[data-post-type="' + postType + '"]'
		);

		astra_css(
			'astra-settings[ast-single-' + postType + '-banner-custom-width]',
			'max-width',
			'.ast-single-entry-banner[data-post-type="' + postType + '"][data-banner-width-type="custom"]',
			'px'
		);

		astra_css(
			'astra-settings[ast-single-' + postType + '-elements-gap]',
			'margin-bottom',
			'header.entry-header > *, .ast-single-entry-banner[data-post-type="' + postType + '"] > *',
			'px'
		);

		astra_css(
			'astra-settings[ast-single-' + postType + '-banner-text-color]',
			'color',
			selector
		);

		astra_css(
			'astra-settings[ast-single-' + postType + '-banner-title-color]',
			'color',
			selector + ' .entry-title'
		);

		astra_css(
			'astra-settings[ast-single-' + postType + '-banner-link-color]',
			'color',
			selector + ' a'
		);

		astra_css(
			'astra-settings[ast-single-' + postType + '-banner-link-hover-color]',
			'color',
			selector + ' a:hover'
		);

		astra_apply_responsive_background_css( 'astra-settings[ast-single-' + postType + '-banner-custom-bg]', '.ast-single-entry-banner[data-post-type="' + postType + '"][data-banner-background-type="custom"]', 'desktop' );
		astra_apply_responsive_background_css( 'astra-settings[ast-single-' + postType + '-banner-custom-bg]', '.ast-single-entry-banner[data-post-type="' + postType + '"][data-banner-background-type="custom"]', 'tablet' );
		astra_apply_responsive_background_css( 'astra-settings[ast-single-' + postType + '-banner-custom-bg]', '.ast-single-entry-banner[data-post-type="' + postType + '"][data-banner-background-type="custom"]', 'mobile' );

		astra_responsive_spacing( 'astra-settings[ast-single-' + postType + '-banner-padding]','.ast-single-entry-banner[data-post-type="' + postType + '"]', 'padding',  ['top', 'right', 'bottom', 'left' ] );
		astra_responsive_spacing( 'astra-settings[ast-single-' + postType + '-banner-margin]','.ast-single-entry-banner[data-post-type="' + postType + '"]', 'margin',  ['top', 'right', 'bottom', 'left' ] );
	}

	// For archive layouts.
	for ( var index = 0; index < postTypesCount; index++ ) {
		var postType = postTypes[ index ];

		wp.customize( 'astra-settings[ast-archive-' + postType + 'banner-width-type]', function( value ) {
			value.bind( function( type ) {
				console.error( type );
				if ( 'custom' === type ) {
					jQuery('.ast-archive-entry-banner[data-post-type="' + postType + '"]').attr( 'data-banner-width-type', 'custom' );
					var customWidthSize = wp.customize( 'astra-settings[ast-archive-' + postType + 'banner-custom-width]' ).get(),
						dynamicStyle = '';
						dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-width-type="custom"] {';
						dynamicStyle += 'max-width: ' + customWidthSize + 'px;';
						dynamicStyle += '} ';
					astra_add_dynamic_css( 'ast-archive-' + postType + '-banner-width-type', dynamicStyle );
				} else {
					jQuery('.ast-archive-entry-banner[data-post-type="' + postType + '"]').attr( 'data-banner-width-type', 'full' );
				}
			} );
		} );

		wp.customize( 'astra-settings[ast-archive-' + postType + '-horizontal-alignment]', function( value ) {
			value.bind( function( alignment ) {
				if( alignment.desktop != '' || alignment.tablet != '' || alignment.mobile != '' ) {
					var dynamicStyle = '';
					dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"] {';
					dynamicStyle += 'text-align: ' + alignment['desktop'] + ';';
					dynamicStyle += '} ';

					dynamicStyle +=  '@media (max-width: ' + tablet_break_point + 'px) {';
					dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"] {';
					dynamicStyle += 'text-align: ' + alignment['tablet'] + ';';
					dynamicStyle += '} ';
					dynamicStyle += '} ';

					dynamicStyle +=  '@media (max-width: ' + mobile_break_point + 'px) {';
					dynamicStyle += '.ast-archive-entry-banner[data-post-type="' + postType + '"] {';
					dynamicStyle += 'text-align: ' + alignment['mobile'] + ';';
					dynamicStyle += '} ';
					dynamicStyle += '} ';

					astra_add_dynamic_css( 'ast-archive-' + postType + '-horizontal-alignment', dynamicStyle );
				}
			} );
		} );

		astra_css(
			'astra-settings[ast-archive-' + postType + '-vertical-alignment]',
			'justify-content',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"]'
		);

		astra_css(
			'astra-settings[ast-archive-' + postType + '-banner-custom-width]',
			'max-width',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-width-type="custom"]',
			'px'
		);

		astra_css(
			'astra-settings[ast-archive-' + postType + '-elements-gap]',
			'margin-bottom',
			'header.entry-header > *, .ast-archive-entry-banner[data-post-type="' + postType + '"] > *',
			'px'
		);

		astra_css(
			'astra-settings[ast-archive-' + postType + '-banner-text-color]',
			'color',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"]'
		);

		astra_css(
			'astra-settings[ast-archive-' + postType + '-banner-title-color]',
			'color',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"] h1'
		);

		astra_css(
			'astra-settings[ast-archive-' + postType + '-banner-link-color]',
			'color',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"] a'
		);

		astra_css(
			'astra-settings[ast-archive-' + postType + '-banner-link-hover-color]',
			'color',
			'.ast-archive-entry-banner[data-post-type="' + postType + '"] a:hover'
		);

		astra_apply_responsive_background_css( 'astra-settings[ast-archive-' + postType + '-banner-custom-bg]', '.ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-background-type="custom"]', 'desktop' );
		astra_apply_responsive_background_css( 'astra-settings[ast-archive-' + postType + '-banner-custom-bg]', '.ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-background-type="custom"]', 'tablet' );
		astra_apply_responsive_background_css( 'astra-settings[ast-archive-' + postType + '-banner-custom-bg]', '.ast-archive-entry-banner[data-post-type="' + postType + '"][data-banner-background-type="custom"]', 'mobile' );

		astra_responsive_spacing( 'astra-settings[ast-archive-' + postType + '-banner-padding]','.ast-archive-entry-banner[data-post-type="' + postType + '"]', 'padding',  ['top', 'right', 'bottom', 'left' ] );
		astra_responsive_spacing( 'astra-settings[ast-archive-' + postType + '-banner-margin]','.ast-archive-entry-banner[data-post-type="' + postType + '"]', 'margin',  ['top', 'right', 'bottom', 'left' ] );
	}

} )( jQuery );
