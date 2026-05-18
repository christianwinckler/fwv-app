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

async function getSheetsClient() {
  const auth = getAuthClient()
  return google.sheets({ version: 'v4', auth })
}

const SHEET_ID = () => process.env.EMMA_SHEET_ID

async function getNextId(sheets, tab) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: `${tab}!A:A`,
  })
  const vals = res.data.values || []
  const ids = vals.slice(1).map(r => parseInt(r[0])).filter(n => !isNaN(n))
  return ids.length ? Math.max(...ids) + 1 : 1
}

// ════════════════════════════════════════
// COMIDAS
// Columnas: ID | Nombre | Categoría | Tamaño | Unidad | Emoji | Activo
// ════════════════════════════════════════

export async function getComidas() {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'Comidas!A:G',
  })
  return res.data.values || []
}

export async function addComida({ nombre, categoria, tamano, unidad, emoji, activo = true }) {
  const sheets = await getSheetsClient()
  const id = await getNextId(sheets, 'Comidas')
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: 'Comidas!A:G',
    valueInputOption: 'RAW',
    requestBody: { values: [[id, nombre, categoria, tamano, unidad, emoji, activo]] }
  })
  return id
}

export async function updateComida(rowIndex, { nombre, categoria, tamano, unidad, emoji, activo }) {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: `Comidas!A${rowIndex}`,
  })
  const id = res.data.values?.[0]?.[0] || rowIndex - 1
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID(),
    range: `Comidas!A${rowIndex}:G${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: { values: [[id, nombre, categoria, tamano, unidad, emoji, activo]] }
  })
}

export async function deleteComida(rowIndex) {
  const sheets = await getSheetsClient()
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID() })
  const tab = meta.data.sheets.find(s => s.properties.title === 'Comidas')
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID(),
    requestBody: {
      requests: [{
        deleteDimension: {
          range: { sheetId: tab.properties.sheetId, dimension: 'ROWS', startIndex: rowIndex - 1, endIndex: rowIndex }
        }
      }]
    }
  })
}

// ════════════════════════════════════════
// RUTINAS
// Columnas: ID | Nombre | Descripción | Emoji | Tipo | Activo
// ════════════════════════════════════════

export async function getRutinas() {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'Rutinas!A:F',
  })
  return res.data.values || []
}

export async function addRutina({ nombre, descripcion, emoji, tipo, activo = true }) {
  const sheets = await getSheetsClient()
  const id = await getNextId(sheets, 'Rutinas')
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: 'Rutinas!A:F',
    valueInputOption: 'RAW',
    requestBody: { values: [[id, nombre, descripcion, emoji, tipo, activo]] }
  })
  return id
}

export async function updateRutina(rowIndex, { nombre, descripcion, emoji, tipo, activo }) {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: `Rutinas!A${rowIndex}`,
  })
  const id = res.data.values?.[0]?.[0] || rowIndex - 1
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID(),
    range: `Rutinas!A${rowIndex}:F${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: { values: [[id, nombre, descripcion, emoji, tipo, activo]] }
  })
}

export async function deleteRutina(rowIndex) {
  const sheets = await getSheetsClient()
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID() })
  const tab = meta.data.sheets.find(s => s.properties.title === 'Rutinas')
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID(),
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: tab.properties.sheetId,
            dimension: 'ROWS',
            startIndex: rowIndex - 1,
            endIndex: rowIndex
          }
        }
      }]
    }
  })
}

// ════════════════════════════════════════
// PLANES
// Columnas: ID | Nombre | Activo | FechaCreación
// ════════════════════════════════════════

export async function getPlanes() {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'Planes!A:D',
  })
  return res.data.values || []
}

export async function addPlan({ nombre }) {
  const sheets = await getSheetsClient()
  const id = await getNextId(sheets, 'Planes')
  const fecha = new Date().toISOString().slice(0, 10)
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: 'Planes!A:D',
    valueInputOption: 'RAW',
    requestBody: { values: [[id, nombre, false, fecha]] }
  })
  return id
}

