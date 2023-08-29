import {	useState } from 'react'
import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import styled from 'styled-components'
import { Bg, S } from '../../Utils'

const StyledProducts = styled.div`
		min-height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: ${S.CONTENT_AREA_WIDTH};
		position: relative;
`

const Carousel = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: relative;
`

const Product = styled.div`
		width: 200px;
		position: absolute;
		transform: ${({ $index }) => $index ? `rotate(${15 * $index}deg) scale(0.9) translate(${220 * $index}px, -40px)` : ''};
		cursor: ${({ $index }) => $index ? 'pointer' : ''};
		z-index: ${({ $zindex }) => $zindex};
		transition: transform 0.5s ease-in-out;
		> div {
				width: 100%;
				height: 600px;
				position: absolute;
				top: -40px;
		};
`

const IslandJourney = styled.div`
		background: ${Bg('island-journey')} center center / cover no-repeat;
`

const LongRide = styled.div`
		background: ${Bg('long-ride')} center center / cover no-repeat;
`

const GracefulTrip = styled.div`
		background: ${Bg('graceful-trip')} center center / cover no-repeat;
`

const Description = styled.div`
		background-color: ${S.SHADOW_BG};
		width: 100%;
		padding: ${S.CONTENT_AREA_PADDING};
		border-radius: ${S.CONTENT_AREA_BORDER_RADIUS};
		bottom: 0;
		position: absolute;
		z-index: ${S.LAYOUT_EL_ZINDEX};
		h1 {
				margin: ${S.H1_MARGIN};
		};
		h2 {
				color: #FF8F00;
				margin: ${S.H1_MARGIN};
		};
		p {
				margin: 0;
				text-align: justify;
		};
`

const HeadingContainer = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		img {
				margin: -15px 10px 5px -15px;
				width: 100px;
		};
		div {
			flex: 1;
		};
`

const titleMap = {
		longRide: 'Long Ride',
		islandJourney: 'Island Journey',
		gracefulTrip: 'Graceful Trip'
}
export default function Products() {
		const { language } = useLanguageContext()
		const [previousSelection, setPreviousSelection] = useState('')
		const [selectedProduct, setSelectedProduct] = useState('longRide')
		const [shiftIndex, setShiftIndex] = useState(0)
		l.setLanguage(language)

		const subTitle = l[`${selectedProduct}SubTitle`]
		const description = l[`${selectedProduct}Description`]
		const rotateCarousel = (i, product) => {
				if (product === selectedProduct) return
				let newShiftIndex = shiftIndex === i ? 0 : ((shiftIndex - i) % 3) % 2 ? ((shiftIndex - i) % 3) : i
				setShiftIndex(newShiftIndex)
				setPreviousSelection(selectedProduct)
				setSelectedProduct(product)
		}

		const islandJourneyI = shiftIndex === 0 ? -1 : shiftIndex > 0 ? 0 : 1
		const longRideI = shiftIndex
		const gracefulTripI = shiftIndex === 0 ? 1 : shiftIndex > 0 ? -1 : 0

		return (
				<StyledProducts>
						<Carousel>
								<Product
										$index={islandJourneyI}
										$zindex={selectedProduct === 'islandJourney' ? 2 : previousSelection === 'islandJourney' ? 1 : 0}
										onClick={() => rotateCarousel(islandJourneyI, 'islandJourney')}>
										<IslandJourney />
								</Product>
								<Product
										$index={longRideI}
										$zindex={selectedProduct === 'longRide' ? 2 : previousSelection === 'longRide' ? 1 : 0}
										onClick={() => rotateCarousel(longRideI, 'longRide')}>
										<LongRide />
								</Product>
								<Product
										$index={gracefulTripI}
										$zindex={selectedProduct === 'gracefulTrip' ? 2 : previousSelection === 'gracefulTrip' ? 1 : 0}
										onClick={() => rotateCarousel(gracefulTripI, 'gracefulTrip')}>
										<GracefulTrip />
								</Product>
						</Carousel>
						<Description>
								<HeadingContainer>
										<img src={Bg('logo', false)} />
										<div>
												<h1>{titleMap[selectedProduct]}</h1>
												<h2>{subTitle}</h2>
										</div>
								</HeadingContainer>
								<p>{description}</p>
						</Description>
				</StyledProducts>
		)
}