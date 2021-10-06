import {
	createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'to test Right Sidebar size in the customizer', () => {
	it( 'right Sidebar size should apply correctly on post', async () => {
		const postRightSidebarSize = {
			'site-sidebar-layout': 'right-sidebar',
			'site-post-sidebar-layout': 'right-sidebar',
			'inspector-input-control-0': '35%',
		};
		await setCustomize( postRightSidebarSize );
		await createNewPost( { postType: 'post', title: 'sidebar post' } );
		await publishPost();
		await page.goto( createURL( '/sidebar-post/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector(
			'.ast-separate-container.ast-right-sidebar #secondary',
		);
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe(
			`${ postRightSidebarSize[ 'inspector-input-control-0' ] }`,
		);
	} );
	it( 'right Sidebar size should apply correctly on page', async () => {
		const pageRightSidebarSize = {
			'site-sidebar-layout': 'right-sidebar',
			'site-page-sidebar-layout': 'right-sidebar',
			'inspector-input-control-0': '35%',
		};
		await setCustomize( pageRightSidebarSize );
		await createNewPost( { postType: 'page', title: 'sidebar page' } );
		await publishPost();
		await page.goto( createURL( '/sidebar-page/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector(
			'.ast-separate-container.ast-right-sidebar #secondary',
		);
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe(
			`${ pageRightSidebarSize[ 'inspector-input-control-0' ] }`,
		);
	} );
	it( 'right Sidebar size should apply correctly on archive archive posts', async () => {
		const archiveRightSidebarSize = {
			'site-sidebar-layout': 'right-sidebar',
			'archive-post-sidebar-layout': 'right-sidebar',
			'inspector-input-control-0': '35%',
		};
		await setCustomize( archiveRightSidebarSize );
		await page.goto( createURL( '/category/uncategorized' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector(
			'.ast-separate-container.ast-right-sidebar #secondary',
		);
		await expect( {
			selector: '#secondary',
			property: 'width',
		} ).cssValueToBe(
			`${ archiveRightSidebarSize[ 'inspector-input-control-0' ] }`,
		);
	} );
} );
