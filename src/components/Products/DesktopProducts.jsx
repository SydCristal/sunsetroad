import { Carousel } from './'
import styled from 'styled-components'
import { S } from '../../Utils'
import { Heading } from '../Common'

export default function DesktopProducts(props) {
		return (
				<main>
						<Heading />
						<Carousel
								className='desktop-products'
								contentWidth={S.CONTENT_AREA_WIDTH}
								opacity={1}/>
				</main>
		)
}