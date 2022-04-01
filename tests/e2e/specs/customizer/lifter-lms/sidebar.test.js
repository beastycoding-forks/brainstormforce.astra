import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { importCourse } from '../../../utils/import-lms.course';
describe( 'lifter lms setting from customizer', () => {
	it( 'sidebar should apply', async () => {
		await importCourse();
		const lifterLmsSidebar = {
			'lifterlms-course-lesson-sidebar-layout': 'left-sidebar',
		};
		await setCustomize( lifterLmsSidebar );
		await page.goto( createURL( '/course/the-official-quickstart-course-for-lifterlms/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-left-sidebar #secondary' );
		const lifter = await page.$eval( '.ast-left-sidebar #secondary', ( element ) => element.getAttribute( '#secondary' ) );
		await expect( lifter ).toBeNull( );
	} );
} );
