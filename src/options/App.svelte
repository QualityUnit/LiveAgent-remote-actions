<script>
	import GeneralConfig from "./GeneralConfig.svelte";
	import { SvelteToast } from '@zerodevx/svelte-toast'
	let styles = {
		"main-color": "#fa9531",
		"secondary-color": "#e4e5e9",
		"text-color-inverted": "white",
		"text-color": "black",
		"another-text-color": "#606060"
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