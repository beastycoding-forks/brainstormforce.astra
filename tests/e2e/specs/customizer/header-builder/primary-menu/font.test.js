import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { createNewMenu } from '../../../../utils/create-menu';
describe( 'Primary menu settings in customizer', () => {
	it( 'primary menu typgraphy settings should be apply correctly', async () => {
		await createNewMenu();
		const primaryMenuFont = {
			'header-menu1-font-family': 'Zeyada, handwriting',
			'header-menu1-font-weight': '400',
			'header-menu1-text-transform': 'uppercase',
			'header-menu1-line-height': '1',
			'header-menu1-font-size': {
				desktop: 45,
				'desktop-unit': 'px',
			},
		};
		await setCustomize( primaryMenuFont );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1' );
		await expect( {
			selector: '.ast-builder-menu-1',
			property: 'font-family',
		} ).cssValueToBe( `${ primaryMenuFont[ 'header-menu1-font-family' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1',
			property: 'font-weight',
		} ).cssValueToBe( `${ primaryMenuFont[ 'header-menu1-font-weight' ] }` );
		await expect( {
			selector: '.ast-builder-menu-1',
			property: 'text-transform',
		} ).cssValueToBe( `${ primaryMenuFont[ 'header-menu1-text-transform' ] }` );

		await page.waitForSelector( '.ast-builder-menu-1 .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-1 .menu-item > .menu-link',
			property: 'line-height',
		} ).cssValueToBe( `${ primaryMenuFont[ 'header-menu1-line-height' ] * primaryMenuFont[ 'header-menu1-font-size' ].desktop }` + 'px' );

		await expect( {
			selector: '.ast-builder-menu-1 .menu-item > .menu-link',
			property: 'font-size',
		} ).cssValueToBe( `${ primaryMenuFont[ 'header-menu1-font-size' ].desktop }${ primaryMenuFont[ 'header-menu1-font-size' ][ 'desktop-unit' ] }` );
	} );
} );
