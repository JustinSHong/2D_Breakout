import Ball from '../public/js/modules/ball'
import Brick from '../public/js/modules/brick'
import { Game } from '../public/js/game'
import MockCanvas from '../public/js/modules/canvas'
import Paddle from '../public/js/modules/paddle'
import Player from '../public/js/modules/player'

jest.mock('../public/js/modules/canvas')

describe('game', () => {
	const canvas = new MockCanvas()

	test('game should have the right properties', () => {
		const mode = { name: 'very easy', dx: 1.5, dy: -1.5, lives: 5 }
		const ball = new Ball(canvas.height, canvas.width, mode)
		const brick = new Brick()
		const paddle = new Paddle(canvas)
		const player = new Player(mode)
		const game = new Game(ball, brick, canvas, paddle, player)

		// expect(game).toHaveProperty('balls')
	})
})
