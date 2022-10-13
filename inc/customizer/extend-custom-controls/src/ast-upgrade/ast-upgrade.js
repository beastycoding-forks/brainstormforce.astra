import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import svgIcons from '../../../../../assets/svg/svgs.json';
import {__} from '@wordpress/i18n';

const UpgradeComponent = props => {

	const {
		title,
		svg = '',
		choices = {},
		renderAs = 'block'
	} = props.control.params;

	const upgradeSvg = svg != '' ? parse( svgIcons[svg] ) : '',
		lockIcon = parse( svgIcons['upgradeLock'] ),
		astraBrand = parse( svgIcons['astraLogo'] ),
		checkMark = parse( svgIcons['upgradeListCheck'] );

	let htmlTitle = null;

	if ( title ) {
		htmlTitle = <span className="ast-upgrade-section-title">{title}</span>;
	}

	const renderUpgrdaeBtn = () => {
		return <a href={window.AstraBuilderCustomizerData.upgradeUrl} target='_blank' className="ast-upgrade-trigger">
			<span className='ast-upgrade-pro-innerwrap'>
				{upgradeSvg}
				<span className='ast-upgrade-cta'>
					{ lockIcon }
					{ htmlTitle }
				</span>
			</span>
		</a>;
	};

	const getAstProItemData = ( data, key ) => {
		return undefined != data[key] && data[key] ? data[key] : '';
	}

	const proOptionsList = () => {
		const htmlContent = Object.entries(choices).map(([key, value]) => {
			return <li key={ key } className='ast-pro-upgrade-item'>
				<p>
					{ checkMark }
					<span className='ast-upgrade-list-title'> { getAstProItemData(value, 'title') } </span>
					{ '' != getAstProItemData(value, 'description') &&
						<span className='ast-upgrade-list-description'> { getAstProItemData(value, 'description') } </span>
					}
				</p>
			</li>
		});

		return htmlContent;
	};

	const renderListUpgrdae = () => {
		return <>
			<div className='ast-upgrade-list-wrapper'>
				<p className='ast-brand-logo'>
					{ astraBrand }
				</p>
				<p className="ast-upgrade-list-section-title">{title}</p>
			</div>
			<ul className='ast-upgrade-list-items'>
				{ proOptionsList() }
			</ul>
			<p>
				<a
					href={window.AstraBuilderCustomizerData.upgradeUrl}
					target="_blank"
					rel="noopener"
					className="button ast-button-link"
				>
					{ __( 'Upgrade Now', 'astra' ) }
				</a>
			</p>
		</>
	};

	return <>
		<div className="ast-upgrade-pro-wrap">
			{ 'block' === renderAs && renderUpgrdaeBtn() }
			{ 'list' === renderAs && renderListUpgrdae() }
		</div>
	</>;
};

UpgradeComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( UpgradeComponent );
