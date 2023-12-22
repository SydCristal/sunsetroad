import styled from 'styled-components'
import { PartnerIcon } from './'
import { C } from '../../Utils'

const PartnerGroup = (group, i, transformStyles) => {
	 return (
				<StlPartnerGroup
						key={'partnerGroup' + i}
						style={transformStyles}>
						<PartnerRow>
								{group[0].map((partner, i) => <PartnerIcon {...partner} key={i} />)}
						</PartnerRow>
						<PartnerRow>
								{group[1].map((partner, i) => <PartnerIcon {...partner} key={i} />)}
						</PartnerRow>
				</StlPartnerGroup>
		)
}

const StlPartnerGroup = styled.li`
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		transition: transform 0.5s ease-in-out;
		${C.isMobile} {
				flex-direction: column-reverse;
				width: 100%;
		};
		${C.isDesktop} {
				flex-direction: column;
				width: 455px;
		};
`

const PartnerRow = styled.div`
		list-style: none;
		display: flex;
		flex-direction: row;
		position: relative;
		margin: 0 0 10px;
		padding: 0;
		width: 100%;
		justify-content: space-around;
`

export { PartnerGroup }