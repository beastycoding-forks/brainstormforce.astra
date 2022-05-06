module.exports = {
	root: true,
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended-with-formatting',
		'plugin:import/recommended',
		'plugin:eslint-comments/recommended',
	],
	ignorePatterns: [ 'deprecated.js' ],
	rules: {
		'no-alert': 'off',
		'no-lonely-if': 'off',
		'no-console': 'off',
		'no-shadow': 'off',
		'import/no-unresolved': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
		'jsx-a11y/no-static-element-interactions': 'off',
		'jsx-a11y/no-redundant-roles': 'off',
		'jest/valid-expect': 'off',
		'jest/expect-expect': 'off',
		'jest/valid-expect-in-promise': 'off',
		'jest/no-commented-out-tests': 'off',
		'jest/no-standalone-expect': 'off',
		'jest/no-done-callback': 'off',
		'jsdoc/valid-types': 'off',
	},
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			presets: [ require.resolve( '@wordpress/babel-preset-default' ) ],
		},
	},
	globals: {
	},
};
