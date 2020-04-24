# react-photoswipe-gallery

[![codecov](https://codecov.io/gh/dromru/react-photoswipe-gallery/branch/master/graph/badge.svg)](https://codecov.io/gh/dromru/react-photoswipe-gallery) [![npm](https://img.shields.io/npm/v/react-photoswipe-gallery.svg)](https://www.npmjs.com/package/react-photoswipe-gallery)

```javascript
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

const items = [
  {
    original: 'https://placekitten.com/1024/768?image=1',
    thumbnail: 'https://placekitten.com/80/60?image=1',
    width: 1024,
    height: 768,
  },
  {
    original: 'https://placekitten.com/1024/768?image=2',
    thumbnail: 'https://placekitten.com/80/60?image=2',
    width: 1024,
    height: 768,
  },
  {
    original: 'https://placekitten.com/1024/768?image=3',
    thumbnail: 'https://placekitten.com/80/60?image=3',
    width: 1024,
    height: 768,
  },
]

const MyGallery = () => (
  <Gallery>
    {items.map(({ original, thumbnail, width, height }, index) => (
      <Item
        key={original}
        original={original}
        thumbnail={thumbnail}
        width={width}
        height={height}
        title={`Kitten ${i}`}
      >
        {({ ref, open }) => (
          <img onClick={open} src={thumbnail} ref={ref} />
        )}
      </Item>
    ))}
  </Gallery>
)
```

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
