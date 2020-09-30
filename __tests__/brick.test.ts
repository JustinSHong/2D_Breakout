import Ball from '../public/js/modules/ball'
import Brick from '../public/js/modules/brick'
import Game from '../public/js/modules/game'
import Paddle from '../public/js/modules/paddle'
import Player from '../public/js/modules/player'
import MockCanvas from '../public/js/modules/__mocks__/canvas'
import Mode from '../public/js/modules/mode'
import { veryEasyMode } from '../public/js/constants'

describe('brick', () => {
	test('brick should have the right properties', () => {
		const brick = new Brick()

		expect(brick).toHaveProperty('brickColor')
		expect(brick).toHaveProperty('brickRowCount')
		expect(brick).toHaveProperty('brickColumnCount')
		expect(brick).toHaveProperty('brickWidth')
		expect(brick).toHaveProperty('brickHeight')
		expect(brick).toHaveProperty('brickPadding')
		expect(brick).toHaveProperty('brickOffsetTop')
		expect(brick).toHaveProperty('brickOffsetLeft')
		expect(brick).toHaveProperty('bricks')
		expect(brick).toHaveProperty('drawBricks')
		expect(brick).toHaveProperty('getBrickColumnCount')
		expect(brick).toHaveProperty('getBrickRowCount')
		expect(brick).toHaveProperty('getBrickWidth')
		expect(brick).toHaveProperty('getBrickHeight')
		expect(brick).toHaveProperty('getBricks')
	})

	test('bricks should be drawn on start', () => {
		const brick = new Brick()
		const brickRows = brick.getBricks()[0].length
		const brickColumns = brick.getBricks().length

		expect(brickRows).toBe(10)
		expect(brickColumns).toBe(7)
	})

	test('getters', () => {
		const brick = new Brick()

		expect(brick.getBrickColumnCount()).toBe(7)
		expect(brick.getBrickRowCount()).toBe(10)
		expect(brick.getBrickWidth()).toBe(75)
		expect(brick.getBrickHeight()).toBe(20)
		expect(brick.getBricks().length).toBe(7)
	})

	describe('game interactions', () => {
		test('drawBricks should be called while game draws', () => {
			const canvas = new MockCanvas()
			const canvasHeight = canvas.getHeight()
			const canvasWidth = canvas.getWidth()
			const mode = new Mode(veryEasyMode)

			const ball = new Ball(canvasHeight, canvasWidth, mode)
			const brick = new Brick()
			const paddle = new Paddle(canvas)
			const player = new Player(mode)
			const game = new Game(ball, brick, canvas, mode, paddle, player)

			const spy = jest.spyOn(brick, 'drawBricks')

			game.draw(ball, brick, canvas, paddle, player)
			expect(spy).toHaveBeenCalled()
			expect(spy).toHaveBeenCalledTimes(1)
			expect(spy).toHaveBeenCalledWith(canvas)
		})
	})
})
