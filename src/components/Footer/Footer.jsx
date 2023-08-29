import styled from 'styled-components'
import { S } from '../../Utils'

const StlFooter = styled.footer`
		width: 100%;
		height: 100px;
		background-color: ${S.SHADOW_BG};
		z-index: ${S.LAYOUT_EL_ZINDEX};
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		padding: 0 20px;
		align-items: center;
		padding: 15px 0;
		> div {
				display: flex;
				flex-direction: row;
				justify-content: center;
				margin-bottom: 5px;
				> a {
						width: 45px;
						height: 45px;
						&:not(:last-child) {
								margin-right: 10px;
						};
						img {
								height: 100%;
								opacity: ${S.UI_EL_OPACITY};
								&:hover {
										opacity: ${S.ACTIVE_UI_EL_OPACITY};
								};
						};
				};
		};
		> a {
				opacity: ${S.UI_EL_OPACITY};
				font-size: 18px;
				font-weight: bold;
				text-decoration: none;
				&:hover {
						opacity: ${S.ACTIVE_UI_EL_OPACITY};
				};
		};
`
const links = [{
		img: 'instagram',
		href: 'https://www.instagram.com/sunsetroad.beer/'
}, {
		img: 'facebook',
		href: 'https://www.facebook.com/people/SunsetroadBeer/100088255544244/'
}, {
		img: 'telegram',
		href: 'https://t.me/gasss77'
	}, {
		img: 'whatsapp',
		href: 'https://wa.me/6281936549298'
}]

const renderLinks = () => links.map(({ img, href }) => (
		<a href={href} target='_blank' key={img} rel='noreferrer'>
				<img src={`/icons/${img}.svg`} alt={img} />
		</a>
))
export default function Footer() {
  return (
				<StlFooter>
						<div>
								{renderLinks()}
						</div>
						<a href='mailto:info@sunsetroad.beer'>info@sunsetroad.beer</a>
				</StlFooter>
  )
}