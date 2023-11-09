import { useState, useEffect } from 'react'
import { useLanguageContext, useScreenContext } from '../../Contexts'
import { l } from './Localization'
import styled from 'styled-components'
import { Bg, S } from '../../Utils'

const StlCarousel = styled.div`
		${({ opacity }) => ({ opacity })};
		transition: opacity 0.5s ease-in-out;
		position: relative;
		width: 100%;
		&.mobile-products {
				min-height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
		};
		&.desktop-products {
				height: 265px;
				background-color: ${S.SHADOW_BG};
				width: ${S.CONTENT_AREA_WIDTH};
				padding: ${S.CONTENT_AREA_PADDING};
				border-radius: ${S.CONTENT_AREA_BORDER_RADIUS};
		};
`

const Bottles = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: center;
		.mobile-products & {
				position: relative;
				height: 350px;
		};
		.desktop-products & {
				position: absolute;
				bottom: 50px;
				right: 10px;
				height: 475px;
				width: 350px;
		};
`

const Product = styled.div`
		${({ onPointerDown, key, $zindex, $bottleBg, ...styles }) => ({ ...styles })};
		z-index: ${({ $zindex }) => 2 + $zindex} !important;
		position: absolute;
		transition: transform 0.5s ease-in-out, z-index 0.5s;
		.mobile-products & {
				width: 90px;
		};
		.desktop-products & {
				width: 125px;
		};
		> div {
				background: ${({ $bottleBg }) => $bottleBg};
				width: 100%;
				position: absolute;
				.mobile-products & {
						height: 350px;
				};
				.desktop-products & {
						height: 475px;
				};
		};
`

const ArrowContainer = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.mobile-products & {
				width: 100%;
				height: 0;
				position: relative;
		};
		.desktop-products & {
				position: absolute;
				bottom: 25px;
				right: 15px;
				width: 330px;
				height: 0px;
		};
		> img {
				width: 90px;
				height: 80px;
				top: -90px;
				position: relative;
				cursor: pointer;
				z-index: 2;
		};
`

const DescriptionContainer = styled.div.attrs(({ $descriptionWidth }) => {
		return {
				style: {
						width: `${$descriptionWidth}px`
				}
		}})`
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		transform: translateX(calc(-50% + ${({ $contentWidth }) => $contentWidth / 2}px));
		.mobile-products & {
				margin-top: 10px;
				height: 300px;
		};
		.desktop-products & {
				h2 {
						margin: 0;
						position: absolute;
						bottom: -45px;color: #FFF;
						text-align: center;
						text-shadow: 0px 0px 18px #000;
						font-family: Bitter;
						font-size: 20px;
						font-style: normal;
						font-weight: 800;
						line-height: normal;
						text-transform: uppercase;
						opacity: ${S.TEXT_REGULAR_OPACITY};
						width: 185px;
				};
				width: 470px;
				height: 185px;
				p {
					color: white;
					opacity: ${S.TEXT_REGULAR_OPACITY};
				}
		};
`

const Description = styled.div`
		${({ children, key, ...styles }) => ({ ...styles })};
		position: relative;
		left: 0;
		display: flex;
		flex-direction: column;
		left: 0;
		.mobile-products & {
				align-items: center;
				position: relative;
				transition: transform 0.5s ease-in-out;
				> p {
						text-align: center;
						color: black;
						font-size: 20px;
						line-height: 24px;
				};
		};
		.desktop-products & {
				align-items: flex-start;
				position: absolute;
				left: 0;
				top: 0;
				width: 470px;
				height: 185px;
				transition: opacity 0.5s ease-in-out;
				> p {
						text-align: left;
						color: white;
						font-size: 16px;
						line-height: 22px;
				};
		};
		> p {
				margin: 0;
				font-weight: 600;
		};
`

const HeadingImg = styled.img`
		height: 61px;
		width: auto;
		.mobile-products & {
				margin-bottom: 15px;
		};
		.desktop-products & {
				margin-left: 15px;
				margin-bottom: 5px;
		};
`

const titleMap = {
		islandJourney: 'Island Journey',
		longRide: 'Long Ride',
		gracefulTrip: 'Graceful Trip'
}

const productArray = Object.keys(titleMap)

export function ProductCarousel({ contentWidth, opacity, className }) {
		const { language } = useLanguageContext()
		const { screen } = useScreenContext()
		const [previousSelection, setPreviousSelection] = useState('')
		const [selectedProduct, setSelectedProduct] = useState('longRide')
		const [transitioning, setTransitioning] = useState(false)
		const [shiftIndex, setShiftIndex] = useState(0)
		l.setLanguage(language)
		const isDesktop = className === 'desktop-products'
		const [descriptionWidth, setDescriptionWidth] = useState(isDesktop ? 470 : (screen.width + 2 * contentWidth))

		useEffect(() => {
				if (isDesktop) return
				setDescriptionWidth(screen.width + 2 * (isDesktop ? 470 : contentWidth))
		}, [screen.width, isDesktop, contentWidth])

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
				let rotate = 0
				let scale = 1
				let translateX = 0
				let translateY = 0

				switch (position) {
						case -1:
								rotate = -16
								scale = isDesktop ? 0.75 : 0.8
								translateX = isDesktop ? -215 : -150
								translateY = isDesktop ? 25 : 0

								transform = `rotate(${rotate}deg) scale(${scale}) translate(${translateX}px, ${translateY}px)`
								break
						case 1:
								rotate = 12
								scale = 0.7
								translateX = isDesktop ? 215 : 160
								translateY = isDesktop ? 110 : 90

								transform = `rotate(${rotate}deg) scale(${scale}) translate(${translateX}px, ${translateY}px)`
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
				let opacity = 0
				let transform = ''

				if (!isDesktop) {
						opacity = productName === selectedProduct || productName === previousSelection ? 1 : 0
						if (shiftIndex > 0) {
								if (productName !== 'gracefulTrip') {
										transform = `translateX(${(window.innerWidth + contentWidth) / 2}px)`
								} else {
										transform = `translateX(${-window.innerWidth - contentWidth}px)`
								}
						} else if (shiftIndex < 0) {
								if (productName !== 'islandJourney') {
										transform = `translateX(${-(window.innerWidth + contentWidth) / 2}px)`
								} else {
										transform = `translateX(${window.innerWidth + contentWidth}px)`
								}
						}
				} else {
						opacity = productName === selectedProduct ? 1 : 0
				}

				return {
						key: productName,
						transform,
						opacity,
						width: contentWidth
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
				<StlCarousel opacity={opacity} className={className}>
						<Bottles>
								{productArray.map(productName => (
										<Product {...getBottleProps(productName)}>
												<div />
										</Product>
								))}
						</Bottles>
						<ArrowContainer>
								<img key='rotate-left' alt='rotate-left' src={Bg('rotate-left', false)} onPointerDown={e => onArrowClick(e, 1)} />
								<img key='rotate-right' alt='rotate-right' src={Bg('rotate-right', false)} onPointerDown={e => onArrowClick(e, -1)} />
						</ArrowContainer>
						<DescriptionContainer
								className='unselectable'
								$descriptionWidth={descriptionWidth}
								$contentWidth={contentWidth}>
								{productArray.map(renderProductDescription)}
								{isDesktop && <h2>{l.brewed}</h2>}
						</DescriptionContainer>
				</StlCarousel>
		)
}