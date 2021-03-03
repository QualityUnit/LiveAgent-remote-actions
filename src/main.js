import tippy from 'tippy.js';
import 'tippy.js/themes/light.css';
import './tooltip.css';

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

window.LARemoteActions.create("https://liveagent.com/agent/remote_actions.php", false);
