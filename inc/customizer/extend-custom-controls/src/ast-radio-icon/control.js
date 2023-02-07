import RadioIconComponent from './ast-radio-icon-component.js';

export const radioIconControl = wp.customize.astraControl.extend({
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render(<RadioIconComponent control={control} />, control.container[0]);
	}
});