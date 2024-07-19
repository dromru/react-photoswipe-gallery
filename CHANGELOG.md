# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.2](https://github.com/dromru/react-photoswipe-gallery/compare/v3.0.1...v3.0.2) (2024-07-19)

## [3.0.1](https://github.com/dromru/react-photoswipe-gallery/compare/v2.2.7...v3.0.1) (2023-12-20)

### Bug Fixes

* prevent unnecessary removal of ref in strict mode ([32f446b](https://github.com/dromru/react-photoswipe-gallery/commit/32f446b7e98230271ae2f3229515ab7c4f47f227))

## [3.0.0](https://github.com/dromru/react-photoswipe-gallery/compare/v2.2.7...v3.0.0) (2023-12-05)


### Features

* **item:** move set call from effect to ref callback ([a5f7aa2](https://github.com/dromru/react-photoswipe-gallery/commit/a5f7aa24a1543b3e7121e06a33d8e20c7a714846)).
This feature improves performance and stops creating warnings since there is no more useLayoutEffect. Also improves typings, so you no longer need to manually cast ref type. This is small breaking change, but not hard to deal with.

* make Item ref always required ([64464e7](https://github.com/dromru/react-photoswipe-gallery/commit/64464e7ea7b3283d2130c533818460107afa6e4b)).
In previous version you could omit setting ref from Item to node if there was only one Item to render. This realease drops this possibility, so you no longer need to think if you should or should not set ref to node.

## [3.0.0-alpha.0](https://github.com/dromru/react-photoswipe-gallery/compare/v2.2.7...v3.0.0-alpha.0) (2023-11-22)


### Features

* **item:** move set call from effect to ref callback ([63c78de](https://github.com/dromru/react-photoswipe-gallery/commit/63c78de5aeec2f69c51eda6a2c83c0a4322cf927))
* make Item ref always required ([72a1ecc](https://github.com/dromru/react-photoswipe-gallery/commit/72a1ecc0ec3b424549e8b4bec60d9a3e3ed0924a))

## [2.2.7](https://github.com/dromru/react-photoswipe-gallery/compare/v2.2.6...v2.2.7) (2023-04-03)


### Bug Fixes

* change useEffect to useLayoutEffect in Item component ([ed17490](https://github.com/dromru/react-photoswipe-gallery/commit/ed17490ba192ebe99480b61f04e6af4983982b55))

## [2.2.6](https://github.com/dromru/react-photoswipe-gallery/compare/v2.2.5...v2.2.6) (2023-02-12)


### Chore

* remove useless null checks ([af4ce1e](https://github.com/dromru/react-photoswipe-gallery/commit/af4ce1e384fcc23242021d2da27a3fb20047f971))

## [2.2.5](https://github.com/dromru/react-photoswipe-gallery/compare/v2.2.4...v2.2.5) (2023-02-09)


### Bug Fixes

* remove null from ItemRef type ([fc40996](https://github.com/dromru/react-photoswipe-gallery/commit/fc409960b6d9badf55108b8ba4e4d6272b6d84fd))

## [2.2.4](https://github.com/dromru/react-photoswipe-gallery/compare/v2.2.3...v2.2.4) (2023-02-09)


### Bug Fixes

* fix ts errors based on null checks ([bdf6012](https://github.com/dromru/react-photoswipe-gallery/commit/bdf601266720cdca74769e986edfb37a4a0cc267))


### Chore

* enable strictNullChecks in tsconfig ([b537d9a](https://github.com/dromru/react-photoswipe-gallery/commit/b537d9a944880317e55a6ba63d95dc2dff21ada8))

## [2.2.3](https://github.com/dromru/react-photoswipe-gallery/compare/v2.2.2...v2.2.3) (2023-01-31)


### Bug Fixes

* fix browser back/forward navigation with enabled hash navigation ([31d815b](https://github.com/dromru/react-photoswipe-gallery/commit/31d815bd9c6b181d69f08deb550a394a5dae9027))
* **ci:** fix various GH Actions issues ([047b3fb](https://github.com/dromru/react-photoswipe-gallery/commit/047b3fb254a76431ab339ffa5e7eaa014c6a2980))
* **test:** add jest-environment-jsdom; fix config ([3404d90](https://github.com/dromru/react-photoswipe-gallery/commit/3404d90021afc9f47bf8004c3bc4d629cbce3b1d))


### Chore

* **changelog:** remove redundant entries ([e65c384](https://github.com/dromru/react-photoswipe-gallery/commit/e65c38472bd4156642473af1f31a5b62ca4d9904))

## [2.2.2](https://github.com/dromru/react-photoswipe-gallery/compare/v2.2.1...v2.2.2) (2022-09-26)


### Bug Fixes

* **package:** Add exports to package.json ([#928](https://github.com/dromru/react-photoswipe-gallery/issues/928)) ([000c936](https://github.com/dromru/react-photoswipe-gallery/commit/000c936688888d7f6050bc55c3d520ee4b0a3f87))
* **test:** resolve `act` warning ([ffd7e1a](https://github.com/dromru/react-photoswipe-gallery/commit/ffd7e1a2946490f43a59342a23a25935d7598f96))


### Chore

* **check:** add `type-check` script ([878e051](https://github.com/dromru/react-photoswipe-gallery/commit/878e0514fbbb79d43449d766e613414cf11e76db))
* **ci:** remove `build-storybook` from build workflow ([95c1ed3](https://github.com/dromru/react-photoswipe-gallery/commit/95c1ed3956efe0f440680a87e4889e0f44a37fdd))

## [2.2.1](https://github.com/dromru/react-photoswipe-gallery/compare/v2.2.0...v2.2.1) (2022-05-14)


### Bug Fixes

* **custom-content:** reset portal if slideData has no content, and on `close` ([#837](https://github.com/dromru/react-photoswipe-gallery/issues/837)) ([031dfcf](https://github.com/dromru/react-photoswipe-gallery/commit/031dfcfdb97c12f2bb955aa325465e00b8788f06))
* **storybook:** adjust color scheme ([68ab0ac](https://github.com/dromru/react-photoswipe-gallery/commit/68ab0ac37d57e6b78bf6c40e16ef6494a8267e5b))

## [2.2.0](https://github.com/dromru/react-photoswipe-gallery/compare/v2.1.0...v2.2.0) (2022-05-10)


### Features

* **types:** use vendor photoswipe types ([6faed81](https://github.com/dromru/react-photoswipe-gallery/commit/6faed81d746d68549a6027d6bf61e24ad3f9f2d8))


### Bug Fixes

* **prop-types:** add missing prop ([6af1e8c](https://github.com/dromru/react-photoswipe-gallery/commit/6af1e8c0f2e1cc1f5d228698174a0552fa587697))

## [2.1.0](https://github.com/dromru/react-photoswipe-gallery/compare/v2.0.4...v2.1.0) (2022-04-26)


### Features

* add `content` prop for the `Item` component ([docs](https://github.com/dromru/react-photoswipe-gallery#custom-slide-content))
* add `uiElements` prop for the `Gallery` component ([docs](https://github.com/dromru/react-photoswipe-gallery#custom-ui-elements))


### Chore

* **yarn:** remove redundant packageExtensions ([818b0a3](https://github.com/dromru/react-photoswipe-gallery/commit/818b0a32d6dab37aef8cb0ce56c5e9571255003e))

## [2.0.4](https://github.com/dromru/react-photoswipe-gallery/compare/v2.0.3...v2.0.4) (2022-04-16)


### Bug Fixes

* **esm:** patch import statements in tsc output ([067a032](https://github.com/dromru/react-photoswipe-gallery/commit/067a032c0c9f1971244e2daad5aa10a9adf95701))

## [2.0.3](https://github.com/dromru/react-photoswipe-gallery/compare/v2.0.2...v2.0.3) (2022-04-16)


### Bug Fixes

* **package:** set `type: 'module'` ([7f74c25](https://github.com/dromru/react-photoswipe-gallery/commit/7f74c25b2ab64d01377515c836edfa9a994445a7))


### Chore

* **ci:** set node version to v16 for workflows ([b50be06](https://github.com/dromru/react-photoswipe-gallery/commit/b50be066dfe79f0913532178c33c3ded1abff7c3))

## [2.0.2](https://github.com/dromru/react-photoswipe-gallery/compare/v2.0.1...v2.0.2) (2022-04-16)


### Bug Fixes

* **build:** set TSC target to `ES6` to match PhotoSwipe v5 ([30909b7](https://github.com/dromru/react-photoswipe-gallery/commit/30909b798da3e9bc24ae8f37a141071dabc6a8b1))

## [2.0.1](https://github.com/dromru/react-photoswipe-gallery/compare/v2.0.0...v2.0.1) (2022-04-15)


### Bug Fixes

* **package:** exclude `src/storybook` from build ([0a3068e](https://github.com/dromru/react-photoswipe-gallery/commit/0a3068eec9e9f9082fac0c31e587c61ca6267cc8))

## [2.0.0](https://github.com/dromru/react-photoswipe-gallery/compare/v1.3.10...v2.0.0) (2022-04-15)


### ⚠ BREAKING CHANGES

* drop PhotoSwipe v4 support (#592)
* remove prop `title` (Item component) (#592)
* remove BaseGallery, CustomGallery, DefaultLayout (#592)


### Features

* add PhotoSwipe v5 support (#592)
* add new props for Item component: `originalSrcset`, `alt`, `caption`, `cropped` (#592)
* add new props for Gallery component: `onBeforeOpen`, `withCaption`, `withDownloadButton`, `plugins` (#592)
* add PhotoSwipe plugins support (#592)
* implement hash navigation (there is no built-in hash navigation in photoswipe v5) (#592)


### Bug Fixes

* **types:** declare gallery's `children` explicitly; add type for ref; add event type ([cc940bb](https://github.com/dromru/react-photoswipe-gallery/commit/cc940bbb1a2db966799508d4992722ef80e5a2e3))

## [1.3.10](https://github.com/dromru/react-photoswipe-gallery/compare/v1.3.9...v1.3.10) (2022-04-01)


### Bug Fixes

* **package:** pack source files for sourcemaps support ([9fc3c9f](https://github.com/dromru/react-photoswipe-gallery/commit/9fc3c9f9993fa093faf12048b1b840de236b0337)), closes [#758](https://github.com/dromru/react-photoswipe-gallery/issues/758)

## [1.3.9](https://github.com/dromru/react-photoswipe-gallery/compare/v1.3.8...v1.3.9) (2022-04-01)


### Bug Fixes

* **package:** fix range for the `photoswipe` peer dependency ([2f2de65](https://github.com/dromru/react-photoswipe-gallery/commit/2f2de65ef5ff61d8864007500d44ce680caf8be5))
* **changelog:** fix changelog format ([4911eae](https://github.com/dromru/react-photoswipe-gallery/commit/4911eae332ac30724d996cfdc08478aebe3434d2))

## [1.3.8](https://github.com/dromru/react-photoswipe-gallery/compare/v1.3.7...v1.3.8) (2022-03-07)


### Bug Fixes

* **package:** change `repository` field format ([e1efbbf](https://github.com/dromru/react-photoswipe-gallery/commit/e1efbbf81a98668b609b3e0c6c2fd9636d0e3b1b))

## [1.3.7](https://github.com/dromru/react-photoswipe-gallery/compare/v1.3.6...v1.3.7) (2022-03-06)


### Bug Fixes

* **perf:** wrap context value with useMemo ([25b6504](https://github.com/dromru/react-photoswipe-gallery/commit/25b6504b932e4c1f58ad700e3aadd93bc874509e))
* weird bold emojis in chrome ([440beaf](https://github.com/dromru/react-photoswipe-gallery/commit/440beaf2acc3ceb3a21443dcb282056fbca08a96))


### Chore

* **husky:** migrate husky configuration ([0be4a3f](https://github.com/dromru/react-photoswipe-gallery/commit/0be4a3fd172a6bdddbff1044750aff13003f3425))
* **ci:** env vars for publish script ([8dbce8b](https://github.com/dromru/react-photoswipe-gallery/commit/8dbce8b79ff0e73e6f198310cac737a4f9fcc5ea))
* **test:** update ts-jest, add env docblock ([ad120c1](https://github.com/dromru/react-photoswipe-gallery/commit/ad120c188ea21c2a7e8f30b185cc4bd58ce8d9d6))
* **ci:** add gh deployment ([31b7b76](https://github.com/dromru/react-photoswipe-gallery/commit/31b7b76bb55d33c3a82a361c9077df276c293a45))
* **ci:** use destination_dir on deploy ([34b127b](https://github.com/dromru/react-photoswipe-gallery/commit/34b127b5aca1ce651537998abd9de8cb2fb3c2d9))
* **cs:** fix prettier issues ([dc9f4e4](https://github.com/dromru/react-photoswipe-gallery/commit/dc9f4e45769123aa37133eed0901d4668e8b8e8d))
* **lint-config:** disable react/function-component-definition rule ([c14e15e](https://github.com/dromru/react-photoswipe-gallery/commit/c14e15ec4981db4c4cadcb9b3f73637363905d86))
* **yarn:** set defaultSemverRangePrefix to respect dependencies pinning ([821dfd9](https://github.com/dromru/react-photoswipe-gallery/commit/821dfd9ebcaa0b97ced26acc3694c36868271cc8))

## [1.3.6](https://github.com/dromru/react-photoswipe-gallery/compare/v1.3.5...v1.3.6) (2021-04-12)


### Bug Fixes

* **ci:** explicitly run pre/post publish scripts in ci ([4bf7f0b](https://github.com/dromru/react-photoswipe-gallery/commit/4bf7f0b3ff1ecb2f438b6836f5e6b974c424717f)), closes [#472](https://github.com/dromru/react-photoswipe-gallery/issues/472)


## [1.3.5](https://github.com/dromru/react-photoswipe-gallery/compare/v1.3.4...v1.3.5) (2021-04-10)


### Chore

* Bump dependencies ([1e39524](https://github.com/dromru/react-photoswipe-gallery/commit/1e39524218f2aa4ec6f1e34b3bca7c00c96b926c))
* bump storybook; use builder: webpack5 ([f127302](https://github.com/dromru/react-photoswipe-gallery/commit/f1273023b9c58474ee9ffcf21da9bacf2d7e5f2a))
* update lockfile, gitignore ([4cd6b45](https://github.com/dromru/react-photoswipe-gallery/commit/4cd6b45c8a28072725859d19298a4575f2b52b16))

## [1.3.4](https://github.com/dromru/react-photoswipe-gallery/compare/v1.3.3...v1.3.4) (2020-12-25)

## [1.3.3](https://github.com/dromru/react-photoswipe-gallery/compare/v1.3.2...v1.3.3) (2020-12-24)


### Chore

* migrate to yarn berry ([b9224ba](https://github.com/dromru/react-photoswipe-gallery/commit/b9224ba480aef009e48669d0ae733b56a30a776b))

## [1.3.2](https://github.com/dromru/react-photoswipe-gallery/compare/v1.3.1...v1.3.2) (2020-12-24)


### Bug Fixes

* hash navigation if items added in different render ([84cebdc](https://github.com/dromru/react-photoswipe-gallery/commit/84cebdc4da4527c716ce618c48265a850a25d69d))
* **test:** define photoswipeArgsMock return type ([b0cc02b](https://github.com/dromru/react-photoswipe-gallery/commit/b0cc02bab678ac1bebaebc23dbe8c0c1e1ee2e38))


### Chore

* **ci:** upgrade actions/setup-node ([3b36743](https://github.com/dromru/react-photoswipe-gallery/commit/3b36743b3321fb28f919d82f9b4ddf5a6077e975))
* **ci:** upgrade codecov/codecov-action ([f03d274](https://github.com/dromru/react-photoswipe-gallery/commit/f03d2741b18ec9d735fe28cd38fa7dc16b1366a7))

## [1.3.1](https://github.com/dromru/react-photoswipe-gallery/compare/v1.3.0...v1.3.1) (2020-10-06)


### Bug Fixes

* add some missing hooks dependencies ([839c5e5](https://github.com/dromru/react-photoswipe-gallery/commit/839c5e57d68538749bdd0ff3c99c3cb4a686831d))

## [1.3.0](https://github.com/dromru/react-photoswipe-gallery/compare/v1.2.0...v1.3.0) (2020-07-21)


### Features

* **core:** added useGallery hook ([f82f77a](https://github.com/dromru/react-photoswipe-gallery/commit/f82f77a29e80796972176b374f9e44932056cdb0)), closes [#22](https://github.com/dromru/react-photoswipe-gallery/issues/22)


### Chore

* configure types for standard-version ([c607941](https://github.com/dromru/react-photoswipe-gallery/commit/c607941a2d69f4126f6a170c0436f2a101a9ae31))
* migrate from conventional-changelog-cli to standard-version ([7b90786](https://github.com/dromru/react-photoswipe-gallery/commit/7b907869518f3d352d12f51eb8c76d0cc227156b))
* upgrade storybook ([da580de](https://github.com/dromru/react-photoswipe-gallery/commit/da580de580518d1cb9d76c5e193740ed7fbe59e8))

## 1.2.0 (2020-04-26)

* feat: expose photoswipe API ([c1542f3](https://github.com/dromru/react-photoswipe-gallery/commit/c1542f3)), closes [#20](https://github.com/dromru/react-photoswipe-gallery/issues/20)



## 1.1.0 (2020-04-25)

* chore: stop using angular preset for conventional-changelog ([dc51c55](https://github.com/dromru/react-photoswipe-gallery/commit/dc51c55))
* docs(readme): fix missing empty cell ([21206fd](https://github.com/dromru/react-photoswipe-gallery/commit/21206fd))
* improvement: implement hash navigation ([bde7d7e](https://github.com/dromru/react-photoswipe-gallery/commit/bde7d7e)), closes [#19](https://github.com/dromru/react-photoswipe-gallery/issues/19)



## [1.0.1](https://github.com/dromru/react-photoswipe-gallery/compare/v1.0.0...v1.0.1) (2020-04-25)


### Bug Fixes

* allow override all photoswipe options ([0a21905](https://github.com/dromru/react-photoswipe-gallery/commit/0a21905343c8a2f41614c90ba10b470a83bff5c7))
* remove check for current ref type in getThumbBoundsFn ([66165ef](https://github.com/dromru/react-photoswipe-gallery/commit/66165ef58dabbf1476452440ced8ef1bb8ba415f))



## 1.0.0 (2020-04-25)

* improvement: separate Gallery and CustomGallery ([edd4bed](https://github.com/dromru/react-photoswipe-gallery/commit/edd4bed)), closes [#16](https://github.com/dromru/react-photoswipe-gallery/issues/16)
* improvement: throw if no ref, allow single-item without ref ([6dd48e9](https://github.com/dromru/react-photoswipe-gallery/commit/6dd48e9)), closes [#13](https://github.com/dromru/react-photoswipe-gallery/issues/13) [#12](https://github.com/dromru/react-photoswipe-gallery/issues/12)
* improvement(stories): add story without images ([1025158](https://github.com/dromru/react-photoswipe-gallery/commit/1025158)), closes [#14](https://github.com/dromru/react-photoswipe-gallery/issues/14)
* improvement(storybook): add story with example from photoswipe.com ([3111463](https://github.com/dromru/react-photoswipe-gallery/commit/3111463))
* docs: add inline comments ([c0ff9e9](https://github.com/dromru/react-photoswipe-gallery/commit/c0ff9e9))
* docs(readme): add codecov badge ([40eb561](https://github.com/dromru/react-photoswipe-gallery/commit/40eb561))
* docs(readme): add npmjs badge ([04c12e2](https://github.com/dromru/react-photoswipe-gallery/commit/04c12e2))
* docs(readme): update readme ([3a9441a](https://github.com/dromru/react-photoswipe-gallery/commit/3a9441a)), closes [#8](https://github.com/dromru/react-photoswipe-gallery/issues/8)
* ci: deploy storybook to gh-pages ([036fa4e](https://github.com/dromru/react-photoswipe-gallery/commit/036fa4e))
* ci: publish based on new release ([462c9aa](https://github.com/dromru/react-photoswipe-gallery/commit/462c9aa))
* ci: run tests on push, upload coverage report to codecov ([cb6eb7c](https://github.com/dromru/react-photoswipe-gallery/commit/cb6eb7c))
* fix: change approach to determine the order of items ([5acf951](https://github.com/dromru/react-photoswipe-gallery/commit/5acf951))
* fix: remove unneeded git add from lint-staged config ([8914f38](https://github.com/dromru/react-photoswipe-gallery/commit/8914f38))
* fix(item-api): add missing html prop for Item from PhotoswipeItem ([59522c6](https://github.com/dromru/react-photoswipe-gallery/commit/59522c6)), closes [#17](https://github.com/dromru/react-photoswipe-gallery/issues/17)
* test: add test case with stateful item ([69a7ff6](https://github.com/dromru/react-photoswipe-gallery/commit/69a7ff6))
* test: configure Jest, write some test cases ([a989e7f](https://github.com/dromru/react-photoswipe-gallery/commit/a989e7f)), closes [#7](https://github.com/dromru/react-photoswipe-gallery/issues/7)
* refactor: slightly change API, disable strictNullChecks ([554ea30](https://github.com/dromru/react-photoswipe-gallery/commit/554ea30))
* chore: add commitlint, commitizen ([e2d4741](https://github.com/dromru/react-photoswipe-gallery/commit/e2d4741))
* chore: add conventional-changelog ([770e713](https://github.com/dromru/react-photoswipe-gallery/commit/770e713)), closes [#11](https://github.com/dromru/react-photoswipe-gallery/issues/11)
* chore: move readme ([ebc40f4](https://github.com/dromru/react-photoswipe-gallery/commit/ebc40f4))
* chore: move readme ([133a51e](https://github.com/dromru/react-photoswipe-gallery/commit/133a51e))
* chore: rewrite with TypeScript, remove babel ([52432b9](https://github.com/dromru/react-photoswipe-gallery/commit/52432b9))
* feat: add ability to reuse existing layout (closes #9) ([e20240d](https://github.com/dromru/react-photoswipe-gallery/commit/e20240d)), closes [#9](https://github.com/dromru/react-photoswipe-gallery/issues/9)
* feat(dx): add Storybook ([48590b7](https://github.com/dromru/react-photoswipe-gallery/commit/48590b7))
* initial implementation ([e756c21](https://github.com/dromru/react-photoswipe-gallery/commit/e756c21))
* root ([3bc6218](https://github.com/dromru/react-photoswipe-gallery/commit/3bc6218))
* Update package.json ([6f8e9d9](https://github.com/dromru/react-photoswipe-gallery/commit/6f8e9d9))
