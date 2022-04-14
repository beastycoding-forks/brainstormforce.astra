import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Blog Archive post content option under the customizer', () => {
	it( 'blog Archive excerpt options should apply correctly', async () => {
		const postContent = {
			'blog-post-content': 'excerpt',
		};
		await setCustomize( postContent );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( {
				postType: 'post',
				title: 'test',
				content: 'Before & After magazine answered a curious reader Its words loosely approximate the frequency with which letters occur in English which is why at a glance it looks pretty real Until recently the prevailing view assumed lorem ipsum was born as a nonsense text It s not Latin though it looks like it and it actually says nothing Before & After magazine answered a curious reade Its words loosely approximate the frequency' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '#wp-block-search__input-1' );
		await page.keyboard.type( 'test' );
		await page.keyboard.press( 'Enter' );
		await page.waitForSelector( '.read-more a' );
		const excerpt = await page.$eval( '.read-more a', ( element ) => element.getAttribute( 'href' ) );
		await expect( excerpt ).toBe( 'http://localhost:8888/test' );
	} );

	it( 'blog Archive full content options should apply correctly', async () => {
		const postContent = {
			'blog-post-content': 'full-content',
		};
		await setCustomize( postContent );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( {
				postType: 'post',
				title: 'test',
				content: 'Before & After magazine answered a curious reader Its words loosely approximate the frequency with which letters occur in English which is why at a glance it looks pretty real Until recently the prevailing view assumed lorem ipsum was born as a nonsense text It s not Latin though it looks like it and it actually says nothing Before & After magazine answered a curious reade Its words loosely approximate the frequency' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '#wp-block-search__input-1' );
		await page.keyboard.type( 'test' );
		await page.keyboard.press( 'Enter' );
		await page.waitForSelector( '.entry-content' );
		const fullContent = await page.$eval( '.entry-content', ( element ) => element.getAttribute( 'entry-content clear' ) );
		await expect( fullContent ).toBeNull( );
	} );
} );
