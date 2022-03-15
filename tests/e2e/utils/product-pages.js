import { createURL } from '@wordpress/e2e-test-utils/build/create-url';
import { scrollToElement } from '../utils/scroll-to-element';
export const wooCommercePage = async () => {
	await page.goto( createURL( '/wp-admin/plugins.php' ), {
		waitUntil: 'networkidle0',
	} );
	await scrollToElement( '#bulk-action-selector-bottom' );
	await page.goto( createURL( '/wp-admin' ), {
		waitUntil: 'networkidle0',
	} );
	await page.waitForSelector( '#toplevel_page_woocommerce' );
	await page.hover( '#toplevel_page_woocommerce' );
	await page.click( 'a[href="admin.php?page=wc-status"]' );
	await page.waitForSelector( '#wpbody-content > div.wrap.woocommerce > nav > a:nth-child(2)' );
	await page.click( '#wpbody-content > div.wrap.woocommerce > nav > a:nth-child(2)' );
	await page.click( '#wpbody-content > div.wrap.woocommerce > table > tbody > tr.install_pages > td > input' );
	await page.click( '#menu-settings' );
	await page.click( '#menu-settings > ul > li:nth-child(7) > a' );
	await page.click( '#submit' );
};
