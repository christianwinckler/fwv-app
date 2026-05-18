import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { getComidas, getRutinas, getPlanes, getPlanesItems } from '@/lib/emmaService'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const [comidas, rutinas, planes, planesItems] = await Promise.all([
      getComidas(),
      getRutinas(),
      getPlanes(),
      getPlanesItems(),
    ])
    return Response.json({ ok: true, comidas, rutinas, planes, planesItems })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
