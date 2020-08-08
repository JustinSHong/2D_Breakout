// use localStorage as a source of truth for game scores

interface Score {
	score: number
	timestamp: string
}

// generate timestamp
// draw table rows with score data
// add score to table

export const createScoreTimestamp = (): string => {
	const date = new Date()

	return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
}

export const createScore = (score: number): Score => {
	const timestamp = createScoreTimestamp()
	const userScore: Score = {
		score,
		timestamp,
	}
	console.log('local storage size: ', localStorage.length)

	return userScore
}

export const setScore = (userScore: Score): void => {
	localStorage.setItem(`${localStorage.length}`, JSON.stringify(userScore))
}

export const getScores = (): Score[] => {
	let scores: Score[] = []

	for (let i = 0; i < localStorage.length; i++) {
		const score: Score = JSON.parse(localStorage.getItem(`${i}`) as any)
		scores.push(score)
	}

	console.log('scores: ', scores)
	return scores
}
