// External dependencies.
import { visitAdminPage } from '@wordpress/e2e-test-utils';
import { scrollToElement } from './scroll-to-element';

/**
 * Import a course JSON file
 *
 * @since 2.2.0
 * @since 2.2.0 Update to accommodate changes in the LifterLMS core.
 * @since 3.0.0 Use `waitForTimeout()` in favor of deprecated `waitFor()`.
 *
 * @param {string} importFile Filename of the import.
 * @param {string} importPath Local path where the file is located. By default uses `tests/assets/`.
 * @return {void}
 */
export async function importProducts(
	importFile = 'sample_products.csv',
	importPath = '',
) {
	importPath = importPath || `${ process.cwd() }/tests/e2e/assets/`;

	const file = importPath + importFile;

	await visitAdminPage( 'admin.php', 'edit.php?post_type=product&page=product_importer' );

	const inputSelector = 'input[name="import"]';
	await page.waitForSelector( inputSelector );
	const fileUpload = await page.$( inputSelector );

	fileUpload.uploadFile( file );
	await page.waitForTimeout( 1000 );

	await page.click( 'button[type="submit"]' );
	await scrollToElement( '#collapse-button' );
	await page.click( 'button[type="submit"]' );
	await page.waitFor( 2000 );
	await page.click( '.woocommerce-progress-form-wrapper .button' );
}
