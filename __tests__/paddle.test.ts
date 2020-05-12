import MockCanvas from '../public/js/modules/canvas'
import Paddle from '../public/js/modules/paddle'

jest.mock('../public/js/modules/canvas')

describe('paddle', () => {
	const canvas = new MockCanvas()
	test('paddle should have the right properties', () => {
		const paddle = new Paddle(canvas)

		expect(paddle).toHaveProperty('paddleColor')
		expect(paddle).toHaveProperty('paddleHeight')
		expect(paddle).toHaveProperty('paddleWidth')
		expect(paddle).toHaveProperty('paddleX')
	})

	test('update() should update the paddleX value ', () => {
		const paddle = new Paddle(canvas)
		const oldPaddleX = paddle.getPaddleX()

		paddle.update(10)
		expect(paddle.getPaddleX()).toBe(oldPaddleX + 10)
	})

	test('getters and setters', () => {
		const paddle = new Paddle(canvas)
		const paddleX = (canvas.getWidth() - paddle.getPaddleWidth()) / 2

		expect(paddle.getPaddleColor()).toBe('#0095DD')
		expect(paddle.getPaddleHeight()).toBe(10)
		expect(paddle.getPaddleWidth()).toBe(75)
		expect(paddle.getPaddleX()).toBe(paddleX)

		paddle.setPaddleX(10)
		expect(paddle.getPaddleX()).toBe(10)
	})
})
