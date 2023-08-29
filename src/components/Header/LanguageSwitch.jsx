import { useLanguageContext } from '../../Contexts'
import { Select } from '../Common'

const optionMap = {
		en: 'English',
		id: 'Indonesia',
		uk: 'Українська',
		ru: 'Русский'
}

const options = Object.entries(optionMap).map(([value, label]) => ({ value, label }))
export function LanguageSwitch() {
		const { language, setLanguage } = useLanguageContext()

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