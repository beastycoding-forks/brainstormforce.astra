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
describe( 'Image', () => {
	beforeEach( async () => {
		await createNewPost();
	} );
	it( 'image should be inserted and width value, margin and padding should match', async () => {
		await insertBlock( 'Image' );
		const filename = await upload( '.wp-block-image input[type="file"]' );
		await waitForImage( filename );
		const regex = new RegExp(
			`<!-- wp:image {"id":\\d+,"sizeSlug":"full","linkDestination":"none"} -->\\s*<figure class="wp-block-image size-full"><img src="[^"]+\\/${ filename }\\.png" alt="" class="wp-image-\\d+"/></figure>\\s*<!-- \\/wp:image -->`,
		);
		expect( await getEditedPostContent() ).toMatch( regex );
		await page.waitForSelector(
			'.edit-post-visual-editor .block-editor-block-list__block',
		);
		await expect( {
			selector: '.wp-block-image',
			property: 'width',
		} ).cssValueToBe( `974.906px` );
		await expect( {
			selector: '.wp-block-image',
			property: 'margin-top',
		} ).cssValueToBe( `30px` );
		await expect( {
			selector: '.wp-block-image',
			property: 'margin-bottom',
		} ).cssValueToBe( `30px` );
		await expect( {
			selector: '.wp-block-image',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.wp-block-image',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.wp-block-image',
			property: 'padding-right',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.wp-block-image',
			property: 'padding-left',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.wp-block-image',
			property: 'padding-top',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.wp-block-image',
			property: 'padding-bottom',
		} ).cssValueToBe( `0px` );
	} );
} );
