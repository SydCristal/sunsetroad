import styled from 'styled-components'
import { useLanguageContext } from '../../Contexts'
import { forwardRef, useEffect, useState, memo, useMemo } from 'react'
import { C, Ic } from '../../Utils'
import { Loader } from '@googlemaps/js-api-loader'
import distributors from './distributors.json'

const DistributorMap = memo(forwardRef((props, ref) => {
		const { language } = useLanguageContext()
		const [map, setMap] = useState(null)
		const center = { lat: -8.662793, lng: 115.184232 }
		const zoom = 11
		const loader = new Loader({
				apiKey: C.GOOGLE_MAPS_API_KEY,
				version: 'beta',
				libraries: ['places', 'marker']
		})

		const sortedDistributors = useMemo(() => distributors.sort((a, b) => b.location.lat - a.location.lat), [])

		useEffect(() => {
				console.log('FETCHING GOOGLE MAP')
				loader.load().then((google) => {
						const { maps: { Map, InfoWindow, marker: { AdvancedMarkerElement, PinElement }}} = google
						const map = new Map(ref.current, {
								center,
								zoom,
								mapId: '2229b22e8f947ffa',
								disableDefaultUI: true
						})

						const infoWindow = new InfoWindow({ shouldFocus: false })

						sortedDistributors.map(distributor => {
								const markerImg = document.createElement('img')
								markerImg.src = Ic('marker', false, 'svg')
								markerImg.alt = 'marker'

								const marker = new AdvancedMarkerElement({
										map,
										content: markerImg,
										title: distributor.displayName,
										position: distributor.location
								})

								marker.addListener('gmp-click', () => {
										infoWindow.close()
										infoWindow.setContent(`<a href='${distributor.link}' target='_blank'>${marker.title}</a>`)
										infoWindow.open(marker.map, marker)
								})
						})

						setMap(map)
				})
		}, [])

		console.log('RENDER DISTRIBUTOR MODAL')

		return (
				<StlDistributorMap ref={ref} />
		)
}))

const StlDistributorMap = styled.div`
		min-width: ${C.MOBILE_CONTENT_WIDTH}px;
		opacity: 0;
		width: 80%;
		position: absolute;
		bottom: 50%;
		left: 50%;
		transform: translate(-50%, 50%);
		background-color: transparent;
		min-height: 400px;
		height: 70%;
		border-radius: ${C.CONTENT_AREA_BORDER_RADIUS};
		display: none;
		transition: opacity 0.5s ease-in-out;
		.blurred & {
				opacity: 1;
		};
		> div {
				background-color: ${C.MODAL_SHADOW} !important;
				.gm-style > :last-child {
						display: none;
				};
				.poi-info-window div {
						background-color: transparent !important;
						color: white !important;
				};
				[role='dialog'] {
						padding: 12px !important;
						background-color: rgba(0, 0, 0, 0.7) !important;
						a {
								font-weight: bold;
								text-decoration: none !important;
								&:hover {
									 color: ${C.TEXT_GOLDEN_COLOR} !important;
								};
						};
						button {
								span {
										background-color: white !important;
								};
								&:hover span {
									 background-color: ${C.TEXT_GOLDEN_COLOR} !important;
								};
						};
						& ~ div::after {
								background: rgba(0, 0, 0, 0.6) !important;
								transform: translateY(1px) !important;
						};
				};
				img[src*='sunsetroad'] {
						width: 25px !important;
						height: 25px !important;
				};
		};
`

export { DistributorMap }