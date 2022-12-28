import MultiSelectorComponent from './multi-selector-component.js';
import { astraGetAlignmentJS } from '../common/responsive-helper';

export const multiSelectorControl = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render( <MultiSelectorComponent control={ control } />, control.container[0] );
	},
	ready: function() {
		astraGetAlignmentJS( this );
	},
} );
