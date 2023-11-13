import styled from 'styled-components'
import { useAgeConfirmationContext, useScreenContext } from '../../Contexts'
import { useLanguageContext } from '../../Contexts'
import { l } from './'
import { Lo, Bg, S } from '../../Utils'
import { useState, useEffect } from 'react'

const AgeFilterDialog = styled.div`
		margin: 0px auto;
		padding-top: ${({ $short }) => $short ? 15 : 70}px;
		padding-bottom: ${({ $short }) => $short ? 15 : 90}px;
		width: 350px;
		display: none;
  flex-direction: column;
		align-items: center;
		justify-content: ${({ $short }) => $short ? 'space-around' : 'space-between'};
		p {
				color: #FFF;
				text-align: center;
				text-shadow: ${S.TEXT_SHADOW};
				font-family: Bitter;
				font-size: ${({ $short }) => $short ? 20 : 25}px;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				margin: ${({ $short }) => $short ? 15 : 50}px 0;
				transition: opacity 0.5s ease-in-out;
				padding: 0 15px;
		};
`

const LogoContainer = styled.div`
		${({ display }) => ({ display })};
		max-width: 250px;
		max-height: 195px;
		margin: 0 auto ${({ $short }) => $short ? 0 : 55}px;
		transition: opacity 0s ease-in-out;
		img {
			width: 100%;
		};
`

const ConfirmationButton = styled.button`
		min-width: 275px;
		height: 75px;
		background-color: ${S.MODAL_SHADOW};
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

export function AgeFilter() {
		const { ageConfirmation, setAgeConfirmation } = useAgeConfirmationContext()
		const { screen } = useScreenContext()
		const [display, setDisplay] = useState('flex')
		const { language } = useLanguageContext()
		const short = screen.height < 700
		l.setLanguage(language)

		useEffect(() => {
				if (ageConfirmation) setDisplay('none')
		}, [ageConfirmation])

		return (
				<AgeFilterDialog opacity={ageConfirmation ? 0 : 1} $short={short} id='age-filter' >
						<LogoContainer display={short ? 'none' : 'block'} $short={false}>
								<img src={Lo('logo', false)} alt='logo' />
						</LogoContainer>
						<LogoContainer display={short ? 'block' : 'none'} $short={true}>
								<img src={Bg('heading', false)} alt='heading' />
						</LogoContainer>
						<p>
								{l.ageFilterText}
						</p>
						<ConfirmationButton onClick={() => setAgeConfirmation(true)}>
								{l.confirm}
						</ConfirmationButton>
				</AgeFilterDialog>
		)		
}