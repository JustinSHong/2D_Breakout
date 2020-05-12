import Brick from '../public/js/modules/brick'

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
})
