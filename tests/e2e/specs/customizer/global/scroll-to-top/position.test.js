import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';

describe( 'Scroll to top option under the customizer', () => {
	it( 'left position options should apply correctly', async () => {
		const scrollToTopPosition = {
			'scroll-to-top-icon-position': 'left',
		};
		await setCustomize( scrollToTopPosition );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'post-1' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'post-2' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/post-1' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-scroll-to-top-left' );
		await expect( {
			selector: '.ast-scroll-to-top-left',
			property: 'left',
		} ).cssValueToBe( '30px' );
	} );

	it( 'right position options should apply correctly', async () => {
		const scrollToTopPosition = {
			'scroll-to-top-icon-position': 'right',
		};
		await setCustomize( scrollToTopPosition );
		await page.goto( createURL( '/post-1' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-scroll-to-top-right' );
		await expect( {
			selector: '.ast-scroll-to-top-right',
			property: 'right',
		} ).cssValueToBe( '30px' );
	} );
} );
