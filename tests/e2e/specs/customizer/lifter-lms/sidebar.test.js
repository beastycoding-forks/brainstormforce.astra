import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { importCourse } from '../../../utils/import-lms.course';
//import { clickAndWait } from '../../../utils/click-and-wait';
describe( 'lifter lms setting from customizer', () => {
	it( 'sidebar should apply', async () => {
		await importCourse();
		await page.goto( createURL( '/wp-admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.hover( '#toplevel_page_lifterlms > a > div.wp-menu-name' );
		await page.click( '.toplevel_page_lifterlms ul li:nth-child(5)' );
		await page.click( '#wpbody-content > div.wrap.lifterlms.llms-import-export > form > ul > li:nth-child(2) > button' );
		const lifterLmsSidebar = {
			'lifterlms-course-lesson-sidebar-layout': 'left-sidebar',
		};
		await setCustomize( lifterLmsSidebar );
		await page.goto( createURL( '/course/free-course-lead-magnet-template-6' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-left-sidebar #secondary' );
		const lifter = await page.$eval( '.ast-left-sidebar #secondary', ( element ) => element.getAttribute( '#secondary' ) );
		await expect( lifter ).toBeNull( );
	} );
} );
