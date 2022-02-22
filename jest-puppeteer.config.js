const config = require( '@wordpress/scripts/config/puppeteer.config' );

module.exports = {
	browser: 'firefox',
	launch: {
		...config,
		args: [ `${ config.launch.args[ 0 ] } --enable-font-antialiasing=false --disable-font-subpixel-positioning --force-color-profile=srgb --font-render-hinting=none` ],
	},
};
