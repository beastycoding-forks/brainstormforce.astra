export const setCustomize = async ( { page, data } ) => {
	return await window.fetch(
		await page.goto( '/wp-json/astra/v1/e2e-utils/set-astra-settings' ),
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( { settings: data } ),
		},
	);
};

export const getCustomizerSettings = async ( { page, key } ) => {
	return await window
		.fetch(
			await page.goto( `/wp-json/astra/v1/e2e-utils/get-astra-settings` ) +
				`?key=${ key }`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		.then( ( response ) => response.json() );
};

export const uploadImage = async ( { page, data } ) => {
	const rawResponse = await window.fetch(
		await page.goto( '/wp-json/astra/v1/e2e-utils/upload-astra-image' ),
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( { settings: data } ),
		},
	);
	const fileID = await rawResponse.json();
	return fileID;
};

export const setLogo = async ( { page, data } ) => {
	return await window.fetch(
		await page.goto( '/wp-json/astra/v1/e2e-utils/set-astra-logo' ),
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify( { fileId: data } ),
		},
	);
};
