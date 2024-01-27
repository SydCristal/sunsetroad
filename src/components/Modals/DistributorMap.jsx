import styled from 'styled-components'
import { useState, forwardRef, useEffect, memo, useMemo, useRef } from 'react'
import { useScreenContext } from '../../Contexts'
import { C, Ic, Bg } from '../../Utils'
import { Loader } from '@googlemaps/js-api-loader'
import distributors from './distributors.json'
import distributorMapStyles from './distributorMapStyles.json'

const DistributorMap = memo(forwardRef((props, ref) => {
		const { screenWidth } = useScreenContext()
		const mapRef =	useRef(null)
		const center = { lat: -8.662793, lng: 115.184232 }
		const zoom = 11
		const loader = new Loader({
				apiKey: C.GOOGLE_MAPS_API_KEY,
				version: 'beta',
				libraries: ['places', 'marker']
		})
		const [rollSrc, setRollSrc] = useState(Bg(`roll-${document.documentElement.clientWidth > C.MAX_MOBILE_WIDTH ? 'desktop' : 'mobile'}`, false, 'svg'))
		const sortedDistributors = useMemo(() => distributors.sort((a, b) => b.location.lat - a.location.lat), [])

		useEffect(() => {
				const currentlyIsDesktop = screenWidth > C.MAX_MOBILE_WIDTH
				setRollSrc(Bg(`roll-${currentlyIsDesktop ? 'desktop' : 'mobile'}`, false, 'svg'))
		}, [screenWidth])

		useEffect(() => {
				const markerImgArr = sortedDistributors.map(distributor => {
						const markerImg = document.createElement('img')
						markerImg.style.width = '25px'
						markerImg.style.height = '25px'
						markerImg.src = Ic('marker-ugly', false, 'svg')
						markerImg.alt = 'marker'
						return markerImg
				})
				console.log('FETCHING GOOGLE MAP')
				loader.load().then(({ maps: { Map, StyledMapType, InfoWindow, marker: { AdvancedMarkerElement } } }) => {
						const styledMapType = new StyledMapType(distributorMapStyles, { name: 'Sunset Road Map' })
						const map = new Map(mapRef.current, {
								center,
								zoom,
								mapId: '2229b22e8f947ffa',
								//mapTypeId: 'terrain',
								mapTypeIds: ['styled_map'],
								disableDefaultUI: true
						})

						map.mapTypes.set("styled_map", styledMapType)
						map.setMapTypeId("styled_map")

						const infoWindow = new InfoWindow()

						sortedDistributors.map((distributor, i) => {
								const markerImg = markerImgArr[i]

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
				})
		}, [])

		console.log('RENDER DISTRIBUTOR MODAL')

		return (
				<StlDistributorMap ref={ref} >
						<Roll src={rollSrc} />
						<GoogleMapContainer >
								<GoogleMap ref={mapRef} />
						</GoogleMapContainer>
						<Roll src={rollSrc} />
				</StlDistributorMap>
		)
}))

const StlDistributorMap = styled.div`
		opacity: 0;
		position: absolute;
		bottom: 50%;
		left: 50%;
		transform: translate(-50%, 50%);
		border-radius: ${C.CONTENT_AREA_BORDER_RADIUS};
		display: none;
		flex-direction: row;
		transition: opacity 0.5s ease-in-out;
		${C.isDesktop} {
				min-width: ${C.MOBILE_CONTENT_WIDTH}px;
				width: 100%;
				max-width: 50%;
				min-height: 600px;
				height: 70%;
		};
		${C.isMobile} {
				width: ${C.MOBILE_CONTENT_WIDTH}px;
				height: 70%;
		};
		.blurred & {
				opacity: 1;
		};
};`

const Roll = styled.img`
		position: absolute;
		z-index: 1;
		${C.isDesktop} {
				height: 100%;
				&:first-child {
						-webkit-transform: scaleX(-1);
						transform: scaleX(-1);
						right: calc(100% - 10px);
				};
				&:last-child {
						left: calc(100% - 10px);
				};
		};
		${C.isMobile} {
				width: 100%;
				&:first-child {
						-webkit-transform: scaleY(-1);
						transform: scaleY(-1);
						top: calc(100% - 10px);
				};
				&:last-child {
						bottom: calc(100% - 10px);
				};
		};
`


const GoogleMapContainer = styled.div`
		flex: 1;
		${C.isDesktop} {
				background: ${Bg('map-desktop', true, 'svg')} center center / auto 100% repeat-x;
				margin:	1% 0;
				padding: 5% 0;
		};
		${C.isMobile} {
				width: ${C.MOBILE_CONTENT_WIDTH}px;
				background: ${Bg('map-mobile', true, 'svg')} center center / 100% auto repeat-y;	
				padding: 0 5%;
		};
};`

const GoogleMap = styled.div`
		height: 100%;
		-webkit-mask-repeat: no-repeat;
		${C.isDesktop} {
				padding: 10% 0;
				-webkit-mask-size: 100% 10%, 100% 80%, 100% 10%;
				-webkit-mask-image: linear-gradient(to bottom, transparent, rgb(10, 10, 10)), linear-gradient(rgb(10, 10, 10), rgb(10, 10, 10)), linear-gradient(to bottom, rgb(10, 10, 10), transparent);
				-webkit-mask-position: top center, center center, bottom center;
		};
		${C.isMobile} {
				padding: 0 10%;
				-webkit-mask-image: linear-gradient(to left, transparent, rgb(10, 10, 10)), linear-gradient(rgb(10, 10, 10), rgb(10, 10, 10)), linear-gradient(to left, rgb(10, 10, 10), transparent);
				-webkit-mask-position: center right, center center, center left;
				-webkit-mask-size: 10% 100%, 80% 100%, 10% 100%;
		};
		.gm-style > * {
				&:first-child > :last-child {
						filter: sepia(0);
				};
				&:last-child {
						display: none;
				};
				a img[alt='Google'] {
						${C.isDesktop} {
								transform: translate(10px, -25px);
						};
						${C.isMobile} {
								transform: translate(10px, -10px);
						};
				}:
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
`

export { DistributorMap }