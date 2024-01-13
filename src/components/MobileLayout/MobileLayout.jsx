import { Lo, C } from '../../Utils'
import styled, { css } from 'styled-components'
import { Background } from './'
import { MobileInfo } from '../Info'
import { MobileProducts } from '../Products'
import { MobilePartners } from '../Partners'
import { MobileFooter } from '../Footer'
import { memo } from 'react'

const MobileLayout = memo(() => {
		console.log('RENDER MOBILE LAYOUT')

		return (<>
				<StlMobileLayout>
						<Background />
						<Content>
								<LogoContainer>
										<Logo id='main-logo' src={Lo('logo', false, 'svg')} alt='logo' />
								</LogoContainer>
								<main>
										<MobileInfo />
										<MobileProducts />
										<MobilePartners />
								</main>
								<MobileFooter />
						</Content>
				</StlMobileLayout>
		</>)
})

const StlMobileLayout = styled.div`
		${C.mediaAnd([C.isMobile, C.isTall])} {
				display: auto;
		};
		${C.isDesktop} {
				display: none;
		};
		position: absolute;
		top: 0;
		width: 100%;
		height: fit-content;
		padding: 70px 0 300px;
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
		margin: 0	auto 55px;
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

export default MobileLayout