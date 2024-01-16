import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useSectionContext } from '../../Contexts'
import { Bg, C } from '../../Utils'

const Background = () => {
		const { section } = useSectionContext()
		const [productsBg, setProductsBg] = useState(section === 'products' ? <ProductsBackground /> : null)
		const [partnersBg, setPartnersBg] = useState(section === 'partners' ? <PartnersBackground /> : null)
		const [infoBg, setInfoBg] = useState(section === 'info' ? <InfoBackground /> : null)

		useEffect(() => {
				setTimeout(() => {
						if (!productsBg) setProductsBg(<ProductsBackground />)
						if (!partnersBg) setPartnersBg(<PartnersBackground />)
						if (!infoBg) setInfoBg(<InfoBackground />)
				}, 1000)
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
		background-color: transparent;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		transition: opacity 0.5s ease-in-out;
		opacity: 0;
`

const StlBackground = styled.div`
		${commonStyles};
`

const ProductsBackground = styled.div`
		${sectionStyles};
		background-image: ${Bg('products')}, ${C.productsGradient};
		.products & {
				opacity: 1;
		}
`

const PartnersBackground = styled.div`
		${sectionStyles};
		background-image: ${Bg('partners')}, ${C.partnersGradient};
		.partners & {
				opacity: 1;
		}
`

const InfoBackground = styled.div`
		${sectionStyles};
		background-image: ${Bg('info')}, ${C.infoGradient};
		.info & {
				opacity: 1;
		}
`



export { Background }