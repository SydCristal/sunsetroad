import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import styled from 'styled-components'
import { Lo } from '../../Utils'

const StlInfo = styled.div`
		width: ${({ $width }) => $width}px;
		margin-top: 60px;
		margin-bottom: 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
		> * {
				color: black;
				text-align: center;
		};
`

const Logo = styled.div`
		width: 230px;
		height: 230px;
		background: ${Lo('logo', true, 'svg')} center center / cover no-repeat;
		margin-bottom: 20px;
`

const Heading = styled.h1`
		margin: 0;
		font-size: 32px;
		line-height: 38px;
		font-weight: 500;
`

const Text = styled.p`
		font-size: 15px;
		line-height: 18px;
		margin: 10px 0 0 0;
		font-weight: 400;
		min-height: 150px;
`

export function Info() {
		const { language } = useLanguageContext()
		l.setLanguage(language)

		const width = language === 'en' ? 310 : 415

		return (
				<StlInfo $width={width}>
						<Logo />
						<Heading>{l.heading}</Heading>
						<Text>{l.text}</Text>
				</StlInfo>
		)
}