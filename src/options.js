import { React } from './fake-react.js';
import browser from 'webextension-polyfill';

function get_settings() {
    const la_address = document.getElementById("la-address").value;
    const site_selector = document.getElementById("site-selector").value;

    return {
        la_address,
        site_selector
    };
}

function save_settings(event) {
    browser.storage.sync.set(get_settings());

    event.preventDefault();
}

var content =
    <div>
      <form id="la-form">
	<label for="la-address">LiveAgent address: </label> <input type="text" id="la-address"/> <br/>
	<label for="site-selector">Site selector: </label> <input type="text" id="site-selector"/> <br/>
        <button id="submit-btn">Submit</button>
        <button id="cancel-btn">Cancel</button>
      </form>
    </div>;
document.body.appendChild(content);

document.getElementById("la-form").onsubmit = save_settings;

browser.storage.sync.get(["la_address", "site_selector"]).then((ok) => {
    document.getElementById("la-address").value = ok.la_address !== undefined ? ok.la_address : "";
    document.getElementById("site-selector").value = ok.site_selector !== undefined ? ok.site_selector : ".*";
});
