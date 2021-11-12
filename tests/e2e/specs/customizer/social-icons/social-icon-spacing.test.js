import { createURL, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon size should apply correctly', async () => {
		const socialiconSpacing = {
			'header-social-1-space': {
				desktop: '15px',
				tablet: '15px',
				mobile: '15px',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconSpacing );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-builder-social-element' );

		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialiconSpacing[ 'header-social-1-space' ].desktop.left }`,
		);

		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialiconSpacing[ 'header-social-1-space' ].desktop.right }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialiconSpacing[ 'header-social-1-space' ].tablet.left }`,
		);

		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialiconSpacing[ 'header-social-1-space' ].tablet.right }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialiconSpacing[ 'header-social-1-space' ].mobile.left }`,
		);

		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialiconSpacing[ 'header-social-1-space' ].mobile.right }`,
		);
	} );
} );
