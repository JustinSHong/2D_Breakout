module.exports = {
	ci: {
		healthcheck: {
			fatal: true,
			checks: ['githubToken'],
		},
		collect: {
			staticDistDir: './dist',
			numberOfRuns: 5,
			startServerCommand: 'node server.js',
			settings: {
				emulatedFormFactor: 'desktop',
			},
		},
		upload: {
			target: 'lhci',
			serverBaseUrl: 'https://frozen-citadel-11584.herokuapp.com',
			token: '68dd7f42-2b5a-41e8-8160-0fd14b022e47',
		},
		assert: {
			assertions: {
				'categories:performance': ['error', { minScore: 0.7 }],
				'categories:accessibility': ['error', { minScore: 0.7 }],
				'categories:best-practices': ['error', { minScore: 0.7 }],
				'categories:seo': ['error', { minScore: 0.9 }],
			},
		},
	},
}
