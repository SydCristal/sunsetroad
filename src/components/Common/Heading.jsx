import styled from 'styled-components'
import { Bg } from '../../Utils'

const StlHeading = styled.div`
		height: 115px;
		background: ${Bg('heading')} center top / contain no-repeat;
		width: 325px;
		margin-bottom: 25px;
`

export function Heading() {
		return <StlHeading />
}