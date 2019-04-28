import {isNotNullOrUndefined} from "./isNullOrUndefined";


export function pick() {
    for (let idx = 0; idx < arguments.length; idx++) {
        if (isNotNullOrUndefined(arguments[idx])) {
            return arguments[idx]
        }
    }
    return null;
}
