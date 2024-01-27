import styled from 'styled-components'
import { useSectionContext } from '../../Contexts'
import { l } from './'
import { C } from '../../Utils'
import { memo } from 'react'
import { Localizer } from '../Common'

const Navigation = memo(() => {
		const { setSection } = useSectionContext()
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

		//console.log('RENDER DESKTOP NAVIGATION');

		return (
				<StlNavigation>
						{sections.map(({ value, label }) => (
								<Link
										key={value}
										$section={value}
										onClick={e => onLinkClink(e, value)}>
										<Localizer localization={label} />
								</Link>
						))}
				</StlNavigation>
		)
})

const StlNavigation = styled.nav`
		display: flex;
		align-items: center;
`
const Link = styled.span`
		.${({ $section }) => $section} & {
				opacity: ${C.ACTIVE_UI_EL_OPACITY};
		};
		opacity: ${C.UI_EL_OPACITY};
		transition: opacity 0.2s ease-in-out;
		margin-right: 30px;
		font-family: 'Fira Sans', sans-serif;
		font-size: 20px;
		width: 80px;
		cursor: pointer;
		&:first-child {
				text-align: end;
		};
		text-align: center;
		&:last-child {
				text-align: start;
		};
		> span {
				width: 80px;
		};
		&:hover {
				opacity: ${C.ACTIVE_UI_EL_OPACITY};
		};
`

export { Navigation }