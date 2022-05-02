import { createURL, createNewPost, setPostContent } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Global typography settings in the customizer', () => {
	it( 'preset 4 settings should be applied correctly', async () => {
		const presetFont = {
			'body-font-family': "'Source Sans Pro', sans-serif",
			'font-size-body': {
				desktop: '35',
				tablet: '25',
				mobile: '15',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'body-font-weight': '400',
			'body-text-transform': 'uppercase',
			'body-line-height': '1.8',
			'headings-font-family': 'Montserrat, sans-serif',
			'headings-font-weight': '700',
			'headings-text-transform': 'lowercase',
			'headings-line-height': '2',
			'font-size-h1': {
				desktop: '40',
				'desktop-unit': 'px',
			},
		};

		await setCustomize( presetFont );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'Preset-4-test' } );
			await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/preset-4-test/' ), {
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
		} ).cssValueToBe( `${ presetFont[ 'body-line-height' ] * presetFont[ 'font-size-body' ].mobile }` + 'px' );

		await expect( {
			selector: '.entry-content h1',
			property: 'font-family',
		} ).cssValueToBe( `${ presetFont[ 'headings-font-family' ] }` );

		await expect( {
			selector: '.entry-content h1',
			property: 'font-weight',
		} ).cssValueToBe( `${ presetFont[ 'headings-font-weight' ] }` );

		await expect( {
			selector: '.entry-content h1',
			property: 'text-transform',
		} ).cssValueToBe( `${ presetFont[ 'headings-text-transform' ] }` );

		await expect( {
			selector: '.entry-content h1',
			property: 'line-height',
		} ).cssValueToBe( `${ presetFont[ 'headings-line-height' ] * presetFont[ 'font-size-h1' ].desktop }` + 'px' );
	} );
} );

