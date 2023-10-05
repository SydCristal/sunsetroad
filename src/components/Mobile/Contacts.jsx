import styled from 'styled-components'
import { Ic } from '../../Utils'

const StlContacts = styled.div`
		dispay: flex;
		flex-direction: column;
		widh: 260px;
		align-items: center;
		> a {
				font-size: 24px;
				font-weight: 600;
				text-decoration: none;
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