import { useLanguageContext } from '../../Contexts'
import styled from 'styled-components'
import { l } from './Localization'
import { S, Lo, Ic } from '../../Utils'
import { useState, useRef } from 'react'

const StlPartners = styled.div`
		${({ opacity }) => ({ opacity })};
		transition: opacity 0.5s ease-in-out;
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
		&.disabled img,
		&.disabled a {
				pointer-events: none !important;
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
		Draniki: 'https://instagram.com/draniki.bali?igshid=MzRlODBiNWFlZA==',
		BaliWood: 'https://instagram.com/baliwood.fun?igshid=MzRlODBiNWFlZA==',
		StarkBotique: 'https://instagram.com/starkcraftbeergarden?igshid=MzRlODBiNWFlZA==',
		Gabets: 'https://instagram.com/gabetspub?igshid=MzRlODBiNWFlZA==',
		MeltingPot: 'https://meltingpotbali.com/',
		TwoThousandEighty: 'https://www.2080burger.net',
		Fabbrica: 'https://instagram.com/pizzafabbricabali?igshid=MzRlODBiNWFlZA==',
		Hubble: 'https://instagram.com/hubblebali?igshid=MzRlODBiNWFlZA==',
		LigaTennis: 'https://instagram.com/bali.tennis?igshid=MzRlODBiNWFlZA==',
		Izzi: 'https://instagram.com/izzi.bali?igshid=MzRlODBiNWFlZA==',
		NowBeer: 'https://instagram.com/nowbeerbar?igshid=MzRlODBiNWFlZA==',
		SouthEast: 'https://instagram.com/southeastbrewing?igshid=MzRlODBiNWFlZA==',
		SushiShop: 'https://instagram.com/sushishop.bali?igshid=MzRlODBiNWFlZA==',
		WarungCanteen: 'https://instagram.com/warung_canteen?igshid=MzRlODBiNWFlZA=='
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

export function MobilePartners({ contentWidth, opacity }) {
		const [currentGroup, setCurrentGroup] = useState(0)
		const [prevGroup, setPrevGroup] = useState(0)
		const { language } = useLanguageContext()
		const containerRef = useRef(null)
		const windowWidth = window.innerWidth
		l.setLanguage(language)
		let swipeStartX
		let swipeDirection
		let swipeStartTime

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
				const container = containerRef.current
				if (container.classList.contains('disabled')) return
				const { changedTouches, timeStamp } = e
				swipeStartX = changedTouches[0]?.pageX
				swipeStartTime = timeStamp
		}

		const onSwipeMove = e => {
				e.preventDefault()
				e.stopPropagation()
				const container = containerRef.current
				if (container.classList.contains('disabled')) return
				container.classList.add('transitioning')
				const { changedTouches } = e
				const { pageX } = changedTouches[0]
				let shift = pageX - swipeStartX
				if (pageX <= 0) shift = -windowWidth / 2
				if (pageX >= windowWidth) shift = windowWidth / 2

				const direction = shift > 0 ? 'right' : 'left'
				container.style.transform = `translateX(${shift}px)`
				if (swipeDirection !== direction) {
						swipeStartX	= pageX
						swipeDirection = direction
						const displayedGroup = container.children[currentGroup]
						const prevSibling = displayedGroup.previousElementSibling || container.children[groupCount - 1]
						const nextSbling = displayedGroup.nextElementSibling || container.children[0]
						prevSibling.style.opacity = direction === 'right' ? 1 : 0
						nextSbling.style.opacity = direction === 'left' ? 1 : 0
				}

				if (pageX <= 0 || pageX >= windowWidth) return
		}

		const movePartners = (e, coef) => {
				e?.preventDefault()
				e?.stopPropagation()

				const container = containerRef.current
				container.classList.add('disabled')

				setTimeout(() => {
						container.classList.remove('disabled')
				}, 500)

				let newGroup = currentGroup + coef
				if (newGroup === groupCount) newGroup = 0
				if (newGroup === -1) newGroup = groupCount - 1
				setPrevGroup(currentGroup)
				setCurrentGroup(newGroup)
		}

		const onSwipeEnd = e => {
				const { changedTouches, timeStamp } = e

				const container = containerRef.current
				container.classList.remove('transitioning')
				container.style.transform = `translateX(0px)`
				swipeDirection = null

				if (timeStamp - swipeStartTime > 100) {
						e.preventDefault()
						e.stopPropagation()
				} else return

				//const sectionWidth = windowWidth / 3
				//const startSection = Math.floor(swipeStartX / sectionWidth)
				const swipeEnd = changedTouches[0]?.pageX
				//const endSection = Math.floor(swipeEnd / sectionWidth)

				//if (swipeEnd !== 0 && swipeEnd !== windowWidth && (startSection === endSection || endSection === 1)) return

				const coef = swipeStartX > swipeEnd ? 1 : -1
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
								opacity={opacity}
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
						<a href={partnerMap[partner]} target='_blank' rel='noreferrer'>
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