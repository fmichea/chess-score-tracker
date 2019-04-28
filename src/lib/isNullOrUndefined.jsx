export function isNullOrUndefined(val) {
    return val === null || val === undefined
}

export const isNotNullOrUndefined = (val) => {
    return !isNullOrUndefined(val)
};
