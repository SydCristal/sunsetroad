import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import styled from 'styled-components'
import { Lo } from '../../Utils'

const StlInfo = styled.div`
		width: 100%;
		margin-top: 70px;
		margin-bottom: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
`

const LogoContainer = styled.div`
		width: 191px;
		height: 195px;
		margin-bottom: 55px;
		img {
			width: 100%;
			height: 100%;
		};
`

const TextContainer = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 300px;
		> * {
				color: black;
				text-align: center;
		};
`

const Text = styled.p`
		font-size: 20px;
		line-height: 24px;
		font-weight: 600;
		padding: 0;
		margin: 0 0 5px;
`

const Slogan = styled.h1`
		padding: 0;
		margin: 0;
		font-size: 24px;
		line-height: 29px;
		font-weight: 600;
`

export function Info() {
		const { language } = useLanguageContext()
		l.setLanguage(language)

		return (
				<StlInfo>
						<LogoContainer>
								<img src={Lo('logo', false)} alt='logo' />
						</LogoContainer>
						<TextContainer>
								<Text>{l.text}</Text>
								<Slogan>{l.slogan}</Slogan>
						</TextContainer>
				</StlInfo>
		)
}