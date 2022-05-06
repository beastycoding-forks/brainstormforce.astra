/**
 * WordPress dependencies
 */
export class createNewPost {
	constructor( page ) {
		this.page = page;
	}
	async createNewPosts() {
		await this.visitAdminPage( 'post-new.php', query );

		await this.page.waitForSelector( '.edit-post-layout' );

		const isWelcomeGuideActive = await this.page.evaluate( () =>
			window.wp.data
				.select( 'core/edit-post' )
				.isFeatureActive( 'welcomeGuide' ),
		);
		const isFullscreenMode = await this.page.evaluate( () =>
			window.wp.data
				.select( 'core/edit-post' )
				.isFeatureActive( 'fullscreenMode' ),
		);

		if ( showWelcomeGuide !== isWelcomeGuideActive ) {
			await this.page.evaluate( () =>
				window.wp.data
					.dispatch( 'core/edit-post' )
					.toggleFeature( 'welcomeGuide' ),
			);

			await this.page.reload();
			await this.page.waitForSelector( '.edit-post-layout' );
		}

		if ( isFullscreenMode ) {
			await this.page.evaluate( () =>
				window.wp.data
					.dispatch( 'core/edit-post' )
					.toggleFeature( 'fullscreenMode' ),
			);

			await this.page.waitForSelector( 'body:not(.is-fullscreen-mode)' );
		}
	}
}
