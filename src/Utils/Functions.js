const pub = process.env.PUBLIC_URL

const getAsset = (folder, fileName, urlize = true, ext = 'png') => {
		let result = `${pub}/${folder}/${fileName}.${ext}`
		if (urlize) result = `url(${result})`
		return result
}

export function Bg(fileName, urlize, ext) {
		return getAsset('backgrounds', fileName, urlize, ext)
}

export function Lo(fileName, urlize, ext) {
		return getAsset('logos', fileName, urlize, ext)
}

export function Ic(fileName, urlize, ext) {
		return getAsset('icons', fileName, urlize, ext)
}

export const pdsp = (e, stopPropagation = true) => {
		e.preventDefault()
		if (stopPropagation) e.stopPropagation()
}

export const debounce = (f, t) => {
		let timer
		return e => {
				if (timer) clearTimeout(timer)
				timer = setTimeout(f, t, e)
		}
}