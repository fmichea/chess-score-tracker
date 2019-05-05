import {sprintf} from "sprintf-js";

export function showError() {
    const errMsg = sprintf.apply(null, arguments);
    console.log(sprintf("FIXME: programming error: %s", errMsg))
};
