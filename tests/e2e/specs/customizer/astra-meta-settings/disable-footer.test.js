import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../utils/publish-post';
import { setCustomize } from '../../../utils/customize';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../utils/scroll-to-element';
describe( 'disable footer meta setting', () => {
	it( 'disabling footer should work properly', async () => {
		const astraMetaSetting = {
			'footer-sml-layout': 'disabled',
			'footer-desktop-items': {
				primary: {
					primary_2: {
						1: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( astraMetaSetting );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test' } );
			await page.click( '[aria-label="Astra Settings"]' );
			await page.click( '#astra_settings_meta_box > div:nth-child(3) > h2 > button' );
			await page.evaluate( () => {
				[ ...document.querySelectorAll( '.ast-sidebar-layout-meta-wrap .components-toggle-control__label' ) ].find( ( element ) => element.textContent === 'Disable Footer' ).click();
			} );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#secondary' );
		await page.waitForSelector( '#secondary' );
		const siteFooter = await page.$eval( '#secondary', ( element ) => element.getAttribute( '#colophon' ) );
		await expect( siteFooter ).toBeNull( );
	} );
} );
