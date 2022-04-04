import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { importCourse } from '../../../utils/import-lms-course';
describe( 'lifter lms setting from customizer', () => {
	it( 'layout should apply', async () => {
		await importCourse();
		const lifterLmsLayout = {
			'site-content-width': 800,
			'lifterlms-content-layout': 'boxed-container',
		};
		await setCustomize( lifterLmsLayout );
		await page.goto( createURL( '/course/the-official-quickstart-course-for-lifterlms/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-container' );
		await expect( {
			selector: '.ast-container',
			property: 'max-width',
		} ).cssValueToBe( `${ lifterLmsLayout[ 'site-content-width' ] + 40 }` + 'px' );
	} );
} );
