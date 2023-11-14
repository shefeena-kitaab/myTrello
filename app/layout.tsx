import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'My Trello',
  description: 'created by Shefeena E S',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-[#F5F6F8]'>{children}</body>
    </html>
  )
}
