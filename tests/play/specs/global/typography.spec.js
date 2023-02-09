const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../utils/customize' );

test.describe( 'Global typography verification', () => {
	const typoSettings = {
		'body-font-family': "'Open Sans', sans-serif",
		'body-font-variant': '800',
		'body-font-weight': '800',
		'body-text-transform': '',
		'font-size-body': {
			desktop: 21,
			tablet: 20,
			mobile: 18,
			'desktop-unit': 'px',
			'tablet-unit': 'px',
			'mobile-unit': 'px',
		},
		'body-line-height': 0.99,
		'para-margin-bottom': 1.68,
	};

	test.beforeAll( async ( { baseURL } ) => {
		await setCustomizeSettings( typoSettings, baseURL );
	} );

	test( 'Global typography on the front end.', async ({ page }) => {
		await test.step('Body font family', async () => {
			await page.goto('/');
			const headingFontFam = await page.locator('body');
			await expect(headingFontFam).toHaveCSS('font-family', "\"Open Sans\", sans-serif");
		});

		await test.step('Body font weight', async () => {
			await page.goto('/');
			const headingFontWt = await page.locator('body');
			await expect(headingFontWt).toHaveCSS('font-weight', typoSettings[ 'body-font-weight' ]);
		});

		await test.step('Paragraph margin bottom', async () => {
			await page.goto('/sample-page/');
			const para = await page.locator('.entry-content > p:first-child');
			await expect(para).toHaveCSS('margin-bottom', `${ typoSettings[ 'font-size-body' ].desktop * typoSettings[ 'para-margin-bottom' ] }` + 'px');
		});
	});
});
