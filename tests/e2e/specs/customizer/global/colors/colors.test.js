import { setCustomize } from '../../../../utils/customize';
import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Testing Global Color setting under the customizer', () => {
	it( 'text color should apply correctly', async () => {
		const textColor = {
			'text-color': 'rgb(205, 41, 41)',
		};
		await setCustomize( textColor );
		await createNewPost( {
			postType: 'post',
			title: 'color-test',
			content: 'this is the text color test',
		} );
		await publishPost();
		await page.goto( createURL( 'color-test' ), {
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
			'heading-base-color': 'rgb(81, 29, 236)',
		};
		await setCustomize( headingColor );
		await page.goto( createURL( 'color-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.entry-title' );
		await expect( {
			selector: '.entry-title',
			property: 'color',
		} ).cssValueToBe( `${ headingColor[ 'heading-base-color' ] }` );
	} );
	it( 'link color should apply correctly', async () => {
		const linkColors = {
			'link-color': 'rgb(64, 24, 211)',
		};
		await setCustomize( linkColors );
		await page.goto( createURL( 'color-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.entry-meta *' );
		await expect( {
			selector: '.entry-meta *',
			property: 'color',
		} ).cssValueToBe( `${ linkColors[ 'link-color' ] }` );
	} );
	it( 'theme color should apply correctly', async () => {
		const themeColor = {
			'theme-color': 'rgb(163, 183, 1)',
		};
		await setCustomize( themeColor );
		await page.goto( createURL( 'color-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-search__button' );
		await expect( {
			selector: '.wp-block-search__button',
			property: 'background-color',
		} ).cssValueToBe( `${ themeColor[ 'theme-color' ] }` );
	} );
	it( 'site background color should apply correctly', async () => {
		const sitebgColors = {
			'site-layout-outside-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(255, 255, 255)',
				},
				tablet: {
					'background-color': 'rgb(255, 255, 255)',
				},
				mobile: {
					'background-color': 'rgb(255, 255, 255)',
				},
			},
		};
		await setCustomize( sitebgColors );
		await page.goto( createURL( 'color-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container' );
		await expect( {
			selector: '.ast-separate-container',
			property: 'background-color',
		} ).cssValueToBe(
			`${ sitebgColors[ 'site-layout-outside-bg-obj-responsive' ].desktop[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-separate-container',
			property: 'background-color',
		} ).cssValueToBe(
			`${ sitebgColors[ 'site-layout-outside-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-separate-container',
			property: 'background-color',
		} ).cssValueToBe(
			`${ sitebgColors[ 'site-layout-outside-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
	} );
	it( 'content background color should apply correctly', async () => {
		const contentColors = {
			'content-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(255, 255, 255)',
				},
				tablet: {
					'background-color': 'rgb(255, 255, 255)',
				},
				mobile: {
					'background-color': 'rgb(255, 255, 255)',
				},
			},
		};
		await setCustomize( contentColors );
		await page.goto( createURL( 'color-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-article-single:not(.ast-related-post)' );
		await expect( {
			selector: '.ast-article-single:not(.ast-related-post)',
			property: 'background-color',
		} ).cssValueToBe(
			`${ contentColors[ 'content-bg-obj-responsive' ].desktop[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-article-single:not(.ast-related-post)',
			property: 'background-color',
		} ).cssValueToBe(
			`${ contentColors[ 'content-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-article-single:not(.ast-related-post)',
			property: 'background-color',
		} ).cssValueToBe(
			`${ contentColors[ 'content-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
	} );
} );
