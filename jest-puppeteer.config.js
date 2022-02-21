const config = require( '@wordpress/scripts/config/puppeteer.config' );

module.exports = {
	launch: {
		...config,
		args: [ `${ config.launch.args[ 0 ] } --enable-font-antialiasing=false --disable-font-subpixel-positioning --force-color-profile=generic-rgb --font-render-hinting=none` ],
	},
};
