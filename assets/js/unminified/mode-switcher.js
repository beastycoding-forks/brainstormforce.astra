/**
 * File mode-switcher.js
 *
 * JS for Mode switcher feature frontend rendering.
 *
 * @package Astra
 * @since x.x.x
 */

// Update mode switcher atts.
astraUpdateSwitcherAtts = function ( switchedTo ) {
	// Update aria-label attr.
	let modeSwticherTrigger =  document.querySelectorAll( '.ast-mode-switcher-trigger' );
	for ( let triggerCount = 0; triggerCount < modeSwticherTrigger.length; triggerCount++ ) {
		if( 'dark' === switchedTo ) {
			modeSwticherTrigger[ triggerCount ].setAttribute( 'aria-label', astraModeSwitcher.switchToLightMode );
		} else {
			modeSwticherTrigger[ triggerCount ].setAttribute( 'aria-label', astraModeSwitcher.switchToDarkMode );
		}
	}

	// Update title attr.
	let modeSwticherIconButtons =  document.querySelectorAll( '.ast-mode-switcher-icon-button, .ast-mode-switcher-icon-toggle' );
	for ( let buttonCount = 0; buttonCount < modeSwticherIconButtons.length; buttonCount++ ) {
		if( 'dark' === switchedTo ) {
			modeSwticherIconButtons[ buttonCount ].setAttribute( 'title', astraModeSwitcher.switchToLightMode );
		} else {
			modeSwticherIconButtons[ buttonCount ].setAttribute( 'title', astraModeSwitcher.switchToDarkMode );
		}
	}
}

/**
 * JS for updating toggled bubble translateX offset.
 *
 * Case: Due to some inconsistencies the toggled bubble look inappropriate, because we can't determine how button size (width) changes either of label font size or by icon size. That's why managing the bubble translateX offset through JS.
 */
astraUpdateToggleButtonSize = function() {
	let iconWithToggle = document.querySelectorAll( '.ast-mode-switcher-icon-with-label-toggle .ast-dark-switcher-knob .ahfb-svg-iconset' );

	if ( iconWithToggle.length > 0 ) {
		let toggleAdjustCss = '',
			styleSheet = document.createElement( 'style' );

		for ( let toggleCount = 0; toggleCount < iconWithToggle.length; toggleCount++ ) {
			let parentOffset = iconWithToggle[toggleCount].closest( '.ast-mode-switcher-trigger' );

			if( parentOffset.classList.contains( 'ast-header-mode-switcher' ) ) {
				toggleAdjustCss += '.ast-dark-mode .ast-header-mode-switcher.ast-mode-switcher-icon-with-label-toggle:after { transform: translateX(calc(' + iconWithToggle[toggleCount].offsetLeft + 'px - 0.8em)); }';
			} else if( parentOffset.classList.contains( 'ast-footer-mode-switcher' ) ) {
				toggleAdjustCss += '.ast-dark-mode .ast-footer-mode-switcher.ast-mode-switcher-icon-with-label-toggle:after { transform: translateX(calc(' + iconWithToggle[toggleCount].offsetLeft + 'px - 0.8em)); }';
			} else {
				toggleAdjustCss += '.ast-dark-mode .ast-fixed-switch-mode.ast-mode-switcher-icon-with-label-toggle:after { transform: translateX(calc(' + iconWithToggle[toggleCount].offsetLeft + 'px - 0.8em)); }';
			}
		}

		// Remove all existing stylesheets which loaded previously.
		let exisitingToggleStyle = document.querySelectorAll( '#astra-icon-with-toggle-css' );
		if ( exisitingToggleStyle.length > 0 ) {
			for ( let stylesheetCount = 0; stylesheetCount < exisitingToggleStyle.length; stylesheetCount++ ) {
				exisitingToggleStyle[stylesheetCount].remove();
			}
		}

		styleSheet.id = 'astra-icon-with-toggle-css';
		styleSheet.innerText = toggleAdjustCss;
		document.head.appendChild( styleSheet );
	}
}

// Frontend dark mode switcher toggle.
astraDarkModeSwitcher = function () {

	var modeSwticherTrigger =  document.querySelectorAll( '.ast-mode-switcher-trigger' );

	if ( modeSwticherTrigger.length > 0 ) {

		// Check if 'astra-color-mode' local storage is already set.
		var siteView = localStorage.getItem( 'astra-color-mode' );

		if ( siteView && '' !== siteView ) {
			astraUpdateSwitcherAtts( siteView );
			if ( 'dark' === siteView && ! document.documentElement.classList.contains( 'ast-dark-mode' ) ) {
				document.documentElement.classList.add( 'ast-dark-mode' );
			} else if ( 'light' === siteView && document.documentElement.classList.contains( 'ast-dark-mode' ) ) {
				document.documentElement.classList.remove( 'ast-dark-mode' );
			}
		} else if( '1' === astraModeSwitcher.carryOsPalette ) {
			// Logic for OS Aware option to showcase site on load with their set system scheme.
			let hasDarkSchemeSupport = window.matchMedia( "(prefers-color-scheme: dark)" );
			if ( hasDarkSchemeSupport.matches ) {
				astraUpdateSwitcherAtts( 'dark' );
			} else {
				astraUpdateSwitcherAtts( 'light' );
			}
		}

		// Click event for switcher.
		for ( var count = 0; count < modeSwticherTrigger.length; count++ ) {
			modeSwticherTrigger[count].onclick = function(event) {
				event.preventDefault();
				event.stopPropagation();

				if ( document.documentElement.classList.contains( 'ast-dark-mode' ) ) {
					astraUpdateSwitcherAtts( 'light' );
					document.documentElement.classList.remove( 'ast-dark-mode' );
					localStorage.setItem( 'astra-color-mode', 'light' );
				} else {
					astraUpdateSwitcherAtts( 'dark' );
					document.documentElement.classList.add( 'ast-dark-mode' );
					localStorage.setItem( 'astra-color-mode', 'dark' );
				}
			}
		}

		astraUpdateToggleButtonSize();
	}
}

document.addEventListener( 'DOMContentLoaded', function () {
	astraDarkModeSwitcher();
});

window.addEventListener( 'resize', function () {
	astraUpdateToggleButtonSize();
} );
