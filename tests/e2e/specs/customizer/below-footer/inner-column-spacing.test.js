import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Below footer border top color setting in customizer', () => {
	it( 'border top color should apply correctly', async () => {
		const innercolumnSpacing = {
			'hbb-inner-spacing':
            {
            	desktop: '50',
            	tablet: '50',
            	mobile: '50',
            	'desktop-unit': 'px',
            	'tablet-unit': 'px',
            	'mobile-unit': 'px',

            },
		};
		await setCustomize( innercolumnSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row',
			property: 'grid-column-gap',
		} ).cssValueToBe( `${ innercolumnSpacing[ 'hbb-inner-spacing' ].desktop }${ innercolumnSpacing[ 'hbb-inner-spacing' ][ 'desktop-unit' ] }`,
		);

		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row',
			property: 'grid-column-gap',
		} ).cssValueToBe( `${ innercolumnSpacing[ 'hbb-inner-spacing' ].desktop }${ innercolumnSpacing[ 'hbb-inner-spacing' ][ 'desktop-unit' ] }`,
		);

		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row',
			property: 'grid-column-gap',
		} ).cssValueToBe( `${ innercolumnSpacing[ 'hbb-inner-spacing' ].tablet }${ innercolumnSpacing[ 'hbb-inner-spacing' ][ 'tablet-unit' ] }`,
		);

		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row',
			property: 'grid-column-gap',
		} ).cssValueToBe( `${ innercolumnSpacing[ 'hbb-inner-spacing' ].mobile }${ innercolumnSpacing[ 'hbb-inner-spacing' ][ 'mobile-unit' ] }`,
		);
	} );
} );
