import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'breadcrumb Typography settings in the customizer', () => {
	it( 'breadcrumb typography should apply correctly', async () => {
		const breadcrumbTypography = {
			'breadcrumb-position': 'astra_header_primary_container_after',
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
		await setCustomize( breadcrumbTypography );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector(
			'.ast-breadcrumbs .trail-browse, .ast-breadcrumbs .trail-items, .ast-breadcrumbs .trail-items li',
		);

		await expect( {
			selector:
				'.ast-breadcrumbs .trail-browse, .ast-breadcrumbs .trail-items, .ast-breadcrumbs .trail-items li ',
			property: 'font-size',
		} ).cssValueToBe(
			`${ breadcrumbTypography[ 'breadcrumb-font-size' ].desktop }${ breadcrumbTypography[ 'breadcrumb-font-size' ][ 'desktop-unit' ] }`,
		);

		await expect( {
			selector: '.ast-breadcrumbs-wrapper, .ast-breadcrumbs-wrapper a',
			property: 'font-weight',
		} ).cssValueToBe(
			`${ breadcrumbTypography[ 'breadcrumb-font-weight' ] }`,
		);

		await expect( {
			selector: '.ast-breadcrumbs-wrapper',
			property: 'line-height',
		} ).cssValueToBe(
			`${ breadcrumbTypography[ 'breadcrumb-line-height' ] }`,
		);

		await expect( {
			selector: '.ast-breadcrumbs-wrapper',
			property: 'text-transform',
		} ).cssValueToBe(
			`${ breadcrumbTypography[ 'breadcrumb-text-transform' ] }`,
		);

		await expect( {
			selector: '.ast-breadcrumbs-wrapper, .ast-breadcrumbs-wrapper a',
			property: 'font-family',
		} ).cssValueToBe(
			`${ breadcrumbTypography[ 'breadcrumb-font-family' ] }`,
		);

		await expect( {
			selector: '.ast-breadcrumbs-wrapper .trail-items .trail-end',
			property: 'color',
		} ).cssValueToBe(
			`${ breadcrumbTypography[ 'breadcrumb-active-color-responsive' ].desktop }`,
		);
	} );
} );
