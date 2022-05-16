async function insertBlock( blockRepresentation ) {
	await this.page.evaluate( ( _blockRepresentation ) => {
		function recursiveCreateBlock( {
			name,
			attributes = {},
			innerBlocks = [],
		} ) {
			return window.wp.blocks.createBlock(
				name,
				attributes,
				innerBlocks.map( ( innerBlock ) =>
					recursiveCreateBlock( innerBlock )
				)
			);
		}
		const block = recursiveCreateBlock( _blockRepresentation );

		window.wp.data.dispatch( 'core/block-editor' ).insertBlock( block );
	}, blockRepresentation );
}

export { insertBlock };
