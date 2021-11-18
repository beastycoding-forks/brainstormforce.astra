import { createNewPost, createURL, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';

describe( 'transparent header elements colors in the customizer', () => {
	it( 'transparent header element colors should apply correctly', async () => {
		const transparentElementSettings = {
			'transparent-header-enable': true,
			'transparent-header-disable-page': false,
			'transparent-header-disable-archive': false,
			'transparent-header-disable-latest-posts-index': false,
			'header-desktop-items': {
				below: {
					below_center: {
						0: 'social-icons-1',
						1: 'search',
						2: 'html-1',
						3: 'account',
						4: 'button-1',
					},
				},
			},
			'header-mobile-items': {
				below: {
					below_center: {
						0: 'social-icons-1',
						1: 'search',
						2: 'html-1',
						3: 'account',
						4: 'button-1',
					},
				},
			},
			'transparent-header-social-icons-color': {
				desktop: 'rgb(201, 54, 54)',
				tablet: 'rgb(201, 54, 54)',
				mobile: 'rgb(201, 54, 54)',
			},
			'transparent-header-social-icons-bg-color': {
				desktop: 'rgb(53, 198, 80)',
				tablet: 'rgb(234, 234, 234)',
				mobile: 'rgb(234, 234, 234)',
			},
			'transparent-header-search-icon-color': 'rgb(1, 112, 185)',
			'transparent-header-button-text-color': 'rgb(227, 41, 41)',
			'transparent-header-button-bg-color': 'rgb(225, 187, 187)',
			'transparent-account-icon-color': 'rgb(237, 40, 40)',
			'transparent-header-toggle-btn-color': 'rgb(222, 28, 28)',
			'transparent-header-html-text-color': 'rgb(75, 79, 88)',
		};
		await setCustomize( transparentElementSettings );
		await createNewPost( {
			postType: 'page',
			title: 'transparent element',
		} );
		await publishPost();
		await page.goto( createURL( '/transparent-element' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-below-header-bar .site-below-header-wrap' );

		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element svg',
			property: 'fill',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-social-icons-color' ].desktop }`,
		);
		// await setBrowserViewport( 'medium' );
		// await expect( {
		// 	selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element svg',
		// 	property: 'fill',
		// } ).cssValueToBe(
		// 	`${ transparentElementSettings[ 'transparent-header-social-icons-color' ].tablet }`,
		// );
		// await setBrowserViewport( 'small' );
		// await expect( {
		// 	selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element svg',
		// 	property: 'fill',
		// } ).cssValueToBe(
		// 	`${ transparentElementSettings[ 'transparent-header-social-icons-color' ].mobile }`,
		// );

		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-social-icons-bg-color' ].desktop }`,
		);
		// await setBrowserViewport( 'medium' );
		// await expect( {
		// 	selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element',
		// 	property: 'background-color',
		// } ).cssValueToBe(
		// 	`${ transparentElementSettings[ 'transparent-header-social-icons-bg-color' ].tablet }`,
		// );
		// await setBrowserViewport( 'small' );
		// await expect( {
		// 	selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element',
		// 	property: 'background-color',
		// } ).cssValueToBe(
		// 	`${ transparentElementSettings[ 'transparent-header-social-icons-bg-color' ].mobile }`,
		// );

		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-search .ast-icon',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-search-icon-color' ] }`,
		);

		await expect( {
			selector: '.ast-theme-transparent-header [CLASS*="ast-header-button-"] .ast-custom-button',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-button-text-color' ] }`,
		);

		await expect( {
			selector: '.ast-theme-transparent-header [CLASS*="ast-header-button-"] .ast-custom-button',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-button-bg-color' ] }`,
		);

		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg path:not(.ast-hf-account-unfill), .ast-theme-transparent-header .ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg circle',
			property: 'fill',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-account-icon-color' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header [data-section="section-header-mobile-trigger"] .ast-button-wrap .mobile-menu-toggle-icon .ast-mobile-svg',
			property: 'fill',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-toggle-btn-color' ] }`,
		);

		await setBrowserViewport( 'large' );
		await expect( {
			selector: '.ast-theme-transparent-header [CLASS*="ast-header-html-"] .ast-builder-html-element',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-html-text-color' ] }`,
		);
	} );
} );
