import styled from 'styled-components'
import { C, Bg } from '../../Utils'
import { l } from './'
import { Localizer } from '../Common'

const ProductDescription = (productName, i, transformStyles) => {
		return (
				<StlDescription
						key={productName}
						style={transformStyles}>
						<DescriptionHeading src={Bg(`${productName}-heading`, false)} alt={productName} />
						<DescriptionText tag='p' localization={l[`${productName}Description`]} />
				</StlDescription>
		)
}

const StlDescription = styled.li`
		height: fit-content;
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
`

const DescriptionHeading = styled.img`
		height: 61px;
		${C.isMobile} {
				margin: 0 auto 15px;
		};
		${C.isDesktop} {
				margin: 0 0 5px 15px;
		};
`

const DescriptionText = styled(Localizer)`
		margin: 0;
		font-weight: 600;
		${C.isMobile} {
				text-align: center;
				color: black;
				font-size: 20px;
				line-height: 24px;
		};
		${C.isDesktop} {
				font-size: 16px;
				line-height: 22px;
				text-shadow: ${C.TEXT_SHADOW};
				opacity: ${C.TEXT_REGULAR_OPACITY};
		};
`

export { ProductDescription }