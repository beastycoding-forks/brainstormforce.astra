import { insertBlock, createNewPost } from '@wordpress/e2e-test-utils';
describe( 'custom html block in the gutenberg editor', () => {
	it( 'assert default width of the custom html in the block editor', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'html',
		} );
		await insertBlock( 'Custom HTML' );
		await page.keyboard.type( '<p>Pythagorean theorem: ' );
		await page.keyboard.press( 'Enter' );
		await page.keyboard.type(
			'<var>a</var><sup>2</sup> + <var>b</var><sup>2</sup> = <var>c</var><sup>2</sup> </p>',
		);
		await page.waitForSelector( '.block-library-html__edit .block-editor-plain-text' );
		await expect( {
			selector: '.block-library-html__edit .block-editor-plain-text',
			property: 'width',
		} ).cssValueToBe( `974.906px` );
	} );
	it( 'assert margin of the custom html in the block editor', async () => {
		await page.waitForSelector( '.block-library-html__edit .block-editor-plain-text' );
		await expect( {
			selector: '.block-library-html__edit .block-editor-plain-text',
			property: 'margin-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.block-library-html__edit .block-editor-plain-text' );
		await expect( {
			selector: '.block-library-html__edit .block-editor-plain-text',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.block-library-html__edit .block-editor-plain-text' );
		await expect( {
			selector: '.block-library-html__edit .block-editor-plain-text',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.block-library-html__edit .block-editor-plain-text' );
		await expect( {
			selector: '.block-library-html__edit .block-editor-plain-text',
			property: 'margin-bottom',
		} ).cssValueToBe( `0px` );
	} );
	it( 'assert padding of the custom html in the block editor', async () => {
		await page.waitForSelector( '.block-library-html__edit .block-editor-plain-text' );
		await expect( {
			selector: '.block-library-html__edit .block-editor-plain-text',
			property: 'padding-left',
		} ).cssValueToBe( `13px` );
		await page.waitForSelector( '.block-library-html__edit .block-editor-plain-text' );
		await expect( {
			selector: '.block-library-html__edit .block-editor-plain-text',
			property: 'padding-right',
		} ).cssValueToBe( `13px` );
		await page.waitForSelector( '.block-library-html__edit .block-editor-plain-text' );
		await expect( {
			selector: '.block-library-html__edit .block-editor-plain-text',
			property: 'padding-top',
		} ).cssValueToBe( `10.4px` );
		await page.waitForSelector( '.block-library-html__edit .block-editor-plain-text' );
		await expect( {
			selector: '.block-library-html__edit .block-editor-plain-text',
			property: 'padding-bottom',
		} ).cssValueToBe( `10.4px` );
	} );
} );
