import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'lifter lms layout setting from customizer', () => {
	it( 'layout should apply', async () => {
		await page.goto( createURL( '/wp-admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '#toplevel_page_lifterlms > a > div.wp-menu-name' );
		await page.click( 'a[href="admin.php?page=llms-import"]' );
		await page.click( '#wpbody-content > div.wrap.lifterlms.llms-import-export > form > ul > li:nth-child(2) > button' );
		const lifterLMSLayout = {
			'lifterlms-content-layout': 'content-boxed-container',
		};
		await setCustomize( lifterLMSLayout );
		await page.goto( createURL( '/course/free-course-lead-magnet-template-2' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-container' );
		await expect( {
			selector: '.ast-container',
			property: 'max-width',
		} ).cssValueToBe( `${ lifterLMSLayout[ 'shop-archive-max-width' ] }` );
	} );
} );
