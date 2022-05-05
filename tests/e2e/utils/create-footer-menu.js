import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from './publish-post';
import { scrollToElement } from './scroll-to-element';
export const createNewMenu = async () => {
	let ppStatus = false;
	while ( false === ppStatus ) {
		await createNewPost( { postType: 'page', title: 'Test Page', content: 'This is simple sub test page' } );
		ppStatus = await publishPost();
		await createNewPost( { postType: 'page', title: 'Sub Test Page', content: 'This is simple test page' } );
		ppStatus = await publishPost();
	}
	/*await page.goto( createURL( '/' ), {
		waitUntil: 'networkidle0',
	} );*/
	await page.goto( createURL( '/wp-admin/nav-menus.php' ), {
		waitUntil: 'networkidle0',
	} );
	//await page.waitForSelector( '#nav-menu-footer' );
	await scrollToElement( '#nav-menu-footer' );
	if ( await page.$( '.menu-delete' ) ) {
		await page.click( '.menu-delete' );
	}
	await page.focus( '#menu-name' );
	await page.type( '#menu-name', 'Menu' );
	await page.focus( '#locations-footer_menu' );
	await page.click( '#locations-footer_menu' );
	await page.click( '#save_menu_footer' );
	await page.waitForSelector( '.accordion-section-content' );
	await page.focus( '#page-tab' );
	await page.click( '#page-tab' );
	await page.click( '#submit-posttype-page' );
	await scrollToElement( '#nav-menu-footer' );
	await page.waitForSelector( '.publishing-action' );
	await page.focus( '#save_menu_footer' );
	await page.click( '#save_menu_footer' );
};
