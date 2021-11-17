import { insertBlock, createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
describe( 'global button font setting under the Customizer', () => {
	it( 'button font should apply correctly', async () => {
		const btnFont = {
			'font-family-button': 'Helvetica, Verdana, Arial, sans-serif',
		};
		await setCustomize( btnFont );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-search__button' );
		await expect( {
			selector: '.wp-block-search__button',
			property: 'font-family',
		} ).cssValueToBe( `${ btnFont[ 'font-family-button' ] }` );
	} );

	it( 'button font size should apply correctly', async () => {
		const btnFontsize = {
			'font-size-button': {
				desktop: 30,
				tablet: 20,
				mobile: 10,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( btnFontsize );
		await createNewPost( { postType: 'post', title: 'buttonfontsize' } );
		await insertBlock( 'Buttons' );
		await page.keyboard.type( 'Login' );
		await publishPost();
		await page.goto( createURL( '/buttonfontsize/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-button__link' );
		await expect( {
			selector: '.wp-block-button__link',
			property: 'font-size',
		} ).cssValueToBe( `${ btnFontsize[ 'font-size-button' ].desktop }${ btnFontsize[ 'font-size-button' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.wp-block-button__link',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				btnFontsize[ 'font-size-button' ].tablet,
			) }${ btnFontsize[ 'font-size-button' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.wp-block-button__link',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				btnFontsize[ 'font-size-button' ].mobile,
			) }${ btnFontsize[ 'font-size-button' ][ 'mobile-unit' ] }` );
	} );
	it( 'button font weight should apply correctly', async () => {
		const fontWeight = {
			'font-weight-button': '700',
		};
		await setCustomize( fontWeight );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' );
		await expect( {
			selector: 'form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'font-weight',
		} ).cssValueToBe( `${ fontWeight[ 'font-weight-button' ] }` );
	} );

	it( 'button font text transform property should apply correctly', async () => {
		const textTransform = {
			'text-transform-button': 'uppercase',
		};
		await setCustomize( textTransform );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-search__button' );
		await expect( {
			selector: '.wp-block-search__button',
			property: 'text-transform',
		} ).cssValueToBe( `${ textTransform[ 'text-transform-button' ] }` );
	} );

	it( 'button font line height should apply correctly', async () => {
		const btnlineHeight = {
			'theme-btn-line-height': '50px',
		};
		await setCustomize( btnlineHeight );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-search__button' );
		await expect( {
			selector: '.wp-block-search__button',
			property: 'line-height',
		} ).cssValueToBe( `${ btnlineHeight[ 'theme-btn-line-height' ] }` );
	} );

	it( 'button font letter spacing should apply correctly', async () => {
		const letterSpacing = {
			'theme-btn-letter-spacing': 3,
			'ast-range-unit': 'px',
		};
		await setCustomize( letterSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-search__button' );
		await expect( {
			selector: '.wp-block-search__button',
			property: 'letter-spacing',
		} ).cssValueToBe( `${ letterSpacing[ 'theme-btn-letter-spacing' ] }${ letterSpacing[ 'ast-range-unit' ] }` );
	} );
} );
