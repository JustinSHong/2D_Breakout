import { pastelOne, pastelTwo, pastelThree } from '../constants'

interface Theme {
	[color: string]: string
}

export const changeGameTheme = (theme: Theme): void => {
	console.log('CHOSEN THEME: ', theme)

	// change theme here
}
