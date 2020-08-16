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
				emulatedFormFactor: 'desktop',
			},
		},
		upload: {
			target: 'temporary-public-storage',
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
