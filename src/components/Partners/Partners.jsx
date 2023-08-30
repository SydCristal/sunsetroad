import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import styled from 'styled-components'

const StyledPartners = styled.div`
		min-height: 100%;
`
export default function Partners() {
		const { language } = useLanguageContext()
		l.setLanguage(language)

		return (
				<StyledPartners />
		)
}