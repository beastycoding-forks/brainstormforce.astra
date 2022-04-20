export const fullScreenOn = () => {
	const css = 'body div#adminmenumain, body .interface-interface-skeleton__sidebar {display: none;} body #wpcontent, body #wpfooter {margin-left: 0;} body .interface-interface-skeleton { left: 0!important}',
		head = document.head || document.getElementsByTagName( 'head' )[ 0 ],
		style = document.createElement( 'style' );
	head.appendChild( style );
	style.type = 'text/css';
	if ( style.styleSheet ) {
		// This is required for IE8 and below.
		style.styleSheet.cssText = css;
	} else {
		style.appendChild( document.createTextNode( css ) );
	}
};
