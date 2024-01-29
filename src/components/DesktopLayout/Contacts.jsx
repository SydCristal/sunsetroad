import { C } from '../../Utils'
import styled from 'styled-components'
import { ContactFormTrigger, Localizer } from '../Common'
import { l } from './'

const Contacts = () => {
		return (
				<StlContacts>
						<div>
								<Brewed tag='h2' localization={l.brewed} />
						</div>
						<div>
								<StlContactFormTrigger />
						</div>
						<div>
								<Pasteurized tag='h2' localization={l.pasteurized} />
						</div>
				</StlContacts>
		)
}

const StlContacts = styled.div`
		height: 25px;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 0 10px;
		> div	{
				flex: 1;
				> * {
					transition: opacity 0.2s ease-in-out;
				};
				&:last-child {
						text-align: end;
				};
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

const Brewed = styled(Localizer)`
		display: block;
		width: 195px;
		text-align: center;
`

const Pasteurized = styled(Localizer)`
		width: 195px;
		text-align: center;
`

const StlContactFormTrigger = styled(ContactFormTrigger)`
		&:hover {
				opacity: ${C.ACTIVE_UI_EL_OPACITY};
		};
`

export { Contacts }