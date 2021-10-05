import { setCustomize } from '../../../../utils/set-customize';
import { createURL } from '@wordpress/e2e-test-utils';
describe( 'global button presets, button text color and background color setting under the Customizer', () => {
	it( 'button text and background color should apply correctly', async () => {
		const btnColor = {
			'button-color': 'rgb(214, 10, 10)',
			'button-bg-color': 'rgb(98, 41, 65)',
			'button-preset-style': 'button_03',
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
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' );
		await expect( {
			selector: '.menu-toggle, button, .ast-button, .ast-custom-button, .button, input#submit, input[type="button"], input[type="submit"], input[type="reset"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: '',
		} ).cssValueToBe( `` );
	} );

	it( 'button padding should apply correctly', async () => {
		const buttonCustomize = {
    		'theme-button-padding': {
				top: '20px',
				right: '20px',
				left: '20px',
				bottom: '20px',
			},

		};
		await setCustomize( buttonCustomize );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#main > section > div > form > input' );
		await expect( {
			selector: '#main > section > div > form > input',
			property: 'padding-top',
		} ).cssValueToBe( `${ buttonCustomize[ 'theme-button-padding' ].top }` );
		await page.waitForSelector( '#main > section > div > form > input' );
		await expect( {
			selector: '#main > section > div > form > input',
			property: 'padding-right',
		} ).cssValueToBe( `${ buttonCustomize[ 'theme-button-padding' ].right }` );
		await page.waitForSelector( '#main > section > div > form > input' );
		await expect( {
			selector: '#main > section > div > form > input',
			property: 'padding-left',
		} ).cssValueToBe( `${ buttonCustomize[ 'theme-button-padding' ].left }` );
		await page.waitForSelector( '#main > section > div > form > input' );
		await expect( {
			selector: '#main > section > div > form > input',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ buttonCustomize[ 'theme-button-padding' ].bottom }` );
	} );

	it( 'button radius should apply correctly', async () => {
		const borderColor = {
			'theme-button-border-group-border-color': 'rgb(194, 149, 149)',
		};
		await setCustomize( borderColor );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#main > section > div > form > input' );
		await expect( {
			selector: '#main > section > div > form > input',
			property: 'border-color',
		} ).cssValueToBe( `${ borderColor[ 'theme-button-border-group-border-color' ] }` );
	} );
} );

