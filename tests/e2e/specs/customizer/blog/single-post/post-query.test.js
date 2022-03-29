import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Single post option under the customizer', () => {
	it( 'post query based on option should apply correctly', async () => {
		const gridAndColumns = {
			'enable-related-posts': 1,
			'related-posts-based-on': 'categories',
		};
		await setCustomize( gridAndColumns );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'a-post' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'b-post' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'c-post' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/a-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.ast-related-posts-wrapper' );
		const relatedPostBy = await page.$eval( '.ast-related-posts-wrapper', ( element ) => element.getAttribute( '.ast-single-related-posts-container .ast-related-posts-wrapper' ) );
		await expect( relatedPostBy ).toBeNull( );
	} );
	it( 'post query Order by option should apply correctly', async () => {
		const gridAndColumns = {
			'enable-related-posts': 1,
			'related-posts-order-by': 'title',
		};
		await setCustomize( gridAndColumns );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'a-post' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'b-post' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'c-post' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/a-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.ast-related-posts-wrapper' );
		const orderBy = await page.$eval( '.ast-related-posts-wrapper', ( element ) => element.getAttribute( '.ast-single-related-posts-container .ast-related-posts-wrapper' ) );
		await expect( orderBy ).toBeNull( );
	} );
	it( 'post query Order option should apply correctly', async () => {
		const gridAndColumns = {
			'enable-related-posts': 1,
			'related-posts-order': 'desc',
		};
		await setCustomize( gridAndColumns );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'a-post' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'b-post' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'c-post' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/a-post' ), {
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
