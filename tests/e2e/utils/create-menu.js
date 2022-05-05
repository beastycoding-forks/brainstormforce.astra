<<<<<<< HEAD
import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { scrollToElement } from './scroll-to-element';
export const createNewMenu = async () => {
	await createNewPost( {
		postType: 'page',
		title: 'Test Page',
		content: 'This is simple test page',
	} );
	await publishPost();
=======
import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { scrollToElement } from './scroll-to-element';
import { setBrowserViewport } from '../../e2e/utils/set-browser-viewport';
import { publishPost } from './publish-post';
export const createNewMenu = async () => {
	let ppStatus = false;
	while ( false === ppStatus ) {
		await createNewPost( {
			postType: 'page',
			title: 'Test Page',
			content: 'This is simple test page',
		} );
		ppStatus = await publishPost();
	}
>>>>>>> b029c08ed778d3aa979e0caee3f892e4a7e72fd1
	await createNewPost( {
		postType: 'page',
		title: 'Sub Test Page',
		content: 'This is simple sub test page',
	} );
<<<<<<< HEAD
	await publishPost();
	/*await page.goto( createURL( '/' ), {
		waitUntil: 'networkidle0',
	} );*/
	await page.goto( createURL( '/wp-admin/nav-menus.php' ), {
		waitUntil: 'networkidle0',
	} );
	//await page.waitForSelector( '#nav-menu-footer' );
=======
	ppStatus = await publishPost();
	await page.goto( createURL( '/wp-admin/nav-menus.php' ), {
		waitUntil: 'networkidle0',
	} );
	await setBrowserViewport( 'large' );
>>>>>>> b029c08ed778d3aa979e0caee3f892e4a7e72fd1
	await scrollToElement( '#nav-menu-footer' );
	if ( await page.$( '.menu-delete' ) ) {
		await page.click( '.menu-delete' );
	}
	await page.focus( '#menu-name' );
	await page.type( '#menu-name', 'Menu' );
<<<<<<< HEAD
	await page.focus( '#locations-footer_menu' );
	await page.click( '#locations-footer_menu' );
=======
	await page.focus( '#locations-primary' );
	await page.click( '#locations-primary' );
	await page.focus( '#save_menu_footer' );
>>>>>>> b029c08ed778d3aa979e0caee3f892e4a7e72fd1
	await page.click( '#save_menu_footer' );
	await page.waitForSelector( '.accordion-section-content' );
	await page.focus( '#page-tab' );
	await page.click( '#page-tab' );
	await page.click( '#submit-posttype-page' );
<<<<<<< HEAD
	await scrollToElement( '#nav-menu-footer' );
	await page.waitForSelector( '.publishing-action' );
=======

	await page.waitForSelector( '.menu-item-depth-0:nth-child(2) .menu-item-handle' );

	const menuToSubMenu = await page.$( '.menu-item-depth-0:nth-child(2) .menu-item-handle' );
	const boundingBox = await menuToSubMenu.boundingBox();

	await page.mouse.move( boundingBox.x + ( boundingBox.width / 2 ), boundingBox.y + ( boundingBox.height / 2 ) );
	await page.mouse.down();
	await page.mouse.move( 126, 19 );
	await page.mouse.up();

	await page.waitForSelector( '#save_menu_footer' );
>>>>>>> b029c08ed778d3aa979e0caee3f892e4a7e72fd1
	await page.focus( '#save_menu_footer' );
	await page.click( '#save_menu_footer' );
};
