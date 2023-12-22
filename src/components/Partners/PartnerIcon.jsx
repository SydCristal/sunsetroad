import styled from 'styled-components'
import { Lo } from '../../Utils'

const PartnerIcon = ({ $partnerName, $link, $double }) => {
		return (
				<div
						key={$partnerName}>
						<StlPartnerIcon
								href={$link}
								target='_blank'
								rel='noreferrer'
								$double={$double}>
								<img src={Lo($partnerName, false)} alt={$partnerName} />
						</StlPartnerIcon>
				</div>
		)
}

const StlPartnerIcon = styled.a`
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: ${({ $double }) => $double ? 180 : 90}px;
		height: 90px;
`

export { PartnerIcon }