export const SHADOW_BG = '#00000095'
export const UI_EL_OPACITY = 0.5
export const ACTIVE_UI_EL_OPACITY = 0.9
export const CONTENT_AREA_WIDTH = '900px'
export const CONTENT_AREA_HEIGHT = '265px'
export const CONTENT_AREA_BORDER_RADIUS = '20px'
export const H1_MARGIN = '0 0 15px'
export const LAYOUT_EL_ZINDEX = 4
export const MAX_MOBILE_WIDTH = 1023
export const MAX_MOBILE_HEIGHT = 1960
export const TEXT_SHADOW_COLOR = 'rgb(34, 30, 31)'
export const TEXT_OUTLINE = `1px 1px 1px ${TEXT_SHADOW_COLOR}, -1px 1px 1px ${TEXT_SHADOW_COLOR}, 1px -1px 1px ${TEXT_SHADOW_COLOR}, -1px -1px 1px ${TEXT_SHADOW_COLOR}`
export const TEXT_SHADOW = `0px 0px 18px #000`
export const TEXT_REGULAR_OPACITY = 0.75
export const MIN_DESKTOP_HEIGHT = 700
export const MOBILE_CONTENT_WIDTH = 350
export const MODAL_SHADOW = 'rgba(12, 12, 12, 0.5)'
export const MODAL_PADDING = '20px 30px'
export const INPUT_BORDER_RADIUS = '5px'
export const INPUT_BORDER = '1px solid #B5B5B5'
export const INPUT_BG_COLOR = '#D9D9D9'
export const SKY_HEIGHT = 1550
export const isMobile = `@media (max-width: ${MAX_MOBILE_WIDTH}px)`
export const isDesktop = `@media (min-width: ${MAX_MOBILE_WIDTH + 1}px)`
export const isHorizontal = `@media (orientation: landscape)`
export const isShort = '@media (max-height: 700px)'
export const isTall = '@media (min-height: 701px)'
export const mediaOr = arr => `@media ${arr.map(m => m.slice(7)).join(', ')}`
export const mediaAnd = arr => `@media ${arr.map(m => m.slice(7)).join(' and ')}`
export const sections = ['products', 'partners', 'info']

export const GOOGLE_MAPS_API_KEY = 'AIzaSyBxT3wp37bKCxRFDvAh0S3ecUOyynfEWQM'
export const EMAIL_SECURITY_KEY = '773f46eb-8c97-4e10-8cae-f4bd15432259'
export const RECEIVING_EMAIL = 'info@sunsetroad.beer'
export const SENDER_EMAIL = 'customer@sunsetroad.beer'