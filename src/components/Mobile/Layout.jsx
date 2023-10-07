import { Parallax } from 'react-parallax';
import { Bg } from '../../Utils'
import styled from 'styled-components'
import { LanguageSwitch, Info, Partners, Contacts } from './'
import Carousel from '../Carousel'
//import { useMediaQuery } from 'react-responsive'

const StlLayout = styled(Parallax)`
		.react-parallax-bgimage {
				padding-bottom: 310px;
		};
		.react-parallax-background-children {
				height: 100%;
				width: 100%;
		};
`

const Background = styled.div`
		width: 100%;
		height: 100%;
		position: absolute;
`

const Sky = styled.img.attrs(({ $coef }) => ({
		style: {
		  top: -250 + $coef,
		},
  }))`
		position: absolute;
		left: 50%;
  transform: translateX(-50%);
		width: 100%;
		height: 75%;
`

const Cloud2 = styled.img.attrs(({ $coef }) => ({
		style: {
				transform: `translate(-${100 * $coef}%, ${1000 * $coef}%)`,
		},
		}))`
		position: absolute;
		top: 125px;
		right: 70%;
		width: 390px;
		z-index: 1;
`

const Cloud3 = styled.img.attrs(({ $coef }) => ({
		style: {
				transform: `translate(${80 * $coef}%, ${800 * $coef}%)`,
		},
		}))`
		position: absolute;
		top: 179px;
		width: 350px;
		left: 70%;
		z-index: 1;
`

const Cloud4 = styled.img.attrs(({ $coef }) => {
		if ($coef < 0.15) return
		$coef -=	0.15

		return {
				style: {
						transform: `translate(${100 * $coef}%, ${1500 * $coef}%)`,
				}
		}})`
		position: absolute;
		top: 550px;
		width: 420px;
		left: 75%;
		z-index: 1;
`

const Cloud5 = styled.img.attrs(({ $coef }) => {
		if ($coef < 0.16) return
		$coef -=	0.16

		return {
				style: {
						transform: `translate(-${100 * $coef}%, ${1500 * $coef}%)`,
				}
		}})`
		position: absolute;
		top: 675px;
		width: 280px;
		right: 75%;
		z-index: 1;
`

const Cloud6 = styled.img.attrs(({ $coef }) => {
		if ($coef < 0.3) return
		$coef -= 0.3

		return {
				style: {
						transform: `translate(${200 * $coef}%, ${1000 * $coef}%)`,
				}
		}})`
		position: absolute;
		top: 1200px;
		width: 230px;
		left: 75%;
		z-index: 1;
`

const Palm2 = styled.img.attrs(({ $coef }) => {
		if ($coef < 0.3) return
		$coef -= 0.3
		const scale = 1 - 1.5 * $coef
		console.log($coef);

		return {
				style: {
						transform: `scale(${scale})`//`translate(${200 * $coef}%, ${1000 * $coef}%)`,
				}
		}})`
		position: absolute;
		bottom: -60px;
		width: 300px;
		left: 60%;
		z-index: 1;
`

const Sun = styled.img.attrs(({ $coef }) => ({
		style: {
				bottom: 500 - $coef,
		},
		}))`
		position: absolute;
		width: 100px;
		height: 92px;
		left: 50%;
`

const Landscape = styled.img`
		bottom: 0;
		position: absolute;
		left: 50%;
  transform: translateX(-50%);
`

const Content = styled.div`
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
`

const Main = styled.main`
		width: ${({ $width }) => $width}px;
`

const Header = styled.header`
		padding: 25px 40px;
		display: flex;
		width:	100%;
		flex-direction: row;
		justify-content: flex-end;
		position: absolute;
`

export default function Layout() {
		//const isSmallScreen = useMediaQuery({ query: '(max-width: 400px)' })
		//const idMediumScreen = useMediaQuery({ query: '(max-width: 584px)' })
		//const isLargeScreen = useMediaQuery({ query: '(max-width: 768px)' })

		let contentWidth = 350

		const renderBackground = percentage => {
				//console.log(percentage);
				let sunCoef = percentage > 1.25 ? 950 * (percentage - 1.25) : 0
				let skyCoef = percentage < 1.5 ? 1100 * (percentage - 1) : 550

				return (
						<Background>
								<Sky src={Bg('sky-mobile', false)} alt='sky' $coef={skyCoef} />
								<Cloud2 src={Bg('cloud2', false)} alt='cloud2' $coef={percentage - 1}/>
								<Cloud3 src={Bg('cloud3', false)} alt='cloud3' $coef={percentage - 1}/>
								<Cloud4 src={Bg('cloud4', false)} alt='cloud4' $coef={percentage - 1}/>
								<Cloud5 src={Bg('cloud5', false)} alt='cloud5' $coef={percentage - 1}/>
								<Cloud6 src={Bg('cloud6', false)} alt='cloud6' $coef={percentage - 1} />
								<Sun src={Bg('sun', false)} alt='sun' $coef={sunCoef} />
								<Landscape src={Bg('landscape', false)} alt='landscape' />
						</Background>
				)
		}

		return (
				<StlLayout renderLayer={renderBackground}>
						<Content>
								<Header>
										<LanguageSwitch />
								</Header>
								<Main $width={contentWidth}>
										<Info />
										<Carousel contentWidth={contentWidth} />
										<Partners />
										<Contacts />
								</Main>
						</Content>
				</StlLayout>
		)
}
								//<Palm2 src={Bg('palm2', false)} alt='palm2' $coef={percentage - 1} />