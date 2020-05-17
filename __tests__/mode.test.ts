import Mode from '../public/js/modules/mode'

describe('mode', () => {
	const mode = new Mode()

	test('mode should have the right properties', () => {
		expect(mode).toHaveProperty('dx')
		expect(mode).toHaveProperty('dy')
		expect(mode).toHaveProperty('lives')
		expect(mode).toHaveProperty('name')
		expect(mode).toHaveProperty('getMode')
		expect(mode).toHaveProperty('setMode')
	})

	test('getters and setter', () => {
		expect(mode.getMode()).toEqual({
			dx: 1.5,
			dy: -1.5,
			lives: 5,
			name: 'veryEasy',
		})

		const newMode = { dx: 5, dy: 5, lives: 5, name: 'someMode' }
		mode.setMode(newMode)
		expect(mode.getMode()).toEqual(newMode)
	})
})
