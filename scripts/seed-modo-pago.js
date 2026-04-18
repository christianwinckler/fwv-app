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

const MODO_POR_SUBCAT = {
  'Transferencias - Apoyo FVS': 'Transferencia',
  'TC - Tarjeta Internacional': 'Transferencia',
  'TC - Tarjeta Nacional': 'Transferencia',
  'Cuentas - Luz': 'Transferencia',
  'Cuentas - Telefonía': 'Transferencia',
  'Cuentas - Agua': 'Transferencia',
  'Cuentas - Gas': 'Transferencia',
  'Deportes - Liga Fútbol': 'Transferencia',
  'TC - Pago Nueva Tarjeta': 'Tarjeta Crédito',
  'TC - Pagos en Cuotas': 'Tarjeta Crédito',
  'Cuentas - Internet': 'Tarjeta Crédito',
  'Cuentas - Agua Maihue': 'Tarjeta Crédito',
  'Cuentas - Autopistas': 'Tarjeta Crédito',
  'Cuentas - Netflix': 'Tarjeta Crédito',
  'Cuentas - Bencina': 'Tarjeta Crédito',
  'Mascotas - Comidas': 'Tarjeta Crédito',
  'Mascotas - Arena': 'Tarjeta Crédito',
  'Mascotas - Snack': 'Tarjeta Crédito',
  'Supermercado - Compra Mensual': 'Tarjeta Crédito',
  'Supermercado - Compras Pequeñas': 'Tarjeta Crédito',
  'Supermercado - Leche Emmi': 'Tarjeta Crédito',
  'Supermercado - Feria': 'Tarjeta Crédito',
  'Salidas a Comer - FWV': 'Tarjeta Crédito',
  'Salidas a Comer - Javi': 'Tarjeta Crédito',
  'Salidas a Comer - Chris': 'Tarjeta Crédito',
  'Salidas a Comer - Snack': 'Tarjeta Crédito',
  'Panoramas - Salidas FWV': 'Tarjeta Crédito',
  'Mall - Familia': 'Tarjeta Crédito',
  'Mall - Cuidados personales Javi': 'Tarjeta Crédito',
  'Mall - Javi': 'Tarjeta Crédito',
  'Mall - Chris': 'Tarjeta Crédito',
  'Mall - Emma': 'Tarjeta Crédito',
  'Mall - Regalos Amigos/Familia': 'Tarjeta Crédito',
  'Mall - Construcción': 'Tarjeta Crédito',
  'Estacionamiento': 'Tarjeta Crédito',
  'Salud - Farmacia': 'Tarjeta Crédito',
  'Salud - Consultas Médicas Emma': 'Tarjeta Crédito',
  'Salud - Consultas Médicas Chris': 'Tarjeta Crédito',
  'Salud - Consultas Médicas Javi': 'Tarjeta Crédito',
  'Salud - Exámenes y Procedimientos': 'Tarjeta Crédito',
  'Salud - Control Brackets Javi': 'Tarjeta Crédito',
}

async function main() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Parámetros!A:D',
  })
  const rows = res.data.values || []
  if (rows.length === 0) { console.log('No hay filas en Parámetros'); return }

  const updates = []
  rows.forEach((row, i) => {
    if (i === 0) return // header
    const sub = (row[0] || '').trim()
    if (!sub) return
    const existingModo = (row[3] || '').trim()
    if (existingModo) return // ya tiene valor, no tocar

    // Check exact match first
    let modo = MODO_POR_SUBCAT[sub]

    // Fuzzy match for Psicólogo variants
    if (!modo && sub.toLowerCase().includes('psicólogo')) modo = 'Transferencia'
    if (!modo && sub.toLowerCase().includes('psicologo')) modo = 'Transferencia'

    if (modo) {
      updates.push({ range: `Parámetros!D${i + 1}`, values: [[modo]] })
      console.log(`  Fila ${i + 1}: "${sub}" → ${modo}`)
    }
  })

  if (updates.length === 0) {
    console.log('Nada que actualizar (todas las subcats ya tienen Modo de Pago o no están en la lista)')
    return
  }

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: {
      valueInputOption: 'USER_ENTERED',
      data: updates,
    },
  })

  console.log(`\nActualizadas ${updates.length} filas en la columna D de Parámetros.`)
}

main().catch(err => { console.error(err); process.exit(1) })
