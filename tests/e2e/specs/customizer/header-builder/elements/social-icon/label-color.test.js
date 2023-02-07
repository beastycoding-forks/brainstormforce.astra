import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Social Icons show label in the customizer', () => {
	it( 'social icon label color should apply correctly', async () => {
		const socialIconShowlabel = {
			'header-social-1-label-toggle': '1',
			'header-social-1-label-color': {
				desktop: 'rgb(40, 142, 10)',
				tablet: 'rgb(146, 8, 161)',
				mobile: 'rgb(143, 62, 8)',
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
		await setCustomize( socialIconShowlabel );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom .social-item-label' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconShowlabel[ 'header-social-1-label-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconShowlabel[ 'header-social-1-label-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconShowlabel[ 'header-social-1-label-color' ].mobile }` );
	} );
} );
