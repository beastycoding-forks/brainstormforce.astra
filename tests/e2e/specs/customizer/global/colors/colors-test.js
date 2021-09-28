import { setCustomize } from '../../../../utils/set-customize';
import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
describe( 'Testing Global Color setting, under the customizer', () => {
	it( 'global text color should apply correctly', async () => {
		const textColor = {
			'text-color': 'rgb(254, 51, 51)',
		};
		await setCustomize( textColor );
		await createNewPost( {
			postType: 'post',
			title: 'text-color',
			content: 'this is the text color test',
		} );
		await publishPost();
		await page.goto( createURL( 'text-color' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body, h1, .entry-title a, .entry-content h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6' );
		await expect( {
			selector: 'body, h1, .entry-title a, .entry-content h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6',
			property: 'color',
		} ).cssValueToBe( `${ textColor[ 'text-color' ] }` );
	} );
	it( 'the color for Heading should apply correctly', async () => {
		const headingColor = {
			'heading-base-color': 'rgb(82, 165, 121)',
		};
		await setCustomize( headingColor );
		await createNewPost( {
			postType: 'post',
			title: 'heading-color',
		} );
		await publishPost();
		await page.goto( createURL( 'heading-color' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h1, .entry-content h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6' );
		await expect( {
			selector: 'h1, .entry-content h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6',
			property: 'color',
		} ).cssValueToBe( `${ headingColor[ 'heading-base-color' ] }` );
	} );
	it( 'link color should apply correctly', async () => {
		const linkColor = {
			'link-color': 'rgb(240, 240, 241)',
		};
		await setCustomize( linkColor );
		await createNewPost( {
			postType: 'post',
			title: 'link-colors',
		} );
		await publishPost();
		await page.goto( createURL( 'link-colors' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'a, .page-title' );
		await expect( {
			selector: 'a, .page-title',
			property: 'color',
		} ).cssValueToBe( `${ linkColor[ 'link-color' ] }` );
	} );
	it( 'theme color the should apply correctly', async () => {
		const themeColor = {
			'theme-color': 'rgb(141, 198, 235)',
		};
		await setCustomize( themeColor );
		await createNewPost( {
			postType: 'post',
			title: 'theme-color',
		} );
		await publishPost();
		await page.goto( createURL( 'theme-color' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-search__button' );
		await expect( {
			selector: '.wp-block-search__button',
			property: 'background-color',
		} ).cssValueToBe( `${ themeColor[ 'theme-color' ] }` );
	} );
} );
