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
    const confirm = document.getElementById("confirm");
    if (confirm.classList.contains("confirm-off")) {
        confirm.classList.remove("confirm-off");
        confirm.classList.add("confirm-on");

        setTimeout(() => {
            confirm.classList.remove("confirm-on");
            confirm.classList.add("confirm-off");
	}, 3000);
    }

    event.preventDefault();
}

var styles = `
      .confirm-on {
          margin: 10px;
      }

      .confirm-off {
          display: none;
      }
`;
var head =
    <style>
      { styles }
    </style>;
var content =
    <div>
      <form id="la-form">
	<label for="la-address">LiveAgent address: </label> <input type="text" id="la-address"/> <br/>
	<label for="site-selector">Site selector: </label> <input type="text" id="site-selector"/> <br/>
        <button id="submit-btn">Submit</button>
        <button id="cancel-btn">Cancel</button>
      </form>
      <p class="confirm-off" id="confirm">Settings successfully saved!</p>
    </div>;
document.body.appendChild(content);
document.head.appendChild(head);

document.getElementById("la-form").onsubmit = save_settings;

browser.storage.sync.get(["la_address", "site_selector"]).then((ok) => {
    document.getElementById("la-address").value = ok.la_address !== undefined ? ok.la_address : "https://liveagent.com/";
    document.getElementById("site-selector").value = ok.site_selector !== undefined ? ok.site_selector : ".*";
});
