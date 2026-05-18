import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { getPanalesPorFecha, upsertPanales } from '@/lib/emmaService'

export async function GET(req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const { searchParams } = new URL(req.url)
    const fecha = searchParams.get('fecha')
    const data = await getPanalesPorFecha(fecha)
    return Response.json({ ok: true, ...data })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const { fecha, pipi, popo } = await req.json()
    await upsertPanales(fecha, { pipi, popo })
    return Response.json({ ok: true })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
