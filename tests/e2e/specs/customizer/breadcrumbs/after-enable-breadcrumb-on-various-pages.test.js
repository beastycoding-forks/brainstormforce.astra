import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../utils/publish-post';
import { setCustomize } from '../../../utils/customize';
describe( 'Breadcrumb settings in the customizer', () => {
	it( 'enable breadcrumb on home page for after header position should apply corectly', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-home-page': 0,
		};
		await setCustomize( afterBreadcrumb );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const enableHomePage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( enableHomePage ).toBeNull( );
	} );

	it( 'enable breadcrumb on blog page for after header position should apply corectly', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-blog-posts-page': 0,
		};
		await setCustomize( afterBreadcrumb );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disableBlog = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disableBlog ).toBeNull( );
	} );

	it( 'enable breadcrumb on search page after header position should apply corectly', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-archive': 0,
		};
		await setCustomize( afterBreadcrumb );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '#wp-block-search__input-1' );
		await page.keyboard.type( 'test' );
		await page.keyboard.press( 'Enter' );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const enableSearchPage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( enableSearchPage ).toBeNull( );
	} );

	it( 'enable breadcrumb on archive page after header position should apply corectly', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-archive': 0,
		};
		await setCustomize( afterBreadcrumb );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const enableArchivePage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( enableArchivePage ).toBeNull( );
	} );

	it( 'enable breadcrumb on single page for after header position should apply corectly', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-single-page': 0,
		};
		await setCustomize( afterBreadcrumb );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'single-page' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/single-page' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disablePage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disablePage ).toBeNull( );
	} );

	it( 'enable breadcrumb on single post for after header position should apply corectly', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-single-post': 0,
		};
		await setCustomize( afterBreadcrumb );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'single-post' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/single-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disablePost = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disablePost ).toBeNull( );
	} );

	it( 'enable breadcrumb on 404 page for after header position should apply corectly for after position', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-404-page': 0,
		};
		await setCustomize( afterBreadcrumb );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: '404-page' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/12' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disable404 = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disable404 ).toBeNull( );
	} );
} );

