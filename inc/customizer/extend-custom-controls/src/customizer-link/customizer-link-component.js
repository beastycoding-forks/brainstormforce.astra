import PropTypes from 'prop-types';

import {__} from '@wordpress/i18n';

const { Dashicon } = wp.components;

const CustomizerLinkComponent = props => {

	const onLinkClick = () => {
		const {
			linked,
			link_type,
		} = props.control.params;

		switch (link_type) {
			case 'section':
				var section = wp.customize.section(linked);
				section.expand();
				break;

			case 'control':
				wp.customize.control(linked).focus();
				break;

			default:
				break;
		}
	};

	const {
		linked,
		link_text,
		link_type,
		is_button_link,
	} = props.control.params;
	let linkHtml = null;

	if (linked && link_text && '' === is_button_link) {
		linkHtml = <a href="#" onClick={() => {
			onLinkClick();
		}} className="customizer-link" data-customizer-linked={linked} data-ast-customizer-link-type={link_type}
					  dangerouslySetInnerHTML={{
						  __html: link_text
					  }}>
		</a>;
	} else {
		linkHtml =
		<>
		<div className="ast-builder-elements-section">
			<div className="ahfb-builder-item-start">
				<button onClick={(e) => {
					e.preventDefault();
					onLinkClick();
					}} className="components-button ahfb-builder-item" data-customizer-linked={linked} data-ast-customizer-link-type={link_type}>
					 {link_text}
					<span className="ahfb-builder-item-icon">
						<Dashicon icon="arrow-right-alt2"/>
					</span>
				</button>
			</div>
		</div>
		</>;
	}

	return <>
		{linkHtml}
	</>;
};

CustomizerLinkComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( CustomizerLinkComponent );
