import { Lo, C } from '../../Utils'
import styled, { css } from 'styled-components'
import { Background } from './'
import { MobileInfo } from '../Info'
import { MobileProducts } from '../Products'
import { MobilePartners } from '../Partners'
import { MobileFooter } from '../Footer'
import { memo } from 'react'
import { DeliveryLink, DistributorMapTrigger } from '../Common'

const MobileLayout = memo(() => {
		return (<>
				<StlMobileLayout>
						<Background />
						<Content>
								<LogoContainer>
										<Logo id='main-logo' src={Lo('logo', false, 'svg')} alt='logo' />
								</LogoContainer>
								<main>
										<StlDeliveryLink />
										<MobileInfo />
										<MobileProducts />
										<DistributorMapTrigger />
										<MobilePartners />
								</main>
								<MobileFooter />
						</Content>
				</StlMobileLayout>
		</>)
})

const StlMobileLayout = styled.div`
		${C.isDesktop} {
				display: none;
		};
		width: 100vw;
		height: 100vh;
		position: relative;
		height: fit-content;
		padding: 70px 0 300px;
		overflow: hidden;
		.blurred & {
				pointer-events: none;
		};
`

const contentStyles = css`
		width: ${C.MOBILE_CONTENT_WIDTH}px;
		margin: 0 auto;
		text-align: center;
		transition: opacity 0.5s ease-in-out;
		opacity: 1;
		.blurred & {
				opacity: 0;
		};
`

const Content = styled.div`
		position: relative;
		top: 0;
		width: 100%;
		> :not(:first-child) {
				${contentStyles}
		};
`

const LogoContainer = styled.div`
		width: 191px;
		height: 195px;
		margin: 0	auto 20px;
		position: relative;
`

const Logo = styled.img`
		transition: opacity 0.5s ease-in-out;
		opacity: 1;
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: 2;
		${C.isMobile} {
				.blurred & {
						opacity: 0;
							z-index: 5;
				};
		};
`

const StlDeliveryLink = styled(DeliveryLink)`
		margin: 0 auto 15px;
`

export default MobileLayout