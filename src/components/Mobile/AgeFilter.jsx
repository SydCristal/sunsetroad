import styled from 'styled-components'
import { useAgeConfirmationContext } from '../../Contexts'
import { LanguageSwitch } from './'
import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import { Lo } from '../../Utils'
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
		padding: 70px 0;
		width: 350px;
		display: flex;
  flex-direction: column;
		align-items: center;
		justify-content: space-between;
		> * {
				${({ opacity }) => ({ opacity })};
		};
		p {
				color: #FFF;
				text-align: center;
				text-shadow: 0px 4px 9px rgba(0, 0, 0, 0.25);
				font-family: Bitter;
				font-size: 28px;
				margin: 60px 0 25px;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				margin: 50px auto;
				transition: opacity 0.5s ease-in-out;
		};
`

const LanguageSwitchContainer = styled.div`
		padding: 25px 40px;
		position: absolute;
		right: 0;
`

const LogoContainer = styled.div`
		width: 191px;
		height: 195px;
		margin: 0 auto 55px;
		transition: opacity 0s ease-in-out;
		img {
			width: 100%;
			height: 100%;
		};
`

const ConfirmationButton = styled.button`
		min-width: 290px;
		height: 96px;
		background-color: rgba(12, 12, 12, 0.39);
		border: none;
		border-radius: 15px;
		color: #FFF;
		text-align: center;
		font-family: Bitter;
		font-size: 40px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		padding: 0 35px;
		transition: opacity 0.5s ease-in-out;
`

export function AgeFilter({ opacity }) {
		const { ageConfirmation, setAgeConfirmation } = useAgeConfirmationContext()
		const [display, setDisplay] = useState('block')
		const { language } = useLanguageContext()
		l.setLanguage(language)

		return (
				<StlAgeFilter
						display={display}
						opacity={opacity}>
						<LanguageSwitchContainer>
								<LanguageSwitch />
						</LanguageSwitchContainer>
						<AgeFilterDialog opacity={ageConfirmation ? 0 : 1}>
								<LogoContainer>
										<img src={Lo('logo', false)} alt='logo' />
								</LogoContainer>
								<p>
										{l.ageFilterText}
								</p>
								<ConfirmationButton onClick={() => setAgeConfirmation(true)}>
										{l.confirm}
								</ConfirmationButton>
						</AgeFilterDialog>
				</StlAgeFilter>
		)		
}