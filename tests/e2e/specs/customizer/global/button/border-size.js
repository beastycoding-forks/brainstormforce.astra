import { setCustomize } from '../../../../utils/set-customize';
import { createURL } from '@wordpress/e2e-test-utils';
describe( 'global button padding setting under the Customizer', () => {
	it( 'button radius should apply correctly', async () => {
		const buttonCustomize = {
			'theme-button-border-group-border-size': {
				top: '20px',
				right: '20px',
				bottom: '20px',
				left: '20px',

			},
		};
		await setCustomize( buttonCustomize );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' );
		await expect( {
			selector: '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'border-top-width',
		} ).cssValueToBe( `${ buttonCustomize[ 'theme-button-border-group-border-size' ].top }` );
		await expect( {
			selector: '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'border-right-width',
		} ).cssValueToBe( `${ buttonCustomize[ 'theme-button-border-group-border-size' ].right }` );
		await expect( {
			selector: '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'border-left-width',
		} ).cssValueToBe( `${ buttonCustomize[ 'theme-button-border-group-border-size' ].left }` );
		await expect( {
			selector: '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'border-bottom-width',
		} ).cssValueToBe( `${ buttonCustomize[ 'theme-button-border-group-border-size' ].bottom }` );
	} );
} );
