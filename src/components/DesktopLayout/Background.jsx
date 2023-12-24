import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useSectionContext } from '../../Contexts'
import { Bg } from '../../Utils'

const Background = () => {
		const { section } = useSectionContext()
		const [productsBg, setProductsBg] = useState(section === 'products' ? <ProductsBackground /> : null)
		const [partnersBg, setPartnersBg] = useState(section === 'partners' ? <PartnersBackground /> : null)
		const [infoBg, setInfoBg] = useState(section === 'info' ? <InfoBackground /> : null)

		useEffect(() => {
				if (!productsBg) setProductsBg(<ProductsBackground />)
				if (!partnersBg) setPartnersBg(<PartnersBackground />)
				if (!infoBg) setInfoBg(<InfoBackground />)
		}, [])

		console.log('RENDER DESKTOP BACKGROUND')

		return (
				<StlBackground>
						{productsBg}
						{partnersBg}
						{infoBg}
				</StlBackground>
		)
}

const commonStyles = css`
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
`

const sectionStyles = css`
		${commonStyles};
		transition: opacity 0.5s ease-in-out;
		opacity: 0;
`

const StlBackground = styled.div`
		${commonStyles};
`

const ProductsBackground = styled.div`
		${sectionStyles};
		background: ${Bg('products')} center center / cover no-repeat;
		.products & {
				opacity: 1;
		}
`

const PartnersBackground = styled.div`
		${sectionStyles};
		background: ${Bg('partners')} center center / cover no-repeat;
		.partners & {
				opacity: 1;
		}
`

const InfoBackground = styled.div`
		${sectionStyles};
		background: ${Bg('info')} center center / cover no-repeat;
		.info & {
				opacity: 1;
		}
`

export { Background }