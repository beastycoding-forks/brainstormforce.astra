import { setCustomize } from '../../../../utils/customize';
import { createURL } from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'global button setting under the Customizer', () => {
	it( 'button text color should apply correctly', async () => {
		const btntextColor = {
			'button-color': 'rgb(245, 245, 245)',
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
			'button-bg-color': 'rgb(4, 7, 11)',
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
			'theme-button-border-group-border-color': 'rgb(4, 7, 11)',
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

	it( 'button border radius should apply correctly', async () => {
		const borderRadius = {
			'button-radius': '30',
		};
		await setCustomize( borderRadius );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'border-radius',
		} ).cssValueToBe( `${ borderRadius[ 'button-radius' ] + 'px' }` );
	} );

	it( 'button font should apply correctly', async () => {
		const btnFont = {
			'font-family-button': 'Helvetica, Verdana, Arial, sans-serif',
		};
		await setCustomize( btnFont );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'font-family',
		} ).cssValueToBe( `${ btnFont[ 'font-family-button' ] }` );
	} );

	it( 'button padding should apply correctly', async () => {
		const buttonPadding = {
			'theme-button-padding': {
				desktop: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
				},
				tablet: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
				},
				mobile: {
					top: '50',
					right: '50',
					bottom: '50',
					left: '50',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( buttonPadding );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-top',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].desktop.top }${ buttonPadding[ 'theme-button-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-right',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].desktop.right }${ buttonPadding[ 'theme-button-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].desktop.bottom }${ buttonPadding[ 'theme-button-padding' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-left',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].desktop.left }${ buttonPadding[ 'theme-button-padding' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-top',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].tablet.top }${ buttonPadding[ 'theme-button-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-right',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].tablet.right }${ buttonPadding[ 'theme-button-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].tablet.bottom }${ buttonPadding[ 'theme-button-padding' ][ 'tablet-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-left',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].tablet.left }${ buttonPadding[ 'theme-button-padding' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-top',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].mobile.top }${ buttonPadding[ 'theme-button-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-right',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].mobile.right }${ buttonPadding[ 'theme-button-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].mobile.bottom }${ buttonPadding[ 'theme-button-padding' ][ 'mobile-unit' ] }`,
		);
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'padding-left',
		} ).cssValueToBe( `${ buttonPadding[ 'theme-button-padding' ].mobile.left }${ buttonPadding[ 'theme-button-padding' ][ 'mobile-unit' ] }`,
		);
	} );
} );
