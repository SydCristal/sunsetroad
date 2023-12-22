import styled, { css } from 'styled-components'
import { DistributorMapTrigger } from '../Common'
import { l } from './'
import { useLanguageContext } from '../../Contexts'
import { useMemo } from 'react'
import { C } from '../../Utils'

const MobileInfo = () => {
		const { language } = useLanguageContext()
		useMemo(() => l.setLanguage(language), [language])

		return (
				<StlMobileInfo>	
						<Text>{l.text}</Text>
						<DistributorMapTrigger
								device='mobile'>
								{l.slogan}
						</DistributorMapTrigger>
				</StlMobileInfo>
		)
}

const StlMobileInfo = styled.section`
		margin-bottom: 50px;
		min-height: 300px;
		position: relative;
`

const Text = styled.p`
		font-size: 18px;
  line-height: 20px;
  font-weight: 600;
  padding: 0px;
  margin: 0px 0px 10px;
		color: black;
		font-family: 'Bitter';
`

export { MobileInfo }