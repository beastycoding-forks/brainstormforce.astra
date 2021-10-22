import {
	createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Primary menu background color settings in the customizer', () => {
	it( 'primary menu background color should apply corectly', async () => {
		const menuBackgroundColor = {
			'header-menu1-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(183, 1, 129)',
				},
				tablet: 'rgb(183, 1, 129)',
				mobile: 'rgb(183, 1, 129)',
			},
		};
		await setCustomize( menuBackgroundColor );
		await createNewPost( {
			postType: 'page',
			title: 'Home',
			content: 'This is a home page',
		} );
		await publishPost();
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#ast-desktop-header #ast-hf-menu-1' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe(
			`${ menuBackgroundColor[ 'header-menu1-bg-obj-responsive' ].desktop }`,
		);
	} );
} );
