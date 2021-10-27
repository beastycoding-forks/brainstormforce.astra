/**
 * File mode-switcher.js
 *
 * JS for Mode switcher element frontend rendering.
 *
 * @package Astra
 * @since x.x.x
 */

// Frontend dark mode switcher toggle.
darkModeSwitcher = function () {

	var modeSwticherTrigger =  document.getElementById( 'ast-mode-switcher-trigger' );

	if( null !== modeSwticherTrigger ) {
		// Check if astraSiteView local storage is already set.
		var siteView = localStorage.getItem( 'astraSiteView' );

		if ( siteView && '' !== siteView ) {
			if ( 'dark' === siteView && ! document.body.classList.contains( 'ast-dark-site' ) ) {
				document.body.classList.add( 'ast-dark-site' );
			} else if ( 'light' === siteView && document.body.classList.contains( 'ast-dark-site' ) ) {
				document.body.classList.remove( 'ast-dark-site' );
			}
		} else if( '1' === astraModeSwitcher.carryOsPalette ) {
			// Logic for OS Aware option to showcase site on load with their set system scheme.
			var hasDarkSchemeSupport = window.matchMedia( "(prefers-color-scheme: dark)" );
			if ( hasDarkSchemeSupport.matches && ! document.body.classList.contains( 'ast-dark-site' ) ) {
				document.body.classList.add( 'ast-dark-site' );
			} else if ( ! hasDarkSchemeSupport.matches && document.body.classList.contains( 'ast-dark-site' ) ) {
				document.body.classList.remove( 'ast-dark-site' );
			}
		}

		// Click event for switcher.
		modeSwticherTrigger.addEventListener( 'click', function( event ) {
			event.preventDefault();
			event.stopPropagation();
			if ( document.body.classList.contains( 'ast-dark-site' ) ) {
				document.body.classList.remove( 'ast-dark-site' );
				localStorage.setItem( 'astraSiteView', 'light' );
			} else {
				document.body.classList.add( 'ast-dark-site' );
				localStorage.setItem( 'astraSiteView', 'dark' );
			}
		});
	}
}

window.addEventListener( 'load', function () {
	darkModeSwitcher();
});
