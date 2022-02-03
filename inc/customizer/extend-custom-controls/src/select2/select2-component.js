import PropTypes from 'prop-types';
import Select from 'react-select';
import {__} from '@wordpress/i18n';
import { useState } from "react";

const Select2Component = props => {

	const [props_value, setPropsValue] = useState( props.control.setting.get() );

	const onSelect2Change = ( value ) => {
		console.error( {value} );
		setPropsValue( {value} );
		props.control.setting.set( {value} );
    }

	console.error( props_value );

	const {
		label,
		choices
	} = props.control.params;

	let htmlLabel = null;

	if ( label ) {
		htmlLabel = <span className="customize-control-title">{label}</span>;
	}

	console.error( choices );

	value = (undefined === value || '' === value) ? [] : value;

	return <>
		{htmlLabel}
		<Select
			defaultValue={props_value}
			onChange = { ( e ) => onSelect2Change( e ) }
			options={ choices }
			isMulti = { true }
			className = "astra-customizer-select2"
			classNamePrefix = "astra"
		/>
	</>;
};

Select2Component.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( Select2Component );
