// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require( 'fs' );
const puppeteer = require( 'puppeteer' );

const url = process.argv[ 2 ];
const stylesheetId = process.argv[ 3 ];

async function getCssFromUrl( pageUrl, stylesheetSelector ) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto( pageUrl );
	const inlineCss = await page.$eval( stylesheetSelector, ( el ) => el.innerText );
	await browser.close();

	fs.writeFileSync( 'assets/dynamic-css.css', inlineCss.replace( /(^[ \t]*\n)/gm, '' ) );
}

getCssFromUrl( url, stylesheetId );
