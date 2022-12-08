import { __ } from "@wordpress/i18n";
import Astra_Admin_Icons from "@Common/block-icons";
import apiFetch from '@wordpress/api-fetch';
const classNames = (...classes) => classes.filter(Boolean).join(" ");

const AstraIntegration = () => {

	const handlePluginActionTrigger = (e) => {
		let action = e.target.dataset.action;
		const formData = new window.FormData();

		switch (action) {
			case 'astra_recommended_plugin_activate':
				activatePlugin(e);
				break;

			case 'astra_recommended_plugin_install':
				formData.append( 'action', 'astra_recommended_plugin_install' );
				formData.append( '_ajax_nonce', astra_admin.plugin_installer_nonce );
				formData.append( 'slug', e.target.dataset.slug );

				e.target.innerText = astra_admin.plugin_installing_text;

				apiFetch( {
					url: astra_admin.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( ( data ) => {
					if ( data.success ) {
						e.target.innerText = astra_admin.plugin_installed_text;
						activatePlugin(e);
					}
				} );
				break;

			default:
				// Do nothing.
				break;
		}
	};

	const activatePlugin = (e) => {
		const formData = new window.FormData();
		formData.append( 'action', 'astra_recommended_plugin_activate' );
		formData.append( 'security', astra_admin.plugin_manager_nonce );
		formData.append( 'init', e.target.dataset.init );
		e.target.innerText = astra_admin.plugin_activating_text;

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			if ( data.success ) {
				e.target.className = '';
				e.target.className = 'text-[#4AB866] pointer-events-none capitalize mt-3 text-sm leading-[0.875rem] font-medium rounded-md py-[0.5625rem]';
				e.target.innerText = astra_admin.plugin_activated_text;
				window.location = e.target.dataset.redirection;
			}
		} );
	};

	const getAction = (status) => {
		if (status === "activated") {
			return "";
		} else if (status === "installed") {
			return "astra_recommended_plugin_activate";
		} else {
			return "astra_recommended_plugin_install";
		}
	};

	const getStatusClass = (value) => {
		if (value === "activated") {
			return "text-[#4AB866] pointer-events-none";
		} else {
			return "text-astra bg-slate-50 px-[0.8125rem]";
		}
	};

	const renderBlockCards = astra_admin.integrations.map((plugin, index) => {
		return (
			<div
				key={index}
				className={classNames(
					plugin.isPro ? "bg-slate-50" : "bg-white",
					"box-border relative border rounded-md px-5 py-4 flex items-start gap-x-4 snap-start"
				)}
			>
				<div className="flex flex-col">
					<div className="flex justify-between">
						<div>
							{ plugin.logoPath.internal_icon && Astra_Admin_Icons[ plugin.logoPath.icon_path ] }
							{ ! plugin.logoPath.internal_icon && <img src={ plugin.logoPath.icon_path } width="40px" height="40px" /> }
						</div>
						<div>
							{ plugin.isPro ? (
								<span>{__('Pro', 'astra')}</span>
							) : (
								<span className="text-astra uppercase text-[0.625rem] leading-[0.7rem] font-semibold bg-blue-50 px-1 pt-0.5 pb-[0.1875rem] rounded-[0.1875rem]">
									{__('Free', 'astra')}
								</span>
							) }
						</div>
					</div>

					<div className="mt-2">
						<div className="text-base leading-[1.625rem] font-medium text-slate-800">
							{ plugin.title }
						</div>
						<p className="text-sm leading-[1.375rem] text-slate-400 mt-[0.1875rem]">
							{ plugin.subtitle }
						</p>
						<button
							data-slug={plugin.slug}
							data-redirection={plugin.redirection}
							data-action={getAction(plugin.status)}
							data-init={plugin.path}
							onClick={ handlePluginActionTrigger }
							className={` ${getStatusClass(
								plugin.status
							)} capitalize mt-3 text-sm leading-[0.875rem] font-medium rounded-md py-[0.5625rem]`}>
							{ 'installed' == plugin.status ? astra_admin.plugin_activate_text : plugin.status }
						</button>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className="grid grid-flow-row auto-rows-min grid-cols-1 gap-4 sm:grid-cols-3 pt-6">
			{ renderBlockCards }
		</div>
	);
};

export default AstraIntegration;
