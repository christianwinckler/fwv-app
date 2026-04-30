import { google } from 'googleapis'

function getAuthClient() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

async function getSheets() {
  const auth = getAuthClient()
  return google.sheets({ version: 'v4', auth })
}

export async function getDetalle() {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Detalle!A:J',
  })
  return res.data.values || []
}

export async function addGasto(row) {
  const sheets = await getSheets()
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Detalle!A:K',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] }
  })
}

export async function updateGasto(rowIndex, row) {
  const sheets = await getSheets()
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.SHEET_ID,
    range: `Detalle!A${rowIndex}:K${rowIndex}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] }
  })
}

export async function deleteGasto(rowIndex) {
  const sheets = await getSheets()
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: 784446556,
            dimension: 'ROWS',
            startIndex: rowIndex - 1,
            endIndex: rowIndex
          }
        }
      }]
    }
  })
}

export async function getParametros() {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Parámetros!A:F',
  })
  return res.data.values || []
}

export async function getPresupuesto() {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Presupuesto!A:D',
  })
  return res.data.values || []
}

export async function moverGastosSubcat(oldSub, newSub) {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Detalle!C:C',
  })
  const values = res.data.values || []
  const updates = []
  values.forEach((row, idx) => {
    if (idx === 0) return
    if (row[0] && row[0].trim() === oldSub.trim()) {
      updates.push({
        range: `Detalle!C${idx + 1}`,
        values: [[newSub]]
      })
    }
  })
  if (updates.length === 0) return 0
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    requestBody: {
      valueInputOption: 'USER_ENTERED',
      data: updates
    }
  })
  return updates.length
}

export async function updateParametros(rows) {
  if (!rows || rows.length === 0) throw new Error('Rows vacío')
  const sheets = await getSheets()

  const existingRes = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Parámetros!A2:F500',
  })
  const existingMap = {}
  ;(existingRes.data.values || []).forEach(r => {
    const sub = (r[0] || '').trim()
    if (sub) existingMap[sub] = { estado: r[4] || '', frecuencia: r[5] || '' }
  })

  const rowsFinales = rows.map(r => {
    const sub = (r[0] || '').trim()
    const existing = existingMap[sub] || {}
    return [
      r[0] || '',
      r[1] || '',
      r[2] || '',
      r[3] || '',
      r[4] || existing.estado || '',
      r[5] || existing.frecuencia || '',
    ]
  })

  await sheets.spreadsheets.values.clear({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Parámetros!A2:F500',
  })

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Parámetros!A2',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: rowsFinales },
  })
}

export async function renameSubcatEnDetalle(oldSub, newSub) {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Detalle!C:C',
  })
  const values = res.data.values || []
  const updates = []
  values.forEach((row, idx) => {
    if (idx === 0) return
    if (row[0] && row[0].trim() === oldSub.trim()) {
      updates.push({
        range: `Detalle!C${idx + 1}`,
        values: [[newSub]]
      })
    }
  })
  if (updates.length === 0) return
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    requestBody: {
      valueInputOption: 'USER_ENTERED',
      data: updates
    }
  })
}

export async function updatePresupuesto(rows) {
  if (!rows || rows.length === 0) {
    throw new Error('No se puede guardar: el array de filas está vacío')
  }
  const sheets = await getSheets()
  await sheets.spreadsheets.values.clear({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Presupuesto!A2:D500',
  })
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Presupuesto!A2',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: rows }
  })
}

export async function getCuotas() {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Proyección Tarjeta Crédito!B7:L50',
  })
  return res.data.values || []
}

export async function addCuota(rowIndex, fields) {
  const sheets = await getSheets()
  const fila = rowIndex
  const dateSerial = Math.round(new Date(fields.fechaCompra).getTime() / 86400000) + 25569
  const row = [
    fields.item,
    dateSerial,
    fields.tarjeta,
    fields.montoTotal,
    fields.numeroCuotas,
    `=COUNTIF(Detalle!H:H,B${fila}&"*")`,
    `=IF(C${fila}<>"",EDATE(C${fila},1),"")`,
    `=IF(H${fila}<>"",EDATE(H${fila},1),"")`,
    fields.valorCuota,
    `=F${fila}-G${fila}`,
    `=J${fila}*K${fila}`,
  ]
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.SHEET_ID,
    range: `Proyección Tarjeta Crédito!B${fila}:L${fila}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] }
  })
}

export async function getLogsCuadratura() {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Logs Cuadratura!A:G',
  })
  return res.data.values || []
}

export async function addLogCuadratura(row) {
  const sheets = await getSheets()
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Logs Cuadratura!A:G',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] }
  })
}

export async function addGastoCuadratura(row) {
  const sheets = await getSheets()
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Detalle!A:K',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] }
  })
}

export async function getNextCuotaRow() {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Proyección Tarjeta Crédito!B7:B50',
  })
  const values = res.data.values || []
  for (let i = 5; i < values.length; i++) {
    if (!values[i] || !values[i][0]) return i + 7
  }
  return values.length + 7
}

export async function getMontoInicialTC() {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Parametros TC!B1:B2',
  })

  function parsearMonto(val) {
    if (!val) return 0
    const clean = String(val)
      .replace(/\$/g, '')
      .replace(/\s/g, '')
      .replace(/\./g, '')
      .replace(',', '.')
    return parseFloat(clean) || 0
  }

  const b1 = parsearMonto(res.data.values?.[0]?.[0])
  const b2 = parsearMonto(res.data.values?.[1]?.[0])
  return b1 + b2
}

export async function insertarFilasEnPosicion(rowIndex, rows) {
  const sheets = await getSheets()
  const sheetId = 784446556

  const startIndex0 = rowIndex - 1
  const endIndex0 = rowIndex

  const sheetMeta = await sheets.spreadsheets.get({
    spreadsheetId: process.env.SHEET_ID,
    fields: 'sheets.properties.gridProperties'
  })
  const totalRows = sheetMeta.data.sheets?.[0]?.properties?.gridProperties?.rowCount || 0

  if (startIndex0 >= totalRows) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.SHEET_ID,
      requestBody: {
        requests: [{
          appendDimension: { sheetId, dimension: 'ROWS', length: rows.length }
        }]
      }
    })
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    requestBody: {
      requests: [{
        deleteDimension: {
          range: { sheetId, dimension: 'ROWS', startIndex: startIndex0, endIndex: endIndex0 }
        }
      }]
    }
  })

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    requestBody: {
      requests: [{
        insertDimension: {
          range: { sheetId, dimension: 'ROWS', startIndex: startIndex0, endIndex: startIndex0 + rows.length },
          inheritFromBefore: false
        }
      }]
    }
  })

  const data = rows.map((row, i) => ({
    range: `Detalle!A${rowIndex + i}:K${rowIndex + i}`,
    values: [row]
  }))

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    requestBody: { valueInputOption: 'USER_ENTERED', data }
  })
}
