import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { createNewMenu } from '../../../../utils/create-menu';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Primary menu setting in customizer', () => {
	it( 'primary menu background color should apply correctly', async () => {
		await createNewMenu();
		const primaryMenuBgColor = {
			'header-menu1-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(247, 252, 233)',
				},
			},
		};
		await setCustomize( primaryMenuBgColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ primaryMenuBgColor[ 'header-menu1-bg-obj-responsive' ].desktop[ 'background-color' ] }` );
	} );

	it( 'primary menu active background color should apply correctly', async () => {
		const primaryMenuBgColor = {
			'header-menu1-a-bg-color-responsive': {
				desktop:
				{
					'background-color': 'rgb(228, 246, 242)',

				},
			},
			tablet: {
				'background-color': 'rgb(219, 242, 217)',
			},
			mobile: {
				'background-color': 'rgb(240, 255, 240)',
			},
		};
		await setCustomize( primaryMenuBgColor );
		await page.goto( createURL( 'test-page' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.menu-item.current-menu-item > .menu-link' );
		await expect( {
			selector: '.menu-item.current-menu-item > .menu-link',
			property: 'background-color',
		} ).cssValueToBe( `${ primaryMenuBgColor[ 'header-menu1-a-bg-color-responsive' ].desktop[ 'background-color' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.menu-item.current-menu-item > .menu-link',
			property: 'background-color',
		} ).cssValueToBe( `${ primaryMenuBgColor[ 'header-menu1-a-bg-color-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.menu-item.current-menu-item > .menu-link',
			property: 'background-color',
		} ).cssValueToBe( `${ primaryMenuBgColor[ 'header-menu1-a-bg-color-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );

