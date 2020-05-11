import Ball from '../public/js/modules/ball'

describe('ball', () => {
	test('ball should have the right properties', () => {
		const ball = new Ball(10, 10, { name: 'easy', dx: 1, dy: 2, lives: 3 })

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
		const ball = new Ball(10, 10, { name: 'easy', dx: 1, dy: 2, lives: 3 })
		expect(ball.ballColor).toBe('#0095DD')

		const newColor = ball.changeColor()
		expect(ball.ballColor).not.toBe(newColor)
	})

	test('update() should update x and y values', () => {
		const ball = new Ball(10, 10, { name: 'easy', dx: 1, dy: 2, lives: 3 })
		const oldXPosition = ball.x
		const oldYPosition = ball.y
		expect(ball.x).not.toBe(10)
		expect(ball.y).not.toBe(10)

		ball.update()

		expect(ball.x).not.toBe(10)
		expect(ball.y).not.toBe(10)
		expect(oldXPosition + ball.dx).toBe(ball.x)
		expect(oldYPosition + ball.dy).toBe(ball.y)
	})
})
