import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import styled from 'styled-components'
import { S } from '../../Utils'
import { Heading, Logo } from '../Common'

const Content = styled.div`
		background-color: ${S.SHADOW_BG};
		width: ${S.CONTENT_AREA_WIDTH};
		height: ${S.CONTENT_AREA_HEIGHT};
		padding: ${S.CONTENT_AREA_PADDING};
		border-radius: ${S.CONTENT_AREA_BORDER_RADIUS};
		display: flex;
		flex-direction: row;
		* {
				text-shadow: ${S.TEXT_SHADOW};
		};
		> img {
				width: 200px;
				margin: -15px 10px -15px -15px;
				opacity: 1;
		};
		h1 {
				margin: ${S.H1_MARGIN};
				font-family: Bitter;
				font-size: 24px;
				font-weight: 600;
				opacity: ${S.TEXT_REGULAR_OPACITY};
		};
		p {
				margin: 0;
				font-family: Bitter;
				font-size: 18px;
				font-weight: 600;
				line-height: 24px;
				opacity: ${S.TEXT_REGULAR_OPACITY};
		};
`

const TextContainer = styled.div`
		flex: 1;
`
export default function DesktopInfo() {
		const { language } = useLanguageContext()
		l.setLanguage(language)

		return (
				<main>
						<Heading />
						<Content>
								<Logo />
								<TextContainer className='unselectable'>
										<h1>{l.slogan}</h1>
										<p>{l.text}</p>
								</TextContainer>
						</Content>
				</main>
		)
}