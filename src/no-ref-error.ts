export class NoRefError extends Error {
  constructor(msg: string = '') {
    super()

    this.message = `
    ${msg}
    No valid \`ref\` provided.
    You should use \`ref\` from render prop of Item component.
    Example:
    <Item>{({ ref }) => <div ref={ref}></div>}</Item>\n`
  }
}
