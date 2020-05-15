import Ball from '../public/js/modules/ball'
import Brick from '../public/js/modules/brick'
import { Game } from '../public/js/game'
import MockCanvas from '../public/js/modules/canvas'
import Paddle from '../public/js/modules/paddle'
import Player from '../public/js/modules/player'

jest.mock('../public/js/modules/canvas')

describe('game', () => {
	const canvas = new MockCanvas()
	const mode = { name: 'very easy', dx: 1.5, dy: -1.5, lives: 5 }
	const ball = new Ball(canvas.height, canvas.width, mode)
	const brick = new Brick()
	const paddle = new Paddle(canvas)
	const player = new Player(mode)
	const game = new Game(ball, brick, canvas, paddle, player)

	test('game should have the right properties', () => {
		expect(game).toHaveProperty('ball')
		expect(game).toHaveProperty('brick')
		expect(game).toHaveProperty('canvas')
		expect(game).toHaveProperty('paddle')
		expect(game).toHaveProperty('rightPressed')
		expect(game).toHaveProperty('leftPressed')
		expect(game).toHaveProperty('player')
		expect(game).toHaveProperty('pause')
		expect(game).toHaveProperty('init')
		expect(game).toHaveProperty('draw')
		expect(game).toHaveProperty('keyDownHandler')
		expect(game).toHaveProperty('keyUpHandler')
		expect(game).toHaveProperty('mouseClickHandler')
		expect(game).toHaveProperty('mouseMoveHandler')
		expect(game).toHaveProperty('pauseGame')
		expect(game).toHaveProperty('resumeGame')
		expect(game).toHaveProperty('selectGameMode')
	})

	test('pause and resume', () => {
		expect(game.pauseGame()).toBe(true)
		expect(game.resumeGame()).toBe(false)
	})
})
