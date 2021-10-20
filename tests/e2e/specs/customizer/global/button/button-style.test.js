
import { setCustomize } from '../../../../utils/customize';
import { createURL } from '@wordpress/e2e-test-utils';
describe( 'global button presets, button text and background color setting under the Customizer', () => {
	it( 'button text color should apply correctly', async () => {
		const btntextColor = {
			'button-color': 'rgb(10, 10, 10)',
		};
		await setCustomize( btntextColor );
		await page.goto( createURL( '/' ), {
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
			'button-bg-color': 'rgb(209, 237, 255)',
		};
		await setCustomize( btnbgColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#block-2 > form > div > button' );
		await expect( {
			selector: '#block-2 > form > div > button',
			property: 'background-color',
		} ).cssValueToBe( `${ btnbgColor[ 'button-bg-color' ] }` );
	} );
	it( 'button border width should apply correctly', async () => {
		const border = {
			'theme-button-border-group-border-size': {
				top: 5,
				right: 5,
				bottom: 5,
				left: 5,
			},
		};
		await setCustomize( border );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'border-top-width',
		} ).cssValueToBe( `${ border[ 'theme-button-border-group-border-size' ].top + 'px' }` );
		await expect( {
			selector: '#block-2 .wp-block-search__button',
			property: 'border-right-width',
		} ).cssValueToBe( `${ border[ 'theme-button-border-group-border-size' ].right + 'px' }` );
		await expect( {
			selector: '#block-2 .wp-block-search__button',
			property: 'border-bottom-width',
		} ).cssValueToBe( `${ border[ 'theme-button-border-group-border-size' ].bottom + 'px' }` );
		await expect( {
			selector: '#block-2 .wp-block-search__button',
			property: 'border-left-width',
		} ).cssValueToBe( `${ border[ 'theme-button-border-group-border-size' ].left + 'px' }` );
	} );
	it( 'button border color should apply correctly', async () => {
		const borderColor = {
			'theme-button-border-group-border-color': 'rgb(235, 208, 208)',
		};
		await setCustomize( borderColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-search__button' );
		await expect( {
			selector: '.wp-block-search__button',
			property: 'border-color',
		} ).cssValueToBe( `${ borderColor[ 'theme-button-border-group-border-color' ] }` );
	} );
} );
