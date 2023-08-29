import { useSectionContext } from '../../Contexts'
import Info from '../Info'
import Products from '../Products'
import Partners from '../Partners'
export function DesktopContent() {
		const { section } = useSectionContext()
		switch (section) {
				case 'info':
						return <Info />
				case 'partners':
						return <Partners />
				default:
						return <Products />
		}
}