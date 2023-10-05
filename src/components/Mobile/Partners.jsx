import { useLanguageContext } from '../../Contexts'
import styled from 'styled-components'
import { l } from './Localization'
import { S, Lo } from '../../Utils'

const StlPartners = styled.div`
		margin-top: 60px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 130px;
		> h1 {
				margin: 0 0 30px;
				font-family: 'Orelega One';
				font-size: 35px;
				font-weight: 400;
				text-shadow: 1px 1px 1px ${S.TEXT_SHADOW}, -1px 1px 1px ${S.TEXT_SHADOW}, 1px -1px 1px ${S.TEXT_SHADOW}, -1px -1px 1px ${S.TEXT_SHADOW};
		};
		>	div {
				width: 280px;
				height: 150px;
		}
`

const PartnersRow = styled.ul`
		width: 100%;
		list-style: none;
		display: flex;
		flex-direction: row;
		margin: 0;
		padding: 0;
		justify-content: ${({ children }) => children?.length % 2 ? 'space-between' : 'space-around'};
		$img {
				width: 71px;
				height: 71px;
		}
`

const partnersMap = {
		Draniki: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		BaliWood: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		Stark: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		Gabets: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		MeltingPot: 'https://www.youtube.com/watch?v=xvFZjo5PgG0'
}

const partnersArray = Object.keys(partnersMap)

export function Partners() {
		const { language } = useLanguageContext()
		l.setLanguage(language)

		const isEven = partnersArray.length % 2 === 0
		const apperRow = isEven ? partnersArray.slice(0, 3) : partnersArray.slice(0, 2)
		const lowerRow = isEven ? partnersArray.slice(3) : partnersArray.slice(2)

		const renderPartner = partner => (
				<li key={partner}>
						<a href={partnersMap[partner]} target='_blank'>
								<img src={Lo(partner, false)} alt={partner} />
						</a>
				</li>
		)

		return (
				<StlPartners>
						<h1>{l.partners}</h1>
						<div>
								<PartnersRow>
										{apperRow.map(renderPartner)}
								</PartnersRow>
								<PartnersRow>
										{lowerRow.map(renderPartner)}
								</PartnersRow>
						</div>
				</StlPartners>
		)
}