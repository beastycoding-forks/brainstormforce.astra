import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../utils/publish-post';
import { setCustomize } from '../../../utils/customize';
describe( 'Breadcrumb settings in the customizer', () => {
	it( 'disable breadcrumb on home page for before title header position should apply correctly', async () => {
		const insideBreadcrumb = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-disable-home-page': 1,
		};
		await setCustomize( insideBreadcrumb );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const enablehomePage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.ast-article-single' ) );
		await expect( enablehomePage ).toBeNull( );
	} );

	it( 'disable breadcrumb on blog page for before title header position should apply correctly', async () => {
		const insideBreadcrumb = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-disable-blog-posts-page': 1,
		};
		await setCustomize( insideBreadcrumb );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disableblog = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.ast-separate-container .ast-article-single' ) );
		await expect( disableblog ).toBeNull( );
	} );

	it( 'disable breadcrumb on search page before title header position should apply correctly', async () => {
		const insideBreadcrumb = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-disable-search': 1,
		};
		await setCustomize( insideBreadcrumb );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '#wp-block-search__input-1' );
		await page.keyboard.type( 'test' );
		await page.keyboard.press( 'Enter' );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const enableSearchPage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.ast-archive-description' ) );
		await expect( enableSearchPage ).toBeNull( );
	} );

	it( 'disable breadcrumb on archive page before title header position should apply correctly', async () => {
		const insideBreadcrumb = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-disable-archive': 1,
		};
		await setCustomize( insideBreadcrumb );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-author-bio' );
		const enablearchivePage = await page.$eval( '.ast-author-bio', ( element ) => element.getAttribute( '.ast-author-box' ) );
		await expect( enablearchivePage ).toBeNull( );
	} );

	it( 'disable breadcrumb on single page for before title header position should apply correctly', async () => {
		const insideBreadcrumb = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-disable-single-page': 1,
		};
		await setCustomize( insideBreadcrumb );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'single-page' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/single-page' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disablePage = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.ast-separate-container .ast-article-single' ) );
		await expect( disablePage ).toBeNull( );
	} );

	it( 'disable breadcrumb on single post for before title header position should apply correctly', async () => {
		const insideBreadcrumb = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-disable-single-post': 1,
		};
		await setCustomize( insideBreadcrumb );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'single-post' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/single-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disablePost = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.ast-separate-container .ast-article-single' ) );
		await expect( disablePost ).toBeNull( );
	} );

	it( 'disable breadcrumb on 404 page for before title header position should apply correctly', async () => {
		const insideBreadcrumb = {
			'breadcrumb-position': 'astra_entry_top',
			'breadcrumb-disable-404-page': 1,
		};
		await setCustomize( insideBreadcrumb );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: '404-page' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/12' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-breadcrumbs-wrapper' );
		const disable404 = await page.$eval( '.ast-breadcrumbs-wrapper', ( element ) => element.getAttribute( '.ast-separate-container .error-404' ) );
		await expect( disable404 ).toBeNull( );
	} );
} );
