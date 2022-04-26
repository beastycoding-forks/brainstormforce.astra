import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Single post option under the customizer', () => {
	it( 'grid and columns layout option should apply correctly', async () => {
		const gridColumnLayout = {
			'enable-related-posts': 1,
			'related-posts-grid-responsive': {
				desktop: '4-equal',
				tablet: '3-equal',
				mobile: '2-equal',
			},
		};
		await setCustomize( gridColumnLayout );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test-1' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'test-2' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'test-3' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test-1' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-single-related-posts-container .ast-related-posts-wrapper' );
		await expect( {
			selector: '.ast-single-related-posts-container .ast-related-posts-wrapper',
			property: 'grid-template-columns',
		} ).cssValueToBe( `repeat( 4, 1fr )` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-single-related-posts-container .ast-related-posts-wrapper',
			property: 'grid-template-columns',
		} ).cssValueToBe( `repeat( 3, 1fr )` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-single-related-posts-container .ast-related-posts-wrapper',
			property: 'grid-template-columns',
		} ).cssValueToBe( `repeat( 2, 1fr )` );
	} );
} );
