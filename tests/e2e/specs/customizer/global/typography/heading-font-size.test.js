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
	it( 'h4 typography heading font size should be applied correctly', async () => {
		const headingFontSize = {
			'font-size-h4': {
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
		await page.waitForSelector( '.entry-content h4' );
		await expect( {
			selector: '.entry-content h4',
			property: 'font-size',
		} ).cssValueToBe(
			`${ headingFontSize[ 'font-size-h4' ].desktop }${ headingFontSize[ 'font-size-h4' ][ 'desktop-unit' ] }`,
		);
		await setBrowserViewport( 'medium' );

		await expect( {
			selector: '.entry-content h4',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h4' ].tablet,
			) }${
				headingFontSize[ 'font-size-h4' ][ 'tablet-unit' ]
			}`,
		);
		await setBrowserViewport( 'small' );

		await expect( {
			selector: '.entry-content h4',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h4' ].mobile,
			) }${
				headingFontSize[ 'font-size-h4' ][ 'mobile-unit' ]
			}`,
		);
	} );
	it( 'h5 typography heading font size should be applied correctly', async () => {
		const headingFontSize = {
			'font-size-h5': {
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
		await page.waitForSelector( 'h5, .entry-content h5' );
		await expect( {
			selector: 'h5, .entry-content h5',
			property: 'font-size',
		} ).cssValueToBe(
			`${ headingFontSize[ 'font-size-h5' ].desktop }${ headingFontSize[ 'font-size-h5' ][ 'desktop-unit' ] }`,
		);
		await setBrowserViewport( 'medium' );

		await expect( {
			selector: 'h5, .entry-content h5',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h5' ].tablet,
			) }${
				headingFontSize[ 'font-size-h5' ][ 'tablet-unit' ]
			}`,
		);
		await setBrowserViewport( 'small' );

		await expect( {
			selector: 'h5, .entry-content h5',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h5' ].mobile,
			) }${
				headingFontSize[ 'font-size-h5' ][ 'mobile-unit' ]
			}`,
		);
	} );
	it( 'h6 typography heading font size should be applied correctly', async () => {
		const headingFontSize = {
			'font-size-h6': {
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
		await page.waitForSelector( 'h6, .entry-content h6' );
		await expect( {
			selector: 'h6, .entry-content h6',
			property: 'font-size',
		} ).cssValueToBe(
			`${ headingFontSize[ 'font-size-h6' ].desktop }${ headingFontSize[ 'font-size-h6' ][ 'desktop-unit' ] }`,
		);
		await setBrowserViewport( 'medium' );

		await expect( {
			selector: 'h6, .entry-content h6',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h6' ].tablet,
			) }${
				headingFontSize[ 'font-size-h6' ][ 'tablet-unit' ]
			}`,
		);
		await setBrowserViewport( 'small' );

		await expect( {
			selector: 'h6, .entry-content h6',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				headingFontSize[ 'font-size-h6' ].mobile,
			) }${
				headingFontSize[ 'font-size-h6' ][ 'mobile-unit' ]
			}`,
		);
	} );
} );
