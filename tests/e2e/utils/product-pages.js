import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from './publish-post';
export const wooProductPages = async () => {
	let ppStatus = false;
	while ( false === ppStatus ) {
		await createNewPost( {
			postType: 'page',
			title: 'shop',
		} );
		ppStatus = await publishPost();
	}

	await page.goto( createURL( '/wp-admin/' ), {
		waitUntil: 'networkidle0',
	} );
	await page.waitForSelector( '#toplevel_page_woocommerce' );
	await page.hover( '#toplevel_page_woocommerce' );
	await page.click( 'a[href="admin.php?page=wc-settings"]' );
	await page.waitFor( 1000 );
	await page.waitForSelector( 'a[href="http://localhost:8888/wp-admin/admin.php?page=wc-settings&tab=products"]' );
	await page.click( 'a[href="http://localhost:8888/wp-admin/admin.php?page=wc-settings&tab=products"]' );
	await page.waitFor( 1000 );
	await page.waitForSelector( '#select2-woocommerce_shop_page_id-container' );
	await page.click( '#select2-woocommerce_shop_page_id-container' );
	await page.click( '.select2-results__option--highlighted[data-selected]' );
	//await page.click( '#select2-woocommerce_shop_page_id-container' );
	await page.click( '#mainform > p > button' );
};
