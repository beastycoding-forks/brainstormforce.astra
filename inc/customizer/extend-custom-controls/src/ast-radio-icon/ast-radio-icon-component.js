import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { __ } from "@wordpress/i18n";
import { Dashicon } from '@wordpress/components';

const RadioIconComponent = props => {
	const {
		label,
		name,
		description,
		choices
	} = props.control.params;

	let htmlLabel = null;
	let descriptionHtml = null;
	let htmlRadio = null;

	const [currentState, setCurrentState] = useState();

	useEffect(() => {
		setCurrentState(props.control.setting.get())
	}, [props]);

	const onChange = (current) => {
		setCurrentState(current);
		props.control.setting.set(current);
	};

	if (label) {
		htmlLabel = <span className="customize-control-title">{label}</span>;
	}

	if (description) {
		descriptionHtml = <span className="description customize-control-description">{description}</span>;
	}

	htmlRadio = Object.entries(choices).map(([key, value]) => {
		return (
			<li
				key={key}
				onClick={() => onChange(key)}
				className={`ast-single-option ${key === currentState ? 'active' : ''}`}
			>
				<Dashicon icon={value.path} />
			</li>
		)
	})

	return (
		<div className="ast-control-wrap">
			{htmlLabel}
			{descriptionHtml}
			<ul className="ast-options">
				{htmlRadio}
			</ul>
		</div>
	);
}

RadioIconComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo(RadioIconComponent);
