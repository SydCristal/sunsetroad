import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import styled from 'styled-components'
import { Bg, S, Lo } from '../../Utils'
import { TEXT_SHADOW } from '../../Utils/CSSVariables'

const Info = styled.main`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		margin-top: 20px;
`

const Heading = styled.div`
		height: 150px;
		background: ${Bg('heading')} center top / contain no-repeat;
		width: 325px;
		margin-bottom: 25px;
`

const Content = styled.div`
		background-color: ${S.SHADOW_BG};
		width: ${S.CONTENT_AREA_WIDTH};
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

const LogoContainer = styled.div`
		width:	175px;
		margin-right: 30px;
		display: flex;
  flex-direction: column;
		img {
				opacity: 1 !important;
				margin: -10px -10px 0;
				width: 195px;
		};
		h2 {
				color: #FFF;
				text-align: center;
				text-shadow: 0px 0px 18px #000;
				font-family: Bitter;
				font-size: 20px;
				font-style: normal;
				font-weight: 800;
				line-height: normal;
				text-transform: uppercase;
				margin: 15px 0 -5px;
				opacity: ${S.TEXT_REGULAR_OPACITY};
		}
`

const TextContainer = styled.div`
		flex: 1;
`
export default function DesktopInfo() {
		const { language } = useLanguageContext()
		l.setLanguage(language)

		return (
				<Info>
						<Heading />
						<Content>
								<LogoContainer>
										<img src={Lo('logo', false)} />
										<h2>{l.brewed}</h2>
								</LogoContainer>
								<TextContainer>
										<h1>{l.slogan}</h1>
										<p>{l.text}</p>
								</TextContainer>
						</Content>
				</Info>
		)
}