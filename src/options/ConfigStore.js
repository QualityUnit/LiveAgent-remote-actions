// noinspection EqualityComparisonWithCoercionJS

import {writable} from "svelte/store"
import browser from 'webextension-polyfill';


export const AllSites = writable();
export const SiteSelectors = writable();
export const LiveAgentUrl = writable();

async function loadData() {
    let data = await browser.storage.sync.get(["la_address", "site_selectors", "all_sites"]);
    AllSites.set(data["all_sites"])
    SiteSelectors.set(data["site_selectors"])
    LiveAgentUrl.set(data["la_address"])
}
loadData().then(()=>{});

let allSites, siteSelectors, laUrl;
AllSites.subscribe(value => allSites = value);
SiteSelectors.subscribe(value => siteSelectors = value);
LiveAgentUrl.subscribe(value => laUrl = value);


export async function persistStore() {
    await browser.storage.sync.set({
        "all_sites": allSites,
        "site_selectors": siteSelectors,
        "la_address": laUrl
    })
}