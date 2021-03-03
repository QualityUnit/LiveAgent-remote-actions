import tippy from 'tippy.js';
import 'tippy.js/themes/light.css';
import './tooltip.css';

import { parse_selector } from "./parse-selector.js";

const regeneratorRuntime = require("regenerator-runtime");
const mailtoParser = require("mailto-parser");

console.log("asd");

window.LARemoteActions = {
    create: function (url, processTel) {
	tippy('a[href^="mailto:"]', {
	    interactive: true,
	    allowHTML: true,
	    placement: 'right-start',
	    theme: 'light',
	    content: 'Loading...',
	    async onShow(instance) {
		const parsed = mailtoParser.parse(instance.reference.getAttribute("href"));
		let elem = document.createElement("div");
		elem.style.backgroundColor = "black";
		let shadow = elem.attachShadow({mode: 'open'});
		shadow.innerHTML = await (
		    await fetch(
			url + "?mailto="
			    + encodeURIComponent(parsed.addresses[0]),
			{
			    credentials: "include"
			}
		    )
		).text();
		instance.setContent(elem);
	    }
	});
	if (processTel) {
	    tippy('a[href^="tel:"]', {
		interactive: true,
		allowHTML: true,
		placement: 'right-start',
		theme: 'light',
		content: 'Loading...',
		async onShow(instance) {
		    let elem = document.createElement("div");
		    elem.style.backgroundColor = "white";
		    let shadow = elem.attachShadow({mode: 'open'});

		    shadow.innerHTML =
			await(
			    await fetch(
				url + "?tel="
				    + encodeURIComponent(
					instance
					    .reference
					    .getAttribute("href")
					    .split(":")[1]),
				{
				    credentials: "include"
				})
			).text();
		    instance.setContent(elem);
		},
	    });
	}
    }
};

function readFromStorage() {
    browser.storage.sync.get(["la_address", "site_selector"]).then(
	(item) => {
	    const la_address = typeof item.la_address !== 'undefined' ? item.la_address : "https://liveagent.com/";
	    const site_selector = typeof item.site_selector !== 'undefined' ? item.site_selector : ".*";

            var res = false;
            for (const part of site_selector.split(';')) {
                const re = new RegExp(part);

                if (re.test(document.location)) {
                    console.log(document.location);
                    res = true;
                    break;
                }
            }
	    if (res === true) {
                window.LARemoteActions.create(la_address + "/agent/remote_actions.php", true);
            }
        }
    );
}

readFromStorage();
// browser.storage.onChanged.addListener(readFromStorage); // Disabled, we need to delete the old tippys first or we get tippy-ception
