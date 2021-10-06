import { setPostContent, createNewPost } from '@wordpress/e2e-test-utils';

import { GUTENBERG_TEST_BUTTON_BLOCK } from '../../utils/button-block';
describe( 'Heading in gutenberg editor', () => {
	it( 'button should working', async () => {
		await createNewPost( {
			postType: 'post',
			title: 'Test Gutenberg btn',
		} );

		await setPostContent( GUTENBERG_TEST_BUTTON_BLOCK );

		await page.waitForSelector( '.edit-post-visual-editor .block-editor-block-list__block' );
		await expect( {
			selector: 'wp-block-buttons',
			property: '',
		} ).cssValueToBe( `` );
	} );
} );
