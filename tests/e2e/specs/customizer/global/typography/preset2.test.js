import {
	createURL,
	createNewPost,
	setPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
describe( 'Global typography preset-2 style in the customizer', () => {
	it( 'body and heading styling should be applied correctly', async () => {
		const globaltypographyPreset2 = {
			'typography-presets': 'Preset2',
			'body-font-family': "'Lora,serif'",
			'body-font-weight': '400',
			'body-text-transform': 'capitalize',
			'body-line-height': '25px',
			'headings-font-family': "'Lato,sans-serif'",
			'headings-font-weight': '700',
			'headings-text-transform': 'capitalize',
			'headings-line-height': '20px',
		};

		await setCustomize( globaltypographyPreset2 );

		await createNewPost( { postType: 'post', title: 'preset2' } );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();
		await page.goto( createURL( 'preset2' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body' );
		await expect( {
			selector: 'body',
			property: 'font-family',
		} ).cssValueToBe(
			`${ globaltypographyPreset2[ 'body-font-family' ] }`,
		);
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'font-weight',
		} ).cssValueToBe( `${ globaltypographyPreset2[ 'body-font-weight' ] }`,
		);
		await expect( {
			selector: 'body',
			property: 'text-transform',
		} ).cssValueToBe( `${ globaltypographyPreset2[ 'body-text-transform' ] }`,
		);
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'line-height',
		} ).cssValueToBe( `${ globaltypographyPreset2[ 'body-line-height' ] }`,
		);
		await expect( {
			selector: 'h1, .entry-content h1',
			property: 'font-family',
		} ).cssValueToBe( `${ globaltypographyPreset2[ 'headings-font-family' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'font-weight',
		} ).cssValueToBe( `${ globaltypographyPreset2[ 'headings-font-weight' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'text-transform',
		} ).cssValueToBe( `${ globaltypographyPreset2[ 'headings-text-transform' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'line-height',
		} ).cssValueToBe( `${ globaltypographyPreset2[ 'headings-line-height' ] }`,
		);
	} );
} );
