import path from 'path';
import fs from 'fs';
import os from 'os';
import { v4 as uuid } from 'uuid';

/**
 * WordPress dependencies
 */
import {
	createNewPost,
	insertBlock,
} from '@wordpress/e2e-test-utils';

async function upload( selector ) {
	await page.waitForSelector( selector );
	await page.focus( selector );
	await page.keyboard.type( 'test' );

	await page.waitForSelector( 'div[aria-label^="Add Media"]' );
	await page.click( 'div[aria-label^="Add Media"]' );

	await page.click( '.media-menu-item#menu-item-gallery' );
	await page.waitForSelector( '.media-modal input[type=file]' );
	const inputElement = await page.$( '.media-modal input[type=file]' );
	const testImagePath = path.join(
		__dirname,
		'..',
		'..',
		'..',
		'assets',
		'pic.png',
	);
	const filename = uuid();
	const tmpFileName = path.join( os.tmpdir(), filename + '.png' );
	fs.copyFileSync( testImagePath, tmpFileName );
	await inputElement.uploadFile( tmpFileName );

	return filename;
}

async function waitForImage( filename ) {
	await page.waitForSelector(
		`.media-modal li[aria-label="${ filename }"]`,
	);
}

describe( 'Classic', () => {
	beforeAll( async () => {
		await createNewPost( {
			postType: 'post',
			title: 'classic block',
		} );
		await insertBlock( 'Classic' );

		const filename = await upload( '.mce-content-body' );
		await waitForImage( filename );
	} );

	it( 'should insert media & assert width', async () => {
		await page.click( '.media-modal button.media-button-gallery' );
		await page.click( '.media-modal button.media-button-insert' );
		await page.waitForSelector( '.mce-content-body img' );
		await page.waitForSelector( '.block-editor-block-list__block' );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'width',
		} ).cssValueToBe( `974.906px` );
	} );

	it( 'assert padding of the gutenberg Classic block', async () => {
		await page.waitForSelector( '.edit-post-visual-editor .block-editor-block-list__block' );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'padding-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .block-editor-block-list__block' );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'padding-right',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .block-editor-block-list__block' );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'padding-left',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .block-editor-block-list__block' );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'padding-bottom',
		} ).cssValueToBe( `0px` );
	} );

	it( 'assert margin of the gutenberg classic block', async () => {
		await page.waitForSelector( '.edit-post-visual-editor .block-editor-block-list__block' );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'margin-top',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .block-editor-block-list__block' );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .block-editor-block-list__block' );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await page.waitForSelector( '.edit-post-visual-editor .block-editor-block-list__block' );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'margin-bottom',
		} ).cssValueToBe( `0px` );
	} );
} );
