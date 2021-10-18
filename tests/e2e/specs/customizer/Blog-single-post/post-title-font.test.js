import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Post title font option under the customizer', () => {
	it( 'post title font option should apply correctly', async () => {
		const posttitlefont = {
			'enable-related-posts': 'true',
			'related-posts-title-font-family': 'Abel',
			'related-posts-title-text-transform': 'uppercase',
			'related-posts-title-font-weight': '400',
			'related-posts-title-font-size': {
				desktop: 50,
				tablet: 50,
				mobile: 18,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},

		};
		await setCustomize( posttitlefont );
		await createNewPost( {
			postType: 'post',
			title: 'sample-post',

		} );
		await publishPost();

		await createNewPost( {
			postType: 'post',
			title: 'test-post',

		} );
		await publishPost();

		await page.goto( createURL( 'test-post' ), {
			waitUntil: 'networkidle0',
		} );

		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );

		await page.waitForSelector( ' .ast-separate-container .ast-single-related-posts-container ' );
		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'font-family',
		} ).cssValueToBe( `${ posttitlefont[ 'related-posts-title-font-family' ] }`,
		);

		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'text-transform',
		} ).cssValueToBe( `${ posttitlefont[ 'related-posts-title-text-transform' ] }`,
		);

		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'font-weight',
		} ).cssValueToBe( `${ posttitlefont[ 'related-posts-title-font-weight' ] }`,
		);

		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'font-size',
		} ).cssValueToBe( `${ posttitlefont[ 'related-posts-title-font-size' ].desktop }${ posttitlefont[ 'related-posts-title-font-size' ][ 'desktop-unit' ] }`,
		);
	} );
} );
