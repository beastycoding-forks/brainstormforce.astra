import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { responsiveFontSize } from '../../../utils/responsive-utils';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
describe( 'Post/Page title font size option under the customizer', () => {
	it( 'post/Page title font size options should apply correctly', async () => {
		const titlefontsize = {
			'font-size-entry-title': {
				desktop: '22',
				tablet: '20',
				mobile: '18',
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
		await expect( {
			selector: '.ast-single-post .entry-title',
			property: 'font-size',
		} ).cssValueToBe( `${ titlefontsize[ 'font-size-entry-title' ].desktop }${ titlefontsize[ 'font-size-entry-title' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );

		await expect( {
			selector: '.ast-single-post .entry-title',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				titlefontsize[ 'font-size-entry-title' ].tablet,
			) }${
				titlefontsize[ 'font-size-entry-title' ][ 'tablet-unit' ]
			}`,
		);

		await setBrowserViewport( 'small' );

		await expect( {
			selector: '.ast-single-post .entry-title',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				titlefontsize[ 'font-size-entry-title' ].mobile,
			) }${
				titlefontsize[ 'font-size-entry-title' ][ 'mobile-unit' ]
			}`,
		);
	} );
} );
