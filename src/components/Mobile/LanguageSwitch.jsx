import { useLanguageContext } from '../../Contexts'
import styled from 'styled-components'
//import { useState } from 'react'
import { Bg, S } from '../../Utils'

const StlLanguageSwitch = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		height: 35px;
		align-items: center;
`

const OptionContainer = styled.div`
		position: relative;
		width: 50px;
		height: 100%;
`

const Option = styled.div`
		opacity: ${({ $selected }) => $selected ? 0 : 1};
		position: absolute;
		left:	50%;
		transform: translateX(-50%);
		height: 100%;
		cursor: pointer;
		transition: all 0.5s ease-in-out;
		font-size: 26px;
		font-family: 'Orelega One';
		font-weight: 400;
		text-shadow: 1px 1px 1px ${S.TEXT_SHADOW}, -1px 1px 1px ${S.TEXT_SHADOW}, 1px -1px 1px ${S.TEXT_SHADOW}, -1px -1px 1px ${S.TEXT_SHADOW};
`
//		width: ${({ $expanded, $selected }) => $expanded || $selected ? '50px' : '0'};
//		opacity: ${({ $expanded, $selected }) => $expanded || $selected ? '1' : '0'};
//		font-weight: ${({ $selected }) => $selected ? 'bold' : 'normal'};
//		margin-left: ${({ $expanded }) => $expanded ? '20px' : '0'};
//		cursor: pointer;
//		transition: all 0.5s ease-in-out;
//		font-size: 26px;
//		font-family: 'Orelega One';
//		font-weight: 400;
//		text-shadow: 1px 1px 1px ${S.TEXT_SHADOW}, -1px 1px 1px ${S.TEXT_SHADOW}, 1px -1px 1px ${S.TEXT_SHADOW}, -1px -1px 1px ${S.TEXT_SHADOW};
//`

const Cloud = styled.div`
		position: relative;
		top: -135%;
		img {
				position: absolute;
				right: 20px;
		}
`

const languages = ['en', 'id']//, 'uk', 'ru']
const options = languages.map(value => ({ value, label: value.toUpperCase() }))
export function LanguageSwitch() {
		const { language, setLanguage } = useLanguageContext()
		//const [ expanded, setExpanded ] = useState(false)

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
				<StlLanguageSwitch>
						<Cloud>
								<img src={Bg('cloud1', false)} />
						</Cloud>
						<OptionContainer>
								{options.map(renderOption)}
						</OptionContainer>
				</StlLanguageSwitch>
		)
}