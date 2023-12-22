import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import styled from 'styled-components'
import { C } from '../../Utils'
import { useMemo, memo } from 'react'

const DesktopInfo = memo(() => {
		const { language } = useLanguageContext()
		useMemo(() => l.setLanguage(language), [language])

		console.log('RENDER DESKTOP INFO')

		return (
				<StlDesktopInfo>
						<Slogan>{l.slogan}</Slogan>
						<Text>{l.text}</Text>
				</StlDesktopInfo>
		)
})

const StlDesktopInfo = styled.div`
		font-family: Bitter;
		font-weight: 600;
		text-shadow: ${C.TEXT_SHADOW};
		opacity: ${C.TEXT_REGULAR_OPACITY};
		margin-right: 20px;
		width: 625px;
`

const Slogan = styled.h1`
		margin: 0 0 10px;
		font-size: 24px;
`

const Text = styled.p`
		margin: 0;
		font-size: 18px;
		line-height: 22px;
`

export { DesktopInfo }