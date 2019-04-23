# react-photoswipe-gallery

```javascript
import { Gallery, Item, PhotoswipeLayoutDefault } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

const items = [
  {
    large: 'https://placekitten.com/1024/768?image=1',
    thumb: 'https://placekitten.com/80/60?image=1',
    w: 1024,
    h: 768,
  },
  {
    large: 'https://placekitten.com/1024/768?image=2',
    thumb: 'https://placekitten.com/80/60?image=2',
    w: 1024,
    h: 768,
  },
  {
    large: 'https://placekitten.com/1024/768?image=3',
    thumb: 'https://placekitten.com/80/60?image=3',
    w: 1024,
    h: 768,
  },
]

<Gallery layout={PhotoswipeLayoutDefault}>
  {items.map(({ large, thumb, w, h }, i) => (
    <Item width={w} height={h} full={large} thumb={thumb} key={large} title={`Kitten ${i}`}>
      {({ open, thumbRef }) => (
        <img onClick={open} src={src} ref={thumbRef} />
      )}
    </Item>
  ))}
</Gallery>
```