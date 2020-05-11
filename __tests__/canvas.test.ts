import MockCanvas from '../public/js/modules/canvas'

jest.mock('../public/js/modules/canvas')

describe('canvas', () => {
	test('canvas should have the right properties', () => {
		const canvas = new MockCanvas()

		expect(canvas).toHaveProperty('canvas')
		expect(canvas).toHaveProperty('ctx')
		expect(canvas).toHaveProperty('width')
		expect(canvas).toHaveProperty('height')
	})
})
