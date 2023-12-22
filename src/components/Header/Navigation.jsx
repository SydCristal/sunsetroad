import styled from 'styled-components'
import { useSectionContext, useLanguageContext } from '../../Contexts'
import { l } from './'
import { C } from '../../Utils'
import { useMemo, memo } from 'react'

const Navigation = memo(() => {
		const { setSection } = useSectionContext()
		const { language } = useLanguageContext()
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

		useMemo(() => l.setLanguage(language), [language])

		const onLinkClink = (e, value) => {
				e.preventDefault()
				setSection(value)
		}

		console.log('RENDER DESKTOP NAVIGATION');

		return (
				<StlNavigation>
						{sections.map(({ value, label }) => (
								<Link
										key={value}
										href={`/${value}`}
										target='_blank'
										$section={value}
										onClick={e => onLinkClink(e, value)}>
										{label}
								</Link>
						))}
				</StlNavigation>
		)
})

const StlNavigation = styled.nav`
		display: flex;
		align-items: center;
`
const Link = styled.a`
		.${({ $section }) => $section} & {
				opacity: ${C.ACTIVE_UI_EL_OPACITY};
		};
		opacity: ${C.UI_EL_OPACITY};
		transition: opacity 0.2s ease-in-out;
		text-decoration: none;
		margin-right: 30px;
		font-family: 'Fira Sans', sans-serif;
		font-size: 20px;
		&:hover {
				opacity: ${C.ACTIVE_UI_EL_OPACITY};
		};
`

export { Navigation }