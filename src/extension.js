import tippy from 'tippy.js';
import 'tippy.js/themes/light.css';
import './tooltip.css';
import browser from 'webextension-polyfill';

const mailtoParser = require("mailto-parser");
window.tippyInstances = [];

window.LARemoteActions = {
    create: function (url, processTel) {
        // tippyInstances.forEarch(instance => instance.destroy()); For some reason this casues execution to stop, I've got no clue why or how to debug it
        tippyInstances.length = 0;
        
	window.tippyInstances.push(tippy('a[href^="mailto:"]', {
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

		shadow.innerHTML = await browser.runtime.sendMessage(
		    url + "?mailto="
			+ encodeURIComponent(parsed.addresses[0]));
		instance.setContent(elem);
	    }
	}));
	if (processTel) {
	    window.tippyInstances.push(tippy('a[href^="tel:"]', {
		interactive: true,
		allowHTML: true,
		placement: 'right-start',
		theme: 'light',
		content: 'Loading...',
		async onShow(instance) {
		    let elem = document.createElement("div");
		    elem.style.backgroundColor = "white";
		    let shadow = elem.attachShadow({mode: 'open'});

		    shadow.innerHTML = await browser.runtime.sendMessage(
			url + "?tel="
			    + encodeURIComponent(
				instance
				    .reference
				    .getAttribute("href")
				    .split(":")[1]));
		    instance.setContent(elem);
		},
	    }));
	}
    }
};

function readFromStorage() {
    browser.storage.sync.get(["la_address", "site_selector"]).then((data) => {
	const la_address = typeof data.la_address !== 'undefined' ? data.la_address : "https://liveagent.com/";
	const site_selector = typeof data.site_selector !== 'undefined' ? data.site_selector : ".*";

	var res = false;
	for (const part of site_selector.split(';')) {
	    const re = new RegExp(part);

	    if (re.test(document.location)) {
		res = true;
		break;
	    }
	}
	if (res === true) {
	    window.LARemoteActions.create(la_address + "/agent/remote_actions.php", true);
	}
    });
}

readFromStorage();
browser.storage.onChanged.addListener(readFromStorage);
