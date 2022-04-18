import { createURL } from '@wordpress/e2e-test-utils';
import { createNewMenu } from '../../../../utils/create-menu';
import { setCustomize } from '../../../../utils/customize';
describe( 'Add sub menu for primary menu and add border to the sub menu', () => {
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
	it( 'border radius to the submenu should be added correctly', async () => {
		const subMenuBorder = {
			'header-menu1-submenu-border-radius': 10,
			'header-menu1-submenu-border': {
				top: 10,
				bottom: 10,
				left: 10,
				right: 10,
			},
		};
		await setCustomize( subMenuBorder );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.hover( '.menu-link' );
		await expect( {
			selector: '.ast-builder-menu-1 .sub-menu',
			property: 'border-radius',
		} ).cssValueToBe(
			`${ subMenuBorder[ 'header-menu1-submenu-border-radius' ] + 'px' }`,
		);
	} );
} );

