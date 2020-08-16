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
<<<<<<< HEAD
			serverBaseUrl: 'https://aqueous-caverns-79659.herokuapp.com/',
			token: '4021253d-9a78-45b0-968f-8f3b51b6f07e',
			ignoreDuplicateBuildFailure: true,
=======
			serverBaseUrl: 'https://frozen-citadel-11584.herokuapp.com',
			token: '68dd7f42-2b5a-41e8-8160-0fd14b022e47',
>>>>>>> 00ca1aa47fb7791eee38ee5c83cf86240e088ffa
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
