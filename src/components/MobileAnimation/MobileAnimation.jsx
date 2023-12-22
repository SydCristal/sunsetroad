import { useScrollTopContext, useScreenContext } from '../../Contexts'
import { Sun, Plant, Plant2, Palm, Palm2, Cloud, Cloud2, Cloud3, Cloud4, Cloud5, Cloud6 } from './'
import { C } from '../../Utils'

const MobileAnimation = () => {
		const { scrollTop } = useScrollTopContext()
		const { screenWidth } = useScreenContext()

		let coefX = C.MOBILE_CONTENT_WIDTH / screenWidth
		if (coefX > 1) coefX = 1
		coefX = 1 - coefX
		const children = [Sun, Cloud, Cloud2, Cloud3, Cloud4, Cloud5, Cloud6, Palm, Palm2, Plant, Plant2]
		return (
				<div>
						{children.map(child => {
								const { render, milestones } = child()
								const position = milestones.filter(milestone => scrollTop > milestone).length
								return render(position, coefX)
						})}
				</div>
		)
}

export default MobileAnimation