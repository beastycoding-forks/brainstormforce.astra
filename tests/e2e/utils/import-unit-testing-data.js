import { activatePlugin, visitAdminPage } from '@wordpress/e2e-test-utils';
import path from 'path';

export const importUnitTestingData = async () => {
	await activatePlugin( 'wordpress-importer' );
	await visitAdminPage( '/import.php', 'import=wordpress' );
	await page.waitForSelector( 'input[type="file"]' );
	const input = await page.$( 'input[type="file"]' );
	console.log( 'PROCESS CWD - ' + process.cwd() );
	const filePath = path.relative( process.cwd(), path.join( __dirname, '/tests/e2e/utils/themeunittestdata.wordpress.xml' ) );
	console.log( 'PATH FILE - ' + filePath );
	await input.uploadFile( filePath );
};
