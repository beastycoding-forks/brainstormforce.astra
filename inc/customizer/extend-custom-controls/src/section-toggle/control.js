import SectionToggleComponent from './section-toggle-component.js';

export const sectionToggleControl = wp.customize.Control.extend( {
	renderContent: function renderContent() {
		const control = this;
		ReactDOM.render( <SectionToggleComponent control={ control } />, control.container[0] );
	}
} );
