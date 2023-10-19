import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import styled from 'styled-components'
import { Heading, Logo } from '../Common'
import { S } from '../../Utils'

const Content = styled.div`
		background-color: ${S.SHADOW_BG};
		width: ${S.CONTENT_AREA_WIDTH};
		height: ${S.CONTENT_AREA_HEIGHT};
		padding: ${S.CONTENT_AREA_PADDING};
		border-radius: ${S.CONTENT_AREA_BORDER_RADIUS};
	`
export default function DesktopPartners() {
		const { language } = useLanguageContext()
		l.setLanguage(language)

		return (
				<main>
						<Heading />
						<Content>
								<Logo />
						</Content>
				</main>
		)
}