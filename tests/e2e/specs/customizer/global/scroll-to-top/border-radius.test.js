import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Scroll to top option under the customizer', () => {
	it( 'border radius options should apply correctly', async () => {
		const scrollToTopRadius = {
			'scroll-to-top-icon-radius': 70,
		};
		await setCustomize( scrollToTopRadius );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'post-1' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/post-1' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '#ast-scroll-top' );
		await expect( {
			selector: '#ast-scroll-top',
			property: 'border-radius',
		} ).cssValueToBe( `${ scrollToTopRadius[ 'scroll-to-top-icon-radius' ] + 'px' }` );
	} );
} );
