import { Camera } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 antialiased md:grid-cols-2">
      <div className="relative order-1 flex flex-col items-center justify-center md:order-2">
        <Outlet />
      </div>

      <div className="order-2 flex h-auto flex-col justify-between border-t border-foreground/5 bg-muted p-10 text-muted-foreground md:order-1 md:h-full md:border-r">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Camera className="h-5 w-5" />
          <span className="font-semibold">family.memories</span>
        </div>
        <footer className="mt-4 text-sm">
          &copy; family.memories - {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}
