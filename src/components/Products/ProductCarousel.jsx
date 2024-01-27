import Carousel from '../Carousel'
import { ProductDescription, ProductImage } from './'
import { useRef, memo } from 'react'
import { Ic } from '../../Utils'
import styled from 'styled-components'

const ProductCarousel = memo(({ descriptionCarouselProps, imageCarouselProps }) => {
		const descriptionContainerRef = useRef(null)
		const imageContainerRef = useRef(null)
		const { bottleProps, ...restImageProps } = imageCarouselProps

		const carouselProps = {
				dataSet: productArray,
				content: [{
						ref: descriptionContainerRef,
						childEl: ProductDescription,
						...descriptionCarouselProps
				}, {
						ref: imageContainerRef,
						childEl: ProductImage,
						getControls,
						moveChild: (i, coef) => {
								const currentProps = bottleProps[i]
								const direction = coef > 0 ? -1 : 1
								const nextI = (total + i - direction) % total
								const prevScale = bottleProps[(total + i - direction) % total].scale
								const nextProps = bottleProps[nextI]
								let { rotate, scale, translateX, translateY } = currentProps
								const scaleSum = prevScale + scale + nextProps.scale
								rotate += (nextProps.rotate - rotate) * Math.abs(coef)
								scale += (nextProps.scale - scale) * Math.abs(coef)
								translateX += (nextProps.translateX - translateX) * Math.abs(coef)
								translateY += (nextProps.translateY - translateY) * Math.abs(coef)
								let zIndex = 2

								if (i === 0 || nextI === 0) {
										zIndex = scale > (scaleSum / 3) ? 4 : 3
								}

								return {
										zIndex,
										transform: `rotate(${rotate}deg) scale(${scale}) translateX(${translateX}px) translateY(${translateY}px)`,
										transition: `transform 0s ease-in-out, z-index 0s ease-in-out`
								}
						},
						shiftChild: (i, direction) => {
								const newI = (total + i - direction) % total
								const { rotate, scale, translateX, translateY } = bottleProps[newI]
								const zIndex = !newI ? 4 : !i ? 3 : 2
								const cursor = newI ? 'pointer' : 'default'
								return {
										zIndex,
										transform: `rotate(${rotate}deg) scale(${scale}) translateX(${translateX}px) translateY(${translateY}px)`,
										transition: `transform 0.5s ease-in-out, z-index ${zIndex !== 2 ? 0.4 : 0}s ease-in-out`,
										cursor
								}
						},
						...restImageProps
				}]
		}

		//console.log('RENDER PRODUCT CAROUSEL')

		return <StlCarousel {...carouselProps} />
})

const StlCarousel = styled(Carousel)`
		width: 100%;
`

const getControls = rotateCarousel => (
		<ArrowContainer>
				<Arrow
						key='left'
						src={Ic('rotate-left', false)}
						alt='scroll-left'
						onPointerDown={e => rotateCarousel(1)} />
				<Arrow
						key='right'
						src={Ic('rotate-right', false)}
						alt='scroll-right'
						onPointerDown={e => rotateCarousel(-1)} />
		</ArrowContainer>
)

const ArrowContainer = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		position: absolute;
		width: 100%;
		bottom: 0;
`

const Arrow = styled.img`
		width: 90px;
		height: 80px;
		position: relative;
		cursor: pointer;
		z-index: 2;
		margin: -5px 5px;
`

const productArray = [
		'longRide',
		'gracefulTrip',
		'islandJourney'
]

const total = productArray.length

export { ProductCarousel }