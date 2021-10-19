
import { setCustomize } from '../../../../utils/customize';
import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
describe( 'global button presets, button text and background color setting under the Customizer', () => {
	it( 'button text color should apply correctly', async () => {
		const btntextColor = {
			'button-color': 'rgb(245, 245, 245)',
		};
		await setCustomize( btntextColor );
		await createNewPost( {
			postType: 'post',
			title: 'buttonColor',
		} );
		await publishPost();
		await page.goto( createURL( 'buttonColor' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#block-2 .wp-block-search__button' );
		await expect( {
			selector: '#block-2 .wp-block-search__button',
			property: 'color',
		} ).cssValueToBe( `${ btntextColor[ 'button-color' ] }` );
	} );
	it( 'button background color should apply correctly', async () => {
		const btnbgColor = {
			'button-bg-color': 'rgb(194, 34, 34)',
		};
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button, body .wp-block-file .wp-block-file__button' );
		await expect( {
			selector: '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button, body .wp-block-file .wp-block-file__button',
			property: 'background-color',
		} ).cssValueToBe( `${ btnbgColor[ 'button-bg-color' ] }` );
	} );
} );
