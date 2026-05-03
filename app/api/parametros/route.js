import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { getParametros, updateParametros, renameSubcatEnDetalle,
  moverGastosSubcat, getMontoInicialTC, renameCatEnPresupuesto,
  renameSubcatEnPresupuesto } from '@/lib/sheetsService'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const [data, tcData] = await Promise.all([
      getParametros(),
      getMontoInicialTC(),
    ])
    return Response.json({ rows: data, montoInicialTC: tcData.total, montoInicialTCB1: tcData.b1, montoInicialTCB2: tcData.b2 })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function PUT(request) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const body = await request.json()
    if (body.move && body.move.oldSub && body.move.newSub) {
      await moverGastosSubcat(body.move.oldSub, body.move.newSub)
    }
    if (body.rename && body.rename.oldSub !== body.rename.newSub) {
      await renameSubcatEnDetalle(body.rename.oldSub, body.rename.newSub)
    }
    if (body.rename) {
      await renameSubcatEnPresupuesto(
        body.rename.oldSub,
        body.rename.newSub || body.rename.oldSub,
        body.rename.newCat || null
      )
    }
    if (body.renamecat) {
      await renameCatEnPresupuesto(body.renamecat.oldCat, body.renamecat.newCat)
    }
    if (body.rows) {
      await updateParametros(body.rows)
    }
    return Response.json({ ok: true })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
