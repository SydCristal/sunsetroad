import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import styled from 'styled-components'
import { Lo } from '../../Utils'

const Info = styled.div`
		width: 100%;
		margin-top: 70px;
		margin-bottom: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
`

const LogoContainer = styled.div`
		${({ opacity }) => ({ opacity })};
		width: 191px;
		height: 195px;
		margin-bottom: 55px;
		img {
			width: 100%;
			height: 100%;
		};
`

const TextContainer = styled.div`
		${({ opacity }) => ({ opacity })};
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 300px;
		transition: opacity 0.5s ease-in-out;
		> * {
				color: black;
				text-align: center;
		};
`

const Text = styled.p`
		font-size: 18px;
		line-height: 20px;
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

export function MobileInfo({ opacity }) {
		const { language } = useLanguageContext()
		l.setLanguage(language)

		return (
				<Info className='unselectable'>
						<LogoContainer opacity={opacity}>
								<img src={Lo('logo', false)} alt='logo' />
						</LogoContainer>
						<TextContainer opacity={opacity}>
								<Text className='unselectable'>{l.text}</Text>
								<Slogan className='unselectable'>{l.slogan}</Slogan>
						</TextContainer>
				</Info>
		)
}