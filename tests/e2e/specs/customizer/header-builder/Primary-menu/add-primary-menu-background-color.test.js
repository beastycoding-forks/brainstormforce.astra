import {
	createURL,
	createNewPost,
	publishPost,
	setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Primary menu color settings in the customizer', () => {
	it( 'primary menu color should apply corectly', async () => {
		const menuColor = {
			'header-menu1-color-responsive': {
				desktop: 'rgb(255, 255, 255)',
				tablet: 'rgb(255, 255, 255)',
				mobile: 'rgb(255, 255, 255)',
			},
			'header-menu1-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(167, 1, 118)',
				},
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
		await createNewPost( {
			postType: 'page',
			title: 'About Us',
			content: 'This is about us page',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'page',
			title: 'Our Services',
			content: 'This is our services page',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'page',
			title: 'Contact Us',
			content: 'This is a contact us page',
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
			`${ menuColor[ 'header-menu1-color-responsive' ].tablet }`,
		);
		await expect( {
			selector: '.ast-header-break-point .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-menu1-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '#ast-hf-mobile-menu .menu-item' );
		await expect( {
			selector: '.page_item a',
			property: 'color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-menu1-color-responsive' ].mobile }`,
		);
		await expect( {
			selector: '.ast-header-break-point .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ menuColor[ 'header-menu1-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
	} );
} );
