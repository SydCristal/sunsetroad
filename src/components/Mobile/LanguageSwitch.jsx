import { useLanguageContext } from '../../Contexts'
import styled from 'styled-components'
import { useState } from 'react'
import { Bg } from '../../Utils'

const StlLanguageSwitch = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
`

const Option = styled.div`
		width: ${({ $expanded, $selected }) => $expanded || $selected ? '50px' : '0'};
		opacity: ${({ $expanded, $selected }) => $expanded || $selected ? '1' : '0'};
		font-weight: ${({ $selected }) => $selected ? 'bold' : 'normal'};
		margin-left: ${({ $expanded }) => $expanded ? '20px' : '0'};
		transition: all 0.5s ease-in-out;
		font-size: 26px;
`

const Cloud = styled.div`
		position: relative;
		img {
				position: absolute;
				right: 20px;
				top: -15px;
		}
`

const languages = ['en', 'id', 'uk', 'ru']
const options = languages.map(value => ({ value, label: value.toUpperCase() }))
export function LanguageSwitch() {
		const { language, setLanguage } = useLanguageContext()
		const [ expanded, setExpanded ] = useState(false)
		const renderOption = ({ value, label }) => {
				return (
						<Option
								$expanded={expanded}
								$selected={value === language}
								key={value}
								onPointerDown={e => {
										e.preventDefault()
										e.stopPropagation()
										if (expanded) {
												setLanguage(value)
												setExpanded(false)
										} else {
												setExpanded(true)
										}
								}}>
								{label}
						</Option>
				)
		}

		return (
				<StlLanguageSwitch $expanded={expanded}>
						<Cloud>
								<img src={Bg('cloud1', false)} />
						</Cloud>
						{options.map(renderOption)}
				</StlLanguageSwitch>
		)
}