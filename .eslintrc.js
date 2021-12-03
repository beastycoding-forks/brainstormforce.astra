module.exports = {
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	ignorePatterns: [ 'deprecated.js' ],
	globals: {
		automatePlugData: true,
		jQuery: true,
	},
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
	},
};
