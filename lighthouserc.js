module.exports = {
	ci: {
		healthcheck: {
			fatal: true,
			checks: ['githubToken'],
		},
		collect: {
			url: ['http://localhost:8080/'],
			startServerCommand: 'node server.js',
			numberOfRuns: 5,
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
}
