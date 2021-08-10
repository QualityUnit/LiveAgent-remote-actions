<script>
    import {AllSites, SiteSelectors} from "./ConfigStore";
    import '@polymer/paper-tooltip'
</script>

<main>
    <form>
        <label for="url">LiveAgent Account URL</label>
        <span id="url-tooltip">ⓘ</span>
        <br>
        <input type="url" id="url" placeholder="https://yourcompany.ladesk.com/" bind:value={$SiteSelectors}/>
        <paper-tooltip for="url-tooltip" position="right" class="slim">
            Enter your LiveAgent account name in a URL format.
            If you don't know your LiveAgent account name, log in to LiveAgent,
            look at the browser URL and copy-paste the first part of the URL.
            It should look like this: https://accountname@ladesk.com
        </paper-tooltip>
        <h2>Site selector</h2>
        <div>
            Choose whether you want to use your contact cards on all or just specific websites.
            If you wish to use the widget on specific sites only, leave the box unchecked.
        </div>
        <input type="checkbox" id="use-on-all-sites" bind:checked={$AllSites}/>
        <label for="use-on-all-sites">Use on all sites</label>
        <span id="use-on-all-sites-tooltip">ⓘ</span>
        <paper-tooltip for="use-on-all-sites-tooltip" position="right" class="slim">
            If you would like your widget to appear on all websites, make sure you tick the checkbox.
        </paper-tooltip>
        {#if $AllSites}
            <div>
                <label for="site-selector">Site selector</label>
                <br>
                <textarea id="site-selector" placeholder={"https://facebook.com\nhttps://google.com"}></textarea>
                <div>List the websites where the widget should appear, separated by new line.</div>
            </div>
        {/if}
        <br>
        <input type="submit" value="Submit" />
        <button class="secondary">Cancel</button>
    </form>
</main>

<style>
    input[type="submit"], button {
        border-radius: 6px;
        padding-left: 15px;
        padding-right: 15px;
    }

    input[type="submit"], input[type="checkbox"] {
        color: white;
        background: #fa9531;
    }

    .secondary {
        background: #e4e5e9;
    }

    paper-tooltip {
        width: 300px;
    }

    form {
        width: fit-content;
    }
</style>