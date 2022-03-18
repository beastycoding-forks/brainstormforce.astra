import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'lifter lms course columns setting from customizer', () => {
	it( 'course columns should apply', async () => {
		await page.goto( createURL( '/wp-admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.hover( '#toplevel_page_lifterlms > a > div.wp-menu-name' );
		await page.click( '.toplevel_page_lifterlms ul li:nth-child(5)' );
		await page.click( '#wpbody-content > div.wrap.lifterlms.llms-import-export > form > ul > li:nth-child(2) > button' );
		const lifterLmsColumns = {
			'llms-course-grid': {
				desktop: 4,
				tablet: 3,
				mobile: 2,
			},
		};
		await setCustomize( lifterLmsColumns );
		await page.goto( createURL( '/courses' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.llms-loop-list.cols-3 .llms-loop-item' );
		await expect( {
			selector: '.llms-loop-list.cols-3 .llms-loop-item',
			property: 'width',
		} ).cssValueToBe( `${ lifterLmsColumns[ 'llms-course-grid' ].desktop + '%' }` );
	} );
} );