export async function updatePlan(rowIndex, { nombre, activo }) {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: `Planes!A${rowIndex}:D${rowIndex}`,
  })
  const row = res.data.values?.[0] || []
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID(),
    range: `Planes!A${rowIndex}:D${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: { values: [[row[0], nombre ?? row[1], activo ?? row[2], row[3]]] }
  })
}

export async function activarPlan(planId) {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'Planes!A:D',
  })
  const rows = res.data.values || []
  const updates = rows.slice(1).map((row, i) => ({
    range: `Planes!C${i + 2}`,
    values: [[String(row[0]) === String(planId) ? true : false]]
  }))
  if (!updates.length) return
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SHEET_ID(),
    requestBody: { valueInputOption: 'RAW', data: updates }
  })
}

// ════════════════════════════════════════
// PLANES ITEMS
// Columnas: ID|PlanID|Tipo|ReferenciaID|Nombre|Emoji|Categoría|Etiqueta|Hora|Min|Flexible|Orden
// ════════════════════════════════════════

export async function getPlanesItems() {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'PlanesItems!A:L',
  })
  return res.data.values || []
}

export async function addPlanItem({
  planId, tipo, referenciaId, nombre, emoji,
  categoria, etiqueta = '', hora, min, flexible, orden
}) {
  const sheets = await getSheetsClient()
  const id = await getNextId(sheets, 'PlanesItems')
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: 'PlanesItems!A:L',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[id, planId, tipo, referenciaId, nombre, emoji,
                categoria, etiqueta, hora, min, flexible, orden]]
    }
  })
  return id
}

export async function updatePlanItem(rowIndex, {
  planId, tipo, referenciaId, nombre, emoji,
  categoria, etiqueta, hora, min, flexible, orden
}) {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: `PlanesItems!A${rowIndex}`,
  })
  const id = res.data.values?.[0]?.[0] || rowIndex - 1
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID(),
    range: `PlanesItems!A${rowIndex}:L${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[id, planId, tipo, referenciaId, nombre, emoji,
                categoria, etiqueta, hora, min, flexible, orden]]
    }
  })
}

export async function deletePlanItem(rowIndex) {
  const sheets = await getSheetsClient()
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID() })
  const tab = meta.data.sheets.find(s => s.properties.title === 'PlanesItems')
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID(),
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: tab.properties.sheetId,
            dimension: 'ROWS',
            startIndex: rowIndex - 1,
            endIndex: rowIndex
          }
        }
      }]
    }
  })
}

// ════════════════════════════════════════
// REGISTRO DIARIO
// Columnas: ID|Fecha|TipoRegistro|Hora|Cantidad|Unidad|Estado|SolidoNombre|Nota|FechaHoraRegistro|PlanItemID
// ════════════════════════════════════════

export async function getRegistroDiario() {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'RegistroDiario!A:K',
  })
  return res.data.values || []
}

export async function getRegistroPorFecha(fecha) {
  const all = await getRegistroDiario()
  return all.filter((row, i) => i > 0 && row[1] === fecha)
}

export async function addRegistro({
  fecha, tipoRegistro, hora = '', cantidad, unidad = '',
  estado, solidoNombre = '', nota = '', planItemId = ''
}) {
  const sheets = await getSheetsClient()
  const id = await getNextId(sheets, 'RegistroDiario')
  const fechaHoraRegistro = new Date().toISOString().replace('T', ' ').slice(0, 19)
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: 'RegistroDiario!A:K',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        id, fecha, tipoRegistro, hora, cantidad, unidad,
        estado, solidoNombre, nota, fechaHoraRegistro, planItemId
      ]]
    }
  })
  return id
}

export async function updateRegistro(rowIndex, {
  fecha, tipoRegistro, hora, cantidad, unidad,
  estado, solidoNombre, nota, planItemId
}) {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: `RegistroDiario!A${rowIndex}:K${rowIndex}`,
  })
  const row = res.data.values?.[0] || []
  const fechaHoraRegistro = new Date().toISOString().replace('T', ' ').slice(0, 19)
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID(),
    range: `RegistroDiario!A${rowIndex}:K${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        row[0],
        fecha        ?? row[1],
        tipoRegistro ?? row[2],
        hora         ?? row[3],
        cantidad     ?? row[4],
        unidad       ?? row[5],
        estado       ?? row[6],
        solidoNombre ?? row[7],
        nota         ?? row[8],
        fechaHoraRegistro,
        planItemId   ?? row[10]
      ]]
    }
  })
}

export async function findRegistroRow(fecha, planItemId) {
  const all = await getRegistroDiario()
  const idx = all.findIndex(
    (row, i) => i > 0 && row[1] === fecha && String(row[10]) === String(planItemId)
  )
  return idx > 0 ? idx + 1 : null
}

// ════════════════════════════════════════
// PAÑALES
// Columnas: Fecha | Pipí | Popó
// ════════════════════════════════════════

export async function getPanales() {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'Pañales!A:C',
  })
  return res.data.values || []
}

export async function getPanalesPorFecha(fecha) {
  const all = await getPanales()
  const row = all.find((r, i) => i > 0 && r[0] === fecha)
  return row ? { pipi: parseInt(row[1]) || 0, popo: parseInt(row[2]) || 0 } : { pipi: 0, popo: 0 }
}

export async function upsertPanales(fecha, { pipi, popo }) {
  const sheets = await getSheetsClient()
  const all = await getPanales()
  const rowIdx = all.findIndex((r, i) => i > 0 && r[0] === fecha)
  if (rowIdx > 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID(),
      range: `Pañales!A${rowIdx + 1}:C${rowIdx + 1}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[fecha, pipi, popo]] }
    })
  } else {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID(),
      range: 'Pañales!A:C',
      valueInputOption: 'RAW',
      requestBody: { values: [[fecha, pipi, popo]] }
    })
  }
}
