import { useState } from 'react'
import styled from 'styled-components'
import { S } from '../../Utils'

const StLSelect = styled.div`
		border: none;
		background-color: transparent;
		position: relative;
		width: 130px;
		height: 30px;
		&:not(.disabled) > div:first-child {
				cursor: pointer;
		};
		> div:first-child {
				width: 100%;
				height: 100%;
				position: absolute;
				display: flex;
				justify-content: center;
				align-items: center;
				p {
						font-weight: bold;
						opacity: ${S.UI_EL_OPACITY};
						&:hover {
								opacity: ${S.ACTIVE_UI_EL_OPACITY};
						};
				};
		};
`

const Dropdown = styled.div`
		transition: height 0.3s ease-in-out;
		overflow: hidden;
		position: absolute;
		width: 100%;
		height: ${({ $expanded, $optionCount }) => $expanded ? `${$optionCount * 30 + 10}px` : '0'};
		top: 100%;
		border-radius: 0 0 10px 10px;
		> div:first-child {
				position: absolute;
				top: 10px;
				height: ${({ $optionCount }) => `${$optionCount * 30}px`};
				background-color: #00000095;
				width: 100%;
		};
		ul {
				position: absolute;
				width: 100%;
				list-style: none;
				padding: 0;
				margin: 0;
				li {
						height: 30px;
						text-align: center;
						cursor: pointer;
						font-weight: bold;
						line-height: 30px;
						opacity: ${S.UI_EL_OPACITY};
						&:hover {
								opacity: ${S.ACTIVE_UI_EL_OPACITY};
						};
				};
		};
`

export function Select({ placeholder, value, label, setValue, options, onOpen, onDropdownClose, disabled, icon }) {
		const [expanded, setExpanded] = useState(false)
		const onExpanderClick = e => {
				if (disabled) return
				e.preventDefault()
				e.stopPropagation()
				if (!expanded) {
						onOpen && onOpen(e)
						setExpanded(true)
						document.addEventListener('click', ({ target }) => {
								if (!target.closest('.select-dropdown')) closeDropdown(target)
						})
				} else {
						closeDropdown()
				}
		}

		const closeDropdown = target => {
				setExpanded(false)

				onDropdownClose && onDropdownClose(target)

				document.removeEventListener('click', ({ target }) => {
						if (!target.closest('.select-dropdown')) closeDropdown(target)
				})
		}

		const onOptionClick = value => {
				closeDropdown()
				setValue(value)
		}

		return (
				<StLSelect className={`select-input${expanded ? ' expanded' : ''}${disabled ? ' disabled' : ''}`}>
						<div onClick={onExpanderClick}>
								<p>{icon || label || value || placeholder}</p>
						</div>
						<Dropdown
								$expanded={expanded}
								$optionCount={options?.length - (label || value ? 1 : 0)}
								className='select-dropdown'>
								<div />
								<ul>
										{options?.filter(option => {
												return !!icon || (option?.value !== value && option !== value)
										}).map(option => (
												<li
														key={option?.value || option}
														onClick={() => onOptionClick(option?.value || option)}>
														{option?.label || option}
												</li>
										))}
								</ul>
						</Dropdown>
				</StLSelect>
		)
}