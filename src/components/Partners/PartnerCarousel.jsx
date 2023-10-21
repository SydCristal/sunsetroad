import { useLanguageContext } from '../../Contexts'
import styled from 'styled-components'
import { l } from './Localization'
import { S, Lo, Ic } from '../../Utils'
import { useState, useRef } from 'react'

const Partners = styled.div`
		flex: 1;
		position: relative;
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
				-webkit-mask-size: 60px 100%, 455px 100%, 60px 100%;
				-webkit-mask-repeat: no-repeat;
				-webkit-mask-position: left center, center center, right center;
				padding: 0 60px 25px;
		};
		.mobile-partners & {
				> img {
						display: none;
				};
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
		.desktop-partners & {
				justify-content: ${({ children }) => children?.length < 4 ? 'space-around' : 'space-between'};
		};
		.mobile-partners & {
				justify-content: ${({ children }) => children?.length === 3 ? 'space-between' : 'space-around'};
		};
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
		cursor: pointer;
		z-index: 5;
		.desktop-partners & {
				height: 95px;
				top: 95px;
				transform: translateY(-50%);
				&:first-child {
						left: 0px;
				};
				&:last-child {
						right: 0px;
				};
		};
		.mobile-partners & {
				height: 30px;
				top: 5px;
				&:first-child {
						left: -35px;
				};
				&:last-child {
						right: -35px;
				};
		};
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
		WarungCanteen: 'https://instagram.com/warung_canteen?igshid=MzRlODBiNWFlZA==',
		facebook: 'https://www.facebook.com/people/SunsetroadBeer/100088255544244/',
		instagram: 'https://www.instagram.com/sunsetroad.beer/',
		whatsapp: 'https://wa.me/6281936549298',
		telegram: 'https://t.me/gasss77'
}

const partnerArray = Object.keys(partnerMap)

export function PartnerCarousel({ contentWidth, groupSize = 7, className = 'desktop-partners' }) {
		const [currentGroup, setCurrentGroup] = useState(0)
		const [prevGroup, setPrevGroup] = useState(null)
		const { language } = useLanguageContext()
		const blockRef = useRef(null)
		const containerRef = useRef(null)
		const windowWidth = window.innerWidth
		const isDesktop = className === 'desktop-partners'
		l.setLanguage(language)
		let swipeStartX
		let swipeCurrentX
		let swipeDirection
		let swipeStartTime
		let prevSibling
		let nextSibling

		const partnerGroups = partnerArray.reduce((acc, partner, i) => {
				if (i % groupSize === 0) {
						acc.push([partner])
				} else {
						acc[acc.length - 1].push(partner)
				}

				return acc
		}, [])

		const groupCount = partnerGroups.length
		const spaceBetween = isDesktop ? 60 : ((windowWidth - contentWidth) / 2)
		const left = (isDesktop ? 0 : -spaceBetween) - contentWidth + 'px'
		const containerStyles = {
				left,
				width: spaceBetween * (groupCount - 1) + groupCount * contentWidth + 'px'
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
				if (newGroup === groupCount) newGroup = 0
				if (newGroup === -1) newGroup = groupCount - 1

				for (let i = 0; i < groupCount; i++) {
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
				const apperRow = groupSize === 7 ? group.slice(0, Math.round(group.length / 2)) : group.slice(0, Math.floor(group.length / 2))
				const lowerRow = groupSize === 7 ? group.slice(Math.round(group.length / 2)) : group.slice(Math.floor(group.length / 2))
				const coef = ((i + groupCount - currentGroup + 1) % groupCount) - i
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
				<Partners className={className}>
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