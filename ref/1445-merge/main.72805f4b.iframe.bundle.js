(self.webpackChunkreact_photoswipe_gallery=self.webpackChunkreact_photoswipe_gallery||[]).push([[792],{"./storybook-config-entry.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";var external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_CHANNELS_=__webpack_require__("@storybook/channels");const importers=[async path=>{if(!/^\.[\\/](?:src(?:\/(?!\.)(?:(?:(?!(?:^|\/)\.).)*?)\/|\/|$)(?!\.)(?=.)[^/]*?\.stories\.(ts|tsx))$/.exec(path))return;const pathRemainder=path.substring(6);return __webpack_require__("./src lazy recursive ^\\.\\/.*$ include: (?:\\/src(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.(ts%7Ctsx))$")("./"+pathRemainder)}];const channel=(0,external_STORYBOOK_MODULE_CHANNELS_.createBrowserChannel)({page:"preview"});external_STORYBOOK_MODULE_PREVIEW_API_.addons.setChannel(channel),"DEVELOPMENT"===external_STORYBOOK_MODULE_GLOBAL_.global.CONFIG_TYPE&&(window.__STORYBOOK_SERVER_CHANNEL__=channel);const preview=new external_STORYBOOK_MODULE_PREVIEW_API_.PreviewWeb;window.__STORYBOOK_PREVIEW__=preview,window.__STORYBOOK_STORY_STORE__=preview.storyStore,window.__STORYBOOK_ADDONS_CHANNEL__=channel,window.__STORYBOOK_CLIENT_API__=new external_STORYBOOK_MODULE_PREVIEW_API_.ClientApi({storyStore:preview.storyStore}),preview.initialize({importFn:async function importFn(path){for(let i=0;i<importers.length;i++){const moduleExports=await(x=()=>importers[i](path),x());if(moduleExports)return moduleExports}var x},getProjectAnnotations:()=>(0,external_STORYBOOK_MODULE_PREVIEW_API_.composeConfigs)([__webpack_require__("./.yarn/__virtual__/@storybook-react-virtual-eeeacbba79/0/cache/@storybook-react-npm-7.6.17-11b3e7cb66-7582967e72.zip/node_modules/@storybook/react/dist/entry-preview.mjs"),__webpack_require__("./.yarn/__virtual__/@storybook-react-virtual-eeeacbba79/0/cache/@storybook-react-npm-7.6.17-11b3e7cb66-7582967e72.zip/node_modules/@storybook/react/dist/entry-preview-docs.mjs"),__webpack_require__("./.yarn/__virtual__/@storybook-addon-essentials-virtual-d0bca7dbfe/0/cache/@storybook-addon-essentials-npm-7.6.17-54c4d8ab40-d63a5359c8.zip/node_modules/@storybook/addon-essentials/dist/docs/preview.js"),__webpack_require__("./.yarn/__virtual__/@storybook-addon-essentials-virtual-d0bca7dbfe/0/cache/@storybook-addon-essentials-npm-7.6.17-54c4d8ab40-d63a5359c8.zip/node_modules/@storybook/addon-essentials/dist/actions/preview.js"),__webpack_require__("./.yarn/__virtual__/@storybook-addon-essentials-virtual-d0bca7dbfe/0/cache/@storybook-addon-essentials-npm-7.6.17-54c4d8ab40-d63a5359c8.zip/node_modules/@storybook/addon-essentials/dist/backgrounds/preview.js"),__webpack_require__("./.yarn/__virtual__/@storybook-addon-essentials-virtual-d0bca7dbfe/0/cache/@storybook-addon-essentials-npm-7.6.17-54c4d8ab40-d63a5359c8.zip/node_modules/@storybook/addon-essentials/dist/measure/preview.js"),__webpack_require__("./.yarn/__virtual__/@storybook-addon-essentials-virtual-d0bca7dbfe/0/cache/@storybook-addon-essentials-npm-7.6.17-54c4d8ab40-d63a5359c8.zip/node_modules/@storybook/addon-essentials/dist/outline/preview.js"),__webpack_require__("./.yarn/__virtual__/@storybook-addon-essentials-virtual-d0bca7dbfe/0/cache/@storybook-addon-essentials-npm-7.6.17-54c4d8ab40-d63a5359c8.zip/node_modules/@storybook/addon-essentials/dist/highlight/preview.js"),__webpack_require__("./.storybook/preview.ts")])})},"./.storybook/preview.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{preview:()=>preview});var _storybook_theming__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.yarn/__virtual__/@storybook-theming-virtual-149eb59a4b/0/cache/@storybook-theming-npm-7.6.17-f5003c8d57-1fb988364b.zip/node_modules/@storybook/theming/dist/chunk-EIRT5I3Z.mjs");const currentRef=encodeURIComponent("1445/merge"),currentSha="3f971e0222fcad1ac389368460bcba8870fb03cb",shortSha=currentSha?currentSha.substring(0,7):"local",createLogo=(theme="light")=>{const sha=shortSha;let ref=currentRef;ref.length>15&&(ref=`${ref.substring(0,15)}…`);const colors={light:"rgb(51, 51, 51)",dark:"rgb(255, 255, 255)"};return`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='202px' height='40px' viewBox='0 0 202 40' role='img'%0A%3E%3Ctitle%3EStorybook%3C/title%3E%3Ctext x='0' y='14' text-anchor='start' font-family='BlinkMacSystemFont, -apple-system, Arial, sans-serif' font-weight='bold' font-size='14' fill='${colors[theme]}' %3Ereact-photoswipe-gallery%3C/text%3E%3Ctext x='0' y='32' text-anchor='start' font-family='monospace' font-size='14' fill='${colors[theme]}' %3E${sha}@${ref}%3C/text%3E%3C/svg%3E`},brandSettings={brandTitle:`react-photoswipe-gallery/${currentRef} - Storybook${shortSha?` - ${shortSha}`:""}`,brandUrl:"https://github.com/dromru/react-photoswipe-gallery/"+("local"===currentRef?"":`tree/${currentRef}`)},preview={parameters:{controls:{hideNoControlsWarning:!0},darkMode:{stylePreview:!0,darkClass:"dark",lightClass:"light",classTarget:"html",dark:Object.assign(Object.assign(Object.assign({},_storybook_theming__WEBPACK_IMPORTED_MODULE_0__.Zj.dark),brandSettings),{brandImage:createLogo("dark")}),light:Object.assign(Object.assign(Object.assign({},_storybook_theming__WEBPACK_IMPORTED_MODULE_0__.Zj.light),brandSettings),{brandImage:createLogo("light")})},options:{storySort:{order:["Demo",["Basic","Cropped","Hash Navigation","Caption","Srcset","Download Button","Custom Content","Plugins"],"Dev"]}}}}},"./src lazy recursive ^\\.\\/.*$ include: (?:\\/src(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.(ts%7Ctsx))$":(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./storybook/basic.stories":["./src/storybook/basic.stories.tsx",834,988],"./storybook/basic.stories.tsx":["./src/storybook/basic.stories.tsx",834,988],"./storybook/cropped.stories":["./src/storybook/cropped.stories.tsx",834,271],"./storybook/cropped.stories.tsx":["./src/storybook/cropped.stories.tsx",834,271],"./storybook/custom-content.stories":["./src/storybook/custom-content.stories.tsx",834,539],"./storybook/custom-content.stories.tsx":["./src/storybook/custom-content.stories.tsx",834,539],"./storybook/hash-navigation.stories":["./src/storybook/hash-navigation.stories.tsx",834,981],"./storybook/hash-navigation.stories.tsx":["./src/storybook/hash-navigation.stories.tsx",834,981],"./storybook/playground.stories":["./src/storybook/playground.stories.tsx",834,413],"./storybook/playground.stories.tsx":["./src/storybook/playground.stories.tsx",834,413],"./storybook/plugins.stories":["./src/storybook/plugins.stories.tsx",834,554],"./storybook/plugins.stories.tsx":["./src/storybook/plugins.stories.tsx",834,554],"./storybook/rotate-slide-button.stories":["./src/storybook/rotate-slide-button.stories.tsx",834,180],"./storybook/rotate-slide-button.stories.tsx":["./src/storybook/rotate-slide-button.stories.tsx",834,180],"./storybook/srcset.stories":["./src/storybook/srcset.stories.tsx",834,956],"./storybook/srcset.stories.tsx":["./src/storybook/srcset.stories.tsx",834,956],"./storybook/thumbnails-in-opened-photoswipe.stories":["./src/storybook/thumbnails-in-opened-photoswipe.stories.tsx",834,882],"./storybook/thumbnails-in-opened-photoswipe.stories.tsx":["./src/storybook/thumbnails-in-opened-photoswipe.stories.tsx",834,882],"./storybook/with-caption.stories":["./src/storybook/with-caption.stories.tsx",834,683],"./storybook/with-caption.stories.tsx":["./src/storybook/with-caption.stories.tsx",834,683],"./storybook/with-download-button.stories":["./src/storybook/with-download-button.stories.tsx",834,0],"./storybook/with-download-button.stories.tsx":["./src/storybook/with-download-button.stories.tsx",834,0],"./storybook/without-images.stories":["./src/storybook/without-images.stories.tsx",834,729],"./storybook/without-images.stories.tsx":["./src/storybook/without-images.stories.tsx",834,729]};function webpackAsyncContext(req){if(!__webpack_require__.o(map,req))return Promise.resolve().then((()=>{var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}));var ids=map[req],id=ids[0];return Promise.all(ids.slice(1).map(__webpack_require__.e)).then((()=>__webpack_require__(id)))}webpackAsyncContext.keys=()=>Object.keys(map),webpackAsyncContext.id="./src lazy recursive ^\\.\\/.*$ include: (?:\\/src(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.(ts%7Ctsx))$",module.exports=webpackAsyncContext},"@storybook/channels":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CHANNELS__},"@storybook/client-logger":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CLIENT_LOGGER__},"@storybook/core-events":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CORE_EVENTS__},"@storybook/global":module=>{"use strict";module.exports=__STORYBOOK_MODULE_GLOBAL__},"@storybook/preview-api":module=>{"use strict";module.exports=__STORYBOOK_MODULE_PREVIEW_API__}},__webpack_require__=>{__webpack_require__.O(0,[138],(()=>{return moduleId="./storybook-config-entry.js",__webpack_require__(__webpack_require__.s=moduleId);var moduleId}));__webpack_require__.O()}]);