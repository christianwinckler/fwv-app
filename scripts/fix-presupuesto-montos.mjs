import { google } from 'googleapis'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => [l.split('=')[0].trim(), l.slice(l.indexOf('=') + 1).trim()])
)

const SHEET_ID = env.SHEET_ID
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: env.SERVICE_ACCOUNT_EMAIL,
    private_key: env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})
const sheets = google.sheets({ version: 'v4', auth })

function parseMonto(val) {
  if (val === undefined || val === null) return null
  const s = String(val).trim()
  if (s === '' || s === '-' || /^\$\s*-\s*$/.test(s) || /^\$?\s*-\s*$/.test(s)) return 0
  // Remove $, spaces, dots (thousands separator in CLP), commas
  const clean = s.replace(/\$/g, '').replace(/\s/g, '').replace(/\./g, '').replace(/,/g, '')
  if (clean === '' || clean === '-') return 0
  const num = Number(clean)
  return isNaN(num) ? null : num
}

const res = await sheets.spreadsheets.values.get({
  spreadsheetId: SHEET_ID,
  range: 'Presupuesto!A:D',
})
const rows = res.data.values || []

const data = []
let skipped = 0

rows.forEach((row, idx) => {
  if (idx === 0) return // header
  const raw = row[3]
  if (raw === undefined) return
  const trimmed = String(raw).trim()
  // Already a plain integer? skip
  if (/^\d+$/.test(trimmed)) return

  const num = parseMonto(raw)
  if (num === null) {
    console.log(`SKIP fila ${idx + 1}: '${trimmed}'`)
    skipped++
    return
  }
  data.push({ range: `Presupuesto!D${idx + 1}`, values: [[num]] })
})

console.log(`Total a actualizar: ${data.length}, omitidas: ${skipped}`)

// batchUpdate en chunks de 500
const CHUNK = 500
for (let i = 0; i < data.length; i += CHUNK) {
  const chunk = data.slice(i, i + CHUNK)
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: { valueInputOption: 'RAW', data: chunk },
  })
  console.log(`Actualizadas filas ${i + 1}–${Math.min(i + CHUNK, data.length)}`)
}

console.log('Listo.')
