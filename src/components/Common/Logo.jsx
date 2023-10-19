import styled from 'styled-components'
import { S, Lo } from '../../Utils'
import { l } from './Localization'
import { useLanguageContext } from '../../Contexts'

const LogoContainer = styled.div`
		width:	185px;
		margin-right: 30px;
		display: flex;
  flex-direction: column;
		img {
				opacity: 1 !important;
				margin: -10px 0 0 -5px;
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
export function Logo() {
		const { language } = useLanguageContext()
		l.setLanguage(language)

		return (
				<LogoContainer>
						<img src={Lo('logo', false)} />
						<h2>{l.brewed}</h2>
				</LogoContainer>
		)
}