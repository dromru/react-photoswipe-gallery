# react-photoswipe-gallery

[![codecov](https://codecov.io/gh/dromru/react-photoswipe-gallery/branch/master/graph/badge.svg)](https://codecov.io/gh/dromru/react-photoswipe-gallery) [![npm](https://img.shields.io/npm/v/react-photoswipe-gallery.svg)](https://www.npmjs.com/package/react-photoswipe-gallery)

> A configurable and flexible React component wrapper around [PhotoSwipe](https://photoswipe.com/).

## Basic Usage

```javascript
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

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

`<Gallery />` component ships with default PhotoSwipeUI and Layout. Such a setup is suitable for most cases. If you want more control, jump to [advanced usage example](#advanced-usage).

## Demo

Check out [storybook](https://dromru.github.io/react-photoswipe-gallery/) with source code examples.

## Installation

```shell
yarn add photoswipe react-photoswipe-gallery
```

or

```shell
npm install photoswipe react-photoswipe-gallery --save
```

## Advanced Usage

If you want to customize PhotoSwipe [layout](https://photoswipe.com/documentation/getting-started.html#init-add-pswp-to-dom) or use your PhotoSwipe UI, you should take `<CustomGallery />` component.

We also provide configurable `<DefaultLayout />`. It's suitable for most cases, and provide props for configuring all captions and removing unneeded UI elements.

Also, if you have more than one gallery instance in your view, we recommend reusing `<Layout />` between several `<CustomGallery />`.

```javascript
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import { CustomGallery, Item, DefaultLayout } from 'react-photoswipe-gallery'

const MyGallery = () => {
  const layoutRef = useRef()

  return (
    <CustomGallery layoutRef={layoutRef} ui={PhotoswipeUIDefault}>
      {/*...*/}
    </CustomGallery>

    <CustomGallery layoutRef={layoutRef} ui={PhotoswipeUIDefault}>
      {/*...*/}
    </CustomGallery>

    <DefaultLayout
      shareButton={false}
      fullscreenButton={false}
      zoomButton={false}
      ref={layoutRef}
    />
  )
}
```

## Props

### Gallery

> You can pass any of `DefaultLayout` [props](#default-layout-props) to `Gallery`.

> All props are optional.

<a name="gallery-props"></a>

| Prop | Type | Description |
| - | - | - |
| `options` | Object | PhotoSwipe [options](https://photoswipe.com/documentation/options.html) |

### Item

> Should be children of the `Gallery`.

<a name="item-props"></a>

| Prop | Type | Required | Description |
| - | - | - | - |
| `children` | Function | ✓ | Render prop for exposing `Gallery` API |
| `original` | String |  | Url of original image |
| `thumbnail` | String |  | Url of thumbnail |
| `width` | Number or String |  | Width of original image |
| `height` | Number or String |  | Height of original image |
| `title` | String |  | Title for Default UI |
| `html` | String |  | Html content, if you need to use it as modal |

#### Note about Item's `children` render prop.

Item accepts only function as children.

```typescript
type RenderItem = (props: {
  ref: React.MutableRefObject; // required `ref` object to any html node of item
  open: () => void; // function that opens the gallery at the current item's index
}) => JSX.Element

<Item>
  {({ ref, open }) => (
    <img ref={ref} onClick={open} />
  ) as RenderItem}
</Item>

<Item>
  {({ ref, open }) => (
    <span ref={ref}>Open gallery</span>
  ) as RenderItem}
</Item>
```

### CustomGallery

<a name="item-props"></a>

| Prop | Type | Required | Description |
| - | - | - | - |
| `layoutRef` | React.MutableRefObject<HTMLElement> | ✓ | Ref to your layout element |
| `ui` | PhotoSwipeUI | ✓ | PhotoSwipe UI class |
| `options` | Object | | PhotoSwipe [options](https://photoswipe.com/documentation/options.html) |

### DefaultLayout

> All props are optional.

<a name="default-layout-props"></a>

| Prop | Type | Default | Description |
| - | - | - | - |
| `closeButtonCaption` | Object | 'Close (Esc)' | `.pswp__button--close` caption |
| `shareButtonCaption` | Object | 'Share' | `.pswp__button--share` caption |
| `toggleFullscreenButtonCaption` | Object | 'Toggle fullscreen' | `.pswp__button--fs` caption |
| `zoomButtonCaption` | Object | 'Zoom in/out' | `.pswp__button--zoom` caption |
| `prevButtonCaption` | Object | 'Previous (arrow left)' | `.pswp__button--arrow--left` caption |
| `nextButtonCaption` | Object | 'Next (arrow right)' | `.pswp__button--arrow--right` caption |
| `shareButton` | Boolean | `true` | Show `.pswp__button--share` |
| `fullscreenButton` | Boolean | `true` | Show `.pswp__button--fs` |
| `zoomButton` | Boolean | `true` | Show `.pswp__button--zoom` |

## Requirements

* react@16.8+
* [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) [polyfill](https://github.com/zloirock/core-js) for older browsers

## Development

```shell
yarn storybook
```
or
```shell
yarn start
```

## License

MIT
