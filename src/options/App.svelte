<script>
	import GeneralConfig from "./GeneralConfig.svelte";
	import { SvelteToast } from '@zerodevx/svelte-toast'
	let styles = {
        "main-color": "#fa9531",
        "main-color-lighter": "#ffbd39",
        "secondary-color": "#e4e5e9",
        "text-color-inverted": "white",
        "text-color": "black",
        "another-text-color": "#606060",
        "tooltip-color": "#000000",
        "description-text-color": "#65676b",
        "input-placeholder-color": "#b0b4bb",
        "input-border-color": "#ced0d4",
        "input-border-radius": "6px"
	};

	$: cssVarStyles = Object.entries(styles)
			.map(([key, value]) => `--${key}:${value}`)
			.join(';');

</script>

<main style="{cssVarStyles}">
	<GeneralConfig/>
	<SvelteToast/>
</main>

<style>
</style>