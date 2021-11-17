import {
	createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Secondary menu background normal color settings in the customizer', () => {
	it( 'secondary menu background normal color should apply corectly', async () => {
		const secondaryMenuBackgroundColor = {
			'header-menu2-color-responsive': {
				desktop: 'rgb(255, 255, 255)',
			},
			'header-menu2-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(167, 1, 118)',
				},
			},
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'menu-2',
					},
				},
			},
		};
		await setCustomize( secondaryMenuBackgroundColor );
		await createNewPost( {
			postType: 'page',
			title: 'Home',
			content: 'This is a home page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#ast-desktop-header #ast-hf-menu-2' );
		await expect( {
			selector: '#ast-hf-menu-2 .main-header-menu .page_item .menu-link',
			property: 'color',
		} ).cssValueToBe(
			`${ secondaryMenuBackgroundColor[ 'header-menu2-color-responsive' ].desktop }`,
		);
		await expect( {
			selector: '.ast-builder-menu-2 .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ secondaryMenuBackgroundColor[ 'header-menu2-bg-obj-responsive' ].desktop[ 'background-color' ] }`,
		);
	} );
	it( 'secondary menu background active color should apply corectly', async () => {
		const secondaryMenuBackgroundColor = {
			'header-menu2-a-bg-color-responsive': {
				desktop: 'rgb(0, 0, 255)',
			},
		};
		await setCustomize( secondaryMenuBackgroundColor );
		await page.click( '.menu-link' );
		await page.waitForSelector( '#ast-desktop-header' );
		await expect( {
			selector: '#secondary_menu-site-navigation #ast-hf-menu-2 .main-header-menu .menu-link',
			property: 'background-color',
		} ).cssValueToBe(
			`${ secondaryMenuBackgroundColor[ 'header-menu2-a-bg-color-responsive' ].desktop }`,
		);
	} );
} );
