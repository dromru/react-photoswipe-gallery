# react-photoswipe-gallery

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
        {({ open, thumbnailRef }) => (
          <img onClick={open} src={thumbnail} ref={thumbnailRef} />
        )}
      </Item>
    ))}
  </Gallery>
)
```

```javascript
import { Gallery, Item, DefaultLayout } from 'react-photoswipe-gallery'

const MyGallery = () => {
  const layoutRef = useRef()

  return (
    <Gallery layoutRef={layoutRef}>
      {/*...*/}
    </Gallery>

    <Gallery layoutRef={layoutRef}>
      {/*...*/}
    </Gallery>

    <DefaultLayout
      shareButton={false}
      fullscreenButton={false}
      zoomButton={false}
      ref={layoutRef}
    />
  )
}
```
