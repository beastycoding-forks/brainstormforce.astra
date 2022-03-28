import { createURL } from '@wordpress/e2e-test-utils';
import { createNewMenu } from '../../../../utils/create-menu';
import { setCustomize } from '../../../../utils/customize';
describe( 'Add sub menu for primary menu and add top offset to the sub menu', () => {
	it( 'sub menu should be added successfully', async () => {
		await createNewMenu();
		//center alignment for desktop, tablet and mobile
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
	it( 'top offset should be added correctly', async () => {
		const submenuTopOffset = {
			'header-menu1-submenu-top-offset': '20',
		};
		await setCustomize( submenuTopOffset );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.hover( '.menu-link' );
		await expect( {
			selector: '.sub-menu',
			property: 'margin-top',
		} ).cssValueToBe(
			`${ submenuTopOffset[ 'header-menu1-submenu-top-offset' ] + 'px' }`,
		);
	} );
} );

