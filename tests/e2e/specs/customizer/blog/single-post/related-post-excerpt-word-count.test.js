import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Single post option under the customizer', () => {
	it( 'related post excerpt word count option should apply correctly', async () => {
		const Enbaleexcerpt = {
			'enable-related-posts': 1,
			'enable-related-posts-excerpt': 1,
			'related-posts-excerpt-count': 5,
		};
		await setCustomize( Enbaleexcerpt );
		await createNewPost( {
			postType: 'post',
			title: 'sample-post',
			content: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
		} );
		await publishPost();
		await createNewPost( {
			postType: 'post',
			title: 'test-post',
			content: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator',
		} );
		await publishPost();
		await page.goto( createURL( 'sample-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.entry-content' );
		const posts = await page.$eval( '.entry-content', ( element ) => element.getAttribute( '.ast-related-post-excerpt entry-content clear' ) );
		await expect( posts ).toBeNull( );
	} );
} );
