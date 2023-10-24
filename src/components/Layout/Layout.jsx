import { MobileLayout } from '../Mobile'
import { useSectionContext, useAgeConfirmationContext, useScaleContext } from '../../Contexts'
import { Bg, S } from '../../Utils'
import styled from 'styled-components'
import Header from '../Header'
import Footer from '../Footer'
import MediaQuery from 'react-responsive'
import { MAX_MOBILE_WIDTH } from '../../Utils/CSSVariables'
import Info from '../Info'
import Products from '../Products'
import Partners from '../Partners'

const DesktopLayout = styled.div`
		display: flex;
		flex-direction: column;
		height: ${({ $height }) => $height};
		width: 100%;
		main {
				flex: 1;
				width: ${S.CONTENT_AREA_WIDTH};
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-top: 20px;
				align-items: center;
		}
`

const StlLayout = styled.div.attrs(({ $background }) => {
		if (!$background) return {}

		return {
				style: {
						background: `${Bg($background)} center center / cover no-repeat`
				}
		}})`
		min-height: 100%;
		width: 100%;
		> * {
				min-height: 100%;
		};
`
export default function Layout() {
		const { ageConfirmation } = useAgeConfirmationContext()
		const { scale } = useScaleContext()
		const { section } = useSectionContext()
		let content = <main />
		const isDesktop = scale.width > MAX_MOBILE_WIDTH
		const background = isDesktop ? section : null
		let height = '120vh'

		if (isDesktop) {
				height = (scale.height > S.MIN_DESKTOP_HEIGHT ? scale.height : S.MIN_DESKTOP_HEIGHT) + 'px'		
		}

		if (ageConfirmation) {
				switch (section) {
						case 'products':
								content = <Products />
								break
						case 'partners':
								content = <Partners />
								break
						default:
								content = <Info />
				}
		}

		return (
				<StlLayout $background={background} $height={height}>
						<MediaQuery maxWidth={MAX_MOBILE_WIDTH}>
								<MobileLayout />
						</MediaQuery>
						<MediaQuery minWidth={MAX_MOBILE_WIDTH + 1}>
								<DesktopLayout $height={height} >
										<Header />
										{content}
										<Footer />
								</DesktopLayout>
						</MediaQuery>
				</StlLayout>
		)
}