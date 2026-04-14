import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import AppClient from './AppClient'

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  return <AppClient user={session.user} />
}
