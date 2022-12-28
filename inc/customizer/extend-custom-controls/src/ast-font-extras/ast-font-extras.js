import { useState } from 'react';
import { Fragment } from '@wordpress/element';
import { useEffect } from 'react';
import { Dashicon } from "@wordpress/components";


const FontExtrasComponent = ( props ) => {

	const defaultValue = {
		"letter-spacing": '',
		"letter-spacing-unit": 'px',
		"line-height": '',
		"line-height-unit": 'em',
		"text-decoration" : 'initial',
		"text-transform" : '',
	}

	const [ propsValue, setPropsValue ] = useState( defaultValue );

	useEffect(() => {
		if( props ?. control ?. setting ?. get() ) {
			setPropsValue( props.control.setting.get() );
		}
	}, []);

	const changeFontSetting = ( data ) => {
		const newProps = { ...propsValue };
		if ( data.type === 'text-transform' ) {
			newProps[ 'text-transform' ] = newProps[ 'text-transform' ] === data.value ? '' : data.value;
		}
		if ( data.type === 'text-decoration' ) {
			newProps[ 'text-decoration' ] = data.value;
		}
		if ( data.type === 'line-height' ) {
			newProps[ 'line-height' ] = data.value;
		}
		if ( data.type === 'line-height-unit' ) {
			newProps[ 'line-height-unit' ] = data.value;
		}
		if ( data.type === 'letter-spacing' ) {
			newProps[ 'letter-spacing' ] = data.value;
		}
		if ( data.type === 'letter-spacing-unit' ) {
			newProps[ 'letter-spacing-unit' ] = data.value;
		}
		setPropsValue( newProps );
		props.control.setting.set( newProps );
	};

	const numberArrows = ( type ) => {
		const currentValue = propsValue[ type ] ? propsValue[ type ] : 0;
		const currentValueMinus = 'line-height' === type ? Math.max( 0, currentValue - 1 ) : currentValue - 1;
		return (
			<div className="plus-minus-control">
				<Dashicon onClick={ () =>changeFontSetting( { type: type, value: parseInt( currentValue + 1 ) } ) } icon="arrow-up-alt2" />
				<Dashicon onClick={ () =>changeFontSetting( { type: type, value: parseInt( currentValueMinus ) } ) } icon="arrow-down-alt2" />
			</div>
		)
	}

	return (
		<Fragment>
			<div className="ast-font-styling">
				<div className="ast-font-extras-wrapper">
					<div className="ast-font-extras-input">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="2.6665" y="1.3335" width="10.6667" height="1.33333" fill="#9CA3AF" />
							<rect x="2.6665" y="13.3335" width="10.6667" height="1.33333" fill="#9CA3AF" />
							<path d="M4.6665 12H5.88003L6.56684 9.83784H9.438L10.1196 12H11.3332L8.62726 4H7.37758L4.6665 12ZM7.99209 5.32502H8.01275L9.123 8.83992H6.87668L7.99209 5.32502Z" fill="#9CA3AF" />
						</svg>
						<input type="number" name="font-height" min="" value={ propsValue[ 'line-height' ] } onChange={ ( e ) => changeFontSetting( { type: 'line-height', value: e.target.value } ) } />
						{numberArrows( 'line-height' )}
					</div>
					<div className="ast-font-unit-wrapper">
						<span className={`${propsValue['line-height-unit'] === 'px' ? 'active' : ''}`} onClick={ ( e ) => changeFontSetting( { type: 'line-height-unit', value: 'px' } ) }>PX</span>
						<span className={`${propsValue['line-height-unit'] === 'em' ? 'active' : ''}`} onClick={ ( e ) => changeFontSetting( { type: 'line-height-unit', value: 'em' } ) }>EM</span>
					</div>
				</div>
				<div className="ast-font-spacing-wrapper">
					<div className="ast-font-spacing-input">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="1.3335" y="2.6665" width="1.33333" height="10.6667" fill="#9CA3AF" />
							<rect x="13.3335" y="2.6665" width="1.33333" height="10.6667" fill="#9CA3AF" />
							<path d="M4.6665 12H5.88003L6.56684 9.83784H9.438L10.1196 12H11.3332L8.62726 4H7.37758L4.6665 12ZM7.99209 5.32502H8.01275L9.123 8.83992H6.87668L7.99209 5.32502Z" fill="#9CA3AF" />
						</svg>
						<input type="number" name="font-height" value={ propsValue[ 'letter-spacing' ] } onChange={ ( e ) => changeFontSetting( { type: 'letter-spacing', value: e.target.value } ) } />
						{numberArrows( 'letter-spacing' )}
					</div>
					<div className="ast-font-unit-wrapper">
						<span className={`${propsValue['letter-spacing-unit'] === 'px' ? 'active' : ''}`} onClick={ ( e ) => changeFontSetting( { type: 'letter-spacing-unit', value: 'px' } ) }>PX</span>
					</div>
				</div>
			</div>

			<div className="ast-font-styling-second">
				<div className="ast-font-transform-wrapper">
					<div
						className={`ast-font-item-type font-trans-lowercase ${propsValue['text-transform'] === 'lowercase' ? 'active' : ''} `}
						onClick={() => changeFontSetting( { type: 'text-transform', value:'lowercase' } ) }
					>
						aa
					</div>
					<div className={`ast-font-item-type font-trans-capitalize ${propsValue['text-transform'] === 'capitalize' ? 'active' : ''} `}
						onClick={() => changeFontSetting( { type: 'text-transform', value:'capitalize' } )}>Aa</div>
					<div className={`ast-font-item-type font-trans-uppercase ${propsValue['text-transform'] === 'uppercase' ? 'active' : ''} `}
						onClick={() => changeFontSetting( { type: 'text-transform', value:'uppercase' } )}>AA</div>
				</div>
				<div className="ast-font-decoration-wrapper">
					<div className={`ast-font-item-type ast-font-deco-default ${propsValue['text-decoration'] === 'initial' || propsValue['text-decoration'] === ''  ? 'active' : ''} `}
						onClick={() => changeFontSetting( { type: 'text-decoration', value:'initial'} ) } >Aa</div>
					<div className={`ast-font-item-type ast-font-deco-underline ${propsValue['text-decoration'] === 'underline' ? 'active' : ''} `}
						onClick={() => changeFontSetting( { type: 'text-decoration', value:'underline'} ) } >Aa</div>
					<div className={`ast-font-item-type ast-font-deco-linethrough ${propsValue['text-decoration'] === 'line-through' ? 'active' : ''} `}
						onClick={() => changeFontSetting( { type: 'text-decoration', value:'line-through'} ) } >AA</div>
				</div>
			</div>
		</Fragment>
	);
};

export default React.memo( FontExtrasComponent );
