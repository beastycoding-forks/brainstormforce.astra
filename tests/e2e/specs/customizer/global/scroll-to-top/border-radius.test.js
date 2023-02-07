import { createURL, createNewPost, setPostContent } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Scroll to top option under the customizer', () => {
	it( 'border radius options should apply correctly', async () => {
		const scrollToTopRadius = {
			'scroll-to-top-enable': true,
			'scroll-to-top-on-devices': 'both',
			'scroll-to-top-icon-radius-fields': {
				desktop: {
					bottom: '20',
					left: '19',
					right: '18',
					top: '17',
				},
				tablet: {
					bottom: '15',
					left: '14',
					right: '13',
					top: '12',
				},
				mobile: {
					bottom: '10',
					left: '9',
					right: '8',
					top: '7',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( scrollToTopRadius );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'post-1' } );
			await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
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
			property: 'border-top-left-radius',
		} ).cssValueToBe( `${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ].desktop.top }${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '#ast-scroll-top',
			property: 'border-top-right-radius',
		} ).cssValueToBe( `${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ].desktop.right }${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '#ast-scroll-top',
			property: 'border-bottom-right-radius',
		} ).cssValueToBe( `${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ].desktop.bottom }${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '#ast-scroll-top',
			property: 'border-bottom-left-radius',
		} ).cssValueToBe( `${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ].desktop.left }${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '#ast-scroll-top' );
		await expect( {
			selector: '#ast-scroll-top',
			property: 'border-top-left-radius',
		} ).cssValueToBe( `${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ].tablet.top }${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '#ast-scroll-top',
			property: 'border-top-right-radius',
		} ).cssValueToBe( `${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ].tablet.right }${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '#ast-scroll-top',
			property: 'border-bottom-right-radius',
		} ).cssValueToBe( `${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ].tablet.bottom }${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '#ast-scroll-top',
			property: 'border-bottom-left-radius',
		} ).cssValueToBe( `${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ].tablet.left }${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '#ast-scroll-top' );
		await expect( {
			selector: '#ast-scroll-top',
			property: 'border-top-left-radius',
		} ).cssValueToBe( `${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ].mobile.top }${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '#ast-scroll-top',
			property: 'border-top-right-radius',
		} ).cssValueToBe( `${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ].mobile.right }${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '#ast-scroll-top',
			property: 'border-bottom-right-radius',
		} ).cssValueToBe( `${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ].mobile.bottom }${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '#ast-scroll-top',
			property: 'border-bottom-left-radius',
		} ).cssValueToBe( `${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ].mobile.left }${ scrollToTopRadius[ 'scroll-to-top-icon-radius-fields' ][ 'mobile-unit' ] }` );
	} );
} );
