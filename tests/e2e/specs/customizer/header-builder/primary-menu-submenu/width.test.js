import { createURL } from '@wordpress/e2e-test-utils';
import { createNewMenu } from '../../../../utils/create-menu';
import { setCustomize } from '../../../../utils/customize';
describe( 'Primary menu submenu option under the customizer', () => {
	it( 'width option should apply correctly', async () => {
		await createNewMenu();
		const submenuWidth = {
			'header-menu1-submenu-width': '900',
			'header-desktop-items': {
				primary: {
					primary_right: {
						0: 'menu-1',
					},
				},
			},
		};
		await setCustomize( submenuWidth );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.hover( '.menu-link' );
		await page.waitForSelector( '.ast-builder-menu-1 .sub-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .sub-menu',
			property: 'width',
		} ).cssValueToBe( `${ submenuWidth[ 'header-menu1-submenu-width' ] + 'px' }` );
	} );
} );
