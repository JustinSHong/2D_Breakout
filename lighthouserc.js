module.exports = {
	ci: {
		healthcheck: {
			fatal: true,
			checks: ['githubToken'],
		},
		collect: {
			staticDistDir: './dist',
			numberOfRuns: 5,
			settings: {
				emulatedFormFactor: 'none',
			},
		},
		upload: {
			target: 'temporary-public-storage',
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
