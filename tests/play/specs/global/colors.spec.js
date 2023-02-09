const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../utils/customize' );

test.describe( 'Global Colors verification', () => {
	const colorSettings = {
		'link-color': 'rgb(218, 12, 22)',
		'heading-base-color': 'rgb(1, 112, 185)',
		'site-layout-outside-bg-obj-responsive': {
			desktop: {
				'background-color': 'rgb(229, 219, 219)',
			},
			tablet: {
				'background-color': 'rgb(255, 255, 255)',
			},
			mobile: {
				'background-color': 'rgb(253, 242, 242)',
			},
		},
		'content-bg-obj-responsive': {
			desktop: {
				'background-color': 'rgb(240, 255, 240)',
			},
			tablet: {
				'background-color': 'rgb(219, 242, 217)',
			},
			mobile: {
				'background-color': 'rgb(240, 255, 240)',
			},
		},
	};

	test.beforeAll( async ( { baseURL } ) => {
		await setCustomizeSettings( colorSettings, baseURL );
	} );

	test( 'Global colors on the front end.', async ({ page }) => {
		await test.step('Link color', async () => {
			await page.goto('/');
			const anchor = await page.locator('.entry-meta .cat-links a');
			await expect(anchor).toHaveCSS('color', colorSettings[ 'link-color' ]);
		});

		await test.step('Headings color', async () => {
			await page.goto('/');
			const heading = await page.locator('.entry-title a');
			await expect(heading).toHaveCSS('color', colorSettings[ 'heading-base-color' ]);
		});

		await test.step('Site Background', async () => {
			await page.goto('/');
			const site = await page.locator('.ast-separate-container');
			await expect(site).toHaveCSS('background-color', colorSettings[ 'site-layout-outside-bg-obj-responsive' ].desktop[ 'background-color' ]);
		});

		await test.step('Content Background', async () => {
			await page.goto('/');
			const container = await page.locator('.ast-separate-container .ast-article-post');
			await expect(container).toHaveCSS('background-color', colorSettings[ 'content-bg-obj-responsive' ].desktop[ 'background-color' ]);
		});
	});
});
