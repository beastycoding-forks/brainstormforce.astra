import {
	createURL,
	createNewPost,
	setPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Global typography settings in the customizer', () => {
	it( 'preset 5 settings should be applied correctly', async () => {
		const presetFont = {
			'body-font-family': 'Karla, sans-serif',
			'font-size-body': {
				desktop: '17',
				tablet: '17',
				mobile: '17',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'body-font-weight': '400',
			'body-text-transform': 'uppercase',
			'body-line-height': '4px',
			'headings-font-family': 'Rubik, sans-serif', 
			'headings-font-weight': '700',
			'headings-text-transform': 'lowercase',
			'headings-line-height': '5px',
		};

		await setCustomize( presetFont );
		await createNewPost( { postType: 'post', title: 'Preset Test' } );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();
		await page.goto( createURL( '/preset-test/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body' );

		await expect( {
			selector: 'body',
			property: 'font-family',
		} ).cssValueToBe( `${ presetFont[ 'body-font-family' ] }`,
		);

		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe(
			`${ presetFont[ 'font-size-body' ].desktop }${ presetFont[ 'font-size-body' ][ 'desktop-unit' ] }`,
		);

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ presetFont[ 'font-size-body' ].tablet }${ presetFont[ 'font-size-body' ][ 'tablet-unit' ] }`,
		);

		await setBrowserViewport( 'small' );
		await expect( {
			selector: 'body',
			property: 'font-size',
		} ).cssValueToBe( `${ presetFont[ 'font-size-body' ].mobile }${ presetFont[ 'font-size-body' ][ 'mobile-unit' ] }`,
		);

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
