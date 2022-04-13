export class NoRefError extends Error {
  /* istanbul ignore next */
  message = `No valid \`ref\` provided.
You shuld use \`ref\` from render prop of Item component.
Example:
<Item>{({ ref }) => <div ref={ref}></div>}</Item>\n`
}
