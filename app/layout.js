import './globals.css'

export const metadata = {
  title: 'Gastos FWV',
  description: 'Control de gastos familiar',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
