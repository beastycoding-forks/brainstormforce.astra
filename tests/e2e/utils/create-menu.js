import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { scrollToElement } from './scroll-to-element';
import { setBrowserViewport } from '../utils/set-browser-viewport';
import { publishPost } from './publish-post';
export const createSubmenu = async () => {
	let ppStatus = false;
	while ( false === ppStatus ) {
		await createNewPost( { postType: 'page', title: 'Page 1' } );
		ppStatus = await publishPost();
		await createNewPost( { postType: 'page', title: 'Page 2' } );
		ppStatus = await publishPost();
		await createNewPost( { postType: 'page', title: 'Page 3' } );
		ppStatus = await publishPost();
	}
	await page.goto( createURL( '/wp-admin/nav-menus.php' ), {
		waitUntil: 'networkidle0',
	} );
	await setBrowserViewport( 'large' );
	await scrollToElement( '#nav-menu-footer' );
	if ( await page.$( '.menu-delete' ) ) {
		await page.click( '.menu-delete' );
	}
	await page.waitForSelector( '#menu-name' );
	await page.focus( '#menu-name' );
	await page.type( '#menu-name', 'Secondary-menu' );
	await page.focus( '#locations-secondary_menu' );
	await page.click( '#locations-secondary_menu' );
	await page.focus( '#save_menu_footer' );
	await page.click( '#save_menu_footer' );
	await page.waitForSelector( '.accordion-section-content' );
	await page.focus( '#page-tab' );
	await page.click( '#page-tab' );
	await page.click( '#submit-posttype-page' );

	await page.waitForSelector( '.menu-item-depth-0:nth-child(2) .menu-item-handle' );
	const menuToSubMenu = await page.$( '.menu-item-depth-0:nth-child(2) .menu-item-handle' );
	const boundingBox = await menuToSubMenu.boundingBox();

	await page.mouse.move( boundingBox.x + ( boundingBox.width / 2 ), boundingBox.y + ( boundingBox.height / 2 ) );
	await page.mouse.down();
	await page.mouse.move( 126, 19 );
	await page.mouse.up();

	await page.waitForSelector( '.menu-item-depth-0:nth-child(3) .menu-item-handle' );
	const menuToSubMenus = await page.$( '.menu-item-depth-0:nth-child(3) .menu-item-handle' );
	const boundingBoxs = await menuToSubMenus.boundingBox();
	await page.mouse.move( boundingBoxs.x + ( boundingBoxs.width / 2 ), boundingBoxs.y + ( boundingBoxs.height / 2 ) );
	await page.mouse.down();
	await page.mouse.move( 126, 19 );
	await page.mouse.up();
	await page.waitForTimeout( 500 );
	await page.waitForSelector( '.menu-item-depth-2' );
	await page.focus( '.menu-item-depth-2 .menu-item-handle .item-edit' );
	await page.waitForTimeout( 500 );
	await page.click( '.menu-item-depth-2 .menu-item-handle .item-edit' );
	await page.waitForTimeout( 200 );
	await page.click( '[aria-label="Move out from under Page 2"]' );

	await page.waitForSelector( '#save_menu_footer' );
	await page.focus( '#save_menu_footer' );
	await page.click( '#save_menu_footer' );
};
