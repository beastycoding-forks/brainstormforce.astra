// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jest/no-commented-out-tests */
import {
	createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { setCustomize } from '../../../../utils/customize';
describe( 'Primary menu background normal color settings in the customizer', () => {
	it( 'primary menu background normal color should apply corectly', async () => {
		const menuColor = {
			'header-menu1-color-responsive': {
				desktop: 'rgb(255, 255, 255)',
			},
			'header-mobile-menu-color-responsive': {
				tablet: 'rgb(255, 255, 255)',
				mobile: 'rgb(255, 255, 255)',
			},
			'header-menu1-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(167, 1, 118)',
				},
			},
			'header-mobile-menu-bg-obj-responsive': {
				tablet: {
					'background-color': 'rgb(167, 1, 118)',
				},
				mobile: {
					'background-color': 'rgb(167, 1, 118)',
				},
			},
		};
		await setCustomize( menuColor );
		await createNewPost( {
			postType: 'page',
			title: 'Home',
			content: 'This is a home page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#ast-desktop-header #ast-hf-menu-1' );
		await expect( {
			selector: '#ast-hf-menu-1 .main-header-menu .page_item .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-menu1-color-responsive' ].desktop }`,
		);
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-menu1-bg-obj-responsive' ].desktop[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '#ast-hf-mobile-menu .menu-item' );
		await expect( {
			selector: '.page_item a',
			property: 'color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-mobile-menu-color-responsive' ].tablet }`,
		);
		await expect( {
			selector: '.ast-header-break-point .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-mobile-menu-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '#ast-hf-mobile-menu .menu-item' );
		await expect( {
			selector: '.page_item a',
			property: 'color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-mobile-menu-color-responsive' ].mobile }`,
		);
		await expect( {
			selector: '.ast-header-break-point .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-mobile-menu-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
	} );
	it( 'primary menu background active color should apply corectly', async () => {
		const menuColor = {
			'header-menu1-a-bg-color-responsive': {
				desktop: 'rgb(0, 0, 255)',
			},
			'header-mobile-menu-a-bg-color-responsive': {
				tablet: 'rgb(0, 0, 255)',
				mobile: 'rgb(0, 0, 255)',
			},
		};
		await setCustomize( menuColor );
		await page.click( '.menu-link' );
		await page.waitForSelector( '#ast-desktop-header' );
		await expect( {
			selector: '#primary-site-navigation #ast-hf-menu-1 .main-header-menu .menu-link',
			property: 'background-color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-menu1-a-bg-color-responsive' ].desktop }`,
		);
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '#ast-hf-mobile-menu .menu-item' );
		await expect( {
			selector: '.page_item a',
			property: 'background-color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-mobile-menu-a-bg-color-responsive' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '#ast-hf-mobile-menu .menu-item' );
		await expect( {
			selector: '.page_item a',
			property: 'background-color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-mobile-menu-a-bg-color-responsive' ].mobile }`,
		);
	} );
	/*it( 'primary menu background hover color should apply corectly', async () => {
		const menuBgColorHover = {
			'header-menu1-h-bg-color-responsive': {
				desktop: 'rgb(0, 0, 0)',
			},
			'header-mobile-menu-h-bg-color-responsive': {
				tablet: 'rgb(0, 0, 0)',
				mobile: 'rgb(0, 0, 0)',
			},
		};
		await setCustomize( menuBgColorHover );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.hover( '.menu-link' );
		await page.waitForSelector( '#ast-desktop-header' );
		await expect( {
			selector: '#ast-hf-menu-1 .menu-link',
			property: 'background-color',
		} ).cssValueToBe(
			`${ menuBgColorHover[ 'header-menu1-h-bg-color-responsive' ].desktop }`,
		);
	} );*/
} );
