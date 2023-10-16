//import { DesktopContent } from './'
import { MobileLayout } from '../Mobile'
import { useSectionContext } from '../../Contexts'
import { Bg } from '../../Utils'
import styled from 'styled-components'
//import Header from '../Header'
//import Footer from '../Footer'
import MediaQuery from 'react-responsive'
import { MAX_MOBILE_WIDTH } from '../../Utils/CSSVariables'
import { useState, useLayoutEffect } from 'react'

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

const StlLayout = styled.div`
		min-height: 100%;
		width: 100%;
		> * {
			min-height: 100vh;
		};
`
export default function Layout() {
		const [width, setWidth] = useState(0)
		const { section } = useSectionContext()

		window.addEventListener('resize', () => {
				setWidth(document.documentElement.clientWidth)
		})

		return (
				<StlLayout>
						<MediaQuery maxWidth={MAX_MOBILE_WIDTH}>
								<MobileLayout />
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