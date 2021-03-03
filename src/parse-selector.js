export function parse_selector(selector) {
    var acc = [];

    console.log(selector);
    for (const re of selector.split(';')) {
        console.log(re.length);
        if (re.length != 0) {
	    acc.push(new RegExp(re));
        }
    }

    return acc;
}
