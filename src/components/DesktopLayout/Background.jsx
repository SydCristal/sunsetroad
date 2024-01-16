import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useSectionContext } from '../../Contexts'
import { Bg, C } from '../../Utils'

const Background = () => {
		const { section } = useSectionContext()
		const [productsBg, setProductsBg] = useState(section === 'products' ? <ProductsBackground src={Bg('products', false)} alt='products' /> : null)
		const [partnersBg, setPartnersBg] = useState(section === 'partners' ? <PartnersBackground src={Bg('partners', false)} alt='partners' /> : null)
		const [infoBg, setInfoBg] = useState(section === 'info' ? <InfoBackground src={Bg('info', false)} alt='info' /> : null)

		useEffect(() => {
				setTimeout(() => {
						if (!productsBg) setProductsBg(<ProductsBackground src={Bg('products', false)} alt='products' />)
						if (!partnersBg) setPartnersBg(<PartnersBackground src={Bg('partners', false)} alt='partners' />)
						if (!infoBg) setInfoBg(<InfoBackground src={Bg('info', false)} alt='info' />)
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
		object-fit: cover;
		opacity: 0;
`

const StlBackground = styled.div`
		${commonStyles};
`

const ProductsBackground = styled.img`
		${sectionStyles};
		background-image: ${C.productsGradient };
		.products & {
				opacity: 1;
		}
`

const PartnersBackground = styled.img`
		${sectionStyles};
		background-image: ${C.partnersGradient};
		.partners & {
				opacity: 1;
		}
`

const InfoBackground = styled.img`
		${sectionStyles};
		background-image: ${C.infoGradient};
		.info & {
				opacity: 1;
		}
`

export { Background }