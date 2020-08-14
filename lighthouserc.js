module.exports = {
	ci: {
		collect: {
			url: ['http://localhost:8081/'],
			startServerCommand: 'node server.js',
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
}
