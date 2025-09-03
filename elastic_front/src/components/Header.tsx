import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-6 flex gap-2 text-base/50 justify-center">
      <nav className="flex max-w-[1280px] items-center flex-row">
        <div className="pr-4">
          <Link to="/">
            <img src="/logo.png" className="h-14 w-14" alt="SENAI Elastic" />
          </Link>
        </div>

        <div className="px-2 hover:text-base font-bold">
          <Link to="/">Início</Link>
        </div>

        <div className="px-2 hover:text-base font-bold">
          <Link to="/list">Filmes</Link>
        </div>
      </nav>
    </header>
  )
}
