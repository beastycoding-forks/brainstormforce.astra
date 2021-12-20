import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
describe( 'Blog Archive post content option under the customizer', () => {
	it( 'blog Archive excerpt options should apply correctly', async () => {
		const postcontent = {
			'blog-post-content': 'excerpt',

		};
		await setCustomize( postcontent );
		await createNewPost( {
			postType: 'post',
			title: 'blog-post',
			content: 'Before & After magazine answered a curious reader Its words loosely approximate the frequency with which letters occur in English which is why at a glance it looks pretty real Until recently the prevailing view assumed lorem ipsum was born as a nonsense text It s not Latin though it looks like it and it actually says nothing Before & After magazine answered a curious reade Its words loosely approximate the frequency',
		} );
		await publishPost();

		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.read-more a' );
		const excerpt = await page.$eval( '.read-more a', ( element ) => element.getAttribute( 'href' ) );
		await expect( excerpt ).toBe( 'http://localhost:8888/blog-post' );
	} );

	// it( 'blog Archive full content options should apply correctly', async () => {
	// 	const postcontent = {
	// 		'blog-post-content': 'full-content',
	// 	};
	// 	await setCustomize( postcontent );
	// 	await createNewPost( {
	// 		postType: 'post',
	// 		title: 'blog-post',
	// 		content: 'Before & After magazine answered a curious reader Its words loosely approximate the frequency with which letters occur in English which is why at a glance it looks pretty real Until recently the prevailing view assumed lorem ipsum was born as a nonsense text It s not Latin though it looks like it and it actually says nothing Before & After magazine answered a curious reade Its words loosely approximate the frequency',
	// 	} );
	// 	await publishPost();

	// 	await page.goto( createURL( '/author/admin' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );
	// 	await page.waitForSelector( '.entry-content' );
	// 	const fullContent = await page.$eval( '.entry-content', ( element ) => element.getAttribute( 'href' ) );
	// 	await expect( fullContent ).toBe( NULL );
	// } );
} );
