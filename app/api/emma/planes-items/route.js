import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { getPlanesItems, addPlanItem, updatePlanItem, deletePlanItem } from '@/lib/emmaService'

export async function GET(req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const { searchParams } = new URL(req.url)
    const planId = searchParams.get('planId')
    const rows = await getPlanesItems()
    const filtered = planId ? rows.filter((row, i) => i > 0 && row[1] === planId) : rows
    return Response.json({ ok: true, rows: filtered })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const body = await req.json()
    const id = await addPlanItem(body)
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
    const { rowIndex, ...data } = body
    await updatePlanItem(rowIndex, data)
    return Response.json({ ok: true })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const { rowIndex } = await req.json()
    await deletePlanItem(rowIndex)
    return Response.json({ ok: true })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
