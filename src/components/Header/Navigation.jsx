import styled from 'styled-components'
import { useSectionContext, useLanguageContext } from '../../Contexts'
import { l } from './'
import { S } from '../../Utils'

const StlNavigation = styled.nav`
		height: 35px;
		display: flex;
		flex-direction: row;
		align-items: center;
`
const Link = styled.a`
		opacity: ${({ $selected }) => $selected ? S.ACTIVE_UI_EL_OPACITY : S.UI_EL_OPACITY};
		text-decoration: none;
		margin-right: 30px;
		font-family: 'Fira Sans', sans-serif;
		font-size: 20px;
		font-weight: 400;
		line-height: normal;
		&:hover {
				opacity: ${S.ACTIVE_UI_EL_OPACITY};
		};
`

export function Navigation() {
		const { section, setSection } = useSectionContext()
		const { language } = useLanguageContext()
		l.setLanguage(language)
		const sections = [{
				value: 'products',
				label: l.products
		}, {
				value: 'partners',
				label: l.partners
		}, {
				value: 'info',
				label: l.info
		}]

		const onLinkClink = (e, value) => {
				e.preventDefault()
				setSection(value)
		}

		return (
				<StlNavigation>
						{sections.map(({ value, label }) => (
								<Link
										key={value}
										href={`/${value}`}
										target='_blank'
										$selected={section === value}
										onClick={e => onLinkClink(e, value)}>
										{label}
								</Link>
						))}
				</StlNavigation>
		)
}