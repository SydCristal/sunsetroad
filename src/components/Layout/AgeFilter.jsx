import styled from 'styled-components'
import { useAgeConfirmationContext, useScaleContext } from '../../Contexts'
import { LanguageSwitch } from '../Header'
import { useLanguageContext } from '../../Contexts'
import { l } from './'
import { Lo, Bg, S } from '../../Utils'
import { useState, useEffect } from 'react'

const StlAgeFilter = styled.div`
		${({ display }) => ({ display })};
		position: fixed;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 100;
		background-color: rgba(0, 0, 0, ${({ opacity }) => opacity ? 0.3 : 0});
`

const AgeFilterDialog = styled.div`
		margin: 0px auto;
		padding: ${({ $short }) => $short || 70}px 0;
		width: 350px;
		display: inherit;
  flex-direction: column;
		align-items: center;
		justify-content: ${({ $short }) => $short ? 'space-around' : 'space-between'};
		> * {
				${({ opacity }) => ({ opacity })};
		};
		p {
				color: #FFF;
				text-align: center;
				text-shadow: ${S.TEXT_SHADOW};
				font-family: Bitter;
				font-size: ${({ $short }) => $short ? 20 : 25}px;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				margin: ${({ $short }) => $short || 50}px 0;
				transition: opacity 0.5s ease-in-out;
				padding: 0 15px;
		};
`

const LanguageSwitchContainer = styled.div`
		padding: 5px 30px;
		position: absolute;
		right: 0;
		height: 35px;
		&.mobile-language-switch-container {
				padding: 25px 40px;
				height: 85px;
		}
`

const LogoContainer = styled.div`
		${({ display }) => ({ display })};
		max-width: 250px;
		max-height: 195px;
		margin: 0 auto ${({ $short }) => $short ? 10 : 55}px;
		transition: opacity 0s ease-in-out;
		img {
			width: 100%;
		};
`

const ConfirmationButton = styled.button`
		min-width: 275px;
		height: 75px;
		background-color: rgba(12, 12, 12, 0.5);
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
`

export function AgeFilter({ opacity }) {
		const { ageConfirmation, setAgeConfirmation } = useAgeConfirmationContext()
		const { scale } = useScaleContext()
		const [display, setDisplay] = useState('flex')
		const { language } = useLanguageContext()
		l.setLanguage(language)
		const { clientHeight, offsetHeight, scrollHeight } = document.documentElement

		const className = scale.width <= S.MAX_MOBILE_WIDTH && 'mobile-language-switch'

		useEffect(() => {
				if (ageConfirmation) setDisplay('none')
		}, [ageConfirmation])

		return (
				<StlAgeFilter
						display={display}
						opacity={opacity}>
						<LanguageSwitchContainer className={className + '-container'}>
								<LanguageSwitch className={className} />
						</LanguageSwitchContainer>
						<AgeFilterDialog className='unselectable' opacity={ageConfirmation ? 0 : 1} $short={scale.height < 700 && 15}>
								<LogoContainer display={scale.height > 500 ? 'block' : 'none'} $short={scale.height < 700}>
										<img src={Lo('logo', false)} alt='logo' />
								</LogoContainer>
								<LogoContainer display={scale.height < 500 ? 'block' : 'none'} $short={true}>
										<img src={Bg('heading', false)} alt='heading' />
								</LogoContainer>
								<p className='unselectable'>
										{'clientHeight: ' + scrollHeight + ', offsetHeight: ' + offsetHeight + ', scrollHeight: ' + scrollHeight}
								</p>
								<ConfirmationButton className='unselectable' onClick={() => setAgeConfirmation(true)}>
										{l.confirm}
								</ConfirmationButton>
						</AgeFilterDialog>
				</StlAgeFilter>
		)		
}
// {l.ageFilterText}