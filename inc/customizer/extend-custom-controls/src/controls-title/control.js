
export const controlTitleControl = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render(
			<span ></span>,
			control.container[0]
		);
	},
} );
