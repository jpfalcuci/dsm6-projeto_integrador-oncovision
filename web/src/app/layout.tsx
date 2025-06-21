import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import { Provider } from '@/components/ui/provider'
import './globals.css'
import ClientLayout from './client-layout'

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'OncoVision - Breast Cancer Detection',
  description: 'Projeto Integrador DSM 6º Semestre',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${rubik.variable}`}>
        <Provider>
          <ClientLayout>{children}</ClientLayout>
        </Provider>
      </body>
    </html>
  )
}
