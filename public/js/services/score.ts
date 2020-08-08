// use localStorage as a source of truth for game scores

interface Score {
	score: Number
	timeStamp: Date
}

// generate timestamp
// draw table rows with score data
// add score to table

export const createScoreTimestamp = (): String => {
	const date = new Date()

	return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
}
