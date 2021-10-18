import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'post title size in the customizer', () => {
	it( 'page title size should apply corectly', async () => {
		const postTitle = {
			'font-size-entry-title': {
				desktop: 72,
				tablet: 42,
				mobile: 32,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( postTitle );
		await createNewPost( { postType: 'post', title: 'hello world' } );
		await publishPost();
		await page.goto( createURL( '/hello-world/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-single-post .entry-title' );

		await expect( {
			selector: '.ast-single-post .entry-title',
			property: 'font-size',
		} ).cssValueToBe( `${ postTitle[ 'font-size-entry-title' ].desktop }${ postTitle[ 'font-size-entry-title' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-single-post .entry-title',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				postTitle[ 'font-size-entry-title' ].tablet,
			) }${
				postTitle[ 'font-size-entry-title' ][ 'tablet-unit' ]
			}`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-single-post .entry-title',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				postTitle[ 'font-size-entry-title' ].mobile,
			) }${
				postTitle[ 'font-size-entry-title' ][ 'mobile-unit' ]
			}`,
		);
	} );
} );
