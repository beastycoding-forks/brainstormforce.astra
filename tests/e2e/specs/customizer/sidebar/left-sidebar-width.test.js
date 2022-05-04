import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../utils/publish-post';
import { setCustomize } from '../../../utils/customize';
describe( 'Sidebar setting in the customizer', () => {
	it( 'width for post left sidebar should apply correctly on post', async () => {
		const postSidebarWidth = {
			'site-sidebar-layout': 'left-sidebar',
			'site-post-sidebar-layout': 'left-sidebar',
			'site-sidebar-width': 15,
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
		} ).cssValueToBe( `${ postSidebarWidth[ 'site-sidebar-width' ] + 'px' }` );
	} );

	// it( 'width for page left sidebar should apply correctly on page', async () => {
	// 	const pageSidebarWidth = {
	// 		'site-sidebar-layout': 'left-sidebar',
	// 		'site-page-sidebar-layout': 'left-sidebar',
	// 		'site-sidebar-width': 14,
	// 	};
	// 	await setCustomize( pageSidebarWidth );
	// 	let ppStatus = false;
	// 	while ( false === ppStatus ) {
	// 		await createNewPost( { postType: 'page', title: 'page sidebar' } );
	// 		ppStatus = await publishPost();
	// 	}
	// 	await page.goto( createURL( '/page-sidebar' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );
	// 	await page.waitForSelector(	'#secondary' );
	// 	await expect( {
	// 		selector: '#secondary',
	// 		property: 'width',
	// 	} ).cssValueToBe( `${ pageSidebarWidth[ 'site-sidebar-width' ] + '%' }` );
	// } );

	// it( 'width for archive left sidebar should apply correctly on  archive posts', async () => {
	// 	const archiveSidebarWidth = {
	// 		'site-sidebar-layout': 'left-sidebar',
	// 		'archive-post-sidebar-layout': 'left-sidebar',
	// 		'site-sidebar-width': 15,
	// 	};
	// 	await setCustomize( archiveSidebarWidth );
	// 	let ppStatus = false;
	// 	while ( false === ppStatus ) {
	// 		await createNewPost( { postType: 'post', title: 'archive sidebar' } );
	// 		ppStatus = await publishPost();
	// 	}
	// 	await page.goto( createURL( '/' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );
	// 	await page.click( '#wp-block-search__input-1' );
	// 	await page.keyboard.type( 'test' );
	// 	await page.keyboard.press( 'Enter' );
	// 	await page.waitForSelector( '#secondary' );
	// 	await expect( {
	// 		selector: '#secondary',
	// 		property: 'width',
	// 	} ).cssValueToBe( `${ archiveSidebarWidth[ 'site-sidebar-width' ] + '%' }` );
	// } );
} );
