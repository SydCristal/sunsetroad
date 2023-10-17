import { Parallax } from 'react-parallax';
import { Bg, pdsp } from '../../Utils'
import styled from 'styled-components'
import { LanguageSwitch, Info, Partners, Contacts } from './'
import Carousel from '../Carousel'
import { useAgeConfirmationContext } from '../../Contexts'

const getSpaceBelow = () => {
		const { scrollHeight, clientHeight, scrollTop } = document.documentElement
		return scrollHeight - clientHeight - scrollTop
}

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

const Sky = styled.img.attrs(() => {
		const { scrollHeight, clientHeight, scrollTop } = document.documentElement
		const xCoef = (scrollTop || 1) / (scrollHeight - clientHeight);
		const spaceBelow = scrollHeight - clientHeight - scrollTop

		let style = {}
		if (scrollHeight === clientHeight) {
				style.top = '-145px'
		} else if (spaceBelow <= 200) {
				style.bottom = '200px'
		} else {
				style.bottom = `${spaceBelow <= 200 ? 200 : (530 - 400 * xCoef)}px`
		}

		return { style }})`
		position: absolute;
		width: calc(20px + 100%);
		left: -10px;
		height: 80%;
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
		opacity: 1;
`

const Header = styled.header`
		opacity: 1;
		transition: opacity 0.5s ease-in-out;
		padding: 25px 40px;
		display: flex;
		width:	100%;
		flex-direction: row;
		justify-content: flex-end;
		position: absolute;
`

const PartnerLogo = styled.div.attrs(({ $name, $xCoef, $yCoef, $style, $func }) => {
		return {
				children: [
						<img key={$name} src={Bg($name, false)} alt={$name} style={$func($xCoef, $yCoef)} />
				],
				style: $style
		}})`
		position: absolute;
		img {
				width: 100%;
				position: absolute;
				z-index: 1;
				transition: transform 0.3s ease;
				pointer-events: none;
		};
`

const Footer = styled.footer`
		opacity: 1;
		transition: opacity 0.5s ease-in-out;
		width: 260px;
		height: 165px;
		position: relative;
		margin: 0 auto;
		z-index: 3;
		> div {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 666;
		}
`

const renderSun = () => {
		const spaceBelow = getSpaceBelow()

		let shiftY = -370

		if (spaceBelow <= 420) {
				const coef = spaceBelow ? spaceBelow / 420 : 0
				shiftY *= coef
		}

		return {
				transition: 'transform 0.3s ease',
				transform: `translateY(${shiftY}%)`
		}
}

const renderCloud2 = xCoef => {
		const scale = 1 - Math.abs(1 * xCoef)
		const shiftX = -100 * xCoef
		const shiftY = 1000 * xCoef
		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`,
				zIndex: 3
		}
}

const renderCloud3 = xCoef => {
		const scale = 1 - Math.abs(0.5 * xCoef)
		const shiftX = 80 * xCoef
		const shiftY = 800 * xCoef
		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`,
				zIndex: 3
		}
}

const renderCloud4 = xCoef => {
		xCoef -= 0.31
		const scale = 1 - Math.abs(0.5 * xCoef)
		const shiftX = (xCoef <= 0 ? -120 : 220) * xCoef
		const shiftY = (xCoef <= 0 ? 600 : 3000) * xCoef
		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}
}

const renderCloud5 = cCoef => {
		cCoef -= 0.31
		const scale = 1 - Math.abs(cCoef)
		const shiftX = (cCoef <= 0 ? -50 : 200) * cCoef 
		const shiftY = (cCoef <= 0 ? 700 : 2000) * cCoef
		return {
				transform: `translate(-${shiftX}%, ${shiftY}%) scale(${scale})`
		}
}

const renderCloud6 = xCoef => {
		xCoef -= 0.31
		if (xCoef < 0) return {}
		const scale = 1 - Math.abs(1 * xCoef)
		const shiftX = Math.abs(200 * xCoef)
		const shiftY = 1000 * xCoef
		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}
}

const renderPalm1 = (c, yCoef) => {
		const spaceBelow = getSpaceBelow()

		let shiftX = 100 + (60 * yCoef)
		let shiftY = -10 * yCoef
		let scale = 0.75
		let rotate = 25 + (10 * yCoef)

		if (spaceBelow <= 300) {
		//		const xCoef = spaceBelow ? spaceBelow / 350 : 0
				shiftX = 0
				shiftY = 0
				scale = 1
				rotate = 0
		}

		//shiftX -= 100 * yCoef

		return {
				transition: 'all 1s ease',
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale}) rotate(${rotate}deg)`
		}


		//const spaceBelow = getSpaceBelow()

		//let shiftX = 30 + (30 * yCoef)
		//let shiftY = 5
		//let scale = 0.75
		//let rotate = 35

		//if (spaceBelow <= 350) {
		//		const xCoef = spaceBelow ? (spaceBelow / 350) : 0
		//		shiftX *= xCoef
		//		shiftY *= xCoef
		//		scale = 1 - xCoef / 4
		//		rotate -= 25 - 25 * xCoef
		//}

		//shiftX += 100 * yCoef

		//return {
		//		transition: 'all 0s',
		//		transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale}) rotate(${rotate}deg)`
		//}
}

