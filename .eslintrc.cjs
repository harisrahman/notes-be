const commonRules = {
	'prettier/prettier': 'error',
	'object-curly-spacing': ['warn', 'always'],
	'no-unused-vars': [
		'warn',
		{
			vars: 'all',
			args: 'none',
		},
	],
	'no-console': 'off',
	'max-len': [
		'warn',
		{
			code: 80,
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
			ignoreComments: true,
			ignoreRegExpLiterals: true,
		},
	],
	'import/extensions': ['error', 'never'],
};

module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-base', 'prettier'],
	plugins: ['prettier'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: [
				'eslint:recommended',
				'plugin:@typescript-eslint/recommended',
				'airbnb-base',
				'airbnb-typescript/base',
				'prettier',
			],
			plugins: ['@typescript-eslint', 'prettier'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: ['./tsconfig.json'],
				ecmaVersion: 12,
				sourceType: 'module',
			},
			rules: {
				...commonRules,
				'@typescript-eslint/no-unused-vars': [
					'warn',
					{
						vars: 'all',
						args: 'none',
					},
				],
				'@typescript-eslint/no-explicit-any': [
					'error',
					{
						ignoreRestArgs: true,
					},
				],
				'import/prefer-default-export': 'off',
				'no-restricted-imports': [
					'error',
					{
						patterns: [
							{
								group: ['./', '../'],
								message: 'Relative imports are not allowed.',
							},
						],
					},
				],
			},
		},
	],
	rules: commonRules,
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
};
