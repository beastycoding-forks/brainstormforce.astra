/**
 * External dependencies
 */
import path from 'path';
import fs from 'fs';
import os from 'os';
import { v4 as uuid } from 'uuid';
/**
 * WordPress dependencies
 */
import {
	insertBlock,
	getEditedPostContent,
	createNewPost,
	clickBlockToolbarButton,
} from '@wordpress/e2e-test-utils';

async function upload( selector ) {
	await page.waitForSelector( selector );
	const inputElement = await page.$( selector );
	const testImagePath = path.join(
		__dirname,
		'..',
		'..',
		'..',
		'assets',
		'oreo.png',
	);
	const filename = uuid();
	const tmpFileName = path.join( os.tmpdir(), filename + '.png' );
	fs.copyFileSync( testImagePath, tmpFileName );
	await inputElement.uploadFile( tmpFileName );
	return filename;
}
async function waitForImage( filename ) {
	await page.waitForSelector(
		`.wp-block-image img[src$="${ filename }.png"]`,
	);
}
describe( 'Upload image, set alignment to wide width and check the width', () => {
	beforeEach( async () => {
		await createNewPost();
	} );
	it( 'image should be inserted with wide width alignment and expected and received wide width values should match', async () => {
		await insertBlock( 'Image' );
		const filename = await upload( '.wp-block-image input[type="file"]' );
		await waitForImage( filename );
		const regex = new RegExp(
			`<!-- wp:image {"id":\\d+,"sizeSlug":"full","linkDestination":"none"} -->\\s*<figure class="wp-block-image size-full"><img src="[^"]+\\/${ filename }\\.png" alt="" class="wp-image-\\d+"/></figure>\\s*<!-- \\/wp:image -->`,
		);
		expect( await getEditedPostContent() ).toMatch( regex );
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains(
				'components-dropdown-menu__menu-item',
			),
		);
		await page.click(
			'[aria-label="Align"] button:nth-child(4)',
		);
		await page.waitForSelector( '#editor .edit-post-visual-editor' );
		await expect( {
			selector: '.wp-block-image',
			property: 'width',
		} ).cssValueToBe(
			`415px`,
		);
		await clickBlockToolbarButton( 'Align' );
		await page.waitForFunction( () =>
			document.activeElement.classList.contains(
				'components-dropdown-menu__menu-item',
			),
		);
		await page.click(
			'[aria-label="Align"] button:nth-child(5)',
		);
		await page.waitForSelector( '#editor .edit-post-visual-editor' );
		await expect( {
			selector: '.wp-block-image',
			property: 'width',
		} ).cssValueToBe(
			`1122.1px`,
		);
	} );
} );
