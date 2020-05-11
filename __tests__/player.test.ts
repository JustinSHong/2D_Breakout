import Player from '../public/js/modules/player'

describe('player', () => {
	test('player should have the right properties', () => {
		const mode = { name: 'very easy', dx: 1.5, dy: -1.5, lives: 5 }
		const player = new Player(mode)

		expect(player).toHaveProperty('lives')
		expect(player).toHaveProperty('score')
	})
})
