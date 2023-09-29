import ThemeSwitch from '@/src/components/ThemeSwitch'

export default function Header() {
  return (
    <header className="bg-slate-100 px-4 py-3 shadow shadow-black/30 transition-colors duration-500">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/">
          <h1 className="text-xl font-bold sm:text-2xl">📚 Bookstore</h1>
        </a>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
