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
						1: 'button-1',
						2: 'search',
						3: 'html-1',
					},
				},
			},
			'header-html-1': '<p>HTML Text color |<a href="https://wpastra.com/" rel="nofollow noopener" role="link" target="_blank">Astra QA</a></p>',
			'header-mobile-items': {
				below: {
					below_center: {
						0: 'social-icons-1',
						1: 'mobile-trigger',
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
				tablet: 'rgb(53, 198, 80)',
				mobile: 'rgb(53, 198, 80)',
			},
			'transparent-header-button-text-color': 'rgb(255, 255, 255)',
			'transparent-header-button-bg-color': 'rgb(0, 0, 255)',
			'transparent-account-icon-color': 'rgb(32, 227, 155)',
			'transparent-header-toggle-btn-color': 'rgb(222, 28, 28)',
			'transparent-header-html-text-color': 'rgb(75, 79, 88)',
			'transparent-header-html-link-color': 'rgb(0, 0, 255)',
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
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element svg',
			property: 'fill',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-social-icons-color' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element svg',
			property: 'fill',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-social-icons-color' ].mobile }`,
		);

		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-social-icons-bg-color' ].desktop }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-social-icons-bg-color' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-social-icons-bg-color' ].mobile }`,
		);

		await setBrowserViewport( 'large' );
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

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '[data-section="section-header-mobile-trigger"] .ast-button-wrap .mobile-menu-toggle-icon .ast-mobile-svg',
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

		await expect( {
			selector: '.ast-theme-transparent-header [CLASS*="ast-header-html-"] .ast-builder-html-element a',
			property: 'color',
		} ).cssValueToBe( `${ transparentElementSettings[ 'transparent-header-html-link-color' ] }`,
		);
	} );
	it( 'transparent header remaining element should apply correctly', async () => {
		const transElementSettings = {
			'transparent-header-enable': true,
			'transparent-header-disable-page': false,
			'transparent-header-disable-archive': false,
			'transparent-header-disable-latest-posts-index': false,
			'header-desktop-items': {
				below: {
					below_center: {
						0: 'account',
					},
				},
			},
			'header-mobile-items': {
				below: {
					below_center: {
						0: 'mobile-trigger',
					},
				},
			},
			'header-account-login-style': 'text',
			'transparent-account-type-text-color': 'rgb(201, 54, 54)',
			'mobile-header-toggle-btn-style': 'fill',
			'transparent-header-toggle-btn-bg-color': 'rgb(25, 219, 24)',
		};
		await setCustomize( transElementSettings );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-account-wrap .ast-header-account-text',
			property: 'color',
		} ).cssValueToBe(
			`${ transElementSettings[ 'transparent-account-type-text-color' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header [data-section="section-header-mobile-trigger"] .ast-button-wrap .ast-mobile-menu-trigger-fill',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transElementSettings[ 'transparent-header-toggle-btn-bg-color' ] }`,
		);
	} );
	it( 'transparent header account border should apply correctly', async () => {
		const transElementSet = {
			'transparent-header-enable': true,
			'transparent-header-disable-page': false,
			'transparent-header-disable-archive': false,
			'transparent-header-disable-latest-posts-index': false,
			'header-mobile-items': {
				below: {
					below_center: {
						0: 'mobile-trigger',
					},
				},
			},
			'mobile-header-toggle-btn-style': 'outline',
			'transparent-header-toggle-border-color': 'rgb(56, 212, 127)',
		};

		await setCustomize( transElementSet );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header [data-section="section-header-mobile-trigger"] .ast-button-wrap .ast-mobile-menu-trigger-outline',
			property: 'border-color',
		} ).cssValueToBe(
			`${ transElementSet[ 'transparent-header-toggle-border-color' ] }`,
		);
	} );
} );
