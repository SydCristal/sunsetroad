import styled from 'styled-components'
import { Lo } from '../../Utils'

const Heading = ({ $styles = {} }) => {
		return <StlHeading $styles={$styles} />
}

const StlHeading = styled.div`
		height: 115px;
		background: ${Lo('heading', true, 'svg')} center top / contain no-repeat;
		width: 325px;
		margin-bottom: 25px;
		${({ $styles }) => $styles};
`

export { Heading }