import React from "react";
import Astra_Admin_Icons from "@Common/block-icons";
import apiFetch from '@wordpress/api-fetch';

const UsefulPlugins = () => {

	const handlePluginActionTrigger = (e) => {
		let action = e.target.dataset.action;
		const formData = new window.FormData();

		switch (action) {
			case 'astra_recommended_plugin_activate':
				formData.append( 'action', 'astra_recommended_plugin_activate' );
				formData.append( 'security', astra_admin.plugin_manager_nonce );
				formData.append( 'init', e.target.dataset.init );
				e.target.innerText = astra_admin.plugin_activating_text;

				apiFetch( {
					url: astra_admin.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( ( data ) => {
					e.target.className = '';
					e.target.className = 'text-[#4AB866] pointer-events-none capitalize text-sm leading-[0.875rem] font-medium rounded-md';
					e.target.innerText = astra_admin.plugin_activated_text;
				} );
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
			e.target.className = '';
			e.target.className = 'text-[#4AB866] pointer-events-none capitalize text-sm leading-[0.875rem] font-medium rounded-md';
			e.target.innerText = astra_admin.plugin_activated_text;
			location.reload();
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
			return "text-astra";
		}
	};

	return (
		<div>
			{astra_admin.useful_plugins.map((plugin, key) => (
				<div
					className={`${plugin.status === 'activated' ? '' : 'cursor-pointer hover:bg-[#F8FAFC] hover:shadow-hover'} flex justify-between items-start p-4 border-t border-slate-200 bg-white transition `}
					key={key}
				>
					<div className="flex">
						<div>
							{ plugin.logoPath.internal_icon && Astra_Admin_Icons[ plugin.logoPath.icon_path ] }
							{ ! plugin.logoPath.internal_icon && <img src={ plugin.logoPath.icon_path } width="40px" height="40px" /> }
						</div>
						<div className="ml-2.5">
							<div className="text-sm leading-[1.375rem] font-medium text-slate-800">
								{plugin.title}
							</div>
							<p className="text-sm leading-[1.375rem] text-slate-400">
								{plugin.subtitle}
							</p>
						</div>
					</div>
					<button
						data-slug={plugin.slug}
						data-init={plugin.path}
						data-action={getAction(plugin.status)}
						className={` ${getStatusClass(
							plugin.status
						)} p-0 m-0 capitalize text-sm leading-4 font-medium`}
						onClick={ handlePluginActionTrigger }
					>
						{ 'installed' == plugin.status ? astra_admin.plugin_activate_text : plugin.status }
					</button>
				</div>
			))}
		</div>
	);
};

export default UsefulPlugins;
