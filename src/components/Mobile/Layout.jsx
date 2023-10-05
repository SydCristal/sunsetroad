import { Parallax } from 'react-parallax';
import { Bg } from '../../Utils'
import styled from 'styled-components'
import { LanguageSwitch, Info, Partners, Contacts } from './'
import Carousel from '../Carousel'

const StlLayout = styled(Parallax)`
		.react-parallax-bgimage {
				padding-bottom: 310px;
		};
		.react-parallax-background-children {
				height: 100%;
				width: 100%;
		};
`

const Content = styled.div`
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
`

const Header = styled.header`
		padding: 35px 50px;
		display: flex;
		width:	100%;
		flex-direction: row;
		justify-content: flex-end;
		position: absolute;
`

const Background = styled.div`
		width: 100%;
		height: 100%;
		position: absolute;
`

const Sky = styled.img.attrs(props => ({
			style: {
			  top: props.$coef,
			},
  }))`
		position: absolute;
		height: 1488px;
		left: 50%;
  transform: translateX(-50%);
`

const Cloud2 = styled.img.attrs(props => ({
		style: {
		},
		}))`
		position: absolute;
		top: 125px;
		right: 70%;
		width: 390px;
		z-index: 1;
`

const Cloud3 = styled.img.attrs(props => ({
		style: {
				},
		}))`
		position: absolute;
		top: 179px;
		width: 350px;
		left: 70%;
		z-index: 1;
`

const Cloud4 = styled.img.attrs(props => ({
		style: {
				},
		}))`
		position: absolute;
		top: 480px;
		width: 420px;
		left: 75%;
		z-index: 1;
`

const Cloud5 = styled.img.attrs(props => ({
		style: {
				},
		}))`
		position: absolute;
		top: 550px;
		width: 280px;
		right: 75%;
		z-index: 1;
`

const Cloud6 = styled.img.attrs(props => ({
		style: {
				},
		}))`
		position: absolute;
		top: 1130px;
		width: 230px;
		left: 75%;
		z-index: 1;
`

const Sun = styled.img.attrs(props => ({
		style: {
				bottom: 500 - props.$coef,
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

export default function Layout() {
		const renderBackground = percentage => {
				console.log(percentage)
				let sunCoef = 0
				let skyCoef = 55 * (percentage - 1)

				if (percentage > 1.35) {
						sunCoef = 1035 * (percentage - 1.35)
				}

				return (
						<Background>
								<Sky src={Bg('mobile-bg', false)} alt='sky' $coef={skyCoef} />
								<Cloud2 src={Bg('cloud2', false)} alt='cloud2' />
								<Cloud3 src={Bg('cloud3', false)} alt='cloud3' />
								<Cloud4 src={Bg('cloud4', false)} alt='cloud4' />
								<Cloud5 src={Bg('cloud5', false)} alt='cloud5' />
								<Cloud6 src={Bg('cloud6', false)} alt='cloud6' />
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
								<Info />
								<Carousel />
								<Partners />
								<Contacts />
						</Content>
				</StlLayout>
		)
}