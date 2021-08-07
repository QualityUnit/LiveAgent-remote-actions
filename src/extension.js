import tippy from 'tippy.js';
import 'tippy.js/themes/light.css';
import './tooltip.css';
import browser from 'webextension-polyfill';

const mailtoParser = require("mailto-parser");

window.LARemoteActions = {
    create: function (url, processTel) {
	tippy('a[href^="mailto:"]', {
	    interactive: true,
	    allowHTML: true,
	    placement: 'right-start',
	    theme: 'light',
	    content: '<div style="box-sizing: border-box;' +
			'    font-family: Helvetica, Arial, sans-serif;' +
			'    font-size: 12px;' +
			'    margin: 0; border:0;' +
			'    background-color: #fff;' +
			'    padding: 20px;' +
			'    color: #444;' +
			'    box-shadow: 0 0 10px 4px rgb(154 161 177 / 15%), 0 4px 30px -8px rgb(36 40 47 / 25%), 0 -4px 30px -8px rgb(36 40 47 / 25%);' +
			'    border-radius: 8px;' +
			'    width: 270px;">Loading...</div>',
	    async onShow(instance) {
		const parsed = mailtoParser.parse(instance.reference.getAttribute("href"));
		let elem = document.createElement("div");
		let shadow = elem.attachShadow({mode: 'open'});

		shadow.innerHTML = await browser.runtime.sendMessage(
		    url + "?mailto="
			+ encodeURIComponent(parsed.addresses[0]));
		instance.setContent(elem);
	    }
	});
	if (processTel) {
	    tippy('a[href^="tel:"]', {
		interactive: true,
		allowHTML: true,
		placement: 'right-start',
		theme: 'light',
		content: '<div style="box-sizing: border-box;' +
			'    font-family: Helvetica, Arial, sans-serif;' +
			'    font-size: 12px;' +
			'    margin: 0; border:0;' +
			'    background-color: #fff;' +
			'    padding: 20px;' +
			'    color: #444;' +
			'    box-shadow: 0 0 10px 4px rgb(154 161 177 / 15%), 0 4px 30px -8px rgb(36 40 47 / 25%), 0 -4px 30px -8px rgb(36 40 47 / 25%);' +
			'    border-radius: 8px;' +
			'    width: 270px;">Loading...</div>',
		async onShow(instance) {
		    let elem = document.createElement("div");
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
	    });
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
// browser.storage.onChanged.addListener(readFromStorage); // Disabled, we need to delete the old tippys first or we get tippy-ception
