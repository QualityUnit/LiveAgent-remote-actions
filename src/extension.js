// noinspection EqualityComparisonWithCoercionJS

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
    browser.storage.sync.get(["la_address", "site_selectors", "all_sites"]).then((data) => {
        const la_address = typeof data["la_address"] !== 'undefined' ? data.la_address : "https://liveagent.com/";
        const site_selectors = typeof data["site_selectors"] !== 'undefined' && data["site_selectors"] != null ? data.site_selectors.trim() : "";
        let res = data["all_sites"];
        if (!res && site_selectors.trim() != "") {
            for (const line of site_selectors.split('\n')) {
                const urlString = (line.indexOf('://') === -1) ? 'https://' + line : line;
                const url = new URL(urlString);

                if (url.host == document.location.host) {
                    res = true;
                    break;
                }
            }
        }
        if (res === true) {
            window.LARemoteActions.create(la_address + "/agent/web_contact_cards.php", true);
        }
    });
}

readFromStorage();
// browser.storage.onChanged.addListener(readFromStorage); // Disabled, we need to delete the old tippys first or we get tippy-ception
