import {
	createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/set-customize';
describe( 'Blog post layout setting from Global option under the Customizer', () => {
	it( 'layout for blog post should apply correctly', async () => {
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
	it( 'layout for single post should apply correctly', async () => {
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
	it( 'layout for single post as content boxed should apply correctly', async () => {
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
	it( 'layout for single post as boxed container should apply correctly', async () => {
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
	it( 'layout for single post as page builder should apply correctly', async () => {
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
