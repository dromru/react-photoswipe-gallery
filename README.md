# react-photoswipe-gallery

[![codecov](https://codecov.io/gh/dromru/react-photoswipe-gallery/branch/master/graph/badge.svg)](https://codecov.io/gh/dromru/react-photoswipe-gallery) [![npm](https://img.shields.io/npm/v/react-photoswipe-gallery.svg)](https://www.npmjs.com/package/react-photoswipe-gallery)

> A configurable and flexible React component wrapper around [PhotoSwipe](https://photoswipe.com/).

> ℹ️ **react-photoswipe-gallery v2 only works with PhotoSwipe v5 and above. Use [v1](https://github.com/dromru/react-photoswipe-gallery/tree/v1.3.10) for PhotoSwipe <= 4.**

## Basic Usage

```javascript
import 'photoswipe/dist/photoswipe.css'

import { Gallery, Item } from 'react-photoswipe-gallery'

const MyGallery = () => (
  <Gallery>
    <Item
      original="https://placekitten.com/1024/768?image=1"
      thumbnail="https://placekitten.com/80/60?image=1"
      width="1024"
      height="768"
    >
      {({ ref, open }) => (
        <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />
      )}
    </Item>
    <Item
      original="https://placekitten.com/1024/768?image=2"
      thumbnail="https://placekitten.com/80/60?image=2"
      width="1024"
      height="768"
    >
      {({ ref, open }) => (
        <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=2" />
      )}
    </Item>
  </Gallery>
)
```

## Demo

Check out the [Storybook](https://dromru.github.io/react-photoswipe-gallery/photoswipe-v5/) to see it in action 🚀

Stories are written as real-world examples, so you can see them at the bottom of Storybook UI in the Story tab. Or browse the [source code](https://github.com/dromru/react-photoswipe-gallery/tree/photoswipe-v5/src/storybook) on GitHub. It covers most of the use-cases and provides examples for configuration options.

## Installation

```shell
yarn add photoswipe react-photoswipe-gallery@next
```

or

```shell
npm install photoswipe react-photoswipe-gallery@next --save
```

## Hash Navigation

You should pass a unique `id` prop to `<Gallery />` component, to enable hash navigation.

Optionally, you can also pass the `id` to `<Item />` component. Otherwise, the index will be used.

```javascript
const MyGallery = () => (
  <Gallery id="my-gallery">
    <Item
      id="first-pic"
      {/*...*/}
    />
    <Item
      id="second-pic"
      {/*...*/}
    />
  </Gallery>
)
```

[Example](https://github.com/dromru/react-photoswipe-gallery/blob/photoswipe-v5/src/storybook/hash-navigation.stories.tsx)

## Captions

If you want to add captions to your slides, you need to pass `withDefaultCaption` prop to the `<Gallery />`
and pass `caption` prop to each `<Item />`. It accepts html as well. If `caption` isn't provided - it will use `alt` prop.

```javascript
const MyGallery = () => (
  <Gallery withDefaultCaption>
    <Item
      caption="Foo"
      {/*...*/}
    />
    <Item
      caption="Bar"
      {/*...*/}
    />
  </Gallery>
)
```

[Example](https://github.com/dromru/react-photoswipe-gallery/blob/photoswipe-v5/src/storybook/with-default-caption.stories.tsx)

## Plugins

You can use native PhotoSwipe plugins with `plugins` prop. It accepts the function in which you should register all of your plugins, providing `pswpLightbox` to the plugin constructor.

Example for [photoswipe-dynamic-caption-plugin](https://github.com/dimsemenov/photoswipe-dynamic-caption-plugin):

```javascript
import 'photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css'
import PhotoSwipeDynamicCaption from 'photoswipe-dynamic-caption-plugin'

const MyGallery = () => (
  <Gallery
      plugins={(pswpLightbox) => {
        // register plugin
        const captionPlugin = new PhotoSwipeDynamicCaption(pswpLightbox, {
          captionContent: (slide) => slide.data.alt,
        })

        // register another plugin
        // ...
      }}
  >
    {/*...*/}
  </Gallery>
)
```

[Example](https://github.com/dromru/react-photoswipe-gallery/blob/photoswipe-v5/src/storybook/with-default-caption.stories.tsx)

## Props

### Gallery

<a name="gallery-props"></a>

| Prop | Type | Required | Description |
| - | - | - | - |
| `id` | Number or String | ✓ (for hash navigation) | Item ID, for [hash navigation](#hash-navigation) |
| `options` | Object | | PhotoSwipe [options](https://photoswipe.com/options/) |
| `plugins` | Function | | Function for registering PhotoSwipe [plugins](#plugins). You should pass `photoswipeLightbox` to each plugin constructor ([example](https://github.com/dromru/react-photoswipe-gallery/blob/photoswipe-v5/src/storybook/plugins.stories.tsx)) |
| `onBeforeOpen` | Function | | Triggers before `PhotoSwipe.init()` call. Use it for something, that you need to do, before PhotoSwipe.init() call - for example, you can use it for [registration of custom UI elements](https://photoswipe.com/adding-ui-elements). It will receive PhotoSwipe instance as the first argument: `(photoswipe: PhotoSwipe) => void` |
| `onOpen` | Function | | Triggers after `PhotoSwipe.init()` call. Use it for accessing PhotoSwipe [API](https://photoswipe.com/methods/#photoswipe-core-methods). It will receive PhotoSwipe instance as the first argument: `(photoswipe: PhotoSwipe) => void` |
| `withDefaultCaption` | Boolean | ✓ (for default captions) | Enables built-in [caption](#captions) display. Use the `caption` prop of the Item component to control caption text ([example](https://github.com/dromru/react-photoswipe-gallery/blob/photoswipe-v5/src/storybook/with-default-caption.stories.tsx)) |
| `withDownloadButton` | Boolean | ✓ (for download button) | Adds UI control for downloading the original image of the current slide ([example](https://github.com/dromru/react-photoswipe-gallery/blob/photoswipe-v5/src/storybook/with-download-button.stories.tsx)) |

### Item

> Should be children of the `Gallery`.

<a name="item-props"></a>

| Prop | Type | Required | Description |
| - | - | - | - |
| `children` | Function | ✓ | Render prop for exposing `Gallery` API |
| `original` | String |  | Url of original image |
| `originalSrcset` | String |  | Srcset of original image ([example](https://github.com/dromru/react-photoswipe-gallery/blob/photoswipe-v5/src/storybook/srcset.stories.tsx)) |
| `thumbnail` | String |  | Url of thumbnail |
| `width` | Number or String |  | Width of original image |
| `height` | Number or String |  | Height of original image |
| `alt` | String |  | Alternate text for original image |
| `caption` | String |  | Text or html for caption ([example](https://github.com/dromru/react-photoswipe-gallery/blob/photoswipe-v5/src/storybook/with-default-caption.stories.tsx)) |
| `cropped` | Boolean |  | Thumbnail is cropped ([example](https://github.com/dromru/react-photoswipe-gallery/blob/photoswipe-v5/src/storybook/cropped.stories.tsx)) |
| `html` | String |  | Html content, if you need to use it as modal ([example](https://github.com/dromru/react-photoswipe-gallery/blob/photoswipe-v5/src/storybook/html.stories.tsx)) |
| `id` | Number or String |  | Item ID, for [hash navigation](#hash-navigation) ([example](https://github.com/dromru/react-photoswipe-gallery/blob/photoswipe-v5/src/storybook/hash-navigation.stories.tsx)) |

#### Note about Item's `children` render prop.

Item accepts only function as children.

```typescript
type RenderItem = (props: {
  /**
   * Required `ref` object to any html node of item
   *
   * Can be omitted if there is only one item in the gallery
   */
  ref: React.MutableRefObject;

  /**
   * Function that opens the gallery at the current item's index
   */
  open: () => void;
}) => JSX.Element

<Item>
  {({ ref, open }) => (
    <img ref={ref} onClick={open} />
  ) as RenderItem}
</Item>

<Item>
  {({ ref, open }) => (
    <span ref={ref} onClick={open}>Open gallery</span>
  ) as RenderItem}
</Item>
```

## Hooks

### `useGallery`

The `useGallery` hook returns an object with some useful methods.

| Property | Type | Description |
| - | - | - |
| `open` | (index: number) => void | This function allows programmatically open Photoswipe UI at `index`|



## Requirements

* react@16.8+
* [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) [polyfill](https://github.com/zloirock/core-js) for older browsers

## Development

```shell
yarn install
yarn pnpify --sdk
```
then
```shell
yarn storybook
```
or
```shell
yarn start
```

## License

MIT
