import {
	createURL,
	createNewPost,
	setPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { responsiveFontSize } from '../../../../utils/responsive-utils';
describe( 'Global Typography settings in the customizer', () => {
	it( 'h1 typography font size should be applied correctly', async () => {
		const headingFontSize = {
			'font-size-h1': {
				desktop: '50',
				tablet: '50',
				mobile: '50',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},

		};
		await setCustomize( headingFontSize );
		await createNewPost( {
			postType: 'post',
			title: 'heading-test',
		} );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();

		await page.goto( createURL( 'heading-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.entry-content h1' );
		await expect( {
			selector: '.entry-content h1',
			property: 'font-size',
		} ).cssValueToBe(
			`${ headingFontSize[ 'font-size-h1' ].desktop }${ headingFontSize[ 'font-size-h1' ][ 'desktop-unit' ] }`,
		);
		await setBrowserViewport( 'medium' );

		await expect( {
			selector: '.entry-content h1',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h1' ].tablet,
			) }${
				headingFontSize[ 'font-size-h1' ][ 'tablet-unit' ]
			}`,
		);
		await setBrowserViewport( 'small' );

		await expect( {
			selector: '.entry-content h1',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h1' ].mobile,
			) }${
				headingFontSize[ 'font-size-h1' ][ 'mobile-unit' ]
			}`,
		);
	} );
	it( 'h2 typography font size should be applied correctly', async () => {
		const headingFontSize = {
			'font-size-h2': {
				desktop: '40',
				tablet: '35',
				mobile: '25',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},

		};
		await setCustomize( headingFontSize );
		await createNewPost( {
			postType: 'post',
			title: 'heading-test',
		} );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();

		await page.goto( createURL( 'heading-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h2, .entry-content h2' );
		await expect( {
			selector: 'h2, .entry-content h2',
			property: 'font-size',
		} ).cssValueToBe(
			`${ headingFontSize[ 'font-size-h2' ].desktop }${ headingFontSize[ 'font-size-h2' ][ 'desktop-unit' ] }`,
		);
		await setBrowserViewport( 'medium' );

		await expect( {
			selector: 'h2, .entry-content h2',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h2' ].tablet,
			) }${
				headingFontSize[ 'font-size-h2' ][ 'tablet-unit' ]
			}`,
		);
		await setBrowserViewport( 'small' );

		await expect( {
			selector: 'h2, .entry-content h2',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h2' ].mobile,
			) }${
				headingFontSize[ 'font-size-h2' ][ 'mobile-unit' ]
			}`,
		);
	} );
	it( 'h3 typography font size should be applied correctly', async () => {
		const headingFontSize = {
			'font-size-h3': {
				desktop: '40',
				tablet: '30',
				mobile: '20',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},

		};
		await setCustomize( headingFontSize );
		await createNewPost( {
			postType: 'post',
			title: 'heading-test',
		} );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();

		await page.goto( createURL( 'heading-test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h2, .entry-content h2' );
		await expect( {
			selector: 'h3, .entry-content h3',
			property: 'font-size',
		} ).cssValueToBe(
			`${ headingFontSize[ 'font-size-h3' ].desktop }${ headingFontSize[ 'font-size-h3' ][ 'desktop-unit' ] }`,
		);
		await setBrowserViewport( 'medium' );

		await expect( {
			selector: 'h3, .entry-content h3',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h3' ].tablet,
			) }${
				headingFontSize[ 'font-size-h3' ][ 'tablet-unit' ]
			}`,
		);
		await setBrowserViewport( 'small' );

		await expect( {
			selector: 'h3, .entry-content h3',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h3' ].mobile,
			) }${
				headingFontSize[ 'font-size-h3' ][ 'mobile-unit' ]
			}`,
		);
	} );
} );

