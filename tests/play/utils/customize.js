// exports.setCustomize = class setCustomize {
// 	constructor( page ) {
// 		this.page = page;
// 	}
// 	async setCustomize() {
// 		return await window
// 		.fetch(
// 		await this.page.goto( '/wp-json/astra/v1/e2e-utils/set-astra-settings' ),
// 		{
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify( { settings: data } ),
// 		},

// exports.getCustomizerSettings = class getCustomizerSettings {
// 	constructor( page ) {
// 		this.page = page;
// 	}
// 	async getCustomizerSettings() {
// 	return await window
// 		.fetch(
// 			await page.goto( `/wp-json/astra/v1/e2e-utils/get-astra-settings` ) +
// 				`?key=${ key }`,
// 			{
// 				method: 'GET',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 			},
// 		)
// 		.then( ( response ) => response.json() );
// 	}
// },
// };
// exports.uploadImage = class uploadImage {
// 	constructor( page ) {
// 		this.page = page;
// 	}
// 	async uploadImage() {
// 	const rawResponse = await window.fetch(
// 		await page.goto( '/wp-json/astra/v1/e2e-utils/upload-astra-image' ),
// 		{
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify( { settings: data } ),
// 		},
// 	);
// 	const fileID = await rawResponse.json();
// 	return fileID;
// }
// exports.setLogo = class setLogo {
// 	constructor( page ) {
// 		this.page = page;
// 	}
// 	async setLogo() {
// 	return await window.fetch(
// 		await page.goto( '/wp-json/astra/v1/e2e-utils/set-astra-logo' ),
// 		{
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify( { fileId: data } ),
// 		},
// 	);
// 	},
// };
//}
// };
