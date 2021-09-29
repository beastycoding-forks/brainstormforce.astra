import { setBrowserViewport, createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/set-customize';
describe( 'transparent header settings in the customizer', () => {
	it( 'transparent header setting should apply correctly', async () => {
		const transparentColorBorder = {
			'transparent-header-enable': true,
			'transparent-header-disable-archive': false,
			'transparent-header-disable-index': false,
			'transparent-header-disable-latest-posts-index': false,
			'transparent-header-disable-page': false,
			'transparent-header-disable-posts': false,
			'inspector-input-control-3': '50px',
			'transparent-header-main-sep-color': 'rgb(182, 198, 232)',
			'transparent-header-bg-color-responsive': {
				desktop: 'rgb(120, 159, 237)',
				tablet: 'rgb(120, 159, 237)',
				mobile: 'rgb(120, 159, 237)',
			},
			'transparent-header-color-site-title-responsive': {
				desktop: 'rgb(254, 23, 23)',
				tablet: 'rgb(254, 23, 23)',
				mobile: 'rgb(254, 23, 23)',
			},
			'transparent-menu-color-responsive': {
				desktop: 'rgb(104, 21, 198)',
				tablet: 'rgb(104, 21, 198)',
				mobile: 'rgb(104, 21, 198)',
			},
			'transparent-menu-bg-color-responsive': {
				desktop: 'rgb(165, 186, 207)',
				tablet: 'rgb(165, 186, 207)',
				mobile: 'rgb(165, 186, 207)',
			},
		};
		await setCustomize( transparentColorBorder );
		await createNewPost( {
			postType: 'page',
			title: 'menu',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#ast-desktop-header > div.ast-main-header-wrap.main-header-bar-wrap > div' );
		//to test transparent header bottom border width
		// await expect( {
		// 	selector: '#ast-desktop-header > div.ast-main-header-wrap.main-header-bar-wrap > div',
		// 	property: 'border-bottom-width',
		// } ).cssValueToBe(
		// 	`${ transparentColorBorder[ 'inspector-input-control-3' ] }`,
		// );
		//to test transparent header bottom border color
		await expect( {
			selector: '.ast-theme-transparent-header #ast-desktop-header > [CLASS*="-header-wrap"]:nth-last-child(2) > [CLASS*="-header-bar"]',
			property: 'border-bottom-color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-header-main-sep-color' ] }`,
		);
		//to test transparent header background color
		await setBrowserViewport( 'large' );
		await expect( {
			selector: '.ast-theme-transparent-header .main-header-bar',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-header-bg-color-responsive' ].desktop }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header .main-header-bar',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-header-bg-color-responsive' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header .main-header-bar',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-header-bg-color-responsive' ].mobile }`,
		);
		// //to test transparent header site title normal color
		await setBrowserViewport( 'large' );
		await expect( {
			selector: '.ast-theme-transparent-header .site-title a, .ast-theme-transparent-header .site-title a:focus, .ast-theme-transparent-header .site-title a:hover, .ast-theme-transparent-header .site-title a:visited',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-header-color-site-title-responsive' ].desktop }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header .site-title a',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-header-color-site-title-responsive' ].tablet }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header .site-title a',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-header-color-site-title-responsive' ].mobile }`,
		);
		//to test transparent header menu normal color
		await setBrowserViewport( 'large' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-builder-menu .main-header-menu, .ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-link, .ast-theme-transparent-header [CLASS*="ast-builder-menu-"] .main-header-menu .menu-item > .menu-link, .ast-theme-transparent-header .ast-masthead-custom-menu-items, .ast-theme-transparent-header .ast-masthead-custom-menu-items a, .ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-item > .ast-menu-toggle, .ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-item > .ast-menu-toggle, .ast-theme-transparent-header .ast-above-header-navigation a, .ast-header-break-point.ast-theme-transparent-header .ast-above-header-navigation a, .ast-header-break-point.ast-theme-transparent-header .ast-above-header-navigation > ul.ast-above-header-menu > .menu-item-has-children:not(.current-menu-item) > .ast-menu-toggle, .ast-theme-transparent-header .ast-below-header-menu, .ast-theme-transparent-header .ast-below-header-menu a, .ast-header-break-point.ast-theme-transparent-header .ast-below-header-menu a, .ast-header-break-point.ast-theme-transparent-header .ast-below-header-menu, .ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-menu-color-responsive' ].desktop }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-builder-menu .main-header-menu, .ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-link, .ast-theme-transparent-header [CLASS*="ast-builder-menu-"] .main-header-menu .menu-item > .menu-link, .ast-theme-transparent-header .ast-masthead-custom-menu-items, .ast-theme-transparent-header .ast-masthead-custom-menu-items a, .ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-item > .ast-menu-toggle, .ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-item > .ast-menu-toggle, .ast-theme-transparent-header .ast-above-header-navigation a, .ast-header-break-point.ast-theme-transparent-header .ast-above-header-navigation a, .ast-header-break-point.ast-theme-transparent-header .ast-above-header-navigation > ul.ast-above-header-menu > .menu-item-has-children:not(.current-menu-item) > .ast-menu-toggle, .ast-theme-transparent-header .ast-below-header-menu, .ast-theme-transparent-header .ast-below-header-menu a, .ast-header-break-point.ast-theme-transparent-header .ast-below-header-menu a, .ast-header-break-point.ast-theme-transparent-header .ast-below-header-menu, .ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-menu-color-responsive' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-builder-menu .main-header-menu, .ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-link, .ast-theme-transparent-header [CLASS*="ast-builder-menu-"] .main-header-menu .menu-item > .menu-link, .ast-theme-transparent-header .ast-masthead-custom-menu-items, .ast-theme-transparent-header .ast-masthead-custom-menu-items a, .ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-item > .ast-menu-toggle, .ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-item > .ast-menu-toggle, .ast-theme-transparent-header .ast-above-header-navigation a, .ast-header-break-point.ast-theme-transparent-header .ast-above-header-navigation a, .ast-header-break-point.ast-theme-transparent-header .ast-above-header-navigation > ul.ast-above-header-menu > .menu-item-has-children:not(.current-menu-item) > .ast-menu-toggle, .ast-theme-transparent-header .ast-below-header-menu, .ast-theme-transparent-header .ast-below-header-menu a, .ast-header-break-point.ast-theme-transparent-header .ast-below-header-menu a, .ast-header-break-point.ast-theme-transparent-header .ast-below-header-menu, .ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-menu-color-responsive' ].mobile }`,
		);
		// //to test transparent header menu background normal color
		await setBrowserViewport( 'large' );
		await expect( {
			selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-menu-bg-color-responsive' ].desktop }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-menu-bg-color-responsive' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentColorBorder[ 'transparent-menu-bg-color-responsive' ].mobile }`,
		);
	} );
} );