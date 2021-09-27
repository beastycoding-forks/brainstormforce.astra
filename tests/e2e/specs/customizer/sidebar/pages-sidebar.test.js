import { setCustomize } from '../../../utils/set-customize';
import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
describe( 'Default position of the Sidebar for pages under the Customizer', () => {
    it( 'position of sidebar for page as LEFT should apply correctly', async () => {
        const pageSidebar = {
            'single-page-sidebar-layout': 'left-sidebar',
        };
        await setCustomize( pageSidebar );
        await createNewPost( {
            postType: 'page',
            title: 'test-page',
        } );
        await publishPost();
        await page.goto( createURL( 'test-page' ), {
            waitUntil: 'networkidle0',
        } );
        await page.waitForSelector( '.ast-separate-container.ast-left-sidebar #secondary' );
        await expect( {
            selector: '.ast-separate-container.ast-left-sidebar #secondary',
            property: '',
        } ).cssValueToBe( `` );
	} );
    it( 'position of Sidebar for pages as RIGHT should apply correctly', async () => {
        const pageSidebar = {
            'single-page-sidebar-layout': 'right-sidebar',
        };
        await setCustomize( pageSidebar );
        await page.goto( createURL( 'test-page' ), {
            waitUntil: 'networkidle0',
        } );
        await page.waitForSelector( '.ast-separate-container.ast-right-sidebar #secondary' );
        await expect( {
            selector: '.ast-separate-container.ast-right-sidebar #secondary',
            property: '',
        } ).cssValueToBe( `` );
	} );
    it( 'position of Sidebar for pages as NO-Sidebar should apply correctly', async () => {
        const pageSidebar = {
            'single-page-sidebar-layout': 'no-sidebar',
        };
        await setCustomize( pageSidebar );
        await page.goto( createURL( 'test-page' ), {
            waitUntil: 'networkidle0',
        } );
        await page.waitForSelector( '.ast-no-sidebar' );
        await expect( {
            selector: '.ast-no-sidebar',
            property: '',
        } ).cssValueToBe( `` );
	} );
    it( 'default Position of Sidebar for pages as LEFT should apply correctly', async () => {
        const pageSidebar = {
            'single-page-sidebar-layout': 'default',
            'site-sidebar-layout': 'left-sidebar',
        };
        await setCustomize( pageSidebar );
        await page.goto( createURL( '/' ), {
            waitUntil: 'networkidle0',
        } );
        await page.goto( createURL( 'test-page' ), {
            waitUntil: 'networkidle0',
        } );
        await page.waitForSelector( '.ast-separate-container.ast-left-sidebar #secondary' );
        await expect( {
            selector: '.ast-separate-container.ast-left-sidebar #secondary',
            property: '',
        } ).cssValueToBe( `` );
	} );
} ); 