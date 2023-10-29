import styled from 'styled-components'
import { useAgeConfirmationContext, useScaleContext } from '../../Contexts'
import { useLanguageContext } from '../../Contexts'
import { l } from './'
import { Lo, Bg, S } from '../../Utils'
import { useState, useEffect } from 'react'

const AgeFilterDialog = styled.div`
		margin: 0px auto;
		padding: ${({ $short }) => $short || 70}px 0;
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
				margin: ${({ $short }) => $short || 50}px 0;
				transition: opacity 0.5s ease-in-out;
				padding: 0 15px;
		};
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
		const { scale } = useScaleContext()
		const [display, setDisplay] = useState('flex')
		const { language } = useLanguageContext()
		l.setLanguage(language)

		useEffect(() => {
				if (ageConfirmation) setDisplay('none')
		}, [ageConfirmation])

		return (
				<AgeFilterDialog opacity={ageConfirmation ? 0 : 1} $short={scale.height < 700 && 15} id='age-filter' >
						<LogoContainer display={scale.height > 500 ? 'block' : 'none'} $short={scale.height < 700}>
								<img src={Lo('logo', false)} alt='logo' />
						</LogoContainer>
						<LogoContainer display={scale.height < 500 ? 'block' : 'none'} $short={true}>
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