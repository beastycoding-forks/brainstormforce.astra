import { __ } from '@wordpress/i18n';

export default function PalettePicker( props ) {
	const { label, title, onOpenPopover, onPaletteChange, control } = props;

	console.error( props );
	return;

	control.palettes && Object.keys(control.palettes).map((paletteKey, index) => {
		return (
			<>
				<div
					className={
						"ast-color-palette-wrap " +
						(paletteKey === props.currentPalette
							? "active"
							: "")
					}
					key={index}
				>
					<label onClick={() => onPaletteChange(paletteKey)}>
						{control.palettes[paletteKey].map((color, index) => {
							return (
								<>
									<div
										className="ast-single-color-container"
										style={{ backgroundColor: color }}
										key={index}
									></div>
								</>
							);
						})}
						<span className="ast-palette-label-wrap">
							{__("Palette", "astra") + " " + (index + 1)}
						</span>
					</label>
				</div>
			</>
		);
	});
}
