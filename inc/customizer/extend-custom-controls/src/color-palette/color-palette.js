import PropTypes from "prop-types";
import AstraColorPickerControl from "../common/astra-color-picker-control";
import { useEffect, useState } from "react";
import { Dashicon, Popover, Tooltip, Button } from '@wordpress/components';
import { __ } from "@wordpress/i18n";

const ColorPaletteComponent = (props) => {
	const value = props.control.setting.get();
	const defaultValue = props.control.params.default;
	let labelHtml = null;
	const { label } = props.control.params;
	let UpdatePaletteEvent;

	const [state, setState] = value ? useState(value) : useState(defaultValue);

	useEffect(() => {
		// If settings are changed externally.
		if (state !== value) {
			setState(value);
		}
	}, [props]);

	if (label) {
		labelHtml = <span className="customize-control-title">{label}</span>;
	}

	const handleChangeComplete = (colorIndex, color) => {
		let updateState = {
			...state,
		};

		let value;

		if (typeof color === "string") {
			value = color;
		} else if (
			undefined !== color.rgb &&
			undefined !== color.rgb.a &&
			1 !== color.rgb.a
		) {
			value = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
		} else {
			value = color.hex;
		}

		updateState.palettes[updateState.currentPalette][colorIndex] = value;
		updateValues(updateState);
	};

	const updateValues = (stateObj) => {
		setState(stateObj);
		props.control.setting.set({
			...stateObj,
			flag: !props.control.setting.get().flag,
		});

		let globalPaletteControl = props.customizer.control(
			"astra-settings[global-color-palette]"
		);

		var globalPalette = globalPaletteControl.setting.get();

		globalPalette.palette = stateObj.palettes[stateObj.currentPalette];
		globalPaletteControl.setting.set({
			...globalPalette,
			flag: !globalPaletteControl.setting.get().flag,
		});
	};

	const onPaletteChange = (paletteKey) => {
		let updateState = {
			...state,
		};

		updateState.currentPalette = paletteKey;
		updateValues(updateState);
	};

	const handleColorReset = (index, color) => {
		let updateState = {
			...state,
		};

		const resetValue =
			defaultValue.palettes[updateState.currentPalette][index];

		updateState.palettes[updateState.currentPalette][index] = resetValue;
		updateValues(updateState);
	};

	const handlePresetAssignment = (presetKey) => {
		if ( state.presets && state.presets[presetKey] ) {
			state.presets[presetKey].map( ( item, index ) => {
				handleChangeComplete( index, { hex: item } );
			} );
		}
	};

	var paletteColors = (
		<>
			<div className="ast-single-palette-wrap">
				{state.palettes && state.palettes[state.currentPalette].map((value, index) => {
					const paletteLables = astra.customizer.globalPaletteLabels;
					return (
						<Tooltip key={index} text={paletteLables[index]} position="top center">
							<div className="ast-color-picker-wrap">
								<AstraColorPickerControl
									color={value ? value : ""}
									onChangeComplete={(color, backgroundType) =>
										handleChangeComplete(index, color)
									}
									backgroundType={"color"}
									allowGradient={false}
									allowImage={false}
									disablePalette={true}
									onColorResetClick={(
										color,
										backgroundType
									) => handleColorReset(index, color)}
								/>
							</div>
						</Tooltip>
					);
				})}
			</div>
		</>
	);

	var paletteOptions = (
		<>
			{Object.keys(state.palettes).map((paletteKey, index) => {
				return (
					<div
						className={
							"ast-color-palette-wrap " +
							(paletteKey === state.currentPalette
								? "active"
								: "")
						}
						key={index}
					>
						<label onClick={() => onPaletteChange(paletteKey)}>
							{state.palettes[paletteKey].map((color, index) => {
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
				);
			})}
		</>
	);

	const toggleVisible = () => {
		let updateState = {
			...state,
		};

		updateState.isVisible = true;
		updateValues(updateState);
	};

	const toggleClose = () => {
		let updateState = {
			...state,
		};

		if( updateState.isVisible = true ) {
			updateState.isVisible = false;
			updateValues(updateState);
		}
	};

	var presetOptions = (
		<>
			<Popover position="bottom center" onClose={toggleClose}>
				{ Object.keys( state.presets ).map( ( presetKey, index ) => {
					return (
						<Button
							key={index}
							onClick={ () => handlePresetAssignment( presetKey ) }
							className={ 'ast-preset-palette-item' }
						>
							{ state.presets[presetKey].map( ( color, subIndex ) => {
								return (
									<div className="ast-palette-individual-item-wrap">
										<span
											key={subIndex}
											className='ast-palette-individual-item'
											style={{ color: color }}
											>
										</span>
									</div>
								)
							} ) }
						</Button>
					);
				} ) }
			</Popover>
		</>
	);

	const updatePaletteVariables = (e) => {
		clearTimeout(UpdatePaletteEvent);

		// Throttle events when user tries to drag inside color picker.
		UpdatePaletteEvent = setTimeout(function () {
			document.dispatchEvent(
				new CustomEvent("AstUpdatePaletteVariables", {})
			);
		}, 200);
	};

	document.addEventListener(
		"AstPaletteUpdated",
		updatePaletteVariables,
		false
	);

	return (
		<>
			<label className="customizer-text">{labelHtml}</label>
			<Tooltip text={ __("Select Preset", "astra") } position="top center">
				<Dashicon className="ast-palette-preset-trigger" icon='open-folder' onClick={ () => { state.isVisible ? toggleClose() : toggleVisible() } } />
			</Tooltip>
			<div className="ast-palette-presets-wrapper">
				{ state.isVisible &&
					presetOptions
				}
			</div>
			<div className="ast-palette-selection-wrapper">
				{state.palettes &&
					paletteOptions
				}
			</div>
			<div className="ast-color-palette-wrapper">{paletteColors}</div>
		</>
	);
};

ColorPaletteComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default React.memo(ColorPaletteComponent);
