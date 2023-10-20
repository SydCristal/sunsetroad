import { useLanguageContext } from '../../Contexts'
import styled from 'styled-components'
import { l } from './Localization'
import { S, Lo, Ic } from '../../Utils'
import { useState, useRef } from 'react'

const Partners = styled.div`
		${({ opacity }) => ({ opacity })};
		transition: opacity 0.5s ease-in-out;
		margin-top: 65px;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 250px;
		margin-bottom: 100px;
		position: relative;
		&.disabled img,
		&.disabled a {
				pointer-events: none !important;
		};
`

const TitleContainer = styled.div`
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
		.disabled & {
					pointer-events: none !important;
		};
		position: absolute;
		height: 180px;
		bottom: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		touch-action: none;
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
				width: 90px;
				height: 90px;
		}
`

const Arrow = styled.img`
		position: absolute;
		height: 30px;
		top: 5px;
		cursor: pointer;
		&:first-child {
				left: -35px;
		};
		&:last-child {
				right: -35px;
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
		const blockRef = useRef(null)
		const containerRef = useRef(null)
		const windowWidth = window.innerWidth
		l.setLanguage(language)
		let swipeStartX
		let swipeCurrentX
		let swipeDirection
		let swipeStartTime
		let prevSibling
		let nextSibling

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
				const partnerBlock = blockRef.current
				if (partnerBlock.classList.contains('disabled')) return
				partnerBlock.classList.add('disabled')
				const container = containerRef.current
				container.classList.add('transitioning')
				const { changedTouches, timeStamp, target } = e
				swipeStartX = changedTouches[0]?.pageX
				swipeCurrentX = changedTouches[0]?.pageX
				swipeStartTime = timeStamp
		}

		const onSwipeMove = e => {
				e.preventDefault()
				e.stopPropagation()
				const partnerBlock = blockRef.current
				//f (partnerBlock.classList.contains('disabled')) return
				const container = containerRef.current
				const { changedTouches } = e
				const groups	= container.children
				prevSibling = groups[currentGroup >= 1 ? (currentGroup - 1) : (groups.length - 1)]
				nextSibling = groups[currentGroup < (groups.length - 1) ? (currentGroup + 1) : 0]
				const { pageX } = changedTouches[0]
				let shift = pageX - swipeStartX
				if (pageX <= 0) shift = -windowWidth / 2
				if (pageX >= windowWidth) shift = windowWidth / 2
				let direction

				if (pageX > swipeCurrentX) {
						prevSibling.style.opacity = 1
						nextSibling.style.opacity = 0
						direction = 'right'
				}

				if (pageX < swipeCurrentX) {
						prevSibling.style.opacity = 0
						nextSibling.style.opacity = 1
						direction = 'left'
				}

				container.style.transform = `translateX(${shift}px)`
				swipeCurrentX = pageX
				if (swipeDirection !== direction)	swipeDirection = direction
				if (pageX <= 0 || pageX >= windowWidth) return
		}

		const movePartners = (e, coef) => {
				e?.preventDefault()
				e?.stopPropagation()

				const partnerBlock = blockRef.current
				const container = containerRef.current
				partnerBlock.classList.add('disabled')

				if (e) setTimeout(() => {
						partnerBlock.classList.remove('disabled')
				}, 500)

				let newGroup = currentGroup + coef
				if (newGroup === groupCount) newGroup = 0
				if (newGroup === -1) newGroup = groupCount - 1
				setPrevGroup(currentGroup)
				setCurrentGroup(newGroup)
		}

		const onSwipeEnd = e => {
				const { timeStamp } = e
				const container = containerRef.current
				const partnerBlock = blockRef.current
				container.classList.remove('transitioning')
				if (prevSibling) prevSibling.style.opacity = (swipeDirection === 'left') ? 0 : 1
				if (nextSibling) nextSibling.style.opacity = (swipeDirection === 'right') ? 0 : 1
				setTimeout(() => {
						partnerBlock.classList.remove('disabled')
				}, 500)
				container.style.transform = `translateX(0px)`

				if (timeStamp - swipeStartTime > 100) {
						e.preventDefault()
						e.stopPropagation()
				} else return

				movePartners(null, swipeDirection === 'left' ? 1 : -1)
				swipeDirection = null
		}

		const renderPartnerGroup = (group, i) => {
				const apperRow = group.slice(0, 2)
				const lowerRow = group.slice(2)
				const coef = ((i + groupCount - currentGroup + 1) % groupCount) - i
				const shift = coef * (contentWidth + spaceBetween)
				//const opacity = ((i === currentGroup) || (i === prevGroup)) ? 1 : 0

				const groupStyle = {
						width: contentWidth,
						//opacity,
						transform: `translateX(${shift}px)`
				}

				return (
						<PartnerGroup
								className='partner-group'
								key={'partnerGroup' + i}
								style={groupStyle}>
								<PartnerRow style={{ width: contentWidth }}>
										{apperRow.map(renderPartner)}
								</PartnerRow>
								<PartnerRow style={{ width: contentWidth }}>
										{lowerRow.map(renderPartner)}
								</PartnerRow>
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
				<Partners ref={blockRef}>
						<TitleContainer>
								<Arrow
										src={Ic('scroll-left', false)}
										alt='scroll-left'
										onPointerDown={e => movePartners(e, 1)} />
								<h1 className='unselectable'>
										{l.partners}
								</h1>
								<Arrow
										src={Ic('scroll-right', false)}
										alt='scroll-right'
										onPointerDown={e => movePartners(e, -1)} />
						</TitleContainer>
						<PartnerContainer
								className='partner-container'
								onTouchStart={onSwipeStart}
								onTouchMove={onSwipeMove}
								onTouchEnd={onSwipeEnd}
								style={containerStyles}
								ref={containerRef}>
								{partnerGroups.map(renderPartnerGroup)}
						</PartnerContainer>
				</Partners>
		)
}