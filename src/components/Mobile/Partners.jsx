import { useLanguageContext } from '../../Contexts'
import styled from 'styled-components'
import { l } from './Localization'
import { S, Lo, Ic } from '../../Utils'
import { useState, useRef } from 'react'

const StlPartners = styled.div`
		margin-top: 65px;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 220px;
		margin-bottom: 130px;
		position: relative;
		> h1 {
				margin: 0 0 30px;
				font-family: 'Orelega One';
				font-size: 35px;
				font-weight: 400;
				text-shadow: ${S.TEXT_OUTLINE};
		};
`

const PartnerContainer = styled.div`
		position: absolute;
		height: 150px;
		bottom: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		touch-action: none;
		&.transitioning {
				> * {
					 opacity: 1 !important;
				};
		};
		&:not(.transitioning) {
				transition: transform 0.5s ease-in-out;
		}
`

const PartnerGroup = styled.div`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		position: relative;
		transition: transform 0.5s ease-in-out;
`

const PartnerRow = styled.ul`
		list-style: none;
		display: flex;
		flex-direction: row;
		position: relative;
		margin: 0;
		padding: 0;
		justify-content: ${({ children }) => children?.length % 2 ? 'space-between' : 'space-around'};
		a {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 71px;
				height: 71px;
		}
`

const Arrow = styled.img`
		position: absolute;
		width: 50px;
		height: 30px;
		top: 20px;
		cursor: pointer;
		&:first-child {
				left: 0px;
		};
		&:last-child {
				right: 0px;
		}
`

const partnerMap = {
		Draniki: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		BaliWood: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		StarkBotique: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		Gabets: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		MeltingPot: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		TwoThousandEighty: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		Fabbrica: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		Hubble: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		LigaTennis: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		Izzi: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		NowBeer: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		SouthEast: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		SushiShop: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
		WarungCanteen: 'https://www.youtube.com/watch?v=xvFZjo5PgG0'
}

const partnerArray = Object.keys(partnerMap)

const partnerGroups = partnerArray.reduce((acc, partner, i) => {
		if (i % 5 === 0) {
				acc.push([partner])
		} else {
				acc[acc.length -1].push(partner)
		}

		return acc
}, [])

export function Partners({ contentWidth }) {
		const [currentGroup, setCurrentGroup] = useState(0)
		const [prevGroup, setPrevGroup] = useState(0)
		const { language } = useLanguageContext()
		const containerRef = useRef(null)
		const windowWidth = window.innerWidth
		l.setLanguage(language)
		let swipeStartX = 0
		let swipeDirection
		let swipeStartTime = 0

		const groupCount = partnerGroups.length
		const rowWidth = 280
		const spaceBetween = (windowWidth - contentWidth) / 2
		const containerStyles = {
				left: -spaceBetween - contentWidth + 'px',
				width: spaceBetween * (groupCount - 1) + groupCount * contentWidth + 'px'
		}

		const onSwipeStart = e => {
				e.preventDefault()
				e.stopPropagation()
				const { changedTouches, timeStamp } = e
				swipeStartX = changedTouches[0]?.pageX
				swipeStartTime = timeStamp
				const container = containerRef.current
				container.classList.add('transitioning')
		}

		const onSwipeMove = e => {
				e.preventDefault()
				e.stopPropagation()
				const { changedTouches } = e
				const container = containerRef.current
				const shift = changedTouches[0]?.pageX - swipeStartX
				const direction = shift > 0 ? 'right' : 'left'
				container.style.transform = `translateX(${shift}px)`
				if (swipeDirection !== direction) {
						swipeDirection = direction
						const displayedGroup = container.children[currentGroup]
						let adjacentGroup
						if (direction === 'right') adjacentGroup = displayedGroup.previousElementSibling || container.children[groupCount - 1]
						if (direction === 'left') adjacentGroup = displayedGroup.nextElementSibling || container.children[0]
						adjacentGroup.style.opacity = 1
				}
		}

		const movePartners = (e, coef) => {
				e?.preventDefault()
				e?.stopPropagation()
				let newGroup = currentGroup + coef
				if (newGroup === groupCount) newGroup = 0
				if (newGroup === -1) newGroup = groupCount - 1
				setPrevGroup(currentGroup)
				setCurrentGroup(newGroup)
		}

		const onSwipeEnd = e => {
				const { changedTouches, timeStamp } = e

				if (timeStamp - swipeStartTime > 300) {
						e.preventDefault()
						e.stopPropagation()
				}

				const sectionWidth = windowWidth / 3
				const startSection = Math.floor(swipeStartX / sectionWidth)
				const swipeEnd = changedTouches[0]?.pageX
				const endSection = Math.floor(swipeEnd / sectionWidth)
				const container = containerRef.current
				container.classList.remove('transitioning')
				container.style.transform = `translateX(0px)`
				for (let i = 0; i < container.children.length; i++) {
						if (i === currentGroup || i == prevGroup) continue
						container.children[i].style.opacity = 0
				}

				if (startSection === endSection || endSection === 1) return

				const coef = startSection > endSection ? 1 : -1
				movePartners(null, coef)
		}

		const renderPartnerGroup = (group, i) => {
				const apperRow = group.slice(0, 2)
				const lowerRow = group.slice(2)
				const coef = ((i + groupCount - currentGroup + 1) % groupCount) - i
				const shift = coef * (contentWidth + spaceBetween)
				const opacity = i === currentGroup || i === prevGroup ? 1 : 0

				const groupStyle = {
						width: contentWidth,
						opacity,
						transform: `translateX(${shift}px)`
				}

				return (
						<PartnerGroup
								className='partner-group'
								key={'partnerGroup' + i}
								style={groupStyle}>
								<Arrow
										src={Ic('scroll-left', false)}
										alt='scroll-left'
										onPointerDown={e => movePartners(e, 1)} />
								<PartnerRow style={{ width: rowWidth }}>
										{apperRow.map(renderPartner)}
								</PartnerRow>
								<PartnerRow style={{ width: rowWidth }}>
										{lowerRow.map(renderPartner)}
								</PartnerRow>
								<Arrow
										src={Ic('scroll-right', false)}
										alt='scroll-right'
										onPointerDown={e => movePartners(e, -1)} />
						</PartnerGroup>
				)
		}

		const renderPartner = partner => (
				<li key={partner}>
						<a href={partnerMap[partner]} target='_blank'>
								<img src={Lo(partner, false)} alt={partner} />
						</a>
				</li>
		)

		return (
				<StlPartners>
						<h1>{l.partners}</h1>
						<PartnerContainer
								ref={containerRef}
								onTouchStart={onSwipeStart}
								onTouchMove={onSwipeMove}
								onTouchEnd={onSwipeEnd}
								style={containerStyles}>
								{partnerGroups.map(renderPartnerGroup)}
						</PartnerContainer>
				</StlPartners>
		)
}