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
		width: 150px;
		.mobile-language-switch & {
				width: 50px;
		};
`

const Option = styled.div`
		position: absolute;
		height: 100%;
		cursor: pointer;
		transition: opacity 0.5s ease-in-out;
		font-weight: 400;
		opacity: ${({ $selected }) => $selected ? 0 : S.UI_EL_OPACITY};
		pointer-events: ${({ $selected }) => $selected ? 'none' : 'all'};
		right: 0;
		text-align: center;
		font-family: 'Fira Sans', sans-serif;
		font-size: 20px;
		line-height: 35px;
		&:hover {
				opacity: ${({ $selected }) => $selected ? 0 : S.ACTIVE_UI_EL_OPACITY};
		};
		.mobile-language-switch & {
				opacity: ${({ $selected }) => $selected ? 0 : 1};
				left:	50%;
				transform: translateX(-50%);
				font-size: 26px;
				font-family: 'Orelega One', serif;
				text-shadow: ${S.TEXT_OUTLINE};
		};
`
export function LanguageSwitch({ className }) {
		const { language, setLanguage } = useLanguageContext()
		const languages = {
				en: 'English',
				id: 'Indonesia'
		}

		let options

		if (className === 'mobile-language-switch') {
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
								onPointerDown={onSwitchLanguage}
								$selected={value === language}
								key={value}>
								{label}
						</Option>
				)
		}

		return (
				<StlLanguageSwitch className={className}>
						<OptionContainer
								className='option-container'>
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