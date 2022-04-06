# react-photoswipe-gallery

[![codecov](https://codecov.io/gh/dromru/react-photoswipe-gallery/branch/master/graph/badge.svg)](https://codecov.io/gh/dromru/react-photoswipe-gallery) [![npm](https://img.shields.io/npm/v/react-photoswipe-gallery.svg)](https://www.npmjs.com/package/react-photoswipe-gallery)

> A configurable and flexible React component wrapper around [PhotoSwipe](https://photoswipe.com/) ([v4 docs](https://github.com/dimsemenov/PhotoSwipe/tree/v4.1.3/website/documentation)).

> ℹ️ **react-photoswipe-gallery v2 only works with PhotoSwipe v5 and above. Use v1 for PhotoSwipe <= 4.**

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

Check out [storybook](https://dromru.github.io/react-photoswipe-gallery/photoswipe-v5/) with source code examples.

## Installation

```shell
yarn add photoswipe@dimsemenov/photoswipe#v5-beta react-photoswipe-gallery@next
```

or

```shell
npm install git://github.com/dimsemenov/photoswipe#v5-beta react-photoswipe-gallery@next --save
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

## Captions

If you want to add captions to your slides, you need to create the `<Caption />` component and pass it to the `<Gallery />`.

`<Caption />` component will receive `PhotoSwipe` instance as `photoswipe` prop, so you can make `<Caption />`'s content dynamic.

```javascript
const Caption = ({ photoswipe }) => (
  <div style={{
    position: 'absolute',
    bottom: '15px',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '6px',
    padding: '4px 10px',
    background: 'hsla(0, 0%, 100%, 0.7)'
  }}>
    <h4>Custom caption</h4>
    <p>Current slide number is {photoswipe.currIndex + 1}</p>
  </div>
)

const MyGallery = () => (
  <Gallery caption={Caption}>
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

## Props

### Gallery

<a name="gallery-props"></a>

| Prop | Type | Required | Description |
| - | - | - | - |
| `id` | Number or String | ✓ (for hash navigation) | Item ID, for hash navigation |
| `options` | Object | | PhotoSwipe [options](https://github.com/dimsemenov/PhotoSwipe/blob/v4.1.3/website/documentation/options.md) |
| `onOpen` | Function | | Triggers after `PhotoSwipe.init()` call. Use it for accessing PhotoSwipe [API](https://github.com/dimsemenov/PhotoSwipe/blob/v4.1.3/website/documentation/api.md). It will receive PhotoSwipe instance as the first argument: `(photoswipe: PhotoSwipe) => void` |

### Item

> Should be children of the `Gallery`.

<a name="item-props"></a>

| Prop | Type | Required | Description |
| - | - | - | - |
| `children` | Function | ✓ | Render prop for exposing `Gallery` API |
| `original` | String |  | Url of original image |
| `originalSrcset` | String |  | Srcset of original image |
| `thumbnail` | String |  | Url of thumbnail |
| `width` | Number or String |  | Width of original image |
| `height` | Number or String |  | Height of original image |
| `alt` | String |  | Alternate text for original image |
| `cropped` | Boolean |  | Thumbnail is cropped |
| `title` | String |  | Title for Default UI |
| `html` | String |  | Html content, if you need to use it as modal |
| `id` | Number or String |  | Item ID, for hash navigation |

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

### Gallery

<a name="gallery-props"></a>

| Prop | Type | Required | Description |
| - | - | - | - |
| `layoutRef` | React.MutableRefObject<HTMLElement> | ✓ | Ref to your layout element |
| `ui` | PhotoSwipeUI | ✓ | PhotoSwipe UI class |
| `id` | Number or String | ✓ (for hash navigation) | Item ID, for hash navigation |
| `options` | Object | | PhotoSwipe [options](https://github.com/dimsemenov/PhotoSwipe/blob/v4.1.3/website/documentation/options.md) |
| `onOpen` | Function | | Triggers after `PhotoSwipe.init()` call. Use it for accessing PhotoSwipe [API](https://github.com/dimsemenov/PhotoSwipe/blob/v4.1.3/website/documentation/api.md). It will receive PhotoSwipe instance as the first argument: `(photoswipe: PhotoSwipe) => void` |

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
