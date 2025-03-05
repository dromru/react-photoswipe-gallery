export class NoSourceIdError extends Error {
  constructor(msg: string = '') {
    super()

    this.message = `
    ${msg}\n
    No \`sourceId\` provided.
    You should add \`sourceId\` prop to Item component during using \`dataSource\` prop at Gallery component.
    Also you should add \`sourceId\` property to each item of \`dataSource\` array at Gallery component.
    Example:
    <Gallery dataSource={[{sourceId: 1, src: 'a.jpg'}]}>
        <Item sourceId={1}>{({ ref }) => <div ref={ref}></div>}</Item>
    </Gallery>\n`
  }
}
