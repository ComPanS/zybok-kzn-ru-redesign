import { load } from 'cheerio'
import { writeFile } from 'node:fs/promises'

const urls = [
  'http://zybok-kzn.ru/prays_list.html',
  'http://zybok-kzn.ru/prays_list/ortopedicheskie_uslugi.html',
  'http://zybok-kzn.ru/prays_list/hirurgiya.html',
  'http://zybok-kzn.ru/prays_list/terapiya.html',
]
const clean = (text) => text.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
const output = []
for (const url of urls) {
  const html = await (await fetch(url)).text()
  const $ = load(html)
  const main = $('.alllist').first()
  const tables = []
  main.find('table').each((tableIndex, table) => {
    const rows = []
    $(table).find('tr').each((_, row) => {
      const cells = $(row).find('th,td').map((__, cell) => clean($(cell).text())).get()
      if (cells.some(Boolean)) rows.push(cells)
    })
    if (rows.length) tables.push({
      tableIndex,
      previousHeading: clean($(table).prevAll('h1,h2,h3,h4,p,strong').first().text()),
      rows,
    })
  })
  output.push({
    url,
    title: clean(main.find('h1').first().text()),
    outline: main.find('h1,h2,h3,h4,p').map((_, node) => ({ tag: node.tagName, text: clean($(node).text()) })).get().filter((x) => x.text),
    tables,
  })
}
await writeFile('source-prices.json', JSON.stringify(output, null, 2), 'utf8')
console.log(output.map((page) => `${page.url}: ${page.tables.length} tables / ${page.tables.reduce((n, table) => n + table.rows.length, 0)} rows`).join('\n'))
