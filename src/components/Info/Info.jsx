import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import styled from 'styled-components'
import { Bg, S } from '../../Utils'

const StyledInfo = styled.div`
		min-height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
`

const Logo = styled.div`
		height: 150px;
		background: ${Bg('heading')} center top / contain no-repeat;
		width: 100%;
		margin-bottom: 25px;
`

const Content = styled.div`
		background-color: ${S.SHADOW_BG};
		width: ${S.CONTENT_AREA_WIDTH};
		padding: ${S.CONTENT_AREA_PADDING};
		border-radius: ${S.CONTENT_AREA_BORDER_RADIUS};
		display: flex;
		flex-direction: row;
		> div {
				flex: 1;
		};
		> img {
				width: 200px;
				margin: -15px 10px -15px -15px;
				opacity: 1;
		};
		h1 {
			margin: ${S.H1_MARGIN};
			text-align: center;
		};
		p {
			margin: 0;
			text-align: justify;
			font-size: 15px;
			font-weight: bold;
		};
		> * {
			opacity: ${S.ACTIVE_UI_EL_OPACITY};
		};
`
export default function Info() {
		const { language } = useLanguageContext()
		l.setLanguage(language)

		return (
				<StyledInfo>
						<Logo />
						<Content>
								<img src={Bg('logo', false)} />
								<div>
										<h1>{l.heading}</h1>
										<p>{l.text}</p>
								</div>
						</Content>
				</StyledInfo>
		)
}