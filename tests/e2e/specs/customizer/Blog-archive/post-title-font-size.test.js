import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Blog Archive option under the customizer', () => {
	it( 'blog Archive post font size options should apply correctly', async () => {
		const bposttitlefontsize = {
			'font-size-page-title': {
				desktop: '50',
				tablet: '50',
				mobile: '50',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( bposttitlefontsize );
		await createNewPost( {
			postType: 'post',
			title: 'sample-page',
			image: 'Desktop/cat.png',

		} );
		await publishPost();

		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );

		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );

		await page.waitForSelector( '.entry-title ' );
		await expect( {
			selector: '.entry-title  ',
			property: 'font-size',
		} ).cssValueToBe( `${ bposttitlefontsize[ 'font-size-page-title' ].desktop }${ bposttitlefontsize[ 'font-size-page-title' ][ 'desktop-unit' ] }` );

		await page.waitForSelector( '.entry-title ' );
		await expect( {
			selector: '.entry-title  ',
			property: 'font-size',
		} ).cssValueToBe( `${ bposttitlefontsize[ 'font-size-page-title' ].tablet }${ bposttitlefontsize[ 'font-size-page-title' ][ 'tablet-unit' ] }` );

		await page.waitForSelector( '.entry-title ' );
		await expect( {
			selector: '.entry-title  ',
			property: 'font-size',
		} ).cssValueToBe( `${ bposttitlefontsize[ 'font-size-page-title' ].mobile }${ bposttitlefontsize[ 'font-size-page-title' ][ 'mobile-unit' ] }` );
	} );
} );
