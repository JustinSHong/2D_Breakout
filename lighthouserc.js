module.exports = {
	ci: {
		healthcheck: {
			fatal: true,
			checks: ['githubToken'],
		},
		collect: {
			staticDistDir: './',
			numberOfRuns: 5,
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
}
