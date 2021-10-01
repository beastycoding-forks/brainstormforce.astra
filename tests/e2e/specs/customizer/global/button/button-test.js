import { setCustomize } from '../../../../utils/set-customize';
import { createURL } from '@wordpress/e2e-test-utils';
describe( 'global button presets, button text and background color setting under the Customizer', () => {
	it( 'button text and background color should apply correctly', async () => {
		const buttonCustomize = {
			'button-preset-style': 'Layer_1',
		};
		await setCustomize( buttonCustomize );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button, body .wp-block-file .wp-block-file__button' );
		await expect( {
			selector: '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button, body .wp-block-file .wp-block-file__button',
			property: '',
		} ).cssValueToBe( `` );
	} );
} );
