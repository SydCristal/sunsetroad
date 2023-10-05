import { useState, useEffect } from 'react'
import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import styled from 'styled-components'
import { Bg, S } from '../../Utils'

const StlCarousel = styled.div`
		min-height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: ${S.CONTENT_AREA_WIDTH};
		position: relative;
		width: 440px;
`

const Bottles = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: relative;
		height: 350px;
`

const Product = styled.div`
		${({ onPointerDown, key, $zindex, $bottleBg, ...styles }) => ({ ...styles, zIndex: $zindex })};
		width: 90px;
		position: absolute;
		transition: transform 0.5s ease-in-out, z-index 0.5s;
		> div {
				background: ${({ $bottleBg }) => $bottleBg};
				width: 100%;
				height: 350px;
				position: absolute;
		};
`

const ArrowContainer = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		height: 0;
		position: relative;
		> img {
				width: 90px;
				height: 80px;
				top: -90px;
				position: relative;
				cursor: pointer;
		};
`

const DescriptionContainer = styled.div`
		margin-top: 15px;
		width: ${({ $width }) => $width}px;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		transform: translateX(calc(-50% + 220px));
`

const Description = styled.div`
		${({ children, key, ...styles }) => ({ ...styles })};
		transition: transform 0.5s ease-in-out;
		width: 440px;
		position: relative;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		> p {
			 text-align: center;
				text-shadow: 1px 1px 28px black;
				margin: 10px 0;
				font-size: 20px;
				font-weight: 600;
				line-height: 24px;
		};
`

const HeadingImg = styled.img`
		height: 61px;
		width: auto;
`

const titleMap = {
		islandJourney: 'Island Journey',
		longRide: 'Long Ride',
		gracefulTrip: 'Graceful Trip'
}

const productArray = Object.keys(titleMap)

export default function Products() {
		const { language } = useLanguageContext()
		const [previousSelection, setPreviousSelection] = useState('')
		const [selectedProduct, setSelectedProduct] = useState('longRide')
		const [transitioning, setTransitioning] = useState(false)
		const [shiftIndex, setShiftIndex] = useState(0)
		const [descriptionWidth, setDescriptionWidth] = useState(window.innerWidth + 880)
		l.setLanguage(language)

		window.onresize = () => setDescriptionWidth(window.innerWidth + 880)

		const rotateCarousel = (e, position, productName) => {
				e.preventDefault()
				e.stopPropagation()
				if (transitioning) return
				setTransitioning(true)
				setTimeout(() => setTransitioning(false), 500)
				if (productName === selectedProduct) return
				let newShiftIndex = shiftIndex === position ? 0 : ((shiftIndex - position) % 3) % 2 ? ((shiftIndex - position) % 3) : position
				setShiftIndex(newShiftIndex)
				setPreviousSelection(selectedProduct)
				setSelectedProduct(productName)
		}

		const onArrowClick = (e, position) => {
				e.preventDefault()
				e.stopPropagation()
				if (transitioning) return
				const selectedProductIndex = productArray.indexOf(selectedProduct)
				const productName = productArray[Math.abs(((selectedProductIndex || 3) + position) % 3)]
				rotateCarousel(e, position, productName)
		}

		const getBottleProps = productName => {
				let $zindex = 0
				let position
				if (productName === selectedProduct) $zindex = 2
				if (productName === previousSelection) $zindex = 1

				switch (productName) {
						case 'islandJourney':
								position = shiftIndex === 0 ? -1 : shiftIndex > 0 ? 0 : 1
								break
						case 'gracefulTrip':
								position = shiftIndex === 0 ? 1 : shiftIndex > 0 ? -1 : 0
								break
						default:
								position = shiftIndex
				}

				let transform

				switch (position) {
						case -1:
								transform = 'rotate(-16deg) scale(0.8) translate(-150px, 0)'
								break
						case 1:
								transform = 'rotate(12deg) scale(0.7) translate(160px, 90px)'
								break
						default:
								transform = ''
				}

				return {
						key: productName,
						transform,
						cursor: `${position ? 'pointer' : ''}`,
						$zindex,
						$bottleBg: `${Bg(productName)} center center / contain no-repeat`,
						onPointerDown: e => rotateCarousel(e, position, productName)
				}
		}

		const getDescriptionProps = productName => {
				const opacity = productName === selectedProduct || productName === previousSelection ? 1 : 0
				let transform = ''

				if (shiftIndex > 0) {
						if (productName !== 'gracefulTrip') {
								transform = `translateX(${(window.innerWidth / 2) + 220}px)`
						} else {
								transform = `translateX(${-window.innerWidth - 440}px)`
						}
				} else if (shiftIndex < 0) {
						if (productName !== 'islandJourney') {
								transform = `translateX(${-(window.innerWidth / 2) - 220}px)`
						} else {
								transform = `translateX(${window.innerWidth + 440}px)`
						}
				}

				return {
						key: productName,
						transform,
						opacity
				}
		}

		const renderProductDescription = productName => {
				return (
						<Description {...getDescriptionProps(productName)} >
								<HeadingImg src={Bg(`${productName}-heading`, false)} />
								<p>{l[`${productName}Description`]}</p>
						</Description>
				)
		}

		return (
				<StlCarousel>
						<Bottles>
								{productArray.map(productName => (
										<Product {...getBottleProps(productName)}>
												<div />
										</Product>
								))}
						</Bottles>
						<ArrowContainer>
								<img key='rotate-left' src={Bg('rotate-left', false)} onPointerDown={e => onArrowClick(e, 1)} />
								<img key='rotate-right' src={Bg('rotate-right', false)} onPointerDown={e => onArrowClick(e, -1)} />
						</ArrowContainer>
						<DescriptionContainer $width={descriptionWidth}>
								{productArray.map(renderProductDescription)}
						</DescriptionContainer>
				</StlCarousel>
		)
}