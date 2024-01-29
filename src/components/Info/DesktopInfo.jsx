import { l } from './Localization'
import styled from 'styled-components'
import { C } from '../../Utils'
import { memo } from 'react'
import { Localizer } from '../Common'

const DesktopInfo = memo(() => {
		return (
				<StlDesktopInfo>
						<Slogan>Find your pleasure</Slogan>
						<Text
								tag='p'
								localization={l.text} />
				</StlDesktopInfo>
		)
})

const StlDesktopInfo = styled.div`
		font-family: Bitter;
		font-weight: 600;
		text-shadow: ${C.TEXT_SHADOW};
		opacity: ${C.TEXT_REGULAR_OPACITY};
		margin-right: 20px;
		width: 625px;
`

const Slogan = styled.h2`
		margin: 0 0 10px;
		font-size: 24px;
`

const Text = styled(Localizer)`
		margin: 0;
		font-size: 18px;
		line-height: 22px;
`

export { DesktopInfo }