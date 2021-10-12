import {
	clickButton,
	createNewPost,
	getEditedPostContent,
	insertBlock,
} from '@wordpress/e2e-test-utils';

const createButtonLabel = 'Create Table';

describe( 'Table', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'displays a form for choosing the row and column count of the table', async () => {
		await insertBlock( 'Table' );

		// Check for existence of the column count field.
		const columnCountLabel = await page.$x(
			"//figure[@data-type='core/table']//label[text()='Column count']"
		);
		expect( columnCountLabel ).toHaveLength( 1 );

		// Modify the column count.
		await columnCountLabel[ 0 ].click();
		const currentColumnCount = await page.evaluate(
			() => document.activeElement.value
		);
		expect( currentColumnCount ).toBe( '2' );
		await page.keyboard.press( 'Backspace' );
		await page.keyboard.type( '5' );

		// Check for existence of the row count field.
		const rowCountLabel = await page.$x(
			"//figure[@data-type='core/table']//label[text()='Row count']"
		);
		expect( rowCountLabel ).toHaveLength( 1 );

		// Modify the row count.
		await rowCountLabel[ 0 ].click();
		const currentRowCount = await page.evaluate(
			() => document.activeElement.value
		);
		expect( currentRowCount ).toBe( '2' );
		await page.keyboard.press( 'Backspace' );
		await page.keyboard.type( '10' );

		// Create the table.
		await clickButton( createButtonLabel );

		// Expect the post content to have a correctly sized table.
		expect( await getEditedPostContent() ).toMatchSnapshot();

		await page.waitForSelector( '.block-editor-block-list__block' );
		await expect( {
			selector: '.block-editor-block-list__block',
			property: 'width',
		} ).cssValueToBe( `974.9px` );
		await expect( {
			selector: '.wp-block-table',
			property: 'margin-top',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.wp-block-table',
			property: 'margin-bottom',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.wp-block-table',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.wp-block-table',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'padding-right',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'padding-left',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'padding-top',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'padding-bottom',
		} ).cssValueToBe( `0px` );
	} );
} );
