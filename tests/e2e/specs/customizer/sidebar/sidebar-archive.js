import { setCustomize } from '../../../utils/set-customize';
import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
describe( 'Default Position of the Sidebar for archive posts under the Customizer', () => {
	it( 'position of Sidebar for archive-posts as LEFT should apply correctly', async () => {
		const archiveSidebar = {
			'archive-post-sidebar-layout': 'left-sidebar',
		};
		await setCustomize( archiveSidebar );
		await createNewPost( {
			postType: 'post',
			title: 'sample',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container.ast-left-sidebar #secondary' );
		await expect( {
			selector: '.ast-separate-container.ast-left-sidebar #secondary',
			property: '',
		} ).cssValueToBe( `` );
	} );

	it( 'position of Sidebar for archive-posts as RIGHT should apply correctly', async () => {
		const archiveRight = {
			'archive-post-sidebar-layout': 'right-sidebar',
		};
		await setCustomize( archiveRight );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container.ast-right-sidebar #secondary' );
		await expect( {
			selector: '.ast-separate-container.ast-right-sidebar #secondary',
			property: '',
		} ).cssValueToBe( `` );
	} );

	it( 'position of Sidebar for archive-posts as NO-Sidebar should apply correctly', async () => {
		const archiveLeft = {
			'archive-post-sidebar-layout': 'no-sidebar',
		};
		await setCustomize( archiveLeft );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-no-sidebar' );
		await expect( {
			selector: '.ast-no-sidebar',
			property: '',
		} ).cssValueToBe( `` );
	} );

	it( 'pefault Position of Sidebar for archive-posts as RIGHT should apply correctly', async () => {
		const archiveDef = {
			'archive-post-sidebar-layout': 'default',
			'site-sidebar-layout': 'right-sidebar',
		};
		await setCustomize( archiveDef );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container.ast-right-sidebar #secondary' );
		await expect( {
			selector: '.ast-separate-container.ast-right-sidebar #secondary',
			property: '',
		} ).cssValueToBe( `` );
	} );
} );