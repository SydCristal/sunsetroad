import styled from 'styled-components'
import { useLanguageContext } from '../../Contexts'
import { useRef, memo } from 'react'
import { LanguageOption } from './'

const LanguageSwitch = memo(({ className }) => {
		const languageSwitchRef = useRef(null)
		const { language, setLanguage } = useLanguageContext()
		const languages = {
				en: 'English',
				id: 'Indonesia'
		}

		return (
				<StlLanguageSwitch
						id='language-switch'
						className={className}
						ref={languageSwitchRef}>
						{Object.keys(languages).map(l => (
								<LanguageOption
										key={l}
										visible={l !== language}
										short={l.toUpperCase()}
										long={languages[l]}
										onPointerDown={e => setLanguage(l)} />
						))}
				</StlLanguageSwitch>
		)
})

const StlLanguageSwitch = styled.ul`
		cursor: pointer;
		list-style: none;
		margin: 0;
		padding: 0;
`

export { LanguageSwitch }