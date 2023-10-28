import { useLanguageContext } from '../../Contexts'
import styled from 'styled-components'
import { S } from '../../Utils'

const StlLanguageSwitch = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		height: 35px;
		align-items: center;
`

const OptionContainer = styled.div`
		position: relative;
		height: 100%;
		width: ${({ $isMobile }) => $isMobile ? 50 : 150}px;
`

const Option = styled.div`
		position: absolute;
		height: 100%;
		cursor: pointer;
		transition: opacity 0.5s ease-in-out;
		font-weight: 400;
		pointer-events: ${({ $selected }) => $selected ? 'none' : 'all'};
		right: 0;
		text-align: center;
		&:hover {
				opacity: ${({ $selected }) => $selected ? 0 : S.ACTIVE_UI_EL_OPACITY};
		};
		${({ $isMobile, $selected }) => $isMobile ? `
				opacity: ${$selected ? 0 : 1};
				left:	50%;
				transform: translateX(-50%);
				font-size: 26px;
				font-family: 'Orelega One', serif;
				text-shadow: ${S.TEXT_OUTLINE};
		` : `
				opacity: ${$selected ? 0 : S.UI_EL_OPACITY};
				font-family: 'Fira Sans', sans-serif;
				font-size: 20px;
				line-height: 35px;
		`};
`
export function LanguageSwitch({ isMobile = false }) {
		const { language, setLanguage } = useLanguageContext()
		const languages = {
				en: 'English',
				id: 'Indonesia'
		}

		let options

		if (isMobile) {
				options = Object.keys(languages).map(value => ({ value, label: value.toUpperCase() }))
		} else {
				options = Object.entries(languages).map(([value, label]) => ({ value, label }))
		}

		const onSwitchLanguage = e => {
				e.stopPropagation()
				e.preventDefault()
				setLanguage(language === 'en' ? 'id' : 'en')
		}

		const renderOption = ({ value, label }) => {
				return (
						<Option
								$isMobile={isMobile}
								onPointerDown={onSwitchLanguage}
								$selected={value === language}
								key={value}>
								{label}
						</Option>
				)
		}

		return (
				<StlLanguageSwitch>
						<OptionContainer $isMobile={isMobile}>
								{options.map(renderOption)}
						</OptionContainer>
				</StlLanguageSwitch>
		)
}

//import { useLanguageContext } from '../../Contexts'
//import { Select } from '../Common'
//import { useMediaQuery } from 'react-responsive'
//import { MAX_MOBILE_WIDTH } from '../../Utils/CSSVariables'

//const optionMap = {
//		en: 'English',
//		id: 'Indonesia',
//		uk: 'Українська',
//		ru: 'Русский'
//}


//export function LanguageSwitch() {
//		const { language, setLanguage } = useLanguageContext()
//		const options = Object.entries(optionMap).map(([value, label]) => ({ value, label }))

//		const selectCfg = {
//				label: optionMap[language],
//				value: language,
//				setValue: setLanguage,
//				options
//		}

//		return (
//				<Select { ...selectCfg }/>
//		)
//}