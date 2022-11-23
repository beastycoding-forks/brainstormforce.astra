import React from 'react';
import { useLocation } from 'react-router-dom';
import Welcome from '@DashboardApp/pages/welcome/Welcome';
import FreeVsPro from '@DashboardApp/pages/free-vs-pro/FreeVsPro';
import Settings from '@DashboardApp/pages/settings/Settings';
import StarterTemplates from '@DashboardApp/pages/starter-templates/StarterTemplates';
import CustomLayouts from '@DashboardApp/pages/custom-layouts/CustomLayouts';
import SpectraScreen from '@DashboardApp/pages/spectra/SpectraScreen';
import Docs from '@DashboardApp/pages/docs/Docs';

function SettingsRoute() {
	const query = new URLSearchParams( useLocation().search );
	const page = query.get( 'page' );
	const path = query.get( 'path' );
	const currentEvent = query.get( 'event' );

	let routePage = <p> Fallback Route Page </p>;

	if ( astra_admin.home_slug === page ) {
		if ( 'getting-started' === currentEvent ) {
			routePage = <Welcome />;
		} else {
			switch ( path ) {
				case 'starter-templates':
					routePage = <StarterTemplates />;
					break;
				case 'settings':
					routePage = <Settings />;
					break;
				case 'free-vs-pro':
					routePage = <FreeVsPro />;
					break;
				case 'custom-layouts':
					routePage = <CustomLayouts />;
					break;
				case 'spectra':
					routePage = <SpectraScreen />;
					break;
				case 'docs':
					routePage = <Docs />;
					break;
				default:
					routePage = <Welcome />;
					break;
			}
		}

		astWpMenuClassChange( path );
	}

	return <>{ routePage }</>;
}

export default SettingsRoute;
