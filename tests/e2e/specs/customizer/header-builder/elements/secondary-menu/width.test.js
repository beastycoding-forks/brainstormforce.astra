import { createURL } from '@wordpress/e2e-test-utils';
import { createSecondaryMenu } from '../../../../../utils/create-secondary-menu';
import { setCustomize } from '../../../../../utils/customize';
describe( 'Secondary menu submenu option under the customizer', () => {
	it( 'width option should apply correctly', async () => {
		await createSecondaryMenu();
		const submenuWidth = {
			'header-menu2-submenu-width': '900',
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'menu-2',
					},
				},
			},
		};
		await setCustomize( submenuWidth );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.hover( '.menu-link' );
		await page.waitForSelector( '.ast-builder-menu-2 .sub-menu' );
		await expect( {
			selector: '.ast-builder-menu-2 .sub-menu',
			property: 'width',
		} ).cssValueToBe( `${ submenuWidth[ 'header-menu2-submenu-width' ] + 'px' }` );
	} );
} );
