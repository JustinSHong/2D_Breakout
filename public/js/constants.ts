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

// themes
const pastelDefault = {
	navBarStyle: 'background-color: #1976d2 !important',
	navBarLinkStyle: 'color: #eee',
	modalHeaderStyle: 'background-color: #dc004e !important',
	modalBodyStyle: 'background-color: #272c34',
	bodyStyle: 'background-color: #272c34',
	buttonStyle:
		'background-color: #dc004e !important; border-color: #dc004e !important',
	tableHeaderStyle: 'background-color: #dc004e',
}

const pastelOne = {
	navBarStyle: 'background-color: #2a9d8fff !important',
	modalHeaderStyle: 'background-color: #e76f51ff !important',
	modalBodyStyle: 'background-color: #264653ff',
	bodyStyle: 'background-color: #264653ff',
	buttonStyle:
		'background-color: #e76f51ff !important; border-color: #e76f51ff !important',
	tableHeaderStyle: 'background-color: #e76f51ff',
}

const pastelTwo = {
	navBarStyle: 'background-color: #a8dadcff !important',
	navBarLinkStyle: 'color: #000 !important',
	modalHeaderStyle: 'background-color: #e63946ff !important',
	modalBodyStyle: 'background-color: #1d3557ff',
	bodyStyle: 'background-color: #1d3557ff',
	buttonStyle:
		'background-color: #e63946ff !important; border-color: #e63946ff !important',
	tableHeaderStyle: 'background-color: #e63946ff',
}

const pastelThree = {
	navBarStyle: 'background-color: #fcbf49ff !important',
	navBarLinkStyle: 'color: #000 !important',
	modalHeaderStyle: 'background-color: #d62828ff !important',
	modalBodyStyle: 'background-color: #003049ff',
	bodyStyle: 'background-color: #003049ff',
	buttonStyle:
		'background-color: #d62828ff !important; border-color: #d62828ff',
	tableHeaderStyle: 'background-color: #d62828ff',
}

export const pastelDict: { [id: string]: { [id: string]: string } } = {
	pastelOneRadio: pastelOne,
	pastelTwoRadio: pastelTwo,
	pastelThreeRadio: pastelThree,
	pastelDefaultRadio: pastelDefault,
}

// theme inputs
export const numberOfThemes = document.querySelectorAll<HTMLInputElement>(
	'[type=radio]'
).length
export const pastelOneRadio = document.querySelector<HTMLInputElement>(
	'#pastelOneRadio'
)
export const pastelTwoRadio = document.querySelector<HTMLInputElement>(
	'#pastelTwoRadio'
)
export const pastelThreeRadio = document.querySelector<HTMLInputElement>(
	'#pastelThreeRadio'
)
export const pastelDefaultRadio = document.querySelector<HTMLInputElement>(
	'#pastelDefaultRadio'
)
