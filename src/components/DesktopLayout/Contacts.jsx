import { C } from '../../Utils'
import styled from 'styled-components'
import { useLanguageContext } from '../../Contexts'
import { ContactFormTrigger, DistributorMapTrigger } from '../Common'
import { l } from './'
import { useMemo } from 'react'

const Contacts = () => {
		const { language } = useLanguageContext()
		useMemo(() => l.setLanguage(language), [language])

		console.log('RENDER DESKTOP CONTACTS');

		return (
				<StlContacts>
						<Brewed><h2>{l.brewed}</h2></Brewed>
						<div>
								<StlContactFormTrigger />
						</div>
						<StlDistributorMapTrigger device='desktop'>
								{l.map}
						</StlDistributorMapTrigger>
				</StlContacts>
		)
}

const StlContacts = styled.div`
		height: 25px;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0 10px;
		* {
				transition: opacity 0.2s ease-in-out;
		};
		> div	{
				flex: 1;
		};
		h2 {
				opacity: 0.55;
				margin-top: 0;
				margin-bottom: 0;
				color: #FFF;
				text-shadow: 0px 0px 18px #000;
				font-size: 20px;
				font-weight: 800;
				text-transform: uppercase;
		}
`

const Brewed = styled.div`
		h2 {
			display: block;
			width: 195px;
			text-align: center;
		};
`

const StlContactFormTrigger = styled(ContactFormTrigger)`
		&:hover {
				opacity: ${C.ACTIVE_UI_EL_OPACITY};
		};
`

const StlDistributorMapTrigger = styled(DistributorMapTrigger)`
		img {
			margin-right: 20px;
		};
`

export { Contacts }