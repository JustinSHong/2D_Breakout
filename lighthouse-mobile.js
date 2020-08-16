const { EnvironmentPlugin } = require('webpack')

module.exports = {
	ci: {
		healthcheck: {
			fatal: true,
			checks: ['githubToken'],
		},
		collect: {
			url: ['https://breakout-2d.herokuapp.com/'],
			numberOfRuns: 5,
		},
		upload: {
			target: 'lhci',
			serverBaseUrl: 'https://frozen-citadel-11584.herokuapp.com',
			token: '68dd7f42-2b5a-41e8-8160-0fd14b022e47',
		},
		assert: {
			assertions: {
				'categories:performance': ['error', { minScore: 0.9 }],
				'categories:accessibility': ['error', { minScore: 0.9 }],
				'categories:best-practices': ['error', { minScore: 0.9 }],
				'categories:seo': ['error', { minScore: 0.9 }],
			},
		},
	},
}
