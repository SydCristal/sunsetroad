import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import styled from 'styled-components'

const Partners = styled.main`
`
export default function DesktopPartners() {
		const { language } = useLanguageContext()
		l.setLanguage(language)

		return (
				<Partners />
		)
}