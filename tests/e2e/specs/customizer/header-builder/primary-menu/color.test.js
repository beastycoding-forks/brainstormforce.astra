import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { createNewMenu } from '../../../../utils/create-menu';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Primary menu setting in customizer', () => {
	it( 'primary menu color should apply correctly', async () => {
		await createNewMenu();
		const primaryMenuColor = {
			'header-menu1-color-responsive': {
				desktop: 'rgb(11, 129, 52)',
				tablet: 'rgb(12, 123, 11)',
				mobile: 'rgb(150, 17, 17)',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'menu-1',
					},
				},
			},
		};
		await setCustomize( primaryMenuColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-1 .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ primaryMenuColor[ 'header-menu1-color-responsive' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ primaryMenuColor[ 'header-menu1-color-responsive' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ primaryMenuColor[ 'header-menu1-color-responsive' ].mobile }` );
	} );
} );
