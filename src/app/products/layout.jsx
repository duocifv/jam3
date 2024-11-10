import { Cart } from '@/components/Products/'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function ProductLayout({ children }) {
  return (
    <div className="flex max-w-[1300px] mx-auto">
      <div className="w-[840px]">
        <Cart />
        {children}
      </div>
    </div>
  )
}
