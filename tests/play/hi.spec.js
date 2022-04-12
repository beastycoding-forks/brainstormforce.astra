/**
 * WordPress dependencies
 */
const { test, expect } = require( '@playwright/test' );

test.describe( 'Hello World', () => {
	// eslint-disable-next-line jest/no-done-callback
	test( 'Login to WP Admin', async ( { page } ) => {
		// Go to wp-login.php
		await page.goto( 'wp-login.php' );

		// Fill input[name="log"]
		await page.locator( 'input[id="user_login"]' ).fill( 'admin' );

		// Click and type input[name="pwd"]
		await page.locator( 'input[name="pwd"]' ).fill( 'password' );

		await page.locator( 'text=Log In' ).click();

		// Go to /wp-admin/
		await page.goto( '/wp-admin/' );

		// Click text=Welcome to WordPress!
		await expect( page.locator( 'text=Welcome to WordPress!' ) ).toBeVisible();
	} );
} );
