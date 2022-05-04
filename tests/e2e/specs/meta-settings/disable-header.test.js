import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../utils/publish-post';
import { setCustomize } from '../../utils/customize';
import { setBrowserViewport } from '../../utils/set-browser-viewport';
describe( 'Astra meta setting', () => {
	it( 'disabling above header should apply correctly', async () => {
		const astraMetaSetting = {
			'ast-hfb-above-header-display': 'disabled',
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'html-2',
					},
				},
			},
		};
		await setCustomize( astraMetaSetting );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'above-header',
			} );
			await page.waitForSelector( '.interface-pinned-items .components-button:not(:first-child)' );
			await page.click( '.interface-pinned-items .components-button:not(:first-child)' );
			await page.evaluate( () => {
				[
					...document.querySelectorAll(
						'.ast-sidebar-layout-meta-wrap .components-toggle-control__label',
					),
				]
					.find( ( element ) => element.textContent === 'Disable Above Header' )
					.click();
			} );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/above-header' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#ast-desktop-header' );
		const aboveHeader = await page.$eval( '#ast-desktop-header', ( element ) => element.getAttribute( '.ast-above-header-bar' ) );
		await expect( aboveHeader ).toBeNull();
	} );

	it( 'disabling primary header should apply correctly', async () => {
		const astraMetaSetting = {
			'ast-hfb-above-header-display': 'disabled',
		};
		await setCustomize( astraMetaSetting );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'primary-header',
			} );
			await page.waitForSelector( '.interface-pinned-items .components-button:not(:first-child)' );
			await page.click( '.interface-pinned-items .components-button:not(:first-child)' );
			await page.evaluate( () => {
				[
					...document.querySelectorAll(
						'.ast-sidebar-layout-meta-wrap .components-toggle-control__label',
					),
				]
					.find( ( element ) => element.textContent === 'Disable Primary Header' )
					.click();
			} );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/primary-header' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#ast-desktop-header' );
		const aboveHeader = await page.$eval( '#ast-desktop-header', ( element ) => element.getAttribute( 'ast-primary-header-bar' ) );
		await expect( aboveHeader ).toBeNull();
	} );

	it( 'disabling below header should apply correctly', async () => {
		const astraMetaSetting = {
			'ast-hfb-above-header-display': 'disabled',
			'header-desktop-items': {
				below: {
					below_left: {
						0: 'html-2',
					},
				},
			},
		};
		await setCustomize( astraMetaSetting );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'below-header',
			} );
			await page.waitForSelector( '.interface-pinned-items .components-button:not(:first-child)' );
			await page.click( '.interface-pinned-items .components-button:not(:first-child)' );
			await page.evaluate( () => {
				[
					...document.querySelectorAll(
						'.ast-sidebar-layout-meta-wrap .components-toggle-control__label',
					),
				]
					.find( ( element ) => element.textContent === 'Disable Below Header' )
					.click();
			} );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/below-header' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#ast-desktop-header' );
		const aboveHeader = await page.$eval( '#ast-desktop-header', ( element ) => element.getAttribute( '.ast-below-header-bar' ) );
		await expect( aboveHeader ).toBeNull();
	} );

	it( 'disabling mobile header should apply correctly', async () => {
		const astraMetaSetting = {
			'ast-hfb-above-header-display': 'disabled',
		};
		await setCustomize( astraMetaSetting );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'mobile-header',
			} );
			await page.waitForSelector( '.interface-pinned-items .components-button:not(:first-child)' );
			await page.click( '.interface-pinned-items .components-button:not(:first-child)' );
			await page.evaluate( () => {
				[
					...document.querySelectorAll(
						'.ast-sidebar-layout-meta-wrap .components-toggle-control__label',
					),
				]
					.find( ( element ) => element.textContent === 'Disable Mobile Header' )
					.click();
			} );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/mobile-header' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '#ast-desktop-header' );
		const aboveHeader = await page.$eval( '#ast-desktop-header', ( element ) => element.getAttribute( '.ast-mobile-header-bar' ) );
		await expect( aboveHeader ).toBeNull();
	} );
} );
