import React from 'react'
export default function Header({cartCount, onOpenCart}) {
  return (
    <header className="bg-[#8b5a2b] text-white p-4 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-[#8b5a2b] rounded flex items-center justify-center font-bold">RM</div>
          <div>
            <div className="font-bold">Rabais Mache Goute 4 Saisons</div>
            <div className="text-sm opacity-90">Produits alimentaires & cosmétiques caribéens</div>
          </div>
        </div>
        <div className="hidden md:block">
          <nav className="flex items-center gap-6">
            <a href="#alimentaires">Alimentaires</a>
            <a href="#cosmetiques">Cosmétiques</a>
            <a href="#contact">Contact</a>
            <button onClick={onOpenCart} className="bg-[#f3e9dc] text-[#8b5a2b] px-3 py-1 rounded">Panier ({cartCount})</button>
          </nav>
        </div>
      </div>
    </header>
  )
}
