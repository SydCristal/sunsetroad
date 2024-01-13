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
				console.log(totalGroupSlots, maxGroupSize, partnerGroupCount);
				const averageGroupSize = Math.ceil(totalGroupSlots / partnerGroupCount)
				console.log(averageGroupSize);
				const doublePartnerPerGroupCount = Math.floor(doublePartnerArray.length / partnerGroupCount)
				let doublePartnerPerGroupRemainder = doublePartnerArray.length % partnerGroupCount

				for (let i = 0; i < partnerGroupCount; i++) {
						const totalGroupsRemains = singlePartnerArray.length + doublePartnerArray.length * 2
						const currentGroupSize = totalGroupsRemains >= averageGroupSize ? averageGroupSize : totalGroupsRemains
						const shortRowSlotCount = Math.floor(currentGroupSize / 2)
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

						while ((doublePartnerPerLongRowCount || singlePartnerArray.length) && shortRowVacantSlots > 0) {
								if (doublePartnerPerShortRowCount) {
										const $partnerName = doublePartnerArray.pop()
										const $link = doublePartnerMap[$partnerName]
										shortRow.push({ $partnerName, $link, $double: true })
										doublePartnerPerShortRowCount--
										shortRowVacantSlots -= 2
								}

								if (shortRowVacantSlots && singlePartnerArray.length) {
										const $partnerName = singlePartnerArray.pop()
										const $link = singlePartnerMap[$partnerName]
										shortRow.push({ $partnerName, $link })
										shortRowVacantSlots--
								}
						}

						while ((doublePartnerPerLongRowCount || singlePartnerArray.length) && longRowVacantSlots > 0) {
								if (singlePartnerArray.length) {
										const $partnerName = singlePartnerArray.pop()
										const $link = singlePartnerMap[$partnerName]
										longRow.push({ $partnerName, $link })
										longRowVacantSlots--
								}

								if (longRowVacantSlots && doublePartnerPerLongRowCount) {
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
		}, [maxGroupSize])

		const carouselProps = {
				dataSet: partnerGroups,
				content: [{
						ref: partnerContainerRef,
						childEl: PartnerGroup,
						getControls,
						...restProps
				}],
				autoRun: true
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
		SouthEast: 'https://instagram.com/southeastbrewing?igshid=MzRlODBiNWFlZA==',
		Accent: 'https://www.instagram.com/accent.bali?igsh=MXZxa2t1em1wNGRyNA==',
		Amplitude: 'https://www.instagram.com/amplitude.coffee?igsh=MWlic2c2aXN6bmM2Nw==',
		EatMe: 'https://maps.app.goo.gl/xnsHoFvCsCaDLpn97?g_st=ic',
		Finns: 'https://www.instagram.com/finnsrecclub?igsh=MTY1c2I0MGc5aDN0OA==',
		Lolas: 'https://www.instagram.com/reel/CtTW90gxePE/?igsh=b3dzNjdwcHpiMWRv',
		NowBeer: 'https://instagram.com/nowbeerbar?igshid=MzRlODBiNWFlZA==',
		Mamu: 'https://www.instagram.com/mamu_bali?igsh=MTF3anAzOTg5cGMxYQ==',
		WowBooze: 'https://www.instagram.com/wow_booze_bali/?igsh=MXJqaTF0bDdtemM4Nw%3D%3D'
}

const singlePartnerMap = {
		Draniki: 'https://instagram.com/draniki.bali?igshid=MzRlODBiNWFlZA==',
		BaliWood: 'https://instagram.com/baliwood.fun?igshid=MzRlODBiNWFlZA==',
		StarkBotique: 'https://instagram.com/starkcraftbeergarden?igshid=MzRlODBiNWFlZA==',
		Gabets: 'https://instagram.com/gabetspub?igshid=MzRlODBiNWFlZA==',
		MeltingPot: 'https://meltingpotbali.com/',
		TwoThousandEighty: 'https://www.2080burger.net',
		Izzi: 'https://instagram.com/izzi.bali?igshid=MzRlODBiNWFlZA==',
		SushiShop: 'https://instagram.com/sushishop.bali?igshid=MzRlODBiNWFlZA==',
		WarungCanteen: 'https://instagram.com/warung_canteen?igshid=MzRlODBiNWFlZA==',
		AnythingBrew: 'https://www.instagram.com/anythingbrew?igsh=ZXB3OThvc3JjdjNi',
		Ele: 'https://www.instagram.com/ele.rest?igsh=Y3EyMnJrd2V1dWgy',
		GrandHyatt: 'https://www.instagram.com/grandhyattbali?igsh=OWV3ZmZtbGtrejhq',
		Hedonist: 'https://www.instagram.com/hedonist_space_bali?igsh=bHdkdWdic2NrMHdv',
		Joy: 'https://www.instagram.com/joycafe.bali?igsh=MTYxZ2NpdHViamlxZg==',
		Seed: 'https://www.instagram.com/seed_bali_?igsh=MXBwczlnNnkwMnY4aw=='
}

export { PartnerCarousel }