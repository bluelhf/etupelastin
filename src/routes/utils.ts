export function memoize(func: any) {
 
    // Create cache for results
    // Empty objects
    const results: any = {};

    // Return function which takes
    // any number of arguments
    return (...args: any[]) => {
        // Create key for cache
        const argsKey = JSON.stringify(args);

        // Only execute func if no cached val
        // If results object does not have
        // anything to argsKey position
        if (!results[argsKey]) {
            results[argsKey] = func(...args)
        }
        return results[argsKey];
    };
};

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export function getViolationTime(statusTime: any, violation: any) {
    return getRelativeTime(
        new Date(violation.timestamp),
        new Date(statusTime)
    );
}

export function getRelativeTime(d1: Date, d2: Date) {
    // in miliseconds
    let units: Map<Intl.RelativeTimeFormatUnit, number> = new Map([
        ["year"  , 24 * 60 * 60 * 1000 * 365],
        ["month" , 24 * 60 * 60 * 1000 * 365/12],
        ["day"   , 24 * 60 * 60 * 1000],
        ["hour"  , 60 * 60 * 1000],
        ["minute", 60 * 1000],
        ["second", 1000]
    ]);
  
    let elapsed = d1.getTime() - d2.getTime();

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (let [u, s] of units.entries()) {
        if (Math.abs(elapsed) > s || u == 'second') {
            return rtf.format(u != 'second' ? Math.round(elapsed/s * 100) / 100 : Math.floor(elapsed / s), u)
        }
    }
}