import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../utils/publish-post';
import { setCustomize } from '../../../utils/customize';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
describe( 'Sidebar setting in the customizer', () => {
	it( 'validate sidebar layout as left and its width', async () => {
		const postSidebarWidth = {
			'site-sidebar-layout': 'left-sidebar',
			'site-sidebar-width': 32,
		};
		await setCustomize( postSidebarWidth );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'post sidebar' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/post-sidebar' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector( '#secondary' );
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe( `384px` );
	} );

	it( 'validate sidebar layout as a right', async () => {
		const pageSidebarWidth = {
			'site-sidebar-layout': 'right-sidebar',
			'site-sidebar-width': 15,
		};
		await setCustomize( pageSidebarWidth );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector(	'#secondary' );
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe( `180px` );
	} );
} );
