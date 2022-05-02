import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { publishPost } from '../../../utils/publish-post';
describe( 'Breadcrumb settings in the customizer', () => {
	it( 'disable breadcrumb on home page for after header position should apply correctly', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-home-page': 1,
		};
		await setCustomize( afterBreadcrumb );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const enablehomePage = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( enablehomePage ).toBeNull( );
	} );

	it( 'disable breadcrumb on blog page for after header position should apply correctly', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-blog-posts-page': 1,
		};
		await setCustomize( afterBreadcrumb );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disableblog = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disableblog ).toBeNull( );
	} );

	it( 'disable breadcrumb on search page after header position should apply correctly', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-search': 1,
		};
		await setCustomize( afterBreadcrumb );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '#wp-block-search__input-1' );
		await page.keyboard.type( 'test' );
		await page.keyboard.press( 'Enter' );
		await page.waitForSelector( '.ast-primary-header-bar' );
		const enableSearchPage = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( enableSearchPage ).toBeNull( );
	} );

	it( 'disable breadcrumb on archive page after header position should apply correctly', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-archive': 1,
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
		await page.waitForSelector( '.ast-primary-header-bar' );
		const enablearchivePage = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( enablearchivePage ).toBeNull( );
	} );

	it( 'disable breadcrumb on single page for after header position should apply correctly', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-single-page': 1,
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
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disablePage = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disablePage ).toBeNull( );
	} );

	it( 'disable breadcrumb on single post for after header position should apply correctly', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-single-post': 1,
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
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disablePost = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disablePost ).toBeNull( );
	} );

	it( 'disable breadcrumb on 404 page for after header position should apply correctly', async () => {
		const afterBreadcrumb = {
			'breadcrumb-position': 'astra_header_after',
			'breadcrumb-disable-404-page': 1,
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
		await page.waitForSelector( '.ast-primary-header-bar' );
		const disable404 = await page.$eval( '.ast-primary-header-bar', ( element ) => element.getAttribute( '.site-header-focus-item + .ast-breadcrumbs-wrapper' ) );
		await expect( disable404 ).toBeNull( );
	} );
} );
