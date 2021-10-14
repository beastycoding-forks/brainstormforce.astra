import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'breadcrumb typography settings in the customizer', () => {
	it( 'breadcrumb typography should apply corectly', async () => {
		const beforebreadcrumbFont = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-font-family': 'Pacifico, handwriting',
			'breadcrumb-font-weight': '800',
			'breadcrumb-text-transform': 'lowercase',
			'breadcrumb-font-size': {
				desktop: 50,
				tablet: 22,
				mobile: 18,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'breadcrumb-line-height': '70px',
			'breadcrumb-active-color-responsive': {
				desktop: 'rgb(255, 77, 0)',
				tablet: 'rgb(0, 11, 255)',
				mobile: 'rgb(7, 140, 0)',
			},
		};
		await setCustomize( beforebreadcrumbFont );
		await createNewPost( {
			postType: 'page',
			title: 'breadcrumb',
		} );
		await publishPost();
		await page.goto( createURL( '/breadcrumb' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper .breadcrumbs' );
		await expect( {
			selector: '.ast-breadcrumbs-wrapper, .ast-breadcrumbs-wrapper a',
			property: 'font-size',
		} ).cssValueToBe(
			`${ beforebreadcrumbFont[ 'breadcrumb-font-size' ].desktop }${ beforebreadcrumbFont[ 'breadcrumb-font-size' ][ 'desktop-unit' ] }`,
		);
		await expect( {
			selector: '.ast-breadcrumbs-wrapper',
			property: 'font-weight',
		} ).cssValueToBe(
			`${ beforebreadcrumbFont[ 'breadcrumb-font-weight' ] }`,
		);
		await expect( {
			selector: '.ast-breadcrumbs-wrapper',
			property: 'line-height',
		} ).cssValueToBe(
			`${ beforebreadcrumbFont[ 'breadcrumb-line-height' ] }`,
		);
		await expect( {
			selector: '.ast-breadcrumbs-wrapper',
			property: 'text-transform',
		} ).cssValueToBe(
			`${ beforebreadcrumbFont[ 'breadcrumb-text-transform' ] }`,
		);
		await expect( {
			selector: '.ast-breadcrumbs-wrapper ',
			property: 'font-family',
		} ).cssValueToBe(
			`${ beforebreadcrumbFont[ 'breadcrumb-font-family' ] }` );
		await expect( {
			selector: '.ast-breadcrumbs-wrapper .trail-items .trail-end',
			property: 'color',
		} ).cssValueToBe( `${ beforebreadcrumbFont[ 'breadcrumb-active-color-responsive' ].desktop }` );
	} );
} );
