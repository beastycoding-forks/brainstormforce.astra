import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';

describe( 'Social Icons in the customizer', () => {
	it( 'social icon radius should apply correctly', async () => {
		const socialIconRadius = {
			'header-social-1-radius-fields': {
				desktop: {
					bottom: '20',
					left: '19',
					right: '18',
					top: '17',
				},
				tablet: {
					bottom: '15',
					left: '14',
					right: '13',
					top: '12',
				},
				mobile: {
					bottom: '10',
					left: '9',
					right: '8',
					top: '7',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',
					},
				},
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( socialIconRadius );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await setBrowserViewport( 'large' );
		await page.waitForSelector( '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element' );
		await page.waitForSelector( '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'border-top-left-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'header-social-1-radius-fields' ].desktop.top }${ socialIconRadius[ 'header-social-1-radius-fields' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'border-top-right-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'header-social-1-radius-fields' ].desktop.right }${ socialIconRadius[ 'header-social-1-radius-fields' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'border-bottom-right-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'header-social-1-radius-fields' ].desktop.bottom }${ socialIconRadius[ 'header-social-1-radius-fields' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'border-bottom-left-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'header-social-1-radius-fields' ].desktop.left }${ socialIconRadius[ 'header-social-1-radius-fields' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'border-top-left-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'header-social-1-radius-fields' ].tablet.top }${ socialIconRadius[ 'header-social-1-radius-fields' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'border-top-right-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'header-social-1-radius-fields' ].tablet.right }${ socialIconRadius[ 'header-social-1-radius-fields' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'border-bottom-right-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'header-social-1-radius-fields' ].tablet.bottom }${ socialIconRadius[ 'header-social-1-radius-fields' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'border-bottom-left-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'header-social-1-radius-fields' ].tablet.left }${ socialIconRadius[ 'header-social-1-radius-fields' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'border-top-left-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'header-social-1-radius-fields' ].mobile.top }${ socialIconRadius[ 'header-social-1-radius-fields' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'border-top-right-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'header-social-1-radius-fields' ].mobile.right }${ socialIconRadius[ 'header-social-1-radius-fields' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'border-bottom-right-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'header-social-1-radius-fields' ].mobile.bottom }${ socialIconRadius[ 'header-social-1-radius-fields' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'border-bottom-left-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'header-social-1-radius-fields' ].mobile.left }${ socialIconRadius[ 'header-social-1-radius-fields' ][ 'mobile-unit' ] }` );
	} );
} );
