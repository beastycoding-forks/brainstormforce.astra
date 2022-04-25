import { createURL, createNewPost, setPostContent } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Global typography settings in the customizer', () => {
	it( 'preset 6 settings should be applied correctly', async () => {
		const presetFont = {
			'body-font-family': "'Work Sans', sans-serif",
			'font-size-body': {
				desktop: '16',
				tablet: '16',
				mobile: '16',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'body-font-weight': '400',
			'body-text-transform': 'uppercase',
			'body-line-height': '25px',
			'headings-font-family': "'DM Serif Display', serif",
			'headings-font-weight': '700',
			'headings-text-transform': 'lowercase',
			'headings-line-height': '40px',
		};
		await setCustomize( presetFont );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'Preset-6-test' } );
			await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
			ppStatus = await publishPost();
		}
		await publishPost();
		await page.goto( createURL( '/preset-6-test/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body' );
		await expect( {
			selector: 'body',
			property: 'font-family',
		} ).cssValueToBe( `${ presetFont[ 'body-font-family' ] }` );

		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ presetFont[ 'font-size-body' ].desktop }${ presetFont[ 'font-size-body' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ presetFont[ 'font-size-body' ].tablet }${ presetFont[ 'font-size-body' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ presetFont[ 'font-size-body' ].mobile }${ presetFont[ 'font-size-body' ][ 'mobile-unit' ] }` );

		await expect( {
			selector: 'body',
			property: 'font-weight',
		} ).cssValueToBe( `${ presetFont[ 'body-font-weight' ] }` );

		await expect( {
			selector: 'body',
			property: 'text-transform',
		} ).cssValueToBe( `${ presetFont[ 'body-text-transform' ] }` );

		await expect( {
			selector: 'body',
			property: 'line-height',
		} ).cssValueToBe( `${ presetFont[ 'body-line-height' ] }` );

		await expect( {
			selector: '.entry-content h1',
			property: 'font-family',
		} ).cssValueToBe( `${ presetFont[ 'headings-font-family' ] }`,
		);

		await expect( {
			selector: '.entry-content h1',
			property: 'font-weight',
		} ).cssValueToBe( `${ presetFont[ 'headings-font-weight' ] }`,
		);

		await expect( {
			selector: '.entry-content h1',
			property: 'text-transform',
		} ).cssValueToBe( `${ presetFont[ 'headings-text-transform' ] }` );

		await expect( {
			selector: '.entry-content h1',
			property: 'line-height',
		} ).cssValueToBe( `${ presetFont[ 'headings-line-height' ] }` );
	} );
} );
