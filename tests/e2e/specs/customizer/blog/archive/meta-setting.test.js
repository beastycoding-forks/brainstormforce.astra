import {
	createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'meta setting disable on the archive', () => {
	it( 'meta setting should apply corectly', async () => {
		const postTitle = {
			'blog-meta': {
			},
		};
		await setCustomize( postTitle );
		await createNewPost( { postType: 'post', title: 'archive' } );
		await publishPost();
		await page.goto( createURL( 'wp-admin/customize.php' ), {
			waitUntil: 'networkidle0',
		} );

		await page.goto( createURL( 'wp-admin/customize.php' ),
			{
				waitUntil: 'networkidle0',
			} );
		await page.click( '#accordion-section-section-blog-group' );
		await page.click( '#accordion-section-section-blog' );
		await page.click( '#customize-control-astra-settings-blog-meta' );
	} );
} );
