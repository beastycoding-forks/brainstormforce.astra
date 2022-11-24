import PropTypes from 'prop-types';
import { ToggleControl } from '@wordpress/components';
import FormToggle from "../ast-toggle/form-toggle";
import { useState } from '@wordpress/element';

const { Dashicon } = wp.components;

const SectionToggleComponent = ( props ) => {
	const [ isStateToggle, setIsStateToggle ] = useState( props.control.setting.get() );

	const onLinkClick = () => {
		const {
			linked,
		} = props.control.params;

		if( ! isStateToggle ) {
			setIsStateToggle( ! isStateToggle );
			props.control.setting.set( ! isStateToggle );
		}

		const section = wp.customize.section(linked);
		section.expand();
	};

	const {
		linked,
		linkText,
	} = props.control.params;

	return <div className="ast-section-toggle" data-customizer-linked={ linked }>
		<label onClick={(e) => {
			e.preventDefault();
			onLinkClick();
		}}> { linkText } </label>
		<FormToggle
			checked={ isStateToggle }
			onChange={ () => {
				setIsStateToggle( ! isStateToggle );
				props.control.setting.set( ! isStateToggle );
			} }
		/>
		{	isStateToggle
			? <span onClick={(e) => {
				e.preventDefault();
				onLinkClick();
				}} className="ast-section-toggle-icon">
				<Dashicon icon="arrow-right-alt2"/>
			</span>
			: <></>
		}
	</div>;
};

SectionToggleComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default React.memo( SectionToggleComponent );
