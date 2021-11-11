import {
	createURL,
	createNewPost,
	setPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
describe( 'Global typography preset 1 settings in the customizer', () => {
	it( 'body and heading font style for preset 1 should be applied correctly', async () => {
		const globaltypographyPreset1 = {
			'typography-presets': 'Preset1',
			'body-font-family': "'Open Sans,sans-serif'",
			'body-font-weight': '400',
			'body-text-transform': 'uppercase',
			'body-line-height': '25px',
			'headings-font-family': "'Playfair Display,Georgia,serif'",
			'headings-font-weight': '700',
			'headings-text-transform': 'none',
			'headings-line-height': '45px',
		};

		await setCustomize( globaltypographyPreset1 );

		await createNewPost( { postType: 'post', title: 'preset1' } );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();
		await page.goto( createURL( 'preset1' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'body' );
		await expect( {
			selector: 'body',
			property: 'font-family',
		} ).cssValueToBe(
			`${ globaltypographyPreset1[ 'body-font-family' ] }`,
		);
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'font-weight',
		} ).cssValueToBe( `${ globaltypographyPreset1[ 'body-font-weight' ] }`,
		);
		await expect( {
			selector: 'body',
			property: 'text-transform',
		} ).cssValueToBe( `${ globaltypographyPreset1[ 'body-text-transform' ] }`,
		);
		await expect( {
			selector: 'body, button, input, select, textarea, .ast-button, .ast-custom-button',
			property: 'line-height',
		} ).cssValueToBe( `${ globaltypographyPreset1[ 'body-line-height' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'font-family',
		} ).cssValueToBe( `${ globaltypographyPreset1[ 'headings-font-family' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'font-weight',
		} ).cssValueToBe( `${ globaltypographyPreset1[ 'headings-font-weight' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'text-transform',
		} ).cssValueToBe( `${ globaltypographyPreset1[ 'headings-text-transform' ] }`,
		);
		await expect( {
			selector: '.entry-content h1',
			property: 'line-height',
		} ).cssValueToBe( `${ globaltypographyPreset1[ 'headings-line-height' ] }`,
		);
	} );
} );
