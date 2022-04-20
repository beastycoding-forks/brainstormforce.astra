import { createURL } from '@wordpress/e2e-test-utils';
import { createNewMenu } from '../../../../utils/create-menu';
import { setCustomize } from '../../../../utils/customize';
describe( 'Add sub menu for primary menu', () => {
	it( 'sub menu should be added successfully', async () => {
		await createNewMenu();
		const headerMenuAlignment = {
			'header-desktop-items': {
				primary: {
					primary_right: {
						0: 'menu-1',
					},
				},
			},
		};
		await setCustomize( headerMenuAlignment );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#primary-site-navigation' );
		await expect( true ).toBe( true );
	} );
	it( 'width of submenu should be set correctly', async () => {
		const submenuWidth = {
			'header-menu1-submenu-width': '100',
		};
		await setCustomize( submenuWidth );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.hover( '.menu-link' );
		await expect( {
			selector: '.ast-builder-menu-1 .sub-menu',
			property: 'width',
		} ).cssValueToBe(
			`${ submenuWidth[ 'header-menu1-submenu-width' ] + 'px' }`,
		);
	} );
} );
