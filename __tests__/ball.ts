import Ball from '../public/js/modules/ball'

describe('ball', () => {
	test('ball should exist', () => {
		const ball = new Ball(10, 10, { name: 'easy', dx: 1, dy: 2, lives: 3 })
		expect(ball).toHaveProperty('height')
	})
})
