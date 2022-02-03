import SortableGroupComponent from './sortable-group.js';
import { toggleControl } from '../toggle-control/control';

export const sortableGroupControl = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
	ReactDOM.render( <SortableGroupComponent control={ control } />, control.container[0] );
	},
	ready: function() {

		'use strict';

		let control = this;

		// Set the sortable container.
		control.sortableContainer = control.container.find( '.sortable' ).first();

		// Init sortable.
		control.sortableContainer.sortable({

			// Update value when we stop sorting.
			stop: function() {
				control.updateValue();
			}
		}).disableSelection().find( 'div' ).each( function() {

			// Enable/disable options when we click on the eye of Thundera.
			jQuery( this ).find( 'i.visibility' ).unbind('click');
			jQuery( this ).find( 'i.visibility' ).click( function() {
				jQuery( this ).toggleClass( 'dashicons-visibility-faint' ).closest(".ast-sortable-item").toggleClass( 'invisible' );
			});

			// Opens / closes accordion
			jQuery( this ).find( 'i.ast-accordion' ).unbind('click');
			jQuery( this ).find( 'i.ast-accordion' ).click( function() {
				jQuery( this ).toggleClass( 'dashicons-arrow-up-alt2' ).closest(".ast-sortable-item").toggleClass( 'show' );
			});
		}).click( function() {

			// Update value on click.
			control.updateValue();
		});
	},

	/**
	 * Updates the sorting list
	 */
	updateValue: function() {

		'use strict';

		let control = this,
		newValue = [];

		this.sortableContainer.find( 'div' ).each( function() {
			if ( ! jQuery( this ).is( '.invisible' ) ) {
				newValue.push( jQuery( this ).data( 'value' ) );
			}
		});

		control.setting.set( newValue );
	},

	renderReactControl: function( fields, control ) {

		const reactControls = {
			'ast-toggle-control' : toggleControl,
		};

		// if( astra.customizer.is_pro ) {
		// 	reactControls['ast-box-shadow'] = BoxShadowComponent;
		// }

		if( 'undefined' != typeof fields.tabs ) {

			_.each( fields.tabs, function ( fields_data, key ) {

				_.each(fields_data, function (attr, index) {
					if ( 'ast-font' !== attr.control ) {
						var control_clean_name = attr.name.replace('[', '-');
						control_clean_name = control_clean_name.replace(']', '');
						var selector = '#customize-control-' + control_clean_name;
						var controlObject = wp.customize.control( 'astra-settings['+attr.name+']' );
						controlObject = control.getFinalControlObject( attr, controlObject );
						const ComponentName = reactControls[ attr.control ];
						ReactDOM.render(
							<ComponentName control={controlObject} customizer={ wp.customize }/>,
							jQuery( selector )[0]
						);
					}
				});

			});
		} else {

			_.each(fields, function (attr, index) {

				if ( 'ast-font' !== attr.control ) {

					var control_clean_name = attr.name.replace('[', '-');
					control_clean_name = control_clean_name.replace(']', '');
					var selector = '#customize-control-' + control_clean_name;
					var controlObject = wp.customize.control( 'astra-settings['+attr.name+']' );
					controlObject = control.getFinalControlObject( attr, controlObject );
					const ComponentName = reactControls[ attr.control ];

					ReactDOM.render(
						<ComponentName control={controlObject} customizer={ wp.customize }/>,
						jQuery( selector )[0]
					);
				}
			});
		}
	}
} );