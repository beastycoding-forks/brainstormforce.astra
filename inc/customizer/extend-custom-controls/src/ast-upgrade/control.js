import UpgradeComponent from './ast-upgrade.js';

export const astUpgradeControl = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render( <UpgradeComponent control={ control } />, control.container[0] );
	}
} );
