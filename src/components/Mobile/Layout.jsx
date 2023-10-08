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
				top: `${$coef < 0.5 ? $coef * 40 - 5 : 15}%`,
		}}))`
		position: absolute;
		left: 50%;
  transform: translateX(-50%);
		width: 100%;
		height: 75%;
`

const Palm2 = styled.img.attrs(({ $coef }) => {
		if ($coef < 0.3) return
		$coef -= 0.3
		const scale = 1 - 1.5 * $coef
		//console.log($coef);

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

const Landscape = styled.img`
		bottom: 0;
		position: absolute;
		left: 50%;
  transform: translateX(-50%);
		z-index: 1;
`

const Content = styled.div`
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		z-index: 2;
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

const Image = styled.div.attrs(({ $name, $coef, $style, $func }) => {
		return {
				children: [
						<img key={$name} src={Bg($name, false)} alt={$name} style={$func($coef)} />
				],
				style: $style
		}})`
		position: absolute;
		img {
				width: 100%;
				position: absolute;
				z-index: 1;
				transition: all 0.3s ease;
		};
`

const renderSun = coef => {
		coef -= 0.3
		if (coef < 0) return {}
		const shiftY = 1200 * coef 
		return {
				transform: `translateY(${shiftY}%)`
		}
}

const renderCloud2 = coef => {
		const scale = 1 - Math.abs(1 * coef)
		const shiftX = -100 * coef
		const shiftY = 1000 * coef
		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`,
				zIndex: 3
		}
}

const renderCloud3 = coef => {
		const scale = 1 - Math.abs(1 * coef)
		const shiftX = 80 * coef
		const shiftY = 800 * coef
		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`,
				zIndex: 3
		}
}

const renderCloud4 = coef => {
		coef -= 0.29
		const scale = 1 - Math.abs(1 * coef)
		const shiftX = Math.abs(180 * coef)
		const shiftY = coef <= 0 ? 700 * coef : 3000 * coef
		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}
}

const renderCloud5 = coef => {
		coef -= 0.29
		const scale = 1 - Math.abs(1 * coef)
		const shiftX = Math.abs(-200 * coef)
		const shiftY = coef <= 0 ? 700 * coef : 2000 * coef
		return {
				transform: `translate(-${shiftX}%, ${shiftY}%) scale(${scale})`
		}
}

const renderCloud6 = coef => {
		coef -= 0.31
		if (coef < 0) return {}
		const scale = 1 - Math.abs(1 * coef)
		const shiftX = Math.abs(200 * coef)
		const shiftY = 1000 * coef
		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}
}

const images = [{
		$name: 'sun',
		$style: {
				bottom: '28%',
				width: '100px',
				left: '50%',
				height: '92px'
		},
		$func: renderSun
}, {
		$name: 'cloud2',
		$style: {
				top: '7%',
				right: '70%',
				width: '390px'
		},
		$func: renderCloud2
}, {
		$name: 'cloud3',
		$style: {
				top: '10%',
				left: '70%',
				width: '350px'
		},
		$func: renderCloud3
	}, {
		$name: 'cloud4',
		$style: {
				top: '33%',
				left: '35%',
				width: '420px'
		},
		$func: renderCloud4
}, {
		$name: 'cloud5',
		$style: {
				top: '40%',
				right: '55%',
				width: '280px'
		},
		$func: renderCloud5
}, {
		$name: 'cloud6',
		$style: {
				top: '67%',
				left: '55%',
				width: '230px'
		},
		$func: renderCloud6
}]

const renderBackground = coef => {
		coef -= 1

		return (
				<Background>
						<Sky src={Bg('sky-mobile', false)} alt='sky' $coef={coef} />
						{images.map(props => <Image {...props} key={props.$name} $coef={coef} />)}
						<Landscape src={Bg('landscape', false)} alt='landscape' />
				</Background>
		)
}

export default function Layout() {
		//const isSmallScreen = useMediaQuery({ query: '(max-width: 400px)' })
		//const idMediumScreen = useMediaQuery({ query: '(max-width: 584px)' })
		//const isLargeScreen = useMediaQuery({ query: '(max-width: 768px)' })

		let contentWidth = 350

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
								//<Palm2 src={Bg('palm2', false)} alt='palm2' $coef={coef - 1} />