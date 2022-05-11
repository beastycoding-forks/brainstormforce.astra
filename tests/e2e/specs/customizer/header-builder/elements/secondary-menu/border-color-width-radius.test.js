import { createURL } from '@wordpress/e2e-test-utils';
import { createSecondaryMenu } from '../../../../../utils/create-secondary-menu';
import { setCustomize } from '../../../../../utils/customize';
describe( 'Secondary menu submenu option under the customizer', () => {
	it( 'border color, radius and width option should apply correctly', async () => {
		await createSecondaryMenu();
		const submenuBorder = {
			'header-menu2-submenu-b-color': 'rgb(138, 12, 136)',
			'header-menu2-submenu-border-radius': 40,
			'header-menu2-submenu-border': {
				top: 55,
				bottom: 45,
				left: 35,
				right: 25,
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'menu-2',
					},
				},
			},
		};
		await setCustomize( submenuBorder );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.hover( '.menu-link' );
		await expect( {
			selector: '.ast-builder-menu-2 .sub-menu',
			property: 'border-color',
		} ).cssValueToBe( `${ submenuBorder[ 'header-menu2-submenu-b-color' ] }` );

		await expect( {
			selector: '.ast-builder-menu-2 .sub-menu',
			property: 'border-radius',
		} ).cssValueToBe( `${ submenuBorder[ 'header-menu2-submenu-border-radius' ] + 'px' }` );

		await expect( {
			selector: '.ast-builder-menu-2 .sub-menu',
			property: 'border-top-width',
		} ).cssValueToBe( `${ submenuBorder[ 'header-menu2-submenu-border' ].top + 'px' }` );
		await expect( {
			selector: '.ast-builder-menu-2 .sub-menu',
			property: 'border-left-width',
		} ).cssValueToBe( `${ submenuBorder[ 'header-menu2-submenu-border' ].left + 'px' }` );
		await expect( {
			selector: '.ast-builder-menu-2 .sub-menu',
			property: 'border-bottom-width',
		} ).cssValueToBe( `${ submenuBorder[ 'header-menu2-submenu-border' ].bottom + 'px' }` );
		await expect( {
			selector: '.ast-builder-menu-2 .sub-menu',
			property: 'border-right-width',
		} ).cssValueToBe( `${ submenuBorder[ 'header-menu2-submenu-border' ].right + 'px' }` );
	} );
} );
