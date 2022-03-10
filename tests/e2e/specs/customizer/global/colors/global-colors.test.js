import { setCustomize } from '../../../../utils/customize';
import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
describe( 'Testing global Color setting under the customizer', () => {
	it( 'text color should apply correctly', async () => {
		const textAndHeadingColor = {
			'text-color': 'rgb(205, 41, 41)',
			'heading-base-color': 'rgb(81, 29, 236)',
		};
		await setCustomize( textAndHeadingColor );
		await createNewPost( {
			postType: 'post',
			title: 'Global Colors Test',
			content: 'this is the text color test',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body, h1, .entry-title a, .entry-content h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6' );
		await expect( {
			selector: 'body, h1, .entry-title a, .entry-content h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6',
			property: 'color',
		} ).cssValueToBe( `${ textAndHeadingColor[ 'text-color' ] }` );

		await page.waitForSelector( '.entry-title' );
		await expect( {
			selector: '.entry-title',
			property: 'color',
		} ).cssValueToBe( `${ textAndHeadingColor[ 'heading-base-color' ] }` );
	} );
	it( 'link color should apply correctly', async () => {
		const linkColor = {
			'link-color': 'rgb(16, 109, 4)',
		};
		await setCustomize( linkColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.entry-meta *' );
		await expect( {
			selector: '.entry-meta *',
			property: 'color',
		} ).cssValueToBe( `${ linkColor[ 'link-color' ] }` );
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
	} );

	// GitHub action E2E fail case
	// eslint-disable-next-line jest/no-commented-out-tests
	// it( 'link hover color should apply correctly', async () => {
	// 	const linkhoverColor = {
	// 		'link-h-color': 'rgb(205, 41, 41)',
	// 	};
	// 	await setCustomize( linkhoverColor );
	// 	await page.goto( createURL( 'global-colors-test' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );
	// 	await page.hover( '.wp-block-group__inner-container :last-child' );
	// 	await page.waitForSelector( '.entry-title' );
	// 	await expect( {
	// 		selector: '.wp-block-group__inner-container :last-child',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ linkhoverColor[ 'link-h-color' ] }` );
	// } );
} );