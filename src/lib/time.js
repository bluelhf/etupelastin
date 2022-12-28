const FORMAT = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

const UNITS = {
    'year': 24 * 60 * 60 * 1000 * 365,
    'month': 24 * 60 * 60 * 1000 * 365 / 12,
    'day': 24 * 60 * 60 * 1000,
    'hour': 60 * 60 * 1000,
    'minute': 60 * 1000,
    'second': 1000
}

export function getRelativeTime(d1, d2) {
    let elapsed = d1.getTime() - d2.getTime()

    for (let [u, s] of Object.entries(UNITS)) {
        if (Math.abs(elapsed) > s || u === 'second') {
            return FORMAT.format(u !== 'second' ? Math.round(elapsed / s * 100) / 100 : Math.floor(elapsed / s), u)
        }
    }
}