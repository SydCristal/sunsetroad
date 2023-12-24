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
		distributors.sort((a, b) => a.location.lat < b.location.lat)

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

						const infoWindow = new InfoWindow()
						infoWindow.setContent(`<div id='info-window-child' />`)

						distributors.map(distributor => {
								const markerImg = document.createElement('img')
								markerImg.src = Ic('marker', false, 'svg')
								markerImg.alt = 'marker'

								const marker = new AdvancedMarkerElement({
										map,
										content: markerImg,
										title: distributor.displayName,
										position: distributor.location
								})

								//const info = 

								marker.addListener("click", ({ domEvent, latLng }) => {
										console.log(distributor);
										const { target } = domEvent

										infoWindow.close()
										infoWindow.setContent(marker.title)
										infoWindow.open(marker.map, marker)
										console.log(infoWindow);
								})
						})

						setMap(map)
				})
		}, [])

		useEffect(() => {
				const iw = document.getElementById('info-window-child')
				console.log(iw)
		}, [map])

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
				.gm-style-iw-t > * {
						&:first-child {
								background-color: rgba(0, 0, 0, 0.7) !important;
								span {
										background-color: white !important;
								};
						};
						&:last-child::after {
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

const MarkerIcon = styled.div`
		width: 18px;
		height: 18px;
		background: ${Ic('marker', true, 'svg')} center center / contain no-repeat;
`

export { DistributorMap }