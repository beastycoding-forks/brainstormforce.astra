import { setCustomize } from '../../../../utils/set-customize';
import { createURL } from '@wordpress/e2e-test-utils';
describe( 'global button presets, button text and background color setting under the Customizer', () => {
	it( 'button text and background color should apply correctly', async () => {
		const btnColor = {
			'button-color': 'rgb(214, 10, 10)',
			'button-bg-color': 'rgb(98, 39, 165)',
		};
		await setCustomize( btnColor );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button, body .wp-block-file .wp-block-file__button' );
		await expect( {
			selector: '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button, body .wp-block-file .wp-block-file__button',
			property: 'color',
		} ).cssValueToBe( `${ btnColor[ 'button-color' ] 	}` );
		await page.waitForSelector( '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button, body .wp-block-file .wp-block-file__button' );
		await expect( {
			selector: '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button, body .wp-block-file .wp-block-file__button',
			property: 'background-color',
		} ).cssValueToBe( `${ btnColor[ 'button-bg-color' ] }` );
	} );
} );
