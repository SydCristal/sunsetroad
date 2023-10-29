import { MobileLayout } from '../Mobile'
import { useSectionContext, useScaleContext } from '../../Contexts'
import { Bg, S } from '../../Utils'
import styled from 'styled-components'
import Header from '../Header'
import Footer from '../Footer'
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
				transition: opacity 0.3s ease-in-out;
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
		const { scale } = useScaleContext()
		const { section } = useSectionContext()
		let layout
		const isDesktop = scale.width > S.MAX_MOBILE_WIDTH
		const background = isDesktop ? section : null
		let height = scale.height

		if (isDesktop) {
				height = (scale.height > S.MIN_DESKTOP_HEIGHT ? scale.height : S.MIN_DESKTOP_HEIGHT) + 'px'
				let content = <main />

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

				layout = (
						<DesktopLayout $height={height}>
								<Header />
								{content}
								<Footer />
						</DesktopLayout>
				)
		} else {
				layout = <MobileLayout />
		}

		return (
				<StlLayout $background={background} $height={height}>
						{layout}
				</StlLayout>
		)
}