import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const ALLOWED_EMAILS = [
  'christian.winckler@gmail.com',        // ← reemplaza con tu email
  'ja.valenzuelas99@gmail.com'     // ← reemplaza con el email de tu pareja
]

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user }) {
      return ALLOWED_EMAILS.includes(user.email)
    },
    async session({ session, token }) {
      session.user.email = token.email
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }