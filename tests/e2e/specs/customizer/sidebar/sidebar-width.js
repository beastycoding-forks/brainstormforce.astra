import { setCustomize } from '../../../utils/set-customize';
import { createURL } from '@wordpress/e2e-test-utils';
describe( 'Sidebar width', () => {
	it( 'width of sidebar  should apply correctly', async () => {
		const sidebarWidth = {
			'site-sidebar-width': '30%',
		};
		await setCustomize( sidebarWidth );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#secondary' );
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe( `${ sidebarWidth[ 'site-sidebar-width' ] }`, );
	} );
} );