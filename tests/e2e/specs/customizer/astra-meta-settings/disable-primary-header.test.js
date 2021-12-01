import { createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';

describe( 'site layout meta setting', () => {
	it( 'site layout meta setting', async () => {
		const astraMetaSetting = {
			'header-desktop-items': {
				above: {
					above_left: {
						0: 'menu-2',

					},
				},
				primary: {
					primary_center: {
						0: 'search',
					},
				},
				below: {
					below_right: {
						1: 'button-1',
					},
				},
			},

		};
		await setCustomize( astraMetaSetting );
		await createNewPost( {
			postType: 'page',
			title: 'QA',
			content: 'Test page to disable header',
		} );
		//Astra button setting click action
		await page.waitForSelector( '.interface-pinned-items .components-button:not(:first-child)' );
		await page.click( '.interface-pinned-items .components-button:not(:first-child)' );
		//sidebar setting
		await page.waitForSelector( '#astra_settings_meta_box > div:nth-child(2)' );
		await page.click( '#astra_settings_meta_box > div:nth-child(2) > div > div > div > div.components-input-control__container.css-ygaqem-Container.e1cr7zh11' );

		//content layout
		await page.waitForSelector( '#astra_settings_meta_box > div:nth-child(3)' );
		await page.click( '#astra_settings_meta_box > div:nth-child(3) > div > div > div > div.components-input-control__container.css-ygaqem-Container.e1cr7zh11' );

		//primary header
		await page.click( '#astra_settings_meta_box > div:nth-child(5) > div.components-base-control.components-toggle-control.ast-main-header-display.css-wdf2ti-Wrapper.e1puf3u0' );

		// await page.select( '#astra_settings_meta_box > div:nth-child(2) > div', authorNameValue);
		// await page.waitForSelector( '#astra_settings_meta_box > div:nth-child(2)' );
		// await page.click( '#astra_settings_meta_box > div:nth-child(2) > div > div > div > div.components-input-control__container.css-ygaqem-Container.e1cr7zh11' );
		// await page.click('#astra_settings_meta_box > div:nth-child(5) > div.components-base-control.components-toggle-control.ast-main-header-display.css-wdf2ti-Wrapper.e1puf3u0');

		await publishPost();
		await page.goto( createURL( '/QA' ), {
			waitUntil: 'networkidle0',
		} );

		//assertion for above header
		await page.waitForSelector( '.ast-above-header-bar' );
		await expect( {
			selector: '.ast-above-header-bar',
			property: 'display',
		} ).cssValueToBe( `block`,
		);

		//assertion for primary header
		await page.waitForSelector( '#ast-desktop-header .ast-desktop-header-content' );
		await expect( {
			selector: '#ast-desktop-header .ast-desktop-header-content',
			property: 'display',
		} ).cssValueToBe( `none`,
		);

		//assertion for below header
		await page.waitForSelector( '.ast-below-header-bar' );
		await expect( {
			selector: '.ast-below-header-bar',
			property: 'display',
		} ).cssValueToBe( `block`,
		);
	} );
} );
