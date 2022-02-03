import Select2Component from './select2-component.js';

export const select2Control = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render( <Select2Component control={ control } />, control.container[0] );
	}
} );
