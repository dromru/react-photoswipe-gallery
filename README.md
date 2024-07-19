# react-photoswipe-gallery

[![codecov](https://codecov.io/gh/dromru/react-photoswipe-gallery/branch/master/graph/badge.svg)](https://codecov.io/gh/dromru/react-photoswipe-gallery) [![npm](https://img.shields.io/npm/v/react-photoswipe-gallery.svg)](https://www.npmjs.com/package/react-photoswipe-gallery)

> A configurable and flexible React component wrapper around [PhotoSwipe](https://photoswipe.com/). \
> \
> ℹ️ Current version of react-photoswipe-gallery is compatible with PhotoSwipe v5. \
> **If you need PhotoSwipe v4, use [react-photoswipe-gallery v1](https://github.com/dromru/react-photoswipe-gallery/tree/v1.3.11).**

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

Check out the [Storybook](https://dromru.github.io/react-photoswipe-gallery/) to see it in action 🚀

Stories are written as real-world examples, so you can see them at the bottom of Storybook UI in the Story tab. Or browse the [source code](https://github.com/dromru/react-photoswipe-gallery/tree/master/src/storybook) on GitHub. It covers most of the use-cases and provides examples for configuration options.

## Installation

```shell
yarn add photoswipe react-photoswipe-gallery
```

or

```shell
npm install photoswipe react-photoswipe-gallery --save
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

[Example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/hash-navigation.stories.tsx)

## Captions

If you want to add captions to your slides, you need to pass `withCaption` prop to the `<Gallery />`
and pass `caption` prop to each `<Item />`. It accepts html as well. If `caption` isn't provided - it will use `alt` prop.

```javascript
const MyGallery = () => (
  <Gallery withCaption>
    <Item
      caption="Foo"
      {/*...*/}
    />
    <Item
      alt="Bar"
      {/*...*/}
    />
  </Gallery>
)
```

[Example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/with-caption.stories.tsx)

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

[Example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/plugins.stories.tsx)

## Custom UI Elements

You can [add custom UI elements to PhotoSwipe](https://photoswipe.com/adding-ui-elements/) with `uiElements` prop. It accepts an array of configuration objects for custom UI elements.

```javascript
const uiElements = [
  // add custom UI element
  {
    name: 'custom-button',
    ariaLabel: 'Custom button',
    order: 9,
    isButton: true,
    html: {
      isCustomSVG: true,
      inner:
        '<path d="<ICON_PATH>" id="pswp__icn-cstm-btn"/>',
      outlineID: 'pswp__icn-cstm-btn',
    },
    appendTo: 'bar',
    onInit: (el, pswpInstance) => {
      // do something on UI element's init event
    },
    onClick: (e, el, pswpInstance) => {
      // do something on UI element's click event
    },
  },

  // add another custom UI element
  // ...
]

const MyGallery = () => (
  <Gallery uiElements={uiElements}>
    {/*...*/}
  </Gallery>
)
```

[Example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/rotate-slide-button.stories.tsx)

## Custom slide content

You can add your own custom slide content with `content` and `html` props.

```javascript
const MyGallery = () => (
  <Gallery>
    <Item
      content={<h1>Hi!</h1>}
      {/*...*/}
    />
    <Item
      html="<h1>Hi!</h1>"
      {/*...*/}
    />
  </Gallery>
)
```

[Example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/custom-content.stories.tsx)

## Access to Photoswipe instance

If you need to get access to Photoswipe instance (for example, to subscribe on [Photoswipe events](https://photoswipe.com/events/) or call some [Photoswipe method](https://photoswipe.com/methods/)),
you can do it via `onOpen` and `onBeforeOpen` props of `Gallery` component.

`onBeforeOpen` triggers before `PhotoSwipe.init()` call.

`onOpen` triggers after `PhotoSwipe.init()` call.

`onBeforeOpen` and `onOpen` will receive PhotoSwipe instance as the first argument.

```javascript
const onBeforeOpen = (pswpInstance) => {
  pswpInstance.on('change', () => {
    console.log('slide was changed')
  })
}

const onOpen = (pswpInstance) => {
  pswpInstance.currSlide.zoomTo(
    1,
    { x: 0, y: 0 },
    2000,
    false
  )
}

const MyGallery = () => (
  <Gallery onBeforeOpen={onBeforeOpen} onOpen={onOpen}>
    {/*...*/}
  </Gallery>
)
```

## Photoswipe customization

If you need to customize [Photoswipe options](https://photoswipe.com/options/) or [Photoswipe styling](https://photoswipe.com/styling/)
you can do it via `options` prop of `Gallery` component.

```javascript
const options = {
  arrowPrev: false,
  arrowNext: false,
  zoom: false,
  close: false,
  counter: false,
  bgOpacity: 0.2,
  padding: { top: 20, bottom: 40, left: 100, right: 100 },
}

const MyGallery = () => (
  <Gallery options={options}>
    {/*...*/}
  </Gallery>
)
```

## Props

### Gallery

<a name="gallery-props"></a>

| Prop | Type | Required | Description |
| - | - | - | - |
| `id` | Number or String | ✓ (for hash navigation) | Item ID, for [hash navigation](#hash-navigation) |
| `options` | Object | | Object containing PhotoSwipe [options](https://photoswipe.com/options/) and [styling](https://photoswipe.com/styling/) properties |
| `plugins` | Function | | Function for registering PhotoSwipe [plugins](#plugins). You should pass `photoswipeLightbox` to each plugin constructor ([example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/plugins.stories.tsx)) |
| `uiElements` | Array | | Array of configuration objects for [custom UI elements](#custom-ui-elements). Use it for [adding custom UI elements](https://photoswipe.com/adding-ui-elements/) ([example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/rotate-slide-button.stories.tsx)) |
| `onBeforeOpen` | Function | | Triggers before `PhotoSwipe.init()` call. Use it for accessing PhotoSwipe [API](https://photoswipe.com/methods/#photoswipe-core-methods). It will receive PhotoSwipe instance as the first argument: `(photoswipe: PhotoSwipe) => void` |
| `onOpen` | Function | | Triggers after `PhotoSwipe.init()` call. Use it for accessing PhotoSwipe [API](https://photoswipe.com/methods/#photoswipe-core-methods). It will receive PhotoSwipe instance as the first argument: `(photoswipe: PhotoSwipe) => void` |
| `withCaption` | Boolean | ✓ (for default captions) | Enables built-in [caption](#captions) display. Use the `caption` prop of the Item component to control caption text ([example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/with-default-caption.stories.tsx)) |
| `withDownloadButton` | Boolean | ✓ (for download button) | Adds UI control for downloading the original image of the current slide ([example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/with-download-button.stories.tsx)) |

### Item

> Should be children of the `Gallery`.

<a name="item-props"></a>

| Prop | Type | Required | Description |
| - | - | - | - |
| `children` | Function | ✓ | Render prop for exposing `Gallery` API |
| `original` | String |  | Url of original image |
| `originalSrcset` | String |  | Srcset of original image ([example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/srcset.stories.tsx)) |
| `thumbnail` | String |  | Url of thumbnail |
| `width` | Number or String |  | Width of original image |
| `height` | Number or String |  | Height of original image |
| `alt` | String |  | Alternate text for original image |
| `caption` | String |  | Text or html for caption ([example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/with-default-caption.stories.tsx)) |
| `cropped` | Boolean |  | Thumbnail is cropped ([example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/cropped.stories.tsx)) |
| `content` | ReactElement |  | [Custom slide content](#custom-slide-content) ([example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/custom-content.stories.tsx)) |
| `html` | String |  | [Custom slide content](#custom-slide-content) (raw html) ([example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/custom-content.stories.tsx)) |
| `id` | Number or String |  | Item ID, for [hash navigation](#hash-navigation) ([example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/hash-navigation.stories.tsx)) |

#### Note about Item's `children` render prop

Item accepts only function as children.

```typescript
export interface ChildrenFnProps<NodeType extends HTMLElement> {
  /**
   * Ref callback to any html node of item.
   * It must be set to HTML Element in order to work.
   * Can be done like usual ref: ref={ref}
   * or callback-way if you need extra work done with node:
   * ref={(node) => {
   *   ref(node)
   *   ...
   * }}
   */
  ref: (node: NodeType | null) => void

  /**
   * Function that opens the gallery at the current item
   */
  open: (e: MouseEvent) => void
}

<Item>
  {({ ref, open }) => (
    <img ref={ref} onClick={open} />
  )}
</Item>

<Item>
  {({ ref, open }) => (
    <span
      ref={(node) => {
        ref(node)
        console.log(node)
      }}
      onClick={open}
    >
      Open gallery
    </span>
  )}
</Item>
```

## Hooks

### `useGallery`

The `useGallery` hook returns an object with some useful methods.

| Property | Type | Description |
| - | - | - |
| `open` | (index: number) => void | This function allows programmatically open Photoswipe UI at `index`|

`useGallery` hook gets context provided by `Gallery` component.
So to use `useGallery` hook you need to store your gallery content as separate component and then wrap it into `Gallery` component.

```javascript
const GalleryContent = () => {
  const { open } = useGallery()

  useEffect(() => {
      open(1) // you can open second slide by calling open(1) in useEffect
  }, [open])

  return (
    <div>
      {/* or you can open second slide on button click */}
      <button onClick={() => open(1)}>Open second slide</button>
      <div>
        <Item>...</Item>
        <Item>...</Item>
        <Item>...</Item>
      </div>
    </div>
  )
}

const MyGallery = () => {
  return (
    {/* Gallery component provides context for useGallery hook used in GalleryContent */}
    <Gallery>
      <GalleryContent />
    </Gallery>
  )
}
```

[Example](https://github.com/dromru/react-photoswipe-gallery/blob/master/src/storybook/playground.stories.tsx)

## Requirements

* react@16.8+
* [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) [polyfill](https://github.com/zloirock/core-js) for older browsers

## Development

```shell
yarn install
yarn sdks vscode
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
