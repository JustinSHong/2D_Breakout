import { createScoreTimestamp, createScore } from '../public/js/services/score'

describe('functions related to score creation', () => {
	test('createScoreTimeStamp()', () => {
		const timestamp = createScoreTimestamp()
		const date = new Date()
		const expected = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`

		expect(timestamp).toBeTruthy()
		expect(typeof timestamp).toBe('string')
		expect(timestamp).toBe(expected)
	})

	test('createScore()', () => {
		const score = createScore(100)

		expect(score).not.toBe(null)
		expect(score.score).toBe(100)
		expect(score.timestamp).toBe(createScoreTimestamp())
	})
})