const renderPalm2 = (c, yCoef) => {
		const spaceBelow = getSpaceBelow()

		let shiftX = -30 - (70 * yCoef)
		let shiftY = 5
		let scale = 0.75
		let rotate = -25 - (10 * yCoef)

		if (spaceBelow <= 300) {
				//const xCoef = spaceBelow ? spaceBelow / 350 : 0
				shiftX += 65
				shiftY = 0
				scale = 1
				rotate = 0
		}

		//shiftX -= 100 * yCoef

		return {
				transition: 'all 1s ease',
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale}) rotate(${rotate}deg)`
		}

		//const spaceBelow = getSpaceBelow()

		//let shiftX = -25 + (25 * yCoef)
		//let shiftY = 5
		//let scale = 0.75
		//let rotate = -15

		//if (spaceBelow <= 350) {
		//		const xCoef = spaceBelow ? spaceBelow / 350 : 0
		//		shiftX *= xCoef
		//		shiftY *= xCoef
		//		scale = 1 - xCoef / 4
		//		rotate += 25 - 25 * xCoef
		//}

		//shiftX -= 100 * yCoef

		//return {
		//		transition: 'all 0s',
		//		transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale}) rotate(${rotate}deg)`
		//}
}

const renderPlant1 = () => {
		if (window.innerWidth < 568) {
				return {
						transform: `translate(15%, 5%)`
				}
		}

		return {}
}

const renderPlant2 = () => {
		if (window.innerWidth < 568) {
				return {
						transform: `translate(-20%, 5%)`
				}
		}

		return {}
}

const images = [{
		$name: 'sun',
		$style: {
				bottom: '175px',
				width: '100px',
				left: '50%',
				height: '92px'
		},
		$func: renderSun
}, {
			$name: 'cloud1',
			$style: {
					top: '-5px',
					right: '18%',
					width: '228px'
			},
			$func: () => ({})
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
				top: '35%',
				left: '35%',
				width: '420px'
		},
		$func: renderCloud4
}, {
		$name: 'cloud5',
		$style: {
				top: '42%',
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
}, {
		$name: 'palm1',
		$style: {
				bottom: '610px',
				right: '65%',
				rotate: '10deg',
				width: '200px',
				//right: '85%',
				zIndex: 3
		},
		$func: renderPalm1
}, {
		$name: 'palm2',
		$style: {
				bottom: '650px',
				//left: '80%',
				left: '75%',
				rotate: '10deg',
				width: '250px',
				zIndex: 3
		},
		$func: renderPalm2
}, {
		$name: 'plant1',
		$style: {
				bottom: '9%',
				right: '8%',
				width: '200px',
				rotate: '-32deg',
				zIndex: 3
		},
		$func: renderPlant1
}, {
		$name: 'plant2',
		$style: {
				bottom: '11%',
				width: '398px',
				rotate: '12deg',
				zIndex: 3
		},
		$func: renderPlant2
}]

const renderBackground = (xCoef, yCoef) => {
		xCoef -= 1


		return (
				<Background>
						<Sky src={Bg('sky-mobile', false)} alt='sky' $xCoef={xCoef} className='sky-mobile' />
						{images.map(props => (
								<PartnerLogo
										{...props}
										key={props.$name}
										$xCoef={xCoef}
										$yCoef={yCoef}
										onPointerDown={pdsp} />))}
						<Landscape src={Bg('landscape', false)} alt='landscape' />
				</Background>
		)
}

export default function Layout() {
		const { ageConfirmation } = useAgeConfirmationContext()
		const opacity = ageConfirmation ? 1 : 0
		//const isSmallScreen = useMediaQuery({ query: '(max-width: 400px)' })
		//const idMediumScreen = useMediaQuery({ query: '(max-width: 584px)' })
		//const isLargeScreen = useMediaQuery({ query: '(max-width: 768px)' })

		let contentWidth = 350

		let yCoef = contentWidth / document.documentElement.clientWidth
		yCoef > 1 && (yCoef = 1)
		yCoef = 1 - yCoef

		return (
				<StlLayout renderLayer={xCoef => renderBackground(xCoef, yCoef)}>
						<Content>
								<Header>
										<LanguageSwitch />
								</Header>
								<Main $width={contentWidth}>
										<Info opacity={opacity} />
										<Carousel opacity={opacity} contentWidth={contentWidth} />
										<Partners opacity={opacity} contentWidth={contentWidth} />
								</Main>
						</Content>
						<Footer>
								<Contacts />
						</Footer>
				</StlLayout>
		)
}