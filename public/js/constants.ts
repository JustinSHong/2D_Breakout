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
export const aboutModalLink = document.querySelector<HTMLAnchorElement>(
	'#aboutModalLink'
)
export const controlsModalLink = document.querySelector<HTMLAnchorElement>(
	'#controlsModalLink'
)
export const gameModeSelect = document.querySelector<HTMLSelectElement>(
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
export const playBtn = document.querySelector<HTMLButtonElement>('#playBtn')
export const pauseBtn = document.querySelector<HTMLButtonElement>('#pauseBtn')
export const resetBtn = document.querySelector<HTMLButtonElement>('#resetBtn')
export const moveLeftBtn = document.querySelector<HTMLButtonElement>(
	'#moveLeftBtn'
)
export const moveRightBtn = document.querySelector<HTMLButtonElement>(
	'#moveRightBtn'
)

// themes

// --charcoal: #264653ff;
// --persian-green: #2a9d8fff;
// --orange-yellow-crayola: #e9c46aff;
// --sandy-brown: #f4a261ff;
// --burnt-sienna: #e76f51ff;
export const pastelOne = {}

// --imperial-red: #e63946ff;
// --honeydew: #f1faeeff;
// --powder-blue: #a8dadcff;
// --celadon-blue: #457b9dff;
// --prussian-blue: #1d3557ff;
export const pastelTwo = {}

// --prussian-blue: #003049ff;
// --maximum-red: #d62828ff;
// --orange: #f77f00ff;
// --maximum-yellow-red: #fcbf49ff;
// --lemon-meringue: #eae2b7ff;
export const pastelThree = {}

// theme inputs
export const pastelOneRadio = document.querySelector<HTMLInputElement>(
	'#pastelOneRadio'
)
export const pastelTwoRadio = document.querySelector<HTMLInputElement>(
	'#pastelTwoRadio'
)
export const pastelThreeRadio = document.querySelector<HTMLInputElement>(
	'#pastelThreeRadio'
)
