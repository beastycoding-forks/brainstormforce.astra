import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Single post option under the customizer', () => {
	it( 'post query Order by option should apply correctly', async () => {
		const GridandColumns = {
			'enable-related-posts': true,
			'related-posts-order': 'desc',
		};
		await setCustomize( GridandColumns );
		await createNewPost( {
			postType: 'post',
			title: 'a-post',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'post',
			title: 'b-post',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'post',
			title: 'c-post',
		} );
		await publishPost();
		await page.goto( createURL( 'a-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.ast-related-posts-wrapper' );
		const Order = await page.$eval( '.ast-related-posts-wrapper', ( element ) => element.getAttribute( '.ast-single-related-posts-container .ast-related-posts-wrapper' ) );
		await expect( Order ).toBeNull( );
	} );
	it( 'post query Order option should apply correctly', async () => {
		const GridandColumns = {
			'enable-related-posts': true,
			'related-posts-order': 'desc',
		};
		await setCustomize( GridandColumns );
		await createNewPost( {
			postType: 'post',
			title: 'a-post',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'post',
			title: 'b-post',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'post',
			title: 'c-post',
		} );
		await publishPost();
		await page.goto( createURL( 'a-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.ast-related-posts-wrapper' );
		const Order = await page.$eval( '.ast-related-posts-wrapper', ( element ) => element.getAttribute( '.ast-single-related-posts-container .ast-related-posts-wrapper' ) );
		await expect( Order ).toBeNull( );
	} );
} );
