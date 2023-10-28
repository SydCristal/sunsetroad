import styled from 'styled-components'
import { Ic, S } from '../../Utils'
import { useContactFormContext } from '../../Contexts'

const ContactsContainer = styled.div`
		display: flex;
		flex-direction: column;
		width: 212px;
		align-items: center;
		margin: 0 auto;
		> a {
				color: #FFF;
				text-align: center;
				text-shadow: 0px 0px 20px #000;
				font-family: 'Bitter', serif;
				font-size: 24px;
				font-style: normal;
				font-weight: 800;
				line-height: normal;
				text-decoration: none;
				text-transform: uppercase;
				opacity: ${S.ACTIVE_UI_EL_OPACITY};
				&:hover {
						opacity: 1;
				};
		};
		> ul {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 0;
				list-style: none;
				margin: 10px auto 5px;
				>	li img {
						width: 45px;
						height: 45px;
						opacity: ${S.ACTIVE_UI_EL_OPACITY};
						&:hover {
								opacity: 1;
						};
				};
		};
		&.mobile-contacts {
				width: 260px;
				> a {
						font-size: 26px;
						font-weight: 600;
						text-decoration: none;
						font-family: 'Orelega One';
						text-transform: lowercase;
						text-shadow: ${S.TEXT_OUTLINE};
						opacity: 1;
				};
				> ul {
						margin: 20px 0 60px;
						> li img {
								width: 52px;
								height: 52px;
								opacity: 1;
						};
				};
		}
`

const contactsMap = {
		facebook: 'https://www.facebook.com/people/SunsetroadBeer/100088255544244/',
		instagram: 'https://www.instagram.com/sunsetroad.beer/',
		whatsapp: 'https://wa.me/380973853940',
		telegram: 'https://t.me/gasss77'
}

const contactsArray = Object.keys(contactsMap)

export function Contacts({ className }) {
		const { setContactForm } = useContactFormContext()
		const renderContacts = contact => (
				<li key={contact}>
						<a href={contactsMap[contact]} target='_blank'>
								<img src={Ic(contact, false)} alt={contact} />
						</a>
				</li>
		)

		const onEmailClick = e => {
				e.preventDefault()
				e.stopPropagation()
				setContactForm(true)
		}

		return (
				<ContactsContainer className={className}>
						<a
								href='mailto:info@sunsetroad.beer'
								onPointerDown={onEmailClick}>
								info@sunsetroad.beer
						</a>
						<ul>
								{contactsArray.map(renderContacts)}
						</ul>
				</ContactsContainer>
		)
}