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
	},
}
