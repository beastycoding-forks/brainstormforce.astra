/**
 * File flyout-cart.js
 *
 * JS for Mode switcher element frontend rendering.
 *
 * @package Astra
 * @since x.x.x
 */

(function () {

	/**
	 * Cookie retriever for mode switcher.
	 *
	 * @param  {String} cookieName The cookie name.
	 */
	var astraGetCookie = function ( cookieName ) {
		var name = cookieName + "=",
			decodedCookie = decodeURIComponent( document.cookie ),
			cookieArray = decodedCookie.split(';');
		for( var count = 0; count < cookieArray.length; count++ ) {
			var cookie = cookieArray[count];
			while (cookie.charAt(0) == ' ') {
				cookie = cookie.substring(1);
			}
			if (cookie.indexOf(name) == 0) {
				return cookie.substring(name.length, cookie.length);
			}
		}
		return '';
	}

	/**
	 * Cookie setter for mode switcher.
	 *
	 * @param  {String} cookieName The cookie name.
	 * @param  {String} selector Cookie value.
	 * @return {String} expireDays Number of days for cookie expiration.
	 */
	var astraSetCookie = function ( cookieName, cookieValue, expireDays ) {
		var dateInstance = new Date();
		dateInstance.setTime( dateInstance.getTime() + ( expireDays*24*60*60*1000 ) );
		var expires = "expires="+ dateInstance.toUTCString();
		document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
	}

	// Frontend dark mode switcher toggle.
	function darkModeSwitcher() {

		var modeSwticherTrigger =  document.getElementById( 'ast-mode-switcher-trigger' );

		if( null !== modeSwticherTrigger ) {
			// Check if astraPaletteCookie cookie is already set.
			var paletteCookie = astraGetCookie( 'astraPaletteCookie' );

			if ( paletteCookie && '' !== paletteCookie ) {
				if ( 'dark' === paletteCookie && ! document.body.classList.contains( 'ast-dark-site' ) ) {
					document.body.classList.add( 'ast-dark-site' );
				} else if ( 'light' === paletteCookie && document.body.classList.contains( 'ast-dark-site' ) ) {
					document.body.classList.remove( 'ast-dark-site' );
				}
			} else if( '1' === astra.carryOsPalette ) {
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
					astraSetCookie( 'astraPaletteCookie', 'light', 7 ); // Set 'light' as cookie value for next 7 days.
				} else {
					document.body.classList.add( 'ast-dark-site' );
					astraSetCookie( 'astraPaletteCookie', 'dark', 7 ); // Set 'dark' as cookie value for next 7 days.
				}
			});
		}
	}

	window.addEventListener('load', function () {
		darkModeSwitcher();
	});
})();

