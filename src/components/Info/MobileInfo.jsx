import styled from 'styled-components'
import { DistributorMapTrigger, Localizer } from '../Common'
import { l } from './'

const MobileInfo = () => {
		return (
				<StlMobileInfo>
						<Text
								tag='p'
								localization={l.text} />
						<DistributorMapTrigger
								device='mobile'>
								Find your pleasing
							</DistributorMapTrigger>
				</StlMobileInfo>
		)
}

const StlMobileInfo = styled.section`
		margin-bottom: 50px;
		min-height: 315px;
		position: relative;
`

const Text = styled(Localizer)`
		font-size: 18px;
  line-height: 20px;
  font-weight: 600;
  padding: 0px;
		color: black;
		margin: 0;
		align-items: bottom;
		& .en-string {
				padding: 0 15px;
		};
`

export { MobileInfo }