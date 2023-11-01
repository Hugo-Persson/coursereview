import parse from "html-react-parser"

export function parseHTML(html: string): string | JSX.Element | JSX.Element[] {
  return parse(html)
}
