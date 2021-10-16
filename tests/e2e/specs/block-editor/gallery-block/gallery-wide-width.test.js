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

describe( 'Gallery in gutenberg editor for upload images', () => {
	beforeEach( async () => {
		await createNewPost();
	} );
	it( 'test gallery in the block editor for full width', async () => {
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
		} ).cssValueToBe( `958.1px` );
	} );
} );
