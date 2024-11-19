import type { Metadata } from 'next'
import '@/styles/globals.css'
import ProviderClient from './ProviderClient'
import { ReactNode } from 'react'
import Sidebar from 'components/sidebar'
import Header from 'components/header'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      {/* <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head> */}
      <body>
        <ProviderClient>
          <Header />
          <div className="min-h-[100vh] max-w-[1200px] mx-auto flex">
            <Sidebar />
            <div className="bg-[#fff] p-8 min-w-[840px]">{children}</div>
          </div>
        </ProviderClient>
      </body>
    </html>
  )
}
