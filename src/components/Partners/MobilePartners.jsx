import { PartnerCarousel } from './'
export function MobilePartners({ contentWidth, opacity }) {
		const carouselProps = {
				contentWidth,
				opacity,
				className: 'mobile-partners',
				groupSize: 5
		}


		return (
				<PartnerCarousel { ...carouselProps } />
		)
}