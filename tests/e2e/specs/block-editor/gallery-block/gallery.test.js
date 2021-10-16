import path from 'path';
import fs from 'fs';
import os from 'os';
import { v4 as uuid } from 'uuid';

import {
	insertBlock,
	getEditedPostContent,
	createNewPost,
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
		'10x10_e2e_test_image_z9T8jK.png',
	);
	const filename = uuid();
	const tmpFileName = path.join( os.tmpdir(), filename + '.png' );
	fs.copyFileSync( testImagePath, tmpFileName );
	await inputElement.uploadFile( tmpFileName );
	await page.waitForSelector(
		`.wp-block-gallery img[src$="${ filename }.png"]`,
	);
	return filename;
}

describe( 'Upload image and check the properties', () => {
	beforeEach( async () => {
		await createNewPost();
	} );
	it( 'assert width, padding and margin of the gallery in the block editor', async () => {
		const galleryCaption = 'Tested gallery caption';

		await insertBlock( 'Gallery' );
		await upload( '.wp-block-gallery input[type="file"]' );

		await page.click( '.wp-block-gallery>.blocks-gallery-caption' );
		await page.keyboard.type( galleryCaption );

		expect( await getEditedPostContent() ).toMatch(
			new RegExp( `<figcaption.*?>${ galleryCaption }</figcaption>` ),
		);
		await page.waitForSelector( '.edit-post-visual-editor img' );
		await expect( {
			selector: '.edit-post-visual-editor img',
			property: 'width',
		} ).cssValueToBe( `974.906px` );
		await expect( {
			selector: '.edit-post-visual-editor img',
			property: 'margin-top',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor img',
			property: 'margin-bottom',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor img',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor img',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor img',
			property: 'padding-right',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor img',
			property: 'padding-left',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor img',
			property: 'padding-top',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor img',
			property: 'padding-bottom',
		} ).cssValueToBe( `0px` );
	} );
} );

