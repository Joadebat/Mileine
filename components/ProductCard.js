import Image from 'next/image'
import React from 'react'
export default function ProductCard({product, onAdd, compact}) {
  const p = product
  return (
    <article className={`bg-white rounded-xl overflow-hidden shadow ${compact? 'flex items-center': ''}`}>
      <div className={compact? 'w-28 h-28 relative flex-shrink-0' : 'relative h-44 w-full'}>
        <Image src={p.image} alt={p.nom} fill style={{objectFit:'cover'}} />
      </div>
      <div className="p-4 flex-1">
        <h4 className="font-semibold mb-1">{p.nom}</h4>
        <div className="flex items-center justify-between">
          <div className="text-[#8b5a2b] font-bold">{new Intl.NumberFormat('fr-CA',{style:'currency',currency:'CAD'}).format(p.prix)}</div>
          <button onClick={onAdd} className="bg-[#8b5a2b] text-white px-3 py-2 rounded">Ajouter</button>
        </div>
      </div>
    </article>
  )
}
