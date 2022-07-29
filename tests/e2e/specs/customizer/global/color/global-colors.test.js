import { setCustomize } from '../../../../utils/customize';
import { createURL, createNewPost, setPostContent, insertBlock } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
describe( 'Testing global Color setting under the customizer', () => {
	it( 'text & heading base color should apply correctly', async () => {
		const textAndHeadingColor = {
			'text-color': 'rgb(205, 41, 41)',
			'heading-base-color': 'rgb(81, 29, 236)',
		};
		await setCustomize( textAndHeadingColor );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'global-colors-test' } );
			await insertBlock( 'Buttons' );
			await page.keyboard.type( 'color' );
			await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body, .ast-footer-copyright' );
		await expect( {
			selector: 'body, .ast-footer-copyright',
			property: 'color',
		} ).cssValueToBe( `${ textAndHeadingColor[ 'text-color' ] }` );

		await page.goto( createURL( 'global-colors-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6' );
		await expect( {
			selector: 'h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6',
			property: 'color',
		} ).cssValueToBe( `${ textAndHeadingColor[ 'heading-base-color' ] }` );
	} );
	it( 'theme color should apply correctly', async () => {
		const themeColor = {
			'theme-color': 'rgb(163, 183, 1)',
		};
		await setCustomize( themeColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-search__button' );
		await expect( {
			selector: '.wp-block-search__button',
			property: 'background-color',
		} ).cssValueToBe( `${ themeColor[ 'theme-color' ] }` );

		await page.goto( createURL( 'global-colors-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'input#submit, input[type="submit"]' );
		await expect( {
			selector: 'input#submit, input[type="submit"]',
			property: 'background-color',
		} ).cssValueToBe( `${ themeColor[ 'theme-color' ] }` );
	} );
	it( 'link color should apply correctly', async () => {
		const linkColor = {
			'link-color': 'rgb(16, 109, 4)',
		};
		await setCustomize( linkColor );
		await page.goto( createURL( 'global-colors-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.entry-meta, .entry-meta *, .post-navigation a' );
		await expect( {
			selector: '.entry-meta, .entry-meta *, .post-navigation a',
			property: 'color',
		} ).cssValueToBe( `${ linkColor[ 'link-color' ] }` );
	} );
	it( 'link hover color should apply correctly', async () => {
		const linkhoverColor = {
			'link-h-color': 'rgb(165, 3, 125)',
		};
		await setCustomize( linkhoverColor );
		await page.goto( createURL( 'global-colors-test' ), {
			waitUntil: 'networkidle0',
		} );
		const link = await page.$( '.wp-block-latest-posts__post-title' );

		await link.hover();
		await page.waitForTimeout( 100 );
		await page.waitForSelector( '.wp-block-latest-posts__post-title' );
		await expect( {
			selector: '.wp-block-latest-posts__post-title',
			property: 'color',
		} ).cssValueToBe( `${ linkhoverColor[ 'link-h-color' ] }` );
	} );
	it( 'border color should apply correctly', async () => {
		const borderColor = {
			'border-color': 'rgb(9, 7, 7)',
		};
		await setCustomize( borderColor );
		await page.goto( createURL( 'global-colors-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-search__inside-wrapper .wp-block-search__input' );
		await expect( {
			selector: '.wp-block-search__inside-wrapper .wp-block-search__input',
			property: 'border-color',
		} ).cssValueToBe( `${ borderColor[ 'border-color' ] }` );
	} );
} );
