import styled from 'styled-components'
import { Landscape } from './'
import { useScrollTopContext } from '../../Contexts'
import MobileAnimation from '../MobileAnimation'
import { Bg } from '../../Utils'
import { useRef, useEffect } from 'react'

const Background = () => {
		const { scrollTop } = useScrollTopContext()
		const bgRef = useRef(null)
		const skyRef = useRef(null)

		useEffect(() => {
				const bg = bgRef?.current
				const sky = skyRef?.current
				const totalHeight = bg?.clientHeight || 0
				const screenHeight = window.innerHeight
				const scrollHeight = totalHeight - screenHeight
				const coefY = scrollTop / scrollHeight
				const shiftY = -50 + coefY * 275
				if (sky) sky.style.transform = `translateY(${shiftY}px)`
		}, [scrollTop])

		console.log('RENDER BACKGROUND')

		return (
				<StlBackground ref={bgRef}>
						<Sky
								ref={skyRef}
								src={Bg('sky', false, 'jpg')}
								alt='sky'/>
						<MobileAnimation />
						<Landscape	/>
				</StlBackground>
		)
}

const StlBackground = styled.div`
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		overflow: hidden;
		background-color: #EE2F13;
`

const Sky = styled.img`
		transform: translateY(-50px);
`

export { Background }