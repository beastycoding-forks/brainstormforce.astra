import { createURL, createNewPost, publishPost, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/set-customize';
describe( 'Post/Page title font size option under the customizer', () => {
	it( 'post/Page title font size options should apply correctly', async () => {
		const titlefontsize = {
			'font-size-entry-title': {
				desktop: '80',
				tablet: '50',
				mobile: '50',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( titlefontsize );
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

		await page.waitForSelector( ' .ast-single-post .entry-title ' );
		await setBrowserViewport( 'large' );
		await expect( {
			selector: '.ast-single-post .entry-title',
			property: 'font-size',
		} ).cssValueToBe( `${ titlefontsize[ 'font-size-entry-title' ].desktop }${ titlefontsize[ 'font-size-entry-title' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-single-post .entry-title',
			property: 'font-size',
		} ).cssValueToBe( `${ titlefontsize[ 'font-size-entry-title' ].tablet }${ titlefontsize[ 'font-size-entry-title' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-single-post .entry-title',
			property: 'font-size',
		} ).cssValueToBe( `${ titlefontsize[ 'font-size-entry-title' ].mobile }${ titlefontsize[ 'font-size-entry-title' ][ 'mobile-unit' ] }`,
		);
	} );
} );
