import { PartnerCarousel } from './'
export function MobilePartners({ contentWidth, opacity }) {
		const carouselProps = {
				contentWidth,
				opacity,
				className: 'mobile-partners',
				maxGroupSize: 5
		}


		return (
				<PartnerCarousel { ...carouselProps } />
		)
}