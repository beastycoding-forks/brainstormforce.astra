import PropTypes from 'prop-types';
import {Dashicon, Button} from '@wordpress/components';
import {useEffect, useState} from 'react';
import { MediaUpload } from '@wordpress/media-utils';

const ReponsiveLogoComponent = props => {

	let prop_value = props.control.setting.get();

	const [state, setState] = useState( prop_value );

	useEffect( () => {
		if( state !== prop_value) {
			setState(prop_value)
		}
	},[props] );


	const renderOperationButtons = ( defaultVal ) => {
		return (
			<div className="ast-resp-slider-reset-wrap">
				<button
					className="ast-reset-btn components-button components-circular-option-picker__clear is-secondary is-small"
					disabled={ JSON.stringify(state) === JSON.stringify(defaultVal)} onClick={ e => {
					e.preventDefault();
					props.control.setting.set(defaultVal);
					setState(defaultVal);
				}}>
				<Dashicon icon='image-rotate'/>
				</button>
			</div>
		);
	};

	const renderLogoUploadHtml = (device, active = '') => {
		let defaultVal = props.control.params.default[device];
		return (
			<div className={ `input-field-wrapper ${device} ${active}` }>
				<MediaUpload
					allowedTypes={ [ "image" ] }
					onSelect={ ( media ) =>
						console.log( 'selected ' + JSON.stringify(media) )
					}
					value={ '' }
					render={ ( { open } ) => (
						<Button className="upload-button button-add-media" isDefault onClick={ open }>
							Select Logo
						</Button>
					) }
				/>
			</div>
		);
	};


	const { description, label } = props.control.params;

	let labelHtml = null;
	let responsiveHtml = null;
	let descriptionHtml = null;
	let logoHtml = null;
	let defaultVal = props.control.params.default;

	if (label) {
		labelHtml = <span className="customize-control-title slider-control-label">{label}</span>;
		responsiveHtml = <ul key={'ast-resp-ul'} className="ast-responsive-slider-btns">
			<li className="desktop active">
				<button type="button" className="preview-desktop active" data-device="desktop">
					<i className="dashicons dashicons-desktop"></i>
				</button>
			</li>
			<li className="tablet">
				<button type="button" className="preview-tablet" data-device="tablet">
					<i className="dashicons dashicons-tablet"></i>
				</button>
			</li>
			<li className="mobile">
				<button type="button" className="preview-mobile" data-device="mobile">
					<i className="dashicons dashicons-smartphone"></i>
				</button>
			</li>
		</ul>;
	}

	if (description) {
		descriptionHtml = <span className="description customize-control-description">{description}</span>;
	}

	logoHtml = <>
		{renderLogoUploadHtml('desktop', 'active')}
		{renderLogoUploadHtml('tablet')}
		{renderLogoUploadHtml('mobile')}
	</>;

	return <div className="ast-slider-wrap">
		<label key={'customizer-text'}>
			{labelHtml}
		</label>
		{responsiveHtml}
		{ renderOperationButtons( defaultVal ) }
		{descriptionHtml}
		<div className="wrapper">
			{logoHtml}
		</div>
	</div>;


};

ReponsiveLogoComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default ReponsiveLogoComponent;
