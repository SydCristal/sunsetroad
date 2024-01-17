import styled from 'styled-components'
import { useLanguageContext } from '../../Contexts'

const Localizer = ({ className, localization, tag }) => {
		const { language } = useLanguageContext()
		return (
				<StlLocalizer className={className} as={tag}>
						{Object.keys(localization).map(key => {
								return (
										<LocalizedString
												key={key}
												className={`${key}-string`}
												$isDisplayed={key === language}>
												{localization[key]}
										</LocalizedString>)
						})}
				</StlLocalizer>
		)
}

const inheritedStyles = `
		font-size: inherit;
		font-weight: inherit;
		font-family: inherit;
		text-shadow: inherit;
		color: inherit;
		line-height: inherit;
`

const StlLocalizer = styled.span`
		${inheritedStyles};
		position: relative;
		display: inline-block;
`

const displayedStringStyles = `
		opacity: 1;
		position: relative;
		pointer-events: auto;
		user-select: auto;
`

const hiddenStringStyles = `
		position: absolute;
		opacity: 0;
		top: 0;
		left: 0;
		right: 0;
		pointer-events: none;
		user-select: none;
`

const LocalizedString = styled.span`
		${inheritedStyles};
		transition: opacity 0.5s ease-in-out;
		display: inline-block;
		${({ $isDisplayed }) => {
				return $isDisplayed ? displayedStringStyles : hiddenStringStyles
		}};
`

export { Localizer }