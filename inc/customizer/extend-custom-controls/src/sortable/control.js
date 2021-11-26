import SortableComponent from './sortable.js';
import AstToggleControl from '../toggle-control/toggle-control-component';

export const sortableControl = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
	ReactDOM.render( <SortableComponent control={ control } />, control.container[0] );
	},
	ready: function() {

		'use strict';

		let control = this;

		control.registerToggleEvents();

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
				jQuery( this ).find( 'i.visibility' ).click( function() {
					jQuery( this ).toggleClass( 'dashicons-visibility-faint' ).parents( 'div:eq(0)' ).toggleClass( 'invisible' );
				});
		}).click( function() {

			// Update value on click.
			control.updateValue();
		});
	},
	registerToggleEvents: function() {

		var control = this;

		control.container.on( 'click', '.sortable .ast-adv-toggle-icon', function( e ) {

			e.preventDefault();
			e.stopPropagation();

			var $this = jQuery(this);

			var parent_wrap = $this.closest( '.ast-sortable-item' );
			var is_loaded = parent_wrap.find( '.ast-field-sortable-dropdown' ).data('loaded');
			var parent_section = parent_wrap.parents('.control-section');

			if( $this.hasClass('open') ) {
				parent_wrap.find( '.ast-field-sortable-dropdown' ).hide();
			} else {

				if( is_loaded ) {
					parent_wrap.find( '.ast-field-sortable-dropdown' ).show();
				} else {

					var fields = control.params.ast_sortable_fields;
					
					var $modal_wrap = jQuery( astra.customizer.sortable_dropdown_tmpl );
					
					parent_wrap.append( $modal_wrap );
					// parent_wrap.find( '.ast-sortable-fields-wrap' ).attr( 'data-control', control.params.name );
					control.ast_render_field( parent_wrap, fields, control );

				}
			}

		});

	},
	ast_render_field: function( wrap, fields, control_elem ) {

		var control = this;
		var ast_field_wrap = wrap.find( '.ast-fields-wrap' );
		var fields_html = '';
		var control_types = [];
		var field_values = control.isJsonString( control_elem.params.value ) ? JSON.parse( control_elem.params.value ) : {};
		
		var result = control.generateFieldHtml( fields, field_values );
		

		fields_html += result.html;

		_.each( result.controls, function (control_value, control_key) {
			control_types.push({
				key: control_value.key,
				value: control_value.value,
				name: control_value.name
			});
		});

		control.renderReactControl( fields, control );

	},
	isJsonString: function( str ) {

		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	},

	generateFieldHtml: function ( fields_data, field_values ) {

		var fields_html = '';
		var control_types = [];

		_.each(fields_data, function (attr, index) {

			var new_value = ( wp.customize.control( 'astra-settings['+attr.name+']' ) ? wp.customize.control( 'astra-settings['+attr.name+']' ).params.value : '' );
			var control = attr.control;
			var template_id = "customize-control-" + control + "-content";
			var template = wp.template(template_id);
			
			var value = new_value || attr.default;
			attr.value = value;
			var dataAtts = '';
			var input_attrs = '';

			attr.label = attr.title;
			
			// Data attributes.
			_.each( attr.data_attrs, function( value, name ) {
				dataAtts += " data-" + name + " ='" + value + "'";
			});

			// Input attributes
			_.each( attr.input_attrs, function ( value, name ) {
				input_attrs += name + '="' + value + '" ';
			});

			attr.dataAttrs = dataAtts;
			attr.inputAttrs = input_attrs;

			control_types.push({
				key: control,
				value: value,
				name: attr.name
			});

			if ('ast-responsive' == control) {
				var is_responsive = 'undefined' == typeof attr.responsive ? true : attr.responsive;
				attr.responsive = is_responsive;
			}

			var control_clean_name = attr.name.replace('[', '-');
			control_clean_name = control_clean_name.replace(']', '');

			fields_html += "<li id='customize-control-" + control_clean_name + "' class='customize-control customize-control-" + attr.control + "' >";

			if( jQuery( '#tmpl-' + template_id ).length ) {
				fields_html += template(attr);
			}

			fields_html += '</li>';

		});

		var result = new Object();

		result.controls = control_types;
		result.html     = fields_html;

		return result;

	},

	renderReactControl: function( fields, control ) {

		const reactControls = {
			// 'ast-background' : Background,
			// 'ast-responsive-background' : ResponsiveBackground,
			// 'ast-responsive-color' : ResponsiveColorComponent,
			// 'ast-color' : ColorComponent,
			// 'ast-border' : BorderComponent,
			// 'ast-responsive' : ResponsiveComponent,
			// 'ast-responsive-slider' : ResponsiveSliderComponent,
			// 'ast-slider' : SliderComponent,
			// 'ast-responsive-spacing' : ResponsiveSpacingComponent,
			// 'ast-select' : SelectComponent,
			// 'ast-divider' : DividerComponent,
			// 'ast-selector' : SelectorComponent,
			'ast-toggle-control' :AstToggleControl
		};

		_.each(fields, function (attr, index) {

			if ( 'ast-font' !== attr.control ) {

				var control_clean_name = attr.name.replace('[', '-');
				control_clean_name = control_clean_name.replace(']', '');
				var selector = '#customize-control-' + control_clean_name;

				var controlObject = wp.customize.control( attr.name );

				controlObject = control.getFinalControlObject( attr, controlObject );
				const ComponentName = reactControls[ attr.control ];

				ReactDOM.render(
					<ComponentName control={controlObject} customizer={ wp.customize }/>,
					jQuery( selector )[0]
				);
			}
		});

	},

	getFinalControlObject: function ( attr, controlObject ) {

		if ( undefined !== attr.choices && undefined === controlObject.params['choices'] ) {
			controlObject.params['choices'] = attr.choices;
		}
		if ( undefined !== attr.inputAttrs && undefined === controlObject.params['inputAttrs'] ) {
			controlObject.params['inputAttrs'] = attr.inputAttrs;
		}
		if ( undefined !== attr.link && undefined === controlObject.params['link'] ) {
			controlObject.params['link'] = attr.link;
		}
		if ( undefined !== attr.units && undefined === controlObject.params['units'] ) {
			controlObject.params['units'] = attr.units;
		}
		if ( undefined !== attr.linked_choices && undefined === controlObject.params['linked_choices'] ) {
			controlObject.params['linked_choices'] = attr.linked_choices;
		}
		if ( undefined !== attr.title && ( undefined === controlObject.params['label'] || '' === controlObject.params['label'] || null === controlObject.params['label'] ) ) {
			controlObject.params['label'] = attr.title;
		}
		if ( undefined !== attr.responsive && ( undefined === controlObject.params['responsive'] || '' === controlObject.params['responsive'] || null === controlObject.params['responsive'] ) ) {
			controlObject.params['responsive'] = attr.responsive;
		}
		if ( undefined !== attr.renderAs && ( undefined === controlObject.params['renderAs'] || '' === controlObject.params['renderAs'] || null === controlObject.params['renderAs'] ) ) {
			controlObject.params['renderAs'] = attr.renderAs;
		}

		return controlObject;
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
	}
} );