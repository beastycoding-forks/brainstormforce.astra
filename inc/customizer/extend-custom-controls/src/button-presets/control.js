import ButtonPresetsComponent from './button-presets-component';

export const buttonPresetControl = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render( <ButtonPresetsComponent control={ control } customizer={ wp.customize }/>, control.container[0] );
	},
} );
