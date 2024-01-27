import styled from 'styled-components'
import { C, Bg } from '../../Utils'
import { useScreenContext } from '../../Contexts'
import { memo } from 'react'

const Landscape = memo(() => {
		const { screenWidth } = useScreenContext()

		//console.log('RENDER LANDSCAPE')

		return (
				<StlLandscape
						src={Bg('landscape', false)}
						alt='landscape'
						$screenWidth={screenWidth} />)
})

const StlLandscape = styled.img.attrs(({ $screenWidth }) => {
		const minWidth = 778
		const xCoef = ($screenWidth - 768) / (C.MAX_MOBILE_WIDTH - minWidth)
		let bottom = -5
		if (xCoef > 0) {
				bottom -= 65 * xCoef
		}
		return {
				style: {
						bottom: bottom + 'px',
						minWidth: minWidth + 'px'
				}
		}
		})`
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		z-index: 1;
`

export { Landscape }