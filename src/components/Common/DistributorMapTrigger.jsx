import styled from 'styled-components'
import { useModalContext } from '../../Contexts'
import { Ic, C } from '../../Utils'

const DistributorMapTrigger = ({ className, device, children }) => {
		const { setDisplayedModal } = useModalContext()

		return (
				<StlDistributorMapTrigger
						className={className}
						onClick={() => setDisplayedModal('DistributorMap')}>
						<Heading>{children}</Heading>
						<Marker src={Ic(`marker-${device}`, false, 'svg')} />
				</StlDistributorMapTrigger>
		)
}

const StlDistributorMapTrigger = styled.div`
		cursor: pointer;
		display: flex;
		flex-direction: row;
		flex: 1;
		${C.isMobile} {
				justify-content: center;
				align-items: center;
				margin: 10px auto 0;
		};
		${C.isDesktop} {
				justify-content: flex-end;
				&:hover > * {
						opacity: ${C.ACTIVE_UI_EL_OPACITY};
				};
		};
`

const Heading = styled.h2`
		margin: 0 10px 0 0;
		${C.isMobile} {
				font-size: 30px;
				font-weight: 400;
				text-decoration: none;
				font-family: 'Orelega One';
				text-shadow: ${C.TEXT_OUTLINE};
				line-height: 30px;
		}
`

const Marker = styled.img`
		${C.isMobile} {
				height: 26px;
		};
		${C.isDesktop} {
				opacity: 0.6;
				height: 22px;
		};
`

export { DistributorMapTrigger }