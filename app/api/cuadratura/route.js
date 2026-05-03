import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { addLogCuadratura, addGastoCuadratura, getDetalle } from '@/lib/sheetsService'

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const {
      banco,
      montoApp,
      montoBanco,
      estado,
      hacerAjuste,
    } = await request.json()

    const usuario = session.user.email
    const nombreUsuario = usuario === 'christian.winckler@gmail.com' ? 'Christian' : 'Javita'
    const fechaHoy = new Date().toISOString().slice(0, 10)
    const diferencia = montoApp - montoBanco

    const logRow = [
      fechaHoy,
      usuario,
      banco,
      montoApp,
      montoBanco,
      diferencia,
      estado,
    ]
    await addLogCuadratura(logRow)

    if (hacerAjuste && diferencia !== 0) {
      const detalle = await getDetalle()
      const N = detalle.length + 1

      const dateSerial = Math.round(new Date(fechaHoy).getTime() / 86400000) + 25569
      const esDev = diferencia < 0

      const fB = `=IF(A${N}<>"";CONCATENATE(IF(MONTH(A${N})<10;CONCATENATE("0";MONTH(A${N}));MONTH(A${N}));"-";YEAR(A${N}));"")`
      const fD = `=IFERROR(VLOOKUP(C${N};'Parámetros'!A:B;2;FALSE);"")`
      const fE = `=IF(G${N}<>"X";IFERROR(VLOOKUP(C${N};'Parámetros'!A:C;3;FALSE);"");IF(IFERROR(VLOOKUP(C${N};'Parámetros'!A:C;3;FALSE);"")="E";"I";"E"))`
      const fJ = `=IF(I${N}<>"";IF(E${N}="I";IF(I${N}>0;I${N};I${N}*-1);IF(E${N}="E";IF(I${N}<0;I${N};I${N}*-1)));0)`
      const fK = `=SUMIFS(Presupuesto!D:D;Presupuesto!A:A;B${N};Presupuesto!B:B;C${N})`

      const gastoRow = [
        dateSerial,
        fB,
        'Banco - Cuadratura Automática',
        fD,
        fE,
        banco,
        esDev ? 'X' : '',
        `Cuadratura con Banco - ${nombreUsuario}`,
        Math.abs(diferencia),
        fJ,
        fK,
      ]
      await addGastoCuadratura(gastoRow)
    }

    return Response.json({ ok: true })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
