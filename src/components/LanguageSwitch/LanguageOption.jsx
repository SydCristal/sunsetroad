import styled from 'styled-components'
import { C } from '../../Utils'

const LanguageOption = ({ visible, onPointerDown, short, long }) => {
		//console.log('RENDER LANGUAGE SWITCH LABEL')

		return (
				<StlLanguageOption $visible={visible} onPointerDown={onPointerDown}>
						<DesktopLabel>{long}</DesktopLabel>
						<MobileLabel>{short}</MobileLabel>
				</StlLanguageOption>
		)
}

const StlLanguageOption = styled.li`
		position: absolute;
		transition: opacity 0.3s ease-in-out;
		top: 0;
		right: 0;
		${({ $visible }) => {
				if ($visible) return `
						opacity: 1;
						pointer-events: all;
				`

				return `
						opacity: 0;
						pointer-events: none;
		`}};
`

const DesktopLabel = styled.span`
		${C.isMobile} {
				display: none;
		};
		line-height: 35px;
		font-family: 'Fira Sans', sans-serif;
		font-size: 20px;
		opacity: ${C.UI_EL_OPACITY};
		transition: opacity 0.2s ease-in-out;
		&:hover {
				opacity: ${C.ACTIVE_UI_EL_OPACITY};
		};
`

const MobileLabel = styled.span`
		${C.isDesktop} {
				display: none;
		};
		font-size: 26px;
		font-family: 'Orelega One', serif;
		text-shadow: ${C.TEXT_OUTLINE};
`

export { LanguageOption }