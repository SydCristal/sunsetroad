import styled from 'styled-components'
import { useAgeConfirmationContext } from '../../Contexts'
import { LanguageSwitch } from './'
import { useLanguageContext } from '../../Contexts'
import { l } from './Localization'
import { Lo } from '../../Utils'

const StlAgeFilter = styled.div`
		${({ display }) => ({ display })};
		position: fixed;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.3);
`

const AgeFilterDialog = styled.div`
		margin: 70px auto;
		width: 440px;
		display: flex;
  flex-direction: column;
		align-items: center;
		p {
				color: #FFF;
				text-align: center;
				text-shadow: 0px 4px 9px rgba(0, 0, 0, 0.25);
				font-family: Bitter;
				font-size: 30px;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				margin: 50px auto;
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
`

export function AgeFilter({ onClick }) {
		const { ageConfirmation, setAgeConfirmation } = useAgeConfirmationContext()
		const { language } = useLanguageContext()
		l.setLanguage(language)

		return (
				<StlAgeFilter display={ageConfirmation ? 'none' : 'block'}>
						<LanguageSwitchContainer>
								<LanguageSwitch />
						</LanguageSwitchContainer>
						<AgeFilterDialog>
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