import { visitAdminPage } from '@wordpress/e2e-test-utils';
export const wooProductPages = async () => {
	await visitAdminPage( '/admin.php', '?page=wc-status' );
	await visitAdminPage( '/admin.php', '?page=wc-status&tab=tools' );
	await page.click( 'div.wrap.woocommerce tr.install_pages input[type="submit"]' );
	await visitAdminPage( '/options-permalink.php' );
	await page.click( '#submit' );
};
