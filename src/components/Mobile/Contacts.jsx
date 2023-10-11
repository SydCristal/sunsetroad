import styled from 'styled-components'
import { Ic, S } from '../../Utils'

const StlContacts = styled.div`
		display: flex;
		flex-direction: column;
		width: 260px;
		align-items: center;
		margin: 0 auto;
		> a {
				font-size: 26px;
				font-weight: 600;
				text-decoration: none;
				font-family: 'Orelega One';
				text-shadow: ${S.TEXT_OUTLINE};
		};
		> ul {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin: 20px 0 60px;
				padding: 0;
				list-style: none;
		};
`

const contactsMap = {
		facebook: 'https://www.facebook.com/people/SunsetroadBeer/100088255544244/',
		instagram: 'https://www.instagram.com/sunsetroad.beer/',
		whatsapp: 'https://wa.me/6281936549298',
		telegram: 'https://t.me/gasss77'
}

const contactsArray = Object.keys(contactsMap)

export function Contacts() {
		const renderContacts = contact => (
				<li key={contact}>
						<a href={contactsMap[contact]} target='_blank'>
								<img src={Ic(contact, false)} alt={contact} />
						</a>
				</li>
		)

		return (
				<StlContacts>
						<a href='mailto:info@sunsetroad.beer'>info@sunsetroad.beer</a>
						<ul>
								{contactsArray.map(renderContacts)}
						</ul>
				</StlContacts>
		)
}