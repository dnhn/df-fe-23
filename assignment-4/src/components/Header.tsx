export function Header() {
  return (
    <header className="bg-slate-100 shadow shadow-black/30 transition-colors duration-500">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/">
          <h1 className="text-xl font-bold sm:text-2xl">📚 Bookstore</h1>
        </a>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/dnhn/df-fe-23/tree/main/assignment-2"
            target="_blank"
            rel="noreferrer noopener"
            className="block bg-slate-300 p-4 font-medium transition-colors hover:bg-slate-400 focus:bg-slate-400"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  )
}
