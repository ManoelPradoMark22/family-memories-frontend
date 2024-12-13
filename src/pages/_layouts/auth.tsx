import { Camera } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 antialiased">
      <div className="relative flex flex-col items-center justify-center order-1 md:order-2">
        <Outlet />
      </div>

      <div className="flex h-auto md:h-full flex-col justify-between border-t md:border-r border-foreground/5 bg-muted p-10 text-muted-foreground order-2 md:order-1">
        <div className="flex items-center gap-3 text-lg text-foreground">
          <Camera className="h-5 w-5" />
          <span className="font-semibold">family.memories</span>
        </div>
        <footer className="text-sm mt-4">
          &copy; family.memories - {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}