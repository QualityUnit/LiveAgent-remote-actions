    import browser from 'webextension-polyfill';

console.log("test");

browser.runtime.onMessage.addListener(
    async (url, sender) => {
        return await fetch(url)
            .then(response => response.text())
            .then(response_text => response_text);
    }
);
