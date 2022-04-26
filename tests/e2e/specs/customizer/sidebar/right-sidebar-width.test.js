import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../utils/publish-post';
import { setCustomize } from '../../../utils/customize';
import { createNewMenu } from '../../../utils/create-menu';
describe( 'Sidebar setting in the customizer', () => {
	it( 'width for post right sidebar should apply correctly on post', async () => {
		const postSidebarWidth = {
			'site-sidebar-layout': 'right-sidebar',
			'site-post-sidebar-layout': 'right-sidebar',
			'site-sidebar-width': '30',
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
		await page.waitForSelector( '#secondary' );
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe( `${ postSidebarWidth[ 'site-sidebar-width' ] * 100 }+ 'px'` );
	} );

	it( 'width for page right sidebar should apply correctly on page', async () => {
		const pageSidebarWidth = {
			'site-sidebar-layout': 'right-sidebar',
			'site-page-sidebar-layout': 'right-sidebar',
			'site-sidebar-width': '25',
		};
		await createNewMenu();
		await setCustomize( pageSidebarWidth );
		await page.goto( createURL( '/test-page' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#secondary' );
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe( `${ pageSidebarWidth[ 'site-sidebar-width' ] + 'px' }` );
	} );

	it( 'width for archive right sidebar should apply correctly on archive archive posts', async () => {
		const archiveSidebarWidth = {
			'site-sidebar-layout': 'right-sidebar',
			'archive-post-sidebar-layout': 'right-sidebar',
			'site-sidebar-width': '15',
		};
		await setCustomize( archiveSidebarWidth );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'archive sidebar' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '#wp-block-search__input-1' );
		await page.keyboard.type( 'test' );
		await page.keyboard.press( 'Enter' );
		await page.waitForSelector( '#secondary' );
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe( `${ archiveSidebarWidth[ 'site-sidebar-width' ] + 'px' }` );
	} );
} );
