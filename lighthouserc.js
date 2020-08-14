module.exports = {
	ci: {
		healthcheck: {
			fatal: true,
			checks: ['githubToken'],
		},
		collect: {
			url: ['http://localhost:8081/'],
			startServerCommand: 'node server.js',
			numberOfRuns: 5,
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
}
