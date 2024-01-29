import styled from 'styled-components'
import { useModalContext } from '../../Contexts'
import { Lo, C } from '../../Utils'

const DistributorMapTrigger = ({ className }) => {
		const { setDisplayedModal } = useModalContext()

		return (
				<StlDistributorMapTrigger
						className={className}
						onClick={() => setDisplayedModal('DistributorMap')} />
		)
}

const StlDistributorMapTrigger = styled.div`
		${C.isDesktop} {
				background-image: ${Lo('map-trigger-desktop', true, 'svg')};
				width: 160px;
				height: 81px;
		};
		${C.isMobile} {
				background-image: ${Lo('map-trigger-mobile', true, 'svg')};
				width: 200px;
				height: 45px;
				margin: 5px auto 0;
		}
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		cursor: pointer;
`

export { DistributorMapTrigger }