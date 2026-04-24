import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { getDetalle, addGasto } from '@/lib/sheetsService'

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) return Response.json({ error: 'No autorizado' }, { status: 401 })
  try {
    const { fecha, item, cuotaNum, cuotasTotales, valorCuota } = await request.json()

    const detalle = await getDetalle()
    const N = detalle.length + 1

    const dateSerial = Math.round(new Date(fecha).getTime() / 86400000) + 25569
    const descripcion = `${item} - Cuota ${cuotaNum} de ${cuotasTotales}`

    const row = [
      dateSerial,
      `=IF(A${N}<>"",(CONCATENATE(IF(MONTH(A${N})<10,CONCATENATE("0",MONTH(A${N})),MONTH(A${N})),"-",YEAR(A${N}))),"")`,
      'TC - Pagos en Cuotas',
      `=IFERROR(VLOOKUP(C${N},'Parámetros'!A:B,2,FALSE),"")`,
      `=IF(G${N}<>"X",IFERROR(VLOOKUP(C${N},'Parámetros'!A:C,3,FALSE),""),IF(IFERROR(VLOOKUP(C${N},'Parámetros'!A:C,3,FALSE),"")="E","I","E"))`,
      'Tarjeta Crédito',
      '',
      descripcion,
      valorCuota,
      `=IF(I${N}<>"",IF(E${N}="I",IF(I${N}>0,I${N},I${N}*-1),IF(E${N}="E",IF(I${N}<0,I${N},I${N}*-1))),0)`,
      `=SUMIFS(Presupuesto!D:D,Presupuesto!A:A,B${N},Presupuesto!B:B,C${N})`,
    ]

    await addGasto(row)
    return Response.json({ ok: true })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
