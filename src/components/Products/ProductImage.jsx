import styled from 'styled-components'
import { Bg, C } from '../../Utils'

const ProductImage = (productName, i, transformStyles, onChildClick) => {
		return (
				<StlProductImage
						key={'partnerGroup' + i}
						style={transformStyles}>
						<Bottle
								onPointerDown={e => onChildClick(e, i)}
								$productName={productName}/>
				</StlProductImage>
		)
}

const StlProductImage = styled.li`
		display: block;
		position: absolute;
		${C.isMobile} {
				width: 90px;
		};
		${C.isDesktop} {
				width: 125px;
		};
`

const Bottle = styled.div`
		position: absolute;
		width: 100%;
		background: ${({ $productName }) => `${Bg($productName)} center center / contain no-repeat`};
		${C.isMobile} {
				height: 360px;
		};
		${C.isDesktop} {
				height: 475px;
		};
`

export { ProductImage }