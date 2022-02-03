import PropTypes from 'prop-types';

const SortableGroupComponent = props => {

	let labelHtml = null,
		descriptionHtml = null;

	const {
		label,
		description,
		value,
		choices,
		inputAttrs
	} = props.control.params;

	if (label) {
		labelHtml = <span className="customize-control-title">{label}</span>;
	}

	if (description) {
		descriptionHtml = <span className="description customize-control-description">{description}</span>;
	}

	let visibleMetaHtml = Object.values(value).map(choiceID => {
		let html = '';
		if (choices[choiceID]) {
			if( true === Object.values(choices[choiceID])[0] ) {
				html = <div {...inputAttrs} key={choiceID} className='ast-sortable-item ast-with-accordion' data-value={choiceID}>
					<div className="ast-single-item">
						{Object.keys(choices[choiceID])[0]}
						<i className="dashicons dashicons-visibility visibility"></i>
						<i className="dashicons dashicons-arrow-down-alt2 ast-option ast-accordion"></i>
					</div>
					<div className="ast-more-option">
						More options
					</div>
				</div>;
			} else {
				html = <div {...inputAttrs} key={choiceID} className='ast-sortable-item' data-value={choiceID}>
				{Object.keys(choices[choiceID])[0]}
				<i className="dashicons dashicons-visibility visibility"></i>
				</div>;
			}
		}
		return html;
	});

	let invisibleMetaHtml = Object.keys(choices).map(choiceID => {
		let html = '';
		if (Array.isArray(value) && -1 === value.indexOf(choiceID)) {
			if( true === Object.values(choices[choiceID])[0] ) {
				html = <div {...inputAttrs} key={choiceID} className='ast-sortable-item ast-with-accordion invisible' data-value={choiceID}>
					<div className="ast-single-item">
						{Object.keys(choices[choiceID])[0]}
						<i className="dashicons dashicons-visibility visibility"></i>
						<i className="dashicons dashicons-arrow-down-alt2 ast-option ast-accordion"></i>
					</div>
					<div className="ast-more-option">
						More options
					</div>
				</div>;
			} else {
				html = <div {...inputAttrs} key={choiceID} className='ast-sortable-item invisible' data-value={choiceID}>
				{Object.keys(choices[choiceID])[0]}
				<i className="dashicons dashicons-visibility visibility"></i>
				</div>;
			}
			
		}
		return html;
	});

	return <label className='ast-sortable'>
		{labelHtml}
		{descriptionHtml}
		<div className="sortable">
			{visibleMetaHtml}
			{invisibleMetaHtml}
		</div>
	</label>;

};

SortableGroupComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( SortableGroupComponent );
