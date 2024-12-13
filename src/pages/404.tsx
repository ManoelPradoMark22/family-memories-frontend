import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="text-accent-foreground">
        Go to{' '}
        <Link
          to="/"
          className="text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
        >
          Home
        </Link>
      </p>
    </div>
  )
}
