<script>
    import {AllSites, persistStore, SiteSelectors, LiveAgentUrl} from "./ConfigStore";
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
            <input type="url" id="url" name="url" placeholder="https://yourcompany.ladesk.com/" bind:value={$LiveAgentUrl} required/>
            <div class="fieldDescription">
                Enter your LiveAgent account name in a URL format.
                If you don't know your LiveAgent account name, log in to LiveAgent,
                look at the browser URL and copy-paste the first part of the URL.
                It should look like this: https://accountname.ladesk.com
            </div>
            <h2>Site selector</h2>
            <p>
                Choose whether you want to use your contact cards on all or just specific websites.
                If you wish to use the widget on specific sites only, leave the box unchecked.
            </p>
            <input type="checkbox" name="use-on-all-sites" id="use-on-all-sites" bind:checked={$AllSites}/>
            <label for="use-on-all-sites">Use on all sites</label>
            <div class="fieldDescription checkboxDescription">
                If you would like your widget to appear on all websites, make sure you tick the checkbox.
            </div>
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
        --main-color-lighter: #ffbd39;
        --secondary-color: #e4e5e9;
        --text-color-inverted: white;
        --text-color: black;
        --another-text-color: #606060;
        --tooltip-color: #000000;
        --description-text-color: #65676b;
        --input-placeholder-color: #b0b4bb;
        --input-border-color: #ced0d4;
        --input-border-radius: 6px;
    }

    ::placeholder {
        color: var(--input-placeholder-color);
    }

    main {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Poppins-Regular, Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    	font-size:13px;
    	padding: 10px 15px;
    }

    input[type="url"],
    textarea {
        border: 1px solid var(--input-border-color);
        border-radius: var(--input-border-radius);
        padding: 7px 10px;
        line-height: 20px;
        color: var(--text-color);
    }

    input[type="submit"] {
        padding: 0 25px;
        cursor: pointer;
        line-height: 35px;
        font-weight: 700;
        color: var(--text-color-inverted);
        background: var(--main-color);
        border: none;
        border-radius: var(--input-border-radius);
    }

    input[type="submit"]:hover {
        background: var(--main-color-lighter);
    }

    label {
        line-height: 30px;
    }

    h2 {
        font-size: 16px;
        margin: 15px 0 10px;
    }

    .another-text {
        color: var(--another-text-color);
        font-size: 13px;
    }

    #url, #site-selector {
        width: 100%;
    }

    .container {
        width:400px;
    }

    .fieldDescription {
        color: var(--description-text-color);
        font-size: 11px;
        margin-bottom: 10px;
    }

    .checkboxDescription {
        padding-left: 15px;
    }
</style>