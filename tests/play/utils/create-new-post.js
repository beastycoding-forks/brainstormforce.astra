/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */
exports.createNewPost = class createNewPost {
	constructor( page ) {
		this.page = page;
	}
	async createNewPost() {
		// let showWelcomeGuide;
		await this.page.goto( '/wp-admin/post-new.php' );
		await this.page.locator( '.components-modal__header > .components-button > svg > path' ).click();
		await this.page.locator( '#editor .block-editor-block-list__block' ).click();
		await this.page.locator( '#editor .block-editor-block-list__block' ).type( 'sample' );
		// await this.page.waitForLoadState( 'networkidle' );
		await this.page.locator( '.components-button.editor-post-publish-panel__toggle.is-primary' ).click();
		await this.page.locator( '#editor div.editor-post-publish-panel__header-publish-button > button' ).click();
	}
};
// 		const isWelcomeGuideActive = await this.page.evaluate( () =>
// 			window.wp.data
// 				.select( 'core/edit-post' )
// 				.isFeatureActive( 'welcomeGuide' ),
// 		);
// 		const isFullscreenMode = await this.page.evaluate( () =>
// 			window.wp.data
// 				.select( 'core/edit-post' )
// 				.isFeatureActive( 'fullscreenMode' ),
// 		);

// 		if ( showWelcomeGuide !== isWelcomeGuideActive ) {
// 			await this.page.evaluate( () =>
// 				window.wp.data
// 					.dispatch( 'core/edit-post' )
// 					.toggleFeature( 'welcomeGuide' ),
// 			);

// 			await this.page.reload();
// 			await this.page.locator( '.edit-post-layout' );
// 		}

// 		if ( isFullscreenMode ) {
// 			await this.page.evaluate( () =>
// 				window.wp.data
// 					.dispatch( 'core/edit-post' )
// 					.toggleFeature( 'fullscreenMode' ),
// 			);

// 			await this.page.locator( 'body:not(.is-fullscreen-mode)' );
// 		}
// 	}
// };
