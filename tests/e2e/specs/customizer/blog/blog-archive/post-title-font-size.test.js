import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
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

		} );
		await publishPost();

		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.archive .entry-title' );
		await expect( {
			selector: '.entry-title',
			property: 'font-size',
		} ).cssValueToBe( `${ bposttitlefontsize[ 'font-size-page-title' ].desktop }${ bposttitlefontsize[ 'font-size-page-title' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.archive .entry-title',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				bposttitlefontsize[ 'font-size-page-title' ].tablet,
			) }${ bposttitlefontsize[ 'font-size-page-title' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.archive .entry-title',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				bposttitlefontsize[ 'font-size-page-title' ].mobile,
			) }${ bposttitlefontsize[ 'font-size-page-title' ][ 'mobile-unit' ] }`,
		);
	} );
} );
