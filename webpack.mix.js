// webpack.mix.js Setup.
let mix = require( 'laravel-mix' );

// Settings
mix.setPublicPath('./build');

// Styles.
mix
  .sass( 'sass/editor-style.scss', 'styles' )
  .sass( 'sass/style.scss', 'styles' )

mix.js( 'inc/customizer/extend-custom-controls/src/main.js', 'scripts' );

mix.js( 'inc/metabox/extend-metabox/src/metabox.js', 'scripts' );
