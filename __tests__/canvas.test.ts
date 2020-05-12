import MockCanvas from '../public/js/modules/canvas'

jest.mock('../public/js/modules/canvas')

describe('canvas', () => {
	test('canvas should have the right properties', () => {
		const canvas = new MockCanvas()

		expect(canvas).toHaveProperty('canvas')
		expect(canvas).toHaveProperty('ctx')
		expect(canvas).toHaveProperty('width')
		expect(canvas).toHaveProperty('height')
		expect(canvas).toHaveProperty('getCanvas')
		expect(canvas).toHaveProperty('getCtx')
		expect(canvas).toHaveProperty('getHeight')
		expect(canvas).toHaveProperty('getWidth')
	})

	test('getters', () => {
		const canvas = new MockCanvas()
		const canvas1 = new MockCanvas()

		expect(canvas.getCanvas()).toEqual(canvas1.getCanvas())
		expect(canvas.getCtx()).toEqual(canvas1.getCtx())
		expect(canvas.getHeight()).toBe(700)
		expect(canvas.getWidth()).toBe(900)
	})
})
