import styled from 'styled-components'
import { useModalContext, useLanguageContext } from '../../Contexts'
import { forwardRef, useMemo, useState, memo } from 'react'
import { C } from '../../Utils'
import { Loader	} from '@googlemaps/js-api-loader'

const DistributorMap = memo(forwardRef((props, ref) => {
		const { displayedModal } = useModalContext()
		const { language } = useLanguageContext()
		const [map, setMap] = useState(null)
		const center = { lat: -8.502865, lng: 115.2053773 }
		const zoom = 10.83
		//const mapContainerRef = useRef(null)
		const loader = new Loader({
				apiKey: 'AIzaSyBxT3wp37bKCxRFDvAh0S3ecUOyynfEWQM',
				version: 'weekly'
		})

		console.log('RENDER DISTRIBUTOR MODAL');

		useMemo(() => {
				console.log('Zorg!')
				if (!ref?.current) return
				console.log('Bleurge!!!');

				loader.load().then(google => {
						setMap(new google.maps.Map(ref.current, {
								center, zoom
						}))
				})
				//const { Map } = await google.maps.importLibrary('maps')
				//const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
				//const map = new 

		}, [ref?.current])

		return (
				<StlDistributorMap ref={ref}>
				</StlDistributorMap>
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
`

export { DistributorMap }