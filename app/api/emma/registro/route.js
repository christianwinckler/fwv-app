import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { getRegistroPorFecha, addRegistro, updateRegistro, findRegistroRow } from '@/lib/emmaService'

export async function GET(req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const { searchParams } = new URL(req.url)
    const fecha = searchParams.get('fecha')
    const rows = await getRegistroPorFecha(fecha)
    return Response.json({ ok: true, rows })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const body = await req.json()
    if (body.planItemId) {
      const rowIndex = await findRegistroRow(body.fecha, body.planItemId)
      if (rowIndex) {
        await updateRegistro(rowIndex, body)
        return Response.json({ ok: true, rowIndex })
      }
    }
    const id = await addRegistro(body)
    return Response.json({ ok: true, id })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function PUT(req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const body = await req.json()
    await updateRegistro(body.rowIndex, body)
    return Response.json({ ok: true })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
