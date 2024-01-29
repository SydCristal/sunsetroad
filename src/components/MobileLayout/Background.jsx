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
				const shiftY = -50 + coefY * 400
				if (sky) sky.style.transform = `translateY(${shiftY}px)`
		}, [scrollTop])

		return (
				<StlBackground ref={bgRef}>
						<Sky
								onLoad={onPictureLoad}
								ref={skyRef}
								src={Bg('sky', false, 'jpg')}
								alt='sky'/>
						<MobileAnimation />
						<Landscape	/>
				</StlBackground>
		)
}

const onPictureLoad = ({ target }) => {
		target.classList.add('loaded')
}

const StlBackground = styled.div`
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		overflow: hidden;
		background-image: linear-gradient(to bottom, rgba(32, 103, 157, 1) 0%, 2.380952425301075%, rgba(40, 120, 183, 1) 4.76190485060215%, 6.462584994733334%, rgba(78, 128, 191, 1) 8.163265138864517%, 10.204081609845161%, rgba(132, 137, 185, 1) 12.244898080825806%, 13.265306502580643%, rgba(161, 137, 175, 1) 14.28571492433548%, 15.816327184438705%, rgba(208, 145, 166, 1) 17.34693944454193%, 19.0476194024086%, rgba(247, 175, 126, 1) 20.74829936027527%, 22.959183156490326%, rgba(254, 185, 60, 1) 25.170066952705383%, 27.721087634563446%, rgba(255, 182, 35, 1) 30.27210831642151%, 32.65306055545807%, rgba(252, 173, 21, 1) 35.03401279449463%, 38.77550959587097%, rgba(248, 142, 4, 1) 42.517006397247314%, 48.469388484954834%, rgba(254, 156, 16, 1) 54.42177057266235%, 58.33333432674408%, rgba(252, 137, 18, 1) 62.244898080825806%, 68.19728016853333%, rgba(242, 65, 15, 1) 74.14966225624084%, 87.07483112812042%, rgba(236, 38, 12, 1) 100%);
`

const Sky = styled.img`
		transform: translateY(-50px);
		opacity: 0;
		transition: opacity 1s;
		&.loaded {
				opacity: 1;
		};
`

export { Background }