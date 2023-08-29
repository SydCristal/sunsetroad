import { DesktopContent } from './'
import { useSectionContext } from '../../Contexts'
import { Bg } from '../../Utils'
import styled from 'styled-components'
import Header from '../Header'
import Footer from '../Footer'

const StlLayout = styled.div`
		background: ${({ $section }) => Bg($section)} center center / cover no-repeat;
		min-height: 100%;
		width: 100%;
		main {
				padding: 65px 0 125px;
				min-height: 100vh;
				display: flex;
				justify-content: center;
		};
`
export default function Layout() {
		const { section } = useSectionContext()

		return (
				<StlLayout $section={section} >
						<Header />
						<main>
								<DesktopContent />
						</main>
						<Footer />
				</StlLayout>
		)
}