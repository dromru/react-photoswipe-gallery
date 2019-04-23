# react-photoswipe-gallery

```javascript
import { Gallery, Item, PhotoswipeLayoutDefault } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

const items = [
  {
    src: 'https://placekitten.com/600/400',
    w: 600,
    h: 400,
  },
  {
    src: 'https://placekitten.com/1200/900',
    w: 1200,
    h: 900,
  },
]

<Gallery layout={PhotoswipeLayoutDefault}>
  {items.map(({ src, w, h }) => (<Item width={w} height={h} src={src} key={src} />))}
</Gallery>

<Gallery layout={PhotoswipeLayoutDefault}>
  {items.map(({ src, w, h }) => (
    <Item
      renderItem={({ imgRef, onClick }) => (
        <a key={src} href={src} onClick={onClick}>
          <img src={src} width="50" height="50" ref={imgRef} />
        </a>
      )}
      width={w}
      height={h}
      key={src}
      src={src}
    />
  ))}
</Gallery>
```