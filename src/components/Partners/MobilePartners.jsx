import { PartnerCarousel, l } from './'
import { Localizer } from '../Common'
import styled from 'styled-components'
import { Ic, C } from '../../Utils'
import { memo } from 'react'

const MobilePartners = memo(() => {
		return (
				<StlMobilePartners>
						<PartnerCarousel
								getControls={getControls}
								contentStyles={{ height: '200px', position: 'absolute', zIndex: 2 }}
								maxGroupSize={5} />
				</StlMobilePartners>
		)
})

const getControls = rotateCarousel => (
		<ControlContainer>
				<Arrow
						key='left'
						src={Ic('scroll-left', false)}
						alt='scroll-left'
						onPointerDown={e => rotateCarousel(1)} />
				<Heading tag='h2' localization={l.partners} />
				<Arrow
						key='right'
						src={Ic('scroll-right', false)}
						alt='scroll-right'
						onPointerDown={e => rotateCarousel(-1)}/>
		</ControlContainer>
)

const StlMobilePartners = styled.section`
		height: 270px;
`

const ControlContainer = styled.div`
		position: relative;
		height: 40px;
		display: flex;
		flex-direction: row;
		margin: 0 auto 30px;
		width: fit-content;
`

const Heading = styled(Localizer)`
		margin: 0 10px;
		font-family: 'Orelega One';
		font-size: 35px;
		font-weight: 400;
		text-shadow: ${C.TEXT_OUTLINE};
`

const Arrow = styled.img`
		cursor: pointer;
		display: block;
		width: 32px;
		height: 20px;
		transform: translateY(50%);
`

export { MobilePartners }

