import { ProductCarousel } from './'
import { memo } from 'react'

const DesktopProducts = memo(() => {
		const carouselProps = {
				descriptionCarouselProps: {
						contentWidth: 470,
						$faddingGradient: 20,
						spaceBetween: 100,
				},
				imageCarouselProps: {
						spaceBetween: 0,
						$containerStyles: {
								overflow: 'visible !important',
						},
						contentStyles: {
								height: 475,
								bottom: 0,
								position: 'absolute',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
						},
						bottleProps: [{
								rotate: 0,
								scale: 1,
								translateX: 0,
								translateY: 0,
								zIndex: 4
						}, {
								rotate: 12,
								scale: 0.7,
								translateX: 215,
								translateY: 110,
								zIndex: 2
						}, {
								rotate: -16,
								scale: 0.75,
								translateX: -215,
								translateY: 25,
								zIndex: 2
						}]
				}
		}

		console.log('RENDER DESKTOP PRODUCTS');

		return <ProductCarousel {...carouselProps} />
})

export { DesktopProducts }