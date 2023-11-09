import { MobileLayout } from '../Mobile'
import { useSectionContext, useScreenContext } from '../../Contexts'
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
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-top: 20px;
				align-items: center;
				transition: opacity 0.3s ease-in-out;
				opacity: ${({ $contentOpacity }) => $contentOpacity};
		};
		footer > div > a {
				transition: opacity 0.3s ease-in-out;
				opacity: ${({ $contentOpacity }) => $contentOpacity};
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
export default function Layout({ $contentOpacity }) {
		const { screen } = useScreenContext()
		const { section } = useSectionContext()
		let layout
		const isDesktop = screen.width > S.MAX_MOBILE_WIDTH
		const background = isDesktop ? section : null
		let height = screen.height

		if (isDesktop) {
				height = (screen.height > S.MIN_DESKTOP_HEIGHT ? screen.height : S.MIN_DESKTOP_HEIGHT) + 'px'
				let content

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
						<DesktopLayout $height={height} $contentOpacity={$contentOpacity}>
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