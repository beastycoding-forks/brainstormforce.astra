import { __ } from '@wordpress/i18n';
const classNames = ( ...classes ) => ( classes.filter( Boolean ).join( ' ' ) );
import Astra_Admin_Icons from "@Common/block-icons";

const QuickSettings = () => {

	const allQuickLinks = astra_admin.quick_settings;

	const onQuickSettingTrigger = ( sectionLink ) => {
		window.open(
			sectionLink,
			'_self'
		);
	};

	const renderQuickLinks = Object.entries( allQuickLinks ).map( ( [ index, block ] ) => {
		return <div
			key={index}
			data-redirection_link={block.quick_url}
			onClick={() =>
				onQuickSettingTrigger(
					block.quick_url
				)
			}
			className={ classNames(
				block.isPro
				? 'bg-slate-50'
				: 'bg-white',
				'box-border relative border rounded-md cursor-pointer h-20 px-3 py-3 flex items-start gap-x-4 snap-start hover:shadow-md transition astra-icon-transition group'
			) }
		>
			<div className="flex-1 min-w-0">
				<div className="text-base font-medium text-slate-800 leading-7">
					{ block.title }
				</div>
				<a
					className={ classNames(
						block.isPro
						? 'pointer-events-none'
						: '',
						'focus:text-slate-400 text-slate-400 text-base truncate leading-7 focus:text-slate-400 focus-visible:text-slate-400-hover active:text-astra-hover group-hover:text-astra-hover'
					) }
					href={ block.quick_url } rel="noreferrer">{__( 'Customize', 'astra' )}
				</a>
			</div>

			<div className="relative inline-flex flex-shrink-0 py-0.5 px-1 text-[0.625rem] leading-[0.7rem] text-gray-50 rounded-[0.1875rem] group-hover:text-slate-300">
				{ Astra_Admin_Icons["customize"] }
			</div>
		</div>
	} );

	return (
		<div className="grid grid-flow-row auto-rows-min grid-cols-1 gap-4 sm:grid-cols-3 pt-6">
			{ renderQuickLinks }
		</div>
	);
};

export default QuickSettings;
