<script>
    import {AllSites, persistStore, SiteSelectors, LiveAgentUrl} from "./ConfigStore";
    import '@polymer/paper-tooltip'
    import {success} from "./Toast";
    async function handleSubmit(event) {
        let validation = validateSiteSelectors(event);
        if (!validation) {
            event.target.reportValidity();
            return false;
        } else {
            await persistStore();
            success('Saved!');
        }
    }

    function validateSiteSelectors(event) {
        let textbox = event.target.elements["site-selector"];

        if (textbox == null) {
            return true;
        }

        let value = textbox.value.trim();
        let lines = value.split("\n");
        for (const line of lines) {
            try {
                const urlString = (line.indexOf('://') === -1) ? 'https://' + line : line;
                new URL(urlString);
            } catch (_) {
                textbox.setCustomValidity(`"${line}" is not a valid URL`);
                return false
            }
        }
        textbox.setCustomValidity('');
        return true;
    }

    function removeValidity (event) {
        event.target.setCustomValidity("");
    }

</script>

<main>
    <div class="container">
        <form on:submit|preventDefault="{handleSubmit}"     on:changed={removeValidity}
              on:input={removeValidity}>
            <label for="url">LiveAgent Account URL</label>
            <span id="url-tooltip">ⓘ</span>
            <br>
            <input type="url" id="url" name="url" placeholder="https://yourcompany.ladesk.com/" bind:value={$LiveAgentUrl} required/>
            <paper-tooltip for="url-tooltip" position="right" class="slim">
                Enter your LiveAgent account name in a URL format.
                If you don't know your LiveAgent account name, log in to LiveAgent,
                look at the browser URL and copy-paste the first part of the URL.
                It should look like this: https://accountname@ladesk.com
            </paper-tooltip>
            <h2>Site selector</h2>
            <p>
                Choose whether you want to use your contact cards on all or just specific websites.
                If you wish to use the widget on specific sites only, leave the box unchecked.
            </p>
            <input type="checkbox" name="use-on-all-sites" id="use-on-all-sites" bind:checked={$AllSites}/>
            <label for="use-on-all-sites">Use on all sites</label>
            <span id="use-on-all-sites-tooltip">ⓘ</span>
            <paper-tooltip for="use-on-all-sites-tooltip" position="right" class="slim">
                If you would like your widget to appear on all websites, make sure you tick the checkbox.
            </paper-tooltip>
            <br>
            {#if !$AllSites}
                <div>
                    <label for="site-selector">Site selector</label>
                    <br>
                    <textarea id="site-selector" name="site-selector" placeholder={"https://facebook.com\nhttps://google.com"} bind:value={$SiteSelectors}></textarea>
                    <div class="another-text">List the websites where the widget should appear, separated by new line.</div>
                </div>
            {/if}
            <br>
            <input type="submit" value="Submit" />
        </form>
    </div>
</main>

<style>
    :host {
        --main-color: #fa9531;
        --secondary-color: #e4e5e9;
        --text-color-inverted: white;
        --text-color: black;
        --another-text-color: #606060;
    }

    input[type="submit"] {
        border-radius: 6px;
        padding-left: 15px;
        padding-right: 15px;
    }

    input[type="submit"], input[type="checkbox"] {
        color: var(--text-color-inverted);
        background: var(--main-color);
    }

    .another-text {
        color: var(--another-text-color);
        font-size: 12px;
    }

    paper-tooltip {
        width: 300px;
    }

    #url, #site-selector {
        width: 100%;
    }

    .container {
        width:400px;
    }
</style>