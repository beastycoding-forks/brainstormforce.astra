import { setCustomize } from '../../../utils/set-customize';
import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
describe( 'default Position of the Sidebar for blog posts under the Customizer', () => {
	it( 'position of Sidebar for blog posts as LEFT should apply correctly', async () => {
		const blogSidebar = {
			'single-post-sidebar-layout': 'left-sidebar',
		};
		await setCustomize( blogSidebar );
		await createNewPost( {
			postType: 'post',
			title: 'sample',
		} );
		await publishPost();
		await page.goto( createURL( 'sample' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container.ast-left-sidebar #secondary' );
		await expect( {
			selector: '.ast-separate-container.ast-left-sidebar #secondary',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'position of Sidebar for blog-posts as RIGHT should apply correctly', async () => {
		const blogSidebar = {
			'single-post-sidebar-layout': 'right-sidebar',
		};
		await setCustomize( blogSidebar );
		await page.goto( createURL( 'sample' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container.ast-right-sidebar #secondary' );
		await expect( {
			selector: '.ast-separate-container.ast-right-sidebar #secondary',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'position of Sidebar for blog-posts as NO-Sidebar should apply correctly', async () => {
		const blogSidebar = {
			'single-post-sidebar-layout': 'no-sidebar',
		};
		await setCustomize( blogSidebar );
		await page.goto( createURL( 'sample' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-no-sidebar' );
		await expect( {
			selector: '.ast-no-sidebar',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'default Position of Sidebar for blog-posts as LEFT should apply correctly', async () => {
		const blogSidebar = {
			'single-post-sidebar-layout': 'default',
			'site-sidebar-layout': 'left-sidebar',
		};
		await setCustomize( blogSidebar );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.goto( createURL( 'sample' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container.ast-left-sidebar #secondary' );
		await expect( {
			selector: '.ast-separate-container.ast-left-sidebar #secondary',
			property: '',
		} ).cssValueToBe( `` );
	} );
} );