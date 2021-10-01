import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/set-customize';
describe( 'global Container layout setting in the customizer', () => {
	it( 'boxed container layout should apply correctly', async () => {
		const contentLayout = {
			'site-content-layout': 'boxed-container',
		};
		await setCustomize( contentLayout );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'content boxed layout should apply correctly', async () => {
		const contentLayout = {
			'site-content-layout': 'content-boxed-container',
		};
		await setCustomize( contentLayout );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'plain container layout should apply correctly', async () => {
		const contentLayout = {
			'site-content-layout': 'plain-container',
		};
		await setCustomize( contentLayout );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'pagebuilder layout should apply correctly', async () => {
		const contentLayout = {
			'site-content-layout': 'page-builder',
		};
		await setCustomize( contentLayout );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'page layout should apply correctly', async () => {
		const boxLayout = {
			'single-page-content-layout': 'boxed-container',
		};
		await setCustomize( boxLayout );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'pain container page layout should apply correctly', async () => {
		const contLayout = {
			'single-page-content-layout': 'plain-container',
		};
		await setCustomize( contLayout );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'content boxed page layout should apply correctly', async () => {
		const contboxLayout = {
			'single-page-content-layout': 'content-boxed-container',
		};
		await setCustomize( contboxLayout );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'full width stretched page layout should apply correctly', async () => {
		const contLayout = {
			'single-page-content-layout': 'page-builder',
		};
		await setCustomize( contLayout );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'default page layout should apply correctly', async () => {
		const contboxLayout = {
			'single-page-content-layout': 'default',
			'site-content-layout': 'plain-container',
		};
		await setCustomize( contboxLayout );
		await page.goto( createURL( 'category/markup' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'post layout should apply correctly', async () => {
		const postLayout = {
			'single-post-content-layout': 'boxed-container',
		};
		await setCustomize( postLayout );
		await createNewPost( {
			postType: 'post',
			title: 'blogPost-layout',
		} );
		await publishPost();
		await page.goto( createURL( 'blogPost-layout' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'post layout as pain container should apply correctly', async () => {
		const containedLayout = {
			'single-post-content-layout': 'plain-container',
		};
		await setCustomize( containedLayout );
		await page.goto( createURL( 'blogPost-layout' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'layout for post as content boxed should apply correctly', async () => {
		const contentLayout = {
			'single-post-content-layout': 'content-boxed-container',
		};
		await setCustomize( contentLayout );
		await page.goto( createURL( 'blogPost-layout' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'default post layout should apply correctly', async () => {
		const defLayout = {
			'single-post-content-layout': 'default',
			'site-content-layout': 'boxed-container',
		};
		await setCustomize( defLayout );
		await page.goto( createURL( 'blogPost-layout' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
	it( 'stretched layout for post should apply correctly', async () => {
		const containedLayout = {
			'single-post-content-layout': 'page-builder',
		};
		await setCustomize( containedLayout );
		await page.goto( createURL( 'blogPost-layout' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-content .ast-container' );
		await expect( {
			selector: '.site-content .ast-container',
			property: '',
		} ).cssValueToBe( `` );
	} );
} );