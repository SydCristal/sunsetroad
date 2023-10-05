import { useLanguageContext } from '../../Contexts'
import { Select } from '../Common'
import { useMediaQuery } from 'react-responsive'
import { MAX_MOBILE_WIDTH } from '../../Utils/CSSVariables'

const optionMap = {
		en: 'English',
		id: 'Indonesia',
		uk: 'Українська',
		ru: 'Русский'
}


export function LanguageSwitch() {
		const { language, setLanguage } = useLanguageContext()
		const options = Object.entries(optionMap).map(([value, label]) => ({ value, label }))

		const selectCfg = {
				label: optionMap[language],
				value: language,
				setValue: setLanguage,
				options
		}

		return (
				<Select { ...selectCfg }/>
		)
}