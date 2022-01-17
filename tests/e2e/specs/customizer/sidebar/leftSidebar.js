import {
	createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'to test Left Sidebar size in the customizer', () => {
	it( 'left Sidebar size should apply correctly on post', async () => {
		const postLeftSidebarSize = {
			'site-sidebar-layout': 'left-sidebar',
			'site-post-sidebar-layout': 'left-sidebar',
			'inspector-input-control-0': '35%',
		};
		await setCustomize( postLeftSidebarSize );
		await createNewPost( { postType: 'post', title: 'sidebar post' } );
		await publishPost();
		await page.goto( createURL( '/sidebar-post/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector(
			'.ast-separate-container.ast-left-sidebar #secondary',
		);
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe(
			`${ postLeftSidebarSize[ 'inspector-input-control-0' ] }`,
		);
	} );

	it( 'left Sidebar size should apply correctly on page', async () => {
		const pageLeftSidebarSize = {
			'site-sidebar-layout': 'left-sidebar',
			'site-page-sidebar-layout': 'left-sidebar',
			'inspector-input-control-0': '35%',
		};
		await setCustomize( pageLeftSidebarSize );
		await createNewPost( { postType: 'page', title: 'sidebar page' } );
		await publishPost();
		await page.goto( createURL( '/sidebar-page/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector(
			'.ast-separate-container.ast-left-sidebar #secondary',
		);
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe(
			`${ pageLeftSidebarSize[ 'inspector-input-control-0' ] }`,
		);
	} );
	it( 'left Sidebar size should apply correctly on  archive posts', async () => {
		const archiveLeftSidebarSize = {
			'site-sidebar-layout': 'left-sidebar',
			'archive-post-sidebar-layout': 'left-sidebar',
			'inspector-input-control-0': '35%',
		};
		await setCustomize( archiveLeftSidebarSize );
		await page.goto( createURL( '/category/uncategorized' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector(
			'.ast-separate-container.ast-left-sidebar #secondary',
		);
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe(
			`${ archiveLeftSidebarSize[ 'inspector-input-control-0' ] }`,
		);
	} );
} );
