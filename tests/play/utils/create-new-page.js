/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */
exports.createNewPage = class createNewPage {
	constructor( page ) {
		this.page = page;
	}
	async createNewPage() {
		// let showWelcomeGuide;
		await this.page.goto( '/wp-admin/post-new.php?post_type=page' );
		await this.page.locator( '.components-modal__header > .components-button > svg > path' ).click();
		await this.page.locator( '#editor .block-editor-block-list__block' ).click();
		await this.page.locator( '#editor .block-editor-block-list__block' ).type( 'sample-page' );
		// await this.page.waitForLoadState( 'networkidle' );
		await this.page.locator( '.components-button.editor-post-publish-panel__toggle.is-primary' ).click();
		await this.page.locator( '#editor div.editor-post-publish-panel__header-publish-button > button' ).click();
	}
};
