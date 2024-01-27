import { PartnerCarousel } from './PartnerCarousel'
import styled from 'styled-components'
import { Ic } from '../../Utils'
import { memo } from 'react'

const DesktopPartners = memo(() => {
		//console.log('RENDER DESKTOP PARTNERS')

		return (
				<PartnerCarousel
						getControls={getControls}
						contentWidth={455}
						$faddingGradient={85}
						spaceBetween={85}
						maxGroupSize={7}/>
		)
})

const getControls = rotateCarousel => (
		<ArrowContainer>
				<Arrow
						key='left'
						src={Ic('scroll-prev', false)}
						alt='scroll-left'
						onPointerDown={e => rotateCarousel(1)}/>
				<Arrow
						key='right'
						src={Ic('scroll-next', false)}
						alt='scroll-right'
						onPointerDown={e => rotateCarousel(-1)}/>
		</ArrowContainer>
)

const ArrowContainer = styled.div`
		position: absolute;
		width: 100%;
		height: 0px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 20px;
`

const Arrow = styled.img`
		cursor: pointer;
		z-index: 5;
		height: 95px;
		transform: translateY(50%);
`

export { DesktopPartners }

