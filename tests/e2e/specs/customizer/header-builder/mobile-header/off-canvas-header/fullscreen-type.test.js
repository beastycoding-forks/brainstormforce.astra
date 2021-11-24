import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'off canvas full-screen header type settings in the customizer', () => {
	it( 'full-screen header type should apply correctly', async () => {
		const toggleFill = {
			'footer-actions': {
				'tablet':'true',	
			},
			'mobile-header-type':{
				'Full-Screen':'true',
			},