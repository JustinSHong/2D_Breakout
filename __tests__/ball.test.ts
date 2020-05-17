import Ball from '../public/js/modules/ball'
import MockCanvas from '../public/js/modules/canvas'
import Mode from '../public/js/modules/mode'
import { veryEasyMode } from '../public/js/constants'

jest.mock('../public/js/modules/canvas')

describe('ball', () => {
	const mode = new Mode(veryEasyMode)

	test('ball should have the right properties', () => {
		const ball = new Ball(10, 10, mode)

		expect(ball).toHaveProperty('ballColor')
		expect(ball).toHaveProperty('ballRadius')
		expect(ball).toHaveProperty('dx')
		expect(ball).toHaveProperty('dy')
		expect(ball).toHaveProperty('x')
		expect(ball).toHaveProperty('y')
		expect(ball).toHaveProperty('changeColor')
		expect(ball).toHaveProperty('drawBall')
		expect(ball).toHaveProperty('update')
	})

	test("changeColor() should change a ball's color", () => {
		const ball = new Ball(10, 10, mode)
		const color = ball.getBallColor()
		expect(color).toBe('#0095DD')

		const newColor = ball.changeColor()
		expect(color).not.toBe(newColor)
	})

	test('update() should update x and y values', () => {
		const ball = new Ball(10, 10, mode)
		const dx = ball.getBallDx()
		const dy = ball.getBallDy()
		const oldX = ball.getBallX()
		const oldY = ball.getBallY()

		ball.update()
		const newX = ball.getBallX()
		const newY = ball.getBallY()

		expect(newX).toBe(oldX + dx)
		expect(newY).toBe(oldY + dy)
	})

	test('getters and setters', () => {
		const canvas = new MockCanvas()
		const ball = new Ball(canvas.height, canvas.width, mode)
		const color = ball.getBallColor()
		const radius = ball.getBallRadius()
		const x = ball.getBallX()
		const y = ball.getBallY()
		const dx = ball.getBallDx()
		const dy = ball.getBallDy()

		expect(color).toBe('#0095DD')
		expect(radius).toBe(10)
		expect(x).toBe(canvas.width / 2)
		expect(y).toBe(canvas.height - 30)

		ball.setBallX(-x)
		ball.setBallY(-y)
		ball.setBallDx(-dx)
		ball.setBallDy(-dy)

		expect(ball.getBallX()).toBe(-x)
		expect(ball.getBallY()).toBe(-y)
		expect(ball.getBallDx()).toBe(-dx)
		expect(ball.getBallDy()).toBe(-dy)
	})
})
