import {
	createURL,
	createNewPost,
	setPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';

describe( 'Global typography settings in the customizer', () => {
	it( 'preset settings should be applied correctly', async () => {
		const presetFont = {
			'body-font-family': "'Source Sans Pro', sans-serif",
			'body-font-weight': '400',
			'body-text-transform': 'uppercase',
			'body-line-height': 0.99,
			'para-margin-bottom': 1.68,
			'headings-font-family': 'Montserrat, sans-serif',
			'headings-font-weight': '700',
			'headings-text-transform': 'uppercase',
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
			property: 'font-weight',
		} ).cssValueToBe( `${ presetFont[ 'body-font-weight' ] }` );

		await expect( {
			selector: 'body',
			property: 'text-transform',
		} ).cssValueToBe( `${ presetFont[ 'body-text-transform' ] }` );

		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'font-family',
		} ).cssValueToBe( `${ presetFont[ 'headings-font-family' ] }`,
		);

		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'font-weight',
		} ).cssValueToBe( `${ presetFont[ 'body-font-weight' ] }`,
		);

		await expect( {
			selector: 'body',
			property: 'text-transform',
		} ).cssValueToBe( `${ presetFont[ 'body-text-transform' ] }` );
	} );
} );
