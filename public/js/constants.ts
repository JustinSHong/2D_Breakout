// game modes
export const easyMode = {
	name: 'easy',
	dx: 2,
	dy: -2,
	lives: 5,
}

export const mediumMode = {
	name: 'medium',
	dx: 2.5,
	dy: -2.5,
	lives: 4,
}

export const hardMode = {
	name: 'hard',
	dx: 3,
	dy: -3,
	lives: 3,
}

export const veryHardMode = {
	name: 'veryHard',
	dx: 3.5,
	dy: -3.5,
	lives: 4,
}

export const veryEasyMode = {
	dx: 1.5,
	dy: -1.5,
	lives: 5,
	name: 'veryEasy',
}

// modals
export const controlsModalLink = document.querySelector<HTMLAnchorElement>(
	'#controlsModalLink'
)
export const gameMode = document.querySelector<HTMLSelectElement>(
	'#gameModeSelect'
)
export const settingsModalLink = document.querySelector<HTMLAnchorElement>(
	'#settingsModalLink'
)
export const gameEndModalTitle = document.querySelector<HTMLDivElement>(
	'#gameEndModalTitle'
)
export const gameEndModalBody = document.querySelector<HTMLDivElement>(
	'#gameEndModalBody'
)

// tool bar controls
export const play = document.querySelector<HTMLButtonElement>('#playBtn')
export const pauseBtn = document.querySelector<HTMLButtonElement>('#pauseBtn')
export const reset = document.querySelector<HTMLButtonElement>('#resetBtn')
export const moveLeft = document.querySelector<HTMLButtonElement>(
	'#moveLeftBtn'
)
export const moveRight = document.querySelector<HTMLButtonElement>(
	'#moveRightBtn'
)
