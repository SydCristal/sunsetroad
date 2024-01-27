import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useSectionContext } from '../../Contexts'
import { Bg, C } from '../../Utils'

const Background = () => {
		const { section } = useSectionContext()
		const productsImg = <ProductsBackground onLoad={onPictureLoad} src={Bg('products', false)} alt='products' />
		const partnersImg = <PartnersBackground onLoad={onPictureLoad} src={Bg('partners', false)} alt='partners' />
		const infoImg = <InfoBackground onLoad={onPictureLoad} src={Bg('info', false)} alt='info' />
		const [productsBg, setProductsBg] = useState(section === 'products' ? productsImg : null)
		const [partnersBg, setPartnersBg] = useState(section === 'partners' ? partnersImg : null)
		const [infoBg, setInfoBg] = useState(section === 'info' ? infoImg : null)

		useEffect(() => {
				setTimeout(() => {
						if (!productsBg) setProductsBg(productsImg)
						if (!partnersBg) setPartnersBg(partnersImg)
						if (!infoBg) setInfoBg(infoImg)
				}, 1000)
		}, [])

		//console.log('RENDER DESKTOP BACKGROUND')

		return (
				<StlBackground $section={section}>
						{productsBg}
						{partnersBg}
						{infoBg}
				</StlBackground>
		)
}

const onPictureLoad = ({ target }) => {
		target.classList.add('loaded')
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
		transition: opacity 0.5s ease-in-out;
		object-fit: cover;
		opacity: 0;
`

const StlBackground = styled.div`
		${commonStyles};
		background-color: rgba(0, 0, 0, 0.5);
		background-blend-mode: color;
		background-image: ${({ $section }) => {
				if ($section === 'products') return C.productsGradient
				if ($section === 'partners') return C.partnersGradient
				if ($section === 'info') return C.infoGradient
		}};
`

const ProductsBackground = styled.img`
		${sectionStyles};
		.products &.loaded {
				opacity: 1;
		}
`

const PartnersBackground = styled.img`
		${sectionStyles};
		.partners &.loaded {
				opacity: 1;
		}
`

const InfoBackground = styled.img`
		${sectionStyles};
		.info &.loaded {
				opacity: 1;
		}
`

export { Background }