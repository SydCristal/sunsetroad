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
		${({ onClick, $zindex, $bottleBg, ...styles }) => ({ ...styles, zIndex: $zindex })};
		width: 200px;
		position: absolute;
		transition: transform 0.5s ease-in-out;
		> div {
				background: ${({ $bottleBg }) => $bottleBg};
				width: 100%;
				height: 600px;
				position: absolute;
				top: -40px;
		};
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

		const rotateCarousel = (e, position, productName) => {
				e.preventDefault()
				if (productName === selectedProduct) return
				let newShiftIndex = shiftIndex === position ? 0 : ((shiftIndex - position) % 3) % 2 ? ((shiftIndex - position) % 3) : position
				setShiftIndex(newShiftIndex)
				setPreviousSelection(selectedProduct)
				setSelectedProduct(productName)
		}

		const getProps = productName => {
				let $zindex = 0
				if (productName === selectedProduct) $zindex = 2
				if (productName === previousSelection) $zindex = 1

				let position

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

				return {
						transform: `${position ? `rotate(${15 * position}deg) scale(0.9) translate(${220 * position}px, -40px)` : '' }`,
						cursor: `${position ? 'pointer' : ''}`,
						$zindex,
						$bottleBg: `${Bg(productName)} center center / cover no-repeat`,
						onMouseDown: e => rotateCarousel(e, position, productName)
				}
		}

		return (
				<StyledProducts>
						<Carousel>
								<Product
										{...getProps('islandJourney')}>
										<div />
								</Product>
								<Product
										{...getProps('longRide')}>
										<div />
								</Product>
								<Product
										{...getProps('gracefulTrip')}>
										<div />
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