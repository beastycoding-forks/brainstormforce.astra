module.exports = {
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
	},
	"plugins": ["jest"]
};
