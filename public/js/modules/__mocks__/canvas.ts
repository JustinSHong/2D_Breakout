import { createCanvas } from 'canvas'

const canvas = createCanvas(900, 700)

const MockCanvas = jest.fn().mockImplementation(() => {
	return {
		canvas: canvas,
		ctx: canvas.getContext('2d'),
		width: canvas.width,
		height: canvas.height,
	}
})

export default MockCanvas
