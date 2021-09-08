# LiveAgent Remote Actions

Firefox and Chrome extension to hover over embedded emails and phone numbers on the web to view LiveAgent's pop-up contact cards. If you click on an embedded phone number or email, LiveAgent will automatically create a prefilled ticket/call form.

## Dev guide
Install all dependencies using `npm install`

To run development version run `webpack build`

To create release zip manually, run `npx webpack bundle --no-watch --mode production`

## Release
To release new version:
 - increase version in https://github.com/QualityUnit/LiveAgent-remote-actions/blob/master/manifest.json and optionaly also in https://github.com/QualityUnit/LiveAgent-remote-actions/blob/master/package.json
 - push tag in format `vx.y.z` e.g.: `v1.1.0` and [github action](.github/workflows/release_build.yml) will build & deploy it to Firefox addons & Chrome store.

### Options screen is using [Svelte](https://svelte.dev/)
The form saves settings to [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

To run it in separately to easier development, run `webpack serve --content-base public -c webpack-options.config.js` however usage of `webextension-polyfill` must be replaced with native localStorage. 