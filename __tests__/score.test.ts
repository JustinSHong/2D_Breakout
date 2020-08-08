import { createScoreTimestamp } from '../public/js/services/score'

describe('functions related to score creation', () => {
	test('createScoreTimeStamp()', () => {
		const timestamp = createScoreTimestamp()
		const date = new Date()
		const expected = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`

		expect(timestamp).toBeTruthy()
		expect(typeof timestamp).toBe('string')
		expect(timestamp).toBe(expected)
	})
})
