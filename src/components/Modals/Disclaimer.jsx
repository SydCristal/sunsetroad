import styled from 'styled-components'
import { l } from './'
import { Lo, C } from '../../Utils'
import { forwardRef, memo } from 'react'
import { Localizer } from '../Common'

const Disclaimer = memo(forwardRef(({ close }, ref) => {
		//console.log('RENDER DISCLAIMER')

		return (
				<StlDisclaimer ref={ref} id='Disclaimer'>
						<LogoContainer>
								<Logo src={Lo('logo', false, 'svg')} alt='logo' />
								<Heading src={Lo('heading', false, 'svg')} alt='heading' />
						</LogoContainer>
						<DisclaimerText localization={l.ageFilterText} tag='p'/>
						<ConfirmationButton onClick={close}>
								<Localizer localization={l.confirm} />
						</ConfirmationButton>
				</StlDisclaimer>
		)
}))

const StlDisclaimer = styled.div`
		margin: 0px auto;
		width: 350px;
		min-height: 100vh;
  flex-direction: column;
		display: flex;
		align-items: center;
		${C.isShort} {
				padding-top: 15px;
				padding-bottom: 15px;
				justify-content: space-around;
		};
		${C.isTall} {
				padding-top: 70px;
				padding-bottom: 90px;
				justify-content: space-between;
		};
		.blurred & > * {
				opacity: 1;
		};
`

const DisclaimerText = styled(Localizer)`
		color: #FFF;
		text-align: center;
		text-shadow: ${C.TEXT_SHADOW};
		font-family: Bitter;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		transition: opacity 0.5s ease-in-out;
		padding: 0 15px;
		opacity: 0;
		> * {
				width: 320px;
				margin: 0 auto;
		};
		${C.isShort} {
				font-size: 20px;
				margin: 15px 0;
		};
		${C.isTall} {
				font-size: 25px;
				margin: 50px 0;
				height: 120px;
		};
`

const LogoContainer = styled.div`
		${C.mediaOr([C.isDesktop, C.isShort])} {
				opacity: 0;
				transition: opacity 0.5s ease-in-out;
		};
		${C.mediaAnd([C.isTall, C.isMobile])} {
				&& opacity: 1;
				transition: none;
		};
		${C.isShort} {
				height: 100px;
				margin: 0 auto;
		};
		${C.isTall} {
				height: 195px;
				width: 191px;
				margin: 0 auto 55px;
		};
		width: 100%;
		position: relative;
		> img {
				height: 100%;
				z-index: 2;
		};
`

const Logo = styled.img`
		position: absolute;
		display: block;
		width: 100%;
		${C.isShort} {
				display: none;
		};
`

const Heading = styled.img`
		display: none;
		margin: 0 auto;
		${C.isShort} {
				display: block;
		};
`

const ConfirmationButton = styled.button`
		min-width: 275px;
		height: 75px;
		background-color: ${C.MODAL_SHADOW};
		border: none;
		border-radius: 15px;
		color: #FFF;
		text-align: center;
		font-family: Bitter;
		font-size: 37px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		padding: 0 35px;
		transition: opacity 0.5s ease-in-out;
		cursor: pointer;
		opacity: 0;
		> * {
			width: 100%;
		};
`

export { Disclaimer }