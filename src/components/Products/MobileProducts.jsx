import styled from 'styled-components'
import { ProductCarousel } from './'
import { useScreenContext } from '../../Contexts'

const MobileProducts = () => {
		const { screenWidth } = useScreenContext()
		const carouselProps = {
				imageCarouselProps: {
						spaceBetween: 0,
						$containerStyles: {
								height: '350px',
								marginBottom: '30px'
						},
						contentStyles: {
								height: 350,
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
								translateX: 160,
								translateY: 90,
								zIndex: 2
						}, {
								rotate: -16,
								scale: 0.8,
								translateX: -150,
								translateY: 0,
								zIndex: 3
						}]
				},
				descriptionCarouselProps: {
						contentStyles: {
								height: 300
						},
				},
		}

		return (
				<StlMobileProducts>
						<ProductCarousel {...carouselProps} />
				</StlMobileProducts>
		)
}

const StlMobileProducts = styled.section`
		min-height: 660px;
		>	div {
				min-height: 660px;
				flex-direction: column-reverse;
		}
`

export { MobileProducts }