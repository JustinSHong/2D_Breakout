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
})