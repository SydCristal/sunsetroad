import { Parallax } from 'react-parallax';
import { Bg, pdsp, S } from '../../Utils'
import styled from 'styled-components'
import { LanguageSwitch } from '../Header'
import { MobilePartners as Partners } from '../Partners'
import { MobileInfo as Info } from '../Info'
import { MobileFooter as Footer } from '../Footer'
import { MobileProducts as Products } from '../Products'
import { useAgeConfirmationContext } from '../../Contexts'
import { MAX_MOBILE_WIDTH } from '../../Utils/CSSVariables';

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

const Sky = styled.img.attrs(({ $isMasked }) => {
		const { scrollHeight, clientHeight, scrollTop } = document.documentElement
		const xCoef = (scrollTop || 1) / (scrollHeight - clientHeight);
		const spaceBelow = scrollHeight - clientHeight - scrollTop



		let style = {
				height: ($isMasked ? 100 : 80) + '%',
		}

		if (scrollTop === 0 || scrollHeight === clientHeight) {
				//console.log('Zorg!');
				style.top = '-145px'
		} else if (spaceBelow <= 200) {
				//console.log('Bleurge!!!');
				style.bottom = '200px'
		} else {
				//console.log('Jog!');
				//console.log(xCoef);
				style.bottom = `${spaceBelow <= 200 ? 200 : (530 - 400 * xCoef)}px`
		}

		return { style }})`
		position: absolute;
		width: calc(20px + 100%);
		left: -10px;
`

const Landscape = styled.img.attrs(() => {
		const { clientWidth } = document.documentElement
		const minWidth = 778
		const xCoef = (clientWidth - 768) / (S.MAX_MOBILE_WIDTH - minWidth)
		let bottom = -5
		if (xCoef > 0) {
				bottom -= 65 * xCoef
		}
		return {
				style: {
						bottom: bottom + 'px',
						minWidth: minWidth + 'px'
				}
		}})`
		position: absolute;
		left: 50%;
  transform: translateX(-50%);
		width: 100%;
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

const ImgContainer = styled.div.attrs(({ $name, $yCoef, $style, $func, $imgStyle = {} }) => {
		return {
				children: [
						<img
								key={$name}
								src={Bg($name, false)}
								alt={$name}
								style={{ ...$imgStyle, ...$func($yCoef) }}	/>
				],
				style: $style
		}})`
		position: absolute;
		img {
				width: 100%;
				position: absolute;
				z-index: 1;
				transition: all 1s ease;
				pointer-events: none;
		};
`

const renderSun = () => {
		const spaceBelow = getSpaceBelow()

		let shiftY = -345

		if (spaceBelow <= 450) {
				shiftY = 0
		}

		return {
				transform: `translateY(${shiftY}%)`
		}
}

const renderCloud1 = () => {
		const { scrollTop } = document.documentElement

		let shiftX = 0
		let shiftY = 0
		let scale = 1

		if (scrollTop >= 200) {
				shiftX = 100
				shiftY = 250
				scale = 0.75
		} else if (scrollTop >= 100) {
				shiftX = 50
				shiftY = 125
				scale = 0.825
		}

		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}
}

const renderCloud2 = () => {
		const { scrollTop } = document.documentElement

		let shiftX = 0
		let shiftY = 0
		let scale = 1

		if (scrollTop >= 125) {
				shiftX = -20
				shiftY = 250
				scale = 0.75
		}

		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}
		//const scale = 1 - Math.abs(1 * xCoef)
		//const shiftX = -100 * xCoef
		//const shiftY = 1000 * xCoef
		//return {
		//		transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`,
		//		zIndex: 3
		//}
}

const renderCloud3 = () => {
		const { scrollTop } = document.documentElement

		let shiftX = 0
		let shiftY = 0
		let scale = 1

		if (scrollTop >= 200) {
				shiftX = 20
				shiftY = 500
				scale = 0.75
		} else if (scrollTop >= 150) {
				shiftX = 40
				shiftY = 250
				scale = 0.825
		}

		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}
		//const scale = 1 - Math.abs(0.5 * xCoef)
		//const shiftX = 80 * xCoef
		//const shiftY = 800 * xCoef
		//return {
		//		transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`,
		//		zIndex: 3
		//}
}

const renderCloud4 = () => {
		const { scrollTop } = document.documentElement

		let shiftX = 0
		let shiftY = 0
		let scale = 0.75

		if (scrollTop >= 800) {
				shiftX = 20
				shiftY = 700
				scale = 0.75
		} else if (scrollTop >= 450) {
				shiftX = -50
				shiftY = 250
				scale = 1
		}

		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}
		//xCoef -= 0.31
		//const scale = 1 - Math.abs(0.5 * xCoef)
		//const shiftX = (xCoef <= 0 ? -120 : 220) * xCoef
		//const shiftY = (xCoef <= 0 ? 600 : 3000) * xCoef
		//return {
		//		transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		//}
}

const renderCloud5 = () => {
		const { scrollTop } = document.documentElement

		let shiftX = 0
		let shiftY = 0
		let scale = 0.75

		if (scrollTop >= 750) {
				shiftX = -25
				shiftY = 750
				scale = 0.75
		} else if (scrollTop >= 400) {
				shiftX = 75
				shiftY = 300
				scale = 1
		}

		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}
		//cCoef -= 0.31
		//const scale = 1 - Math.abs(cCoef)
		//const shiftX = (cCoef <= 0 ? -50 : 200) * cCoef
		//const shiftY = (cCoef <= 0 ? 700 : 2000) * cCoef
		//return {
		//		transform: `translate(-${shiftX}%, ${shiftY}%) scale(${scale})`
		//}
}

const renderCloud6 = yCoef => {
		const spaceBelow = getSpaceBelow()

		let shiftX = 0
		let shiftY = 0
		let scale = 1

		if (spaceBelow <= 450) {
				scale = 0.75
				shiftX = 50 + (50 * yCoef)
				shiftY = 300
		}

		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}
		//xCoef -= 0.31
		//if (xCoef < 0) return {}
		//const scale = 1 - Math.abs(1 * xCoef)
		//const shiftX = Math.abs(200 * xCoef)
		//const shiftY = 1000 * xCoef
		//return {
		//		transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		//}
}

const renderPalm1 = yCoef => {
		const spaceBelow = getSpaceBelow()

		let shiftX = 100 + (60 * yCoef)
		let shiftY = -10 * yCoef
		let scale = 0.75
		let rotate = 25 + (10 * yCoef)

		if (spaceBelow <= 300) {
				shiftX = 0
				shiftY = 0
				scale = 1
				rotate = 0
		}

		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale}) rotate(${rotate}deg)`
		}
}

const renderPalm2 = yCoef => {
		const spaceBelow = getSpaceBelow()

		let shiftX = -30 - (70 * yCoef)
		let shiftY = 5
		let scale = 0.75
		let rotate = -25 - (10 * yCoef)

		if (spaceBelow <= 300) {
				shiftX += 65
				shiftY = 0
				scale = 1
				rotate = 0
		}

		return {
				transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale}) rotate(${rotate}deg)`
		}
}

const renderPlant1 = () => {
		if (window.innerWidth < 568) {
				return {
						transform: `translate(15%, 5%)`
				}
		}

		return {}
}

const renderPlant2 = yCoef => {
		yCoef = (0.4 - yCoef) * 5
		if (yCoef < 0) yCoef = 0
		if (yCoef > 1) yCoef = 1

		const shiftX = -(20 + 20 * yCoef)
		const shiftY = 5 + 5 * yCoef
		const rotate = -15 * yCoef

		if (window.innerWidth < 568) {
				return {
						transform: `translate(${shiftX}%, ${shiftY}%) rotate(${rotate}deg)`
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
					right: '25%',
					width: '228px'
		},
		$imgStyle: {
				zIndex: 3
		},
		$func: renderCloud1
}, {
		$name: 'cloud2',
		$style: {
				top: '7%',
				right: '70%',
				width: '390px'
		},
		$imgStyle: {
				zIndex: 3
		},
		$func: renderCloud2
}, {
		$name: 'cloud3',
		$style: {
				top: '10%',
				left: '70%',
				width: '350px'
		},
		$imgStyle: {
				zIndex: 3
		},
		$func: renderCloud3
	}, {
		$name: 'cloud4',
		$style: {
				top: '30%',
				left: '60%',
				width: '420px'
		},
		$func: renderCloud4
}, {
		$name: 'cloud5',
		$style: {
				top: '35%',
				right: '75%',
				width: '280px'
		},
		$func: renderCloud5
}, {
		$name: 'cloud6',
		$style: {
				top: '68%',
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
				zIndex: 3
		},
		$func: renderPalm1
}, {
		$name: 'palm2',
		$style: {
				bottom: '650px',
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

const renderBackground = (yCoef, isAdult) => {

		return (
				<Background>
						<Sky src={Bg('sky-mobile', false)} alt='sky' className='sky-mobile' $isMasked={!isAdult} />
						{images.map(props => (
								<ImgContainer
										{...props}
										key={props.$name}
										$yCoef={yCoef}
										onPointerDown={pdsp} />))}
						<Landscape src={Bg('landscape', false)} alt='landscape'/>
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
				<StlLayout renderLayer={() => renderBackground(yCoef, ageConfirmation)}>
						<Content>
								<Header>
										<LanguageSwitch className='mobile-language-switch' />
								</Header>
								<Main $width={contentWidth}>
										<Info opacity={opacity} />
										<Products opacity={opacity} contentWidth={contentWidth} />
										<Partners opacity={opacity} contentWidth={contentWidth} />
								</Main>
						</Content>
						<Footer />
				</StlLayout>
		)
}