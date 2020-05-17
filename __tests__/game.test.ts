import Ball from '../public/js/modules/ball'
import Brick from '../public/js/modules/brick'
import { Game } from '../public/js/game'
import MockCanvas from '../public/js/modules/canvas'
import Mode from '../public/js/modules/mode'
import Paddle from '../public/js/modules/paddle'
import Player from '../public/js/modules/player'

jest.mock('../public/js/modules/canvas')

describe('game', () => {
	const canvas = new MockCanvas()
	const mode = new Mode()
	const ball = new Ball(canvas.height, canvas.width, mode)
	const player = new Player(mode)
	const brick = new Brick()
	const paddle = new Paddle(canvas)
	const game = new Game(ball, brick, canvas, mode, paddle, player)

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

	test('selectGameMode', () => {
		let mockEvent = { target: { value: 'Easy' } }
		const easyMode = {
			name: 'easy',
			dx: 4,
			dy: -4,
			lives: 3,
		}
		expect(game.selectGameMode(mockEvent as any)).toEqual(easyMode)

		mockEvent = { target: { value: 'Medium' } }
		const mediumMode = {
			name: 'medium',
			dx: 6,
			dy: -6,
			lives: 3,
		}
		expect(game.selectGameMode(mockEvent as any)).toEqual(mediumMode)

		mockEvent = { target: { value: 'Hard' } }
		const hardMode = {
			name: 'hard',
			dx: 8,
			dy: -8,
			lives: 2,
		}
		expect(game.selectGameMode(mockEvent as any)).toEqual(hardMode)

		mockEvent = { target: { value: 'Very Hard' } }
		const veryHardMode = {
			name: 'veryHard',
			dx: 10,
			dy: -10,
			lives: 2,
		}
		expect(game.selectGameMode(mockEvent as any)).toEqual(veryHardMode)
	})

	test('keyDownHandler', () => {
		const spy = jest.spyOn(game, 'keyDownHandler')
		const spy2 = jest.spyOn(game, 'pauseGame')
		let mockEvent = { keyCode: 39 }
		let code = game.keyDownHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(1)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(code).toBe(39)

		mockEvent = { keyCode: 37 }
		code = game.keyDownHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(2)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(code).toBe(37)

		mockEvent = { keyCode: 80 }
		code = game.keyDownHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(3)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(spy2).toHaveBeenCalled()
		expect(spy2).toHaveBeenCalledTimes(1)
		expect(code).toBe(80)

		mockEvent = { keyCode: 81 }
		code = game.keyDownHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(4)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(code).toBe(81)

		spy2.mockClear()
	})

	test('keyUpHandler', () => {
		const spy = jest.spyOn(game, 'keyUpHandler')
		let mockEvent = { keyCode: 39 }
		let code = game.keyUpHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(1)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(code).toBe(39)

		mockEvent = { keyCode: 37 }
		code = game.keyUpHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(2)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(code).toBe(37)
	})

	test('mouseClickHandler', () => {
		const spy = jest.spyOn(game, 'mouseClickHandler')
		const spy2 = jest.spyOn(game, 'pauseGame')
		const spy3 = jest.spyOn(game.paddle, 'update')
		const spy4 = jest.spyOn(game, 'resumeGame')

		let mockEvent = { target: { id: 'playBtn' } }
		let id = game.mouseClickHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(1)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(spy4).toHaveBeenCalled()
		expect(spy4).toHaveBeenCalledTimes(1)
		expect(id).toBe('playBtn')

		mockEvent = { target: { id: 'pauseBtn' } }
		id = game.mouseClickHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(2)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(spy2).toHaveBeenCalled()
		expect(spy2).toHaveBeenCalledTimes(1)
		expect(id).toBe('pauseBtn')

		mockEvent = { target: { id: 'moveLeftBtn' } }
		id = game.mouseClickHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(3)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(spy3).toHaveBeenCalled()
		expect(spy3).toHaveBeenCalledTimes(1)
		expect(spy3).toHaveBeenCalledWith(-14)
		expect(id).toBe('moveLeftBtn')

		mockEvent = { target: { id: 'moveRightBtn' } }
		id = game.mouseClickHandler(mockEvent as any)

		expect(spy).toHaveBeenCalled()
		expect(spy).toHaveBeenCalledTimes(4)
		expect(spy).toHaveBeenCalledWith(mockEvent)
		expect(spy3).toHaveBeenCalled()
		expect(spy3).toHaveBeenCalledTimes(2)
		expect(spy3).toHaveBeenCalledWith(-14)
		expect(id).toBe('moveRightBtn')
	})
})
