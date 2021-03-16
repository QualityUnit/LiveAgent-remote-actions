import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(
    async (url, sender) => {
        return await fetch(url)
            .then(response => response.text())
            .then(response_text => response_text);
    }
);
