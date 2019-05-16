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
  {items.map(({ src, w, h }) => (
    <Item width={w} height={h} src={src} key={src}>
      {({ open, thumbRef }) => (
        <div onClick={open}>
          <img src={src} ref={thumbRef} />
        </div>
      )}
    </Item>
  ))}
</Gallery>
```