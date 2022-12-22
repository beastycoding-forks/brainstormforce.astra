import FontExtrasComponent from './ast-font-extras.js';

export const astFontExtrasControl = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render(
			<FontExtrasComponent control={control} />,
			control.container[0]
		);
	},
});
