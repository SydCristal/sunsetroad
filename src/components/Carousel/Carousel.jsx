import { useRef, memo, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { C } from '../../Utils'

const Carousel = memo(({ dataSet, content, className, autoRun = false }) => {
		const displayedIndexRef = useRef(0)
		const setDisplayedIndex = j => displayedIndexRef.current = j
		const disabledRef = useRef(false)
		const setDisabled = b => disabledRef.current = b
		const swipeStartRef = useRef({ startX: 0, offsetLeft: 0, containerWidh: 0, startTime: 0 })
		const setSwipeStart = data => swipeStartRef.current = { ...data }
		const total = dataSet.length
		let autoRunTimeout
		const rotateCarousel = (direction = 0) => {
				if (disabledRef.current) return
				setDisabled(true)
				setTimeout(() => setDisabled(false), 500)
				const displayedIndex = displayedIndexRef.current
				for (let i = 0; i < content.length; i++) {
						const { ref, shiftChild } = content[i]
						const container = ref.current
						for (let j = 0; j < total; j++) {
								const child = container.children[j]
								const currentI = (total + j - displayedIndex) % total
								child.style = css(shiftChild(currentI, direction)).join('; ')
						}
				}

				const newDisplayedIndex = (total + displayedIndex + direction) % total
				setDisplayedIndex(newDisplayedIndex)
				if (autoRun) {
						if (autoRunTimeout) clearTimeout(autoRunTimeout)
						autoRunTimeout = setTimeout(() => rotateCarousel(1), 5000)
				}
		}

		useEffect(() => {
				if (autoRunTimeout) clearTimeout(autoRunTimeout)
				if (autoRun) autoRunTimeout = setTimeout(() => rotateCarousel(1), 5000)
		}, [])

		const defaultShiftChild = (j, direction, contentWidth) => {
				const shiftX = contentWidth + ((document.documentElement.clientWidth - contentWidth) / 2)
				const nextI = (total + j - direction) % total
				const opacity = (j && nextI && direction) ? 0 : 1
				const coef = (nextI !== total - 1) ? nextI : -1
				return {
						transform: `translateX(${coef * shiftX}px)`,
						opacity,
						transition: `transform 0.5s ease-in-out`
				}
		}

		const moveContent = coef => {
				if (disabledRef.current) return
				const displayedIndex = displayedIndexRef.current
				for (let i = 0; i < content.length; i++) {
						const { ref, moveChild, $shiftDistance } = content[i]
						const container = ref.current
						for (let j = 0; j < total; j++) {
								const child = container.children[j]
								const currentI = (total + j - displayedIndex) % total
								if (moveChild) {
										child.style = css(moveChild(currentI, coef)).join('; ')
										continue
								}
								const opacity = 1
								const currentPosition = currentI >= total - 1 ? -1 : currentI
								child.style = css({
										opacity,
										transform: `translateX(${(currentPosition + coef) * $shiftDistance}px)`,
										transition: 'none'
								}).join('; ')
						}
				}
		}

		const onChildClick = (e, i) => {
				if (disabledRef.current || i === displayedIndexRef.current) return
				const direction = (total + i - displayedIndexRef.current) % total === total - 1 ? -1 : 1
				rotateCarousel(direction)
		}

		const onSwipeStart = e => {
				if (disabledRef.current) return
				const { changedTouches, timeStamp: startTime, target } = e
				const container = target.tagName === 'UL' ? target : target.closest('ul')
				if (!container) return
				const { offsetLeft, clientWidth: containerWidh } = container.offsetParent
				const { clientX } = changedTouches[0]
				const startX = clientX - offsetLeft
				setSwipeStart({ startX, offsetLeft, containerWidh, startTime })
		}

		const onSwipeMove = e => {
				if (disabledRef.current) return
				const { changedTouches } = e
				const { startX, offsetLeft, containerWidh } = swipeStartRef.current
				const swipeX = changedTouches[0].clientX - offsetLeft
				if (swipeX <= 0) return
				if (swipeX >= containerWidh) return
				moveContent((swipeX - startX) / containerWidh)
		}

		const onSwipeEnd = e => {
				const { startX, offsetLeft, containerWidh, startTime } = swipeStartRef.current
				const { changedTouches, timeStamp: endTime } = e
				const swipeX = changedTouches[0].clientX - offsetLeft
				if (endTime - startTime < 300) {
						return rotateCarousel(0)
				}
				e.preventDefault()
				e.stopPropagation()
				if (swipeX <= 0) return rotateCarousel(1)
				if (swipeX >= containerWidh) return rotateCarousel(-1)
				const shiftX = swipeX - startX
				const coef = shiftX / containerWidh
				if (Math.abs(coef) < 0.2) return rotateCarousel(0)

				const direction = shiftX > 0 ? -1 : 1
				rotateCarousel(direction)
		}

		console.log('RENDER CAROUSEL')

		return (
				<StlCarousel className={className}>
						{content.map(({ swipable = true, spaceBetween, childEl, shiftChild, moveChild, ref, getControls, heading, contentWidth = 350, contentStyles, ...containerProps }, i) => {
								if (spaceBetween === undefined) spaceBetween = (document.documentElement.clientWidth - contentWidth) / 2
								const $shiftDistance = contentWidth + spaceBetween
								content[i].$shiftDistance = $shiftDistance
								if (!shiftChild) {
										shiftChild = (j, direction) => defaultShiftChild(j, direction, contentWidth)
										content[i].shiftChild = shiftChild
								}

								console.log('RENDER CAROUSEL CONTAINER')

								const touchListeners = {}

								if (swipable) {
										touchListeners.onTouchStart = onSwipeStart
										touchListeners.onTouchMove = onSwipeMove
										touchListeners.onTouchEnd = onSwipeEnd
								}

								return (
										<Container
												key={`carousel-container-${i}`}
												$contentWidth={contentWidth}
												{...containerProps}>
												{getControls ? getControls(rotateCarousel) : null}
												<Content
														ref={ref}
														$styles={contentStyles}
														{...touchListeners}>
														{dataSet.map((item, i) => {
																console.log('RENDER CAROUSEL ITEM')
																return childEl(item, i, shiftChild(i, displayedIndexRef.current), onChildClick)
														})}
												</Content>
										</Container>
								)
						})}
				</StlCarousel>
		)
})

const StlCarousel = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 100%;
`

const Container = styled.div`
		position: relative;
		${C.isDesktop}	{	overflow: hidden; };
		${({ $contentWidth, $faddingGradient = 0, $containerStyles }) => `
				${$containerStyles ? css($containerStyles).join('; ') : ''};
				width: ${$contentWidth + $faddingGradient * 2}px;
				> ul {
						${$faddingGradient ? `
						-webkit-mask-image: linear-gradient(to right, transparent, rgb(10, 10, 10)), linear-gradient(rgb(10, 10, 10), rgb(10, 10, 10)), linear-gradient(to right, rgb(10, 10, 10), transparent);
						-webkit-mask-size: ${$faddingGradient}px 100%, ${$contentWidth}px 100%, ${$faddingGradient}px 100%;
						-webkit-mask-repeat: no-repeat;
						-webkit-mask-position: left center, center center, right center;
						padding: 0 ${$faddingGradient}px;
						` : `
						padding: 0`}
				};
		`};
`

const Content = styled.ul`
		height: 100%;
		position: relative;
		margin: 0;
		list-style: none;
		width: 100%;
		${({ $styles }) => $styles};
`

export default Carousel