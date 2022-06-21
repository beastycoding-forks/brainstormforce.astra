import ReponsiveLogoComponent from "./responsive-logo-component";
import {astraGetResponsiveSliderJs} from '../common/responsive-helper';

export const responsiveLogoControl = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render( <ReponsiveLogoComponent control={ control } />, control.container[0] );
	},
	ready: function() {
		astraGetResponsiveSliderJs( this );
	}

} );
