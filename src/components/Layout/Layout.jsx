import { MobileLayout } from '../Mobile'
import { useSectionContext } from '../../Contexts'
import { Bg } from '../../Utils'
import styled from 'styled-components'
import Header from '../Header'
import Footer from '../Footer'
import MediaQuery from 'react-responsive'
import { MAX_MOBILE_WIDTH } from '../../Utils/CSSVariables'
import { useState, useLayoutEffect } from 'react'
import Info from '../Info'
import Products from '../Products'
import Partners from '../Partners'
//export function DesktopContent() {
//		const { section } = useSectionContext()
//		switch (section) {
//				case 'info':
//						return <Info />
//				case 'partners':
//						return <Partners />
//				default:
//						return <Products />
//		}
//}

const DesktopLayout = styled.div`
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100%;
		main {
				flex: 1;
		}
`

//const StlLayout = styled.div`
//		background: ${({ $section }) => Bg($section)} center center / cover no-repeat;
//		min-height: 100%;
//		width: 100%;
//		main {
//				padding: 65px 0 125px;
//				min-height: 100vh;
//				display: flex;
//				justify-content: center;
//		};
//`

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
				min-height: 100vh;
		};
`
export default function Layout() {
		const [width, setWidth] = useState(document.documentElement.clientWidth)
		const { section } = useSectionContext()
		const onScaleChange = match => {
				if (!match) return
				setWidth(document.documentElement.clientWidth)
		}

		let content
		const background = width > MAX_MOBILE_WIDTH ? section : null

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

		return (
				<StlLayout $background={background}>
						<MediaQuery maxWidth={MAX_MOBILE_WIDTH} onChange={onScaleChange}>
								<MobileLayout />
						</MediaQuery>
						<MediaQuery minWidth={MAX_MOBILE_WIDTH + 1} onChange={onScaleChange}>
								<DesktopLayout>
										<Header />
										{content}
										<Footer />
								</DesktopLayout>
						</MediaQuery>
				</StlLayout>
		)

		//return (
		//		<StlLayout $section={section} >
		//				<Header />
		//				<main>
		//						<MediaQuery maxWidth={768}>
		//								<MobileContent />
		//						</MediaQuery>
		//						<MediaQuery minWidth={769}>
		//								<DesktopContent />
		//						</MediaQuery>
		//				</main>
		//				<Footer />
		//		</StlLayout>
		//)
}