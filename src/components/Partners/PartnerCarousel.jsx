import { useLanguageContext } from '../../Contexts'
import styled from 'styled-components'
import { l } from './Localization'
import { S, Lo, Ic } from '../../Utils'
import { useState, useRef } from 'react'

const Partners = styled.div`
		${({ opacity }) => ({ opacity })};
		flex: 1;
		position: relative;
		&.mobile-partners {
				> img {
						display: none;
				};
		};
`

const PartnersContainer = styled.div`
		${({ opacity }) => ({ opacity })};
		transition: opacity 0.5s ease-in-out;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		&.disabled img,
		&.disabled a {
				pointer-events: none !important;
		};
		.desktop-partners & {
				height: 100%;
				flex: 1;
				overflow: hidden;
				-webkit-mask-image: linear-gradient(to right, transparent, rgb(10, 10, 10)), linear-gradient(rgb(10, 10, 10), rgb(10, 10, 10)), linear-gradient(to right, rgb(10, 10, 10), transparent);
				-webkit-mask-size: 85px 100%, 455px 100%, 85px 100%;
				-webkit-mask-repeat: no-repeat;
				-webkit-mask-position: left center, center center, right center;
				padding: 0 85px 25px;
		};
		.mobile-partners & {
				height: 260px;
				margin: 55px auto 100px;
		};
`

const TitleContainer = styled.div`
		position: relative;
		.desktop-partners & {
				display: none;
		};
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
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		touch-action: none;
				height: 200px;
		&:not(.transitioning) {
				transition: transform 0.5s ease-in-out;
		};
		.desktop-partners & {
				top: 0;
		};
		.mobile-partners & {
				bottom: 0;
		};
`

const PartnerGroup = styled.div`
		${() => ({ })}
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
		margin: 0 0 10px;
		padding: 0;
		justify-content: space-around;
		a {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 90px;
				height: 90px;
		};
		> .wide-logo-item a {
				width: 180px;
		};
`

const Arrow = styled.img`
		position: absolute;
		cursor: pointer;
		z-index: 5;
		.desktop-partners & {
				height: 95px;
				top: 95px;
				transform: translateY(-50%);
				&:first-child {
						left: 10px;
				};
				&:last-child {
						right: 10px;
				};
		};
		.mobile-partners & {
				height: 20px;
				top: 10px;
				&:first-child {
						left: -40px;
				};
				&:last-child {
						right: -40px;
				};
		};
`

const doublePartnerMap = {
		Fabbrica: 'https://instagram.com/pizzafabbricabali?igshid=MzRlODBiNWFlZA==', //x2
		Hubble: 'https://instagram.com/hubblebali?igshid=MzRlODBiNWFlZA==', //x2
		LigaTennis: 'https://instagram.com/bali.tennis?igshid=MzRlODBiNWFlZA==', //x2
		SouthEast: 'https://instagram.com/southeastbrewing?igshid=MzRlODBiNWFlZA==' //x2
}

const singlePartnerMap = {
		Draniki: 'https://instagram.com/draniki.bali?igshid=MzRlODBiNWFlZA==',
		BaliWood: 'https://instagram.com/baliwood.fun?igshid=MzRlODBiNWFlZA==',
		StarkBotique: 'https://instagram.com/starkcraftbeergarden?igshid=MzRlODBiNWFlZA==',
		Gabets: 'https://instagram.com/gabetspub?igshid=MzRlODBiNWFlZA==',
		MeltingPot: 'https://meltingpotbali.com/',
		TwoThousandEighty: 'https://www.2080burger.net',
		Izzi: 'https://instagram.com/izzi.bali?igshid=MzRlODBiNWFlZA==',
		NowBeer: 'https://instagram.com/nowbeerbar?igshid=MzRlODBiNWFlZA==',
		SushiShop: 'https://instagram.com/sushishop.bali?igshid=MzRlODBiNWFlZA==',
		WarungCanteen: 'https://instagram.com/warung_canteen?igshid=MzRlODBiNWFlZA=='
}

export function PartnerCarousel({ contentWidth, maxGroupSize = 7, className = 'desktop-partners', opacity }) {
		const [currentGroup, setCurrentGroup] = useState(0)
		const [prevGroup, setPrevGroup] = useState(null)
		const { language } = useLanguageContext()
		const blockRef = useRef(null)
		const containerRef = useRef(null)
		const windowWidth = window.innerWidth
		const isDesktop = className === 'desktop-partners'
		const doublePartnerArray = Object.keys(doublePartnerMap)
		const singlePartnerArray = Object.keys(singlePartnerMap)
		l.setLanguage(language)
		let swipeStartX
		let swipeCurrentX
		let swipeDirection
		let swipeStartTime
		let prevSibling
		let nextSibling

		const partnerGroups = []

		const totalGroupSlots = singlePartnerArray.length + doublePartnerArray.length * 2
		const partnerGroupCount = Math.ceil(totalGroupSlots / maxGroupSize)
		const averageGroupSize = Math.ceil(totalGroupSlots / partnerGroupCount)
		const doublePartnerPerGroupCount = Math.floor(doublePartnerArray.length / partnerGroupCount)
		let doublePartnerPerGroupRemainder = doublePartnerArray.length % partnerGroupCount

		for (let i = 0; i < partnerGroupCount; i++) {
				const totalGroupsRemains = singlePartnerArray.length + doublePartnerArray.length * 2
				const currentGroupSize = totalGroupsRemains >= averageGroupSize ? averageGroupSize : totalGroupsRemains
				const shortRowSlotCount = Math.ceil(currentGroupSize / 2)
				const longRowSlotCount = currentGroupSize - shortRowSlotCount
				let doublePartnerPerCurrentGroupCount = doublePartnerPerGroupCount
				if (doublePartnerPerGroupRemainder) { 
						doublePartnerPerCurrentGroupCount++
						doublePartnerPerGroupRemainder--
				}
				let longRowVacantSlots = longRowSlotCount
				let doublePartnerPerShortRowCount = Math.ceil(doublePartnerPerCurrentGroupCount / 2)
				let shortRowVacantSlots = shortRowSlotCount
				let doublePartnerPerLongRowCount = doublePartnerPerCurrentGroupCount - doublePartnerPerShortRowCount
				let longRow = []
				let shortRow = []

				while (shortRowVacantSlots > 0) {
						if (doublePartnerPerShortRowCount) {
								const name = doublePartnerArray.pop()
								const link = doublePartnerMap[name]
								shortRow.push({ name, link, double: true })
								doublePartnerPerShortRowCount--
								shortRowVacantSlots -= 2
						}

						if (shortRowVacantSlots) {
								const name = singlePartnerArray.pop()
								const link = singlePartnerMap[name]
								shortRow.push({ name, link })
								shortRowVacantSlots--
						}
				}

				while (longRowVacantSlots > 0) {
						if (longRowVacantSlots) {
								const name = singlePartnerArray.pop()
								const link = singlePartnerMap[name]
								longRow.push({ name, link })
								longRowVacantSlots--
						}

						if (doublePartnerPerLongRowCount) {
								const name = doublePartnerArray.pop()
								const link = doublePartnerMap[name]
								longRow.push({ name, link, double: true })
								doublePartnerPerLongRowCount--
								longRowVacantSlots -= 2
						}
				}

				partnerGroups.push({
						longRow,
						shortRow
				})
		}

		const spaceBetween = isDesktop ? 85 : ((windowWidth - contentWidth) / 2)
		const left = (isDesktop ? 0 : -spaceBetween) - contentWidth + 'px'
		const containerStyles = {
				left,
				width: spaceBetween * (partnerGroupCount - 1) + partnerGroupCount * contentWidth + 'px'
		}

		const onSwipeStart = e => {
				e.preventDefault()
				e.stopPropagation()
				const partnerBlock = blockRef.current
				const container = containerRef.current
				partnerBlock.classList.add('disabled')
				container.classList.add('transitioning')
				const { changedTouches, timeStamp } = e
				swipeStartX = changedTouches[0]?.pageX
				swipeCurrentX = changedTouches[0]?.pageX
				swipeStartTime = timeStamp
		}

		const onSwipeMove = e => {
				e.preventDefault()
				e.stopPropagation()
				const container = containerRef.current
				const { changedTouches } = e
				const groups = container.children
				prevSibling = groups[currentGroup >= 1 ? (currentGroup - 1) : (groups.length - 1)]
				nextSibling = groups[currentGroup < (groups.length - 1) ? (currentGroup + 1) : 0]
				const { pageX } = changedTouches[0]
				let shift = pageX - swipeStartX
				if (pageX <= 0) shift = -windowWidth / 2
				if (pageX >= windowWidth) shift = windowWidth / 2
				let direction

				prevSibling.style.opacity = 1
				nextSibling.style.opacity = 1

				if (pageX > swipeCurrentX) direction = 'right'
				if (pageX < swipeCurrentX) direction = 'left'

				container.style.transform = `translateX(${shift}px)`
				swipeCurrentX = pageX
				if (swipeDirection !== direction) swipeDirection = direction
				if (pageX <= 0 || pageX >= windowWidth) return
		}

		const movePartners = (e, coef) => {
				e?.preventDefault()
				e?.stopPropagation()

				const partnerBlock = blockRef.current
				const container = containerRef.current

				if (e) {
						partnerBlock.classList.add('disabled')

						setTimeout(() => {
								partnerBlock.classList.remove('disabled')
						}, 500)
				}

				let newGroup = currentGroup + coef
				if (newGroup === partnerGroupCount) newGroup = 0
				if (newGroup === -1) newGroup = partnerGroupCount - 1

				for (let i = 0; i < partnerGroupCount; i++) {
						const opacity = ((i === newGroup) || (i === currentGroup)) ? 1 : 0

						container.children[i].style.opacity = opacity
				}

				setPrevGroup(currentGroup)
				setCurrentGroup(newGroup)
		}

		const onSwipeEnd = e => {
				const { timeStamp } = e
				const partnerBlock = blockRef.current
				const container = containerRef.current
				container.classList.remove('transitioning')
				container.style.transform = `translateX(0px)`

				if (timeStamp - swipeStartTime > 100) {
						e.preventDefault()
						e.stopPropagation()
				} else {
						partnerBlock.classList.remove('disabled')
						return
				}

				if (prevSibling) prevSibling.style.opacity = (swipeDirection === 'left') ? 0 : 1
				if (nextSibling) nextSibling.style.opacity = (swipeDirection === 'right') ? 0 : 1
				setTimeout(() => {
						partnerBlock.classList.remove('disabled')
				}, 500)
				container.style.transform = `translateX(0px)`

				movePartners(null, swipeDirection === 'left' ? 1 : -1)
				swipeDirection = null
		}

		const renderPartnerGroup = (group, i) => {
				const { longRow, shortRow } = group
				const coef = ((i + partnerGroupCount - currentGroup + 1) % partnerGroupCount) - i
				const shift = coef * (contentWidth + spaceBetween)
				const opacity = ((i === currentGroup) || (i === prevGroup)) ? 1 : 0

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
								<PartnerRow style={{ width: contentWidth }}>
										{(isDesktop ? longRow : shortRow).map(renderPartner)}
								</PartnerRow>
								<PartnerRow style={{ width: contentWidth }}>
										{(isDesktop ? shortRow : longRow).map(renderPartner)}
								</PartnerRow>
						</PartnerGroup>
				)
		}

		const renderPartner = ({ name, link, double }) => (
				<li key={name} className={double ? 'wide-logo-item' : ''}>
						<a href={link} target='_blank' rel='noreferrer'>
								<img src={Lo(name, false)} alt={name} />
						</a>
				</li>
		)

		return (
				<Partners
						className={className}
						opacity={opacity}>
						<Arrow
								src={Ic('scroll-prev', false)}
								alt='scroll-left'
								onPointerDown={e => movePartners(e, 1)} />
						<PartnersContainer
								ref={blockRef}>
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
						</PartnersContainer>
						<Arrow
								src={Ic('scroll-next', false)}
								alt='scroll-right'
								onPointerDown={e => movePartners(e, -1)} />

				</Partners>
		)
}