import Carousel from '../Carousel'
import { useMemo, useRef } from 'react'
import { PartnerGroup } from './PartnerGroup'

const PartnerCarousel = ({ maxGroupSize = 5, getControls, ...restProps }) => {
		const partnerContainerRef = useRef(null)
		const partnerGroups = useMemo(() => {
				const doublePartnerArray = Object.keys(doublePartnerMap)
				const singlePartnerArray = Object.keys(singlePartnerMap)
				let result = []

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
										const $partnerName = doublePartnerArray.pop()
										const $link = doublePartnerMap[$partnerName]
										shortRow.push({ $partnerName, $link, $double: true })
										doublePartnerPerShortRowCount--
										shortRowVacantSlots -= 2
								}

								if (shortRowVacantSlots) {
										const $partnerName = singlePartnerArray.pop()
										const $link = singlePartnerMap[$partnerName]
										shortRow.push({ $partnerName, $link })
										shortRowVacantSlots--
								}
						}

						while (longRowVacantSlots > 0) {
								if (longRowVacantSlots) {
										const $partnerName = singlePartnerArray.pop()
										const $link = singlePartnerMap[$partnerName]
										longRow.push({ $partnerName, $link })
										longRowVacantSlots--
								}

								if (doublePartnerPerLongRowCount) {
										const $partnerName = doublePartnerArray.pop()
										const $link = doublePartnerMap[$partnerName]
										longRow.push({ $partnerName, $link, $double: true })
										doublePartnerPerLongRowCount--
										longRowVacantSlots -= 2
								}
						}

						result.push([
								shortRow,
								longRow
						])
				}

				return result
		}, [doublePartnerMap, singlePartnerMap, maxGroupSize])

		const carouselProps = {
				dataSet: partnerGroups,
				content: [{
						ref: partnerContainerRef,
						childEl: PartnerGroup,
						getControls,
						...restProps
				}]
		}

		console.log('RENDER PARTNER CAROUSEL')

		return (
				<Carousel {...carouselProps} />
		)
}

const doublePartnerMap = {
		Fabbrica: 'https://instagram.com/pizzafabbricabali?igshid=MzRlODBiNWFlZA==',
		Hubble: 'https://instagram.com/hubblebali?igshid=MzRlODBiNWFlZA==',
		LigaTennis: 'https://instagram.com/bali.tennis?igshid=MzRlODBiNWFlZA==',
		SouthEast: 'https://instagram.com/southeastbrewing?igshid=MzRlODBiNWFlZA=='
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

export { PartnerCarousel }