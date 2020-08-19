import { pastelDict } from '../constants'

const setTheme = (id: string, theme: { [key: string]: string }): string => {
	const {
		navBarStyle,
		modalHeaderStyle,
		modalBodyStyle,
		bodyStyle,
		buttonStyle,
	} = theme

	const navbar = document.querySelector('body nav.navbar')
	const modalHeaders = document.querySelectorAll(
		'.modal-content .modal-header'
	)
	const modalBodies = document.querySelectorAll('.modal-content .modal-body')
	const body = document.querySelector('body')
	const toolbarButtons = document.querySelectorAll('button.btn')

	navbar?.setAttribute('style', navBarStyle)
	modalHeaders.forEach(header => {
		header.setAttribute('style', modalHeaderStyle)
	})
	modalBodies.forEach(body => {
		body.setAttribute('style', modalBodyStyle)
	})
	body?.setAttribute('style', bodyStyle)
	toolbarButtons.forEach(btn => {
		btn.setAttribute('style', buttonStyle)
	})
	return id
}

export const changeGameTheme = (id: string): { [key: string]: string } => {
	const theme = pastelDict[id]
	setTheme(id, theme)

	return theme
}
