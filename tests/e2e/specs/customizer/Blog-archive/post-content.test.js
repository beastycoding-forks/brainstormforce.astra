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
			content: 'Full Content is applying properly',
			excerpt: 'Excerpt is applying properly',
		} );
		await publishPost();

		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container .ast-article-post  ' );
		await expect( {
			selector: '.ast-separate-container .ast-article-post  ',
			property: '',
		} ).cssValueToBe( `` );
	} );

	it( 'blog Archive full content options should apply correctly', async () => {
		const postcontent = {
			'blog-post-content': 'full-content',
		};
		await setCustomize( postcontent );
		await createNewPost( {
			postType: 'post',
			title: 'blog-post',
			content: 'Full Content is applying properly',
			excerpt: 'Excerpt is applying properly',
		} );
		await publishPost();

		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container .ast-article-post  ' );
		await expect( {
			selector: '.ast-separate-container .ast-article-post  ',
			property: '',
		} ).cssValueToBe( `` );
	} );
} );
