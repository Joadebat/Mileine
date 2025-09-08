import Head from 'next/head'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { X } from 'lucide-react'

const PAYMENT_LINK = process.env.NEXT_PUBLIC_PAYMENT_LINK || ''

const produitsAlimentaires = [
  { id: 'a1', nom: 'Jus de Goyave', prix: 4.99, image: '/images/jus-goyave.svg' },
  { id: 'a2', nom: 'Épices Créoles', prix: 7.99, image: '/images/epices.svg' },
  { id: 'a3', nom: 'Riz Haïtien', prix: 12.5, image: '/images/riz.svg' },
  { id: 'a4', nom: 'Pikliz', prix: 5.0, image: '/images/pikliz.svg' },
]

const produitsCosmetiques = [
  { id: 'c1', nom: 'Crème Karité', prix: 14.99, image: '/images/creme-karite.svg' },
  { id: 'c2', nom: 'Savon Naturel', prix: 6.5, image: '/images/savon.svg' },
  { id: 'c3', nom: 'Huile de Coco', prix: 9.99, image: '/images/huile-coco.svg' },
  { id: 'c4', nom: 'Lotion Tropicale', prix: 11.0, image: '/images/lotion.svg' },
]

function formatCAD(n) { return new Intl.NumberFormat('fr-CA',{ style: 'currency', currency: 'CAD' }).format(n) }

export default function Home() {
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)

  const add = (p) => {
    setCart(c=>{
      const f = c.find(x=>x.id===p.id)
      if(f) return c.map(x=> x.id===p.id ? {...x, qty: x.qty+1} : x)
      return [...c, {...p, qty:1}]
    })
    setOpen(true)
  }

  const remove = (id) => setCart(c => c.filter(x=>x.id!==id))
  const changeQty = (id, qty) => setCart(c => c.map(x=> x.id===id ? {...x, qty: Math.max(1, qty)} : x))
  const subtotal = useMemo(()=> cart.reduce((s,p)=> s + p.prix * p.qty, 0), [cart])

  const goToPayment = () => {
    if(!PAYMENT_LINK || PAYMENT_LINK.includes('your_payment_link')){ alert('Le lien de paiement n\'est pas configuré. Copie ton Payment Link dans .env.local ou dans Vercel (NEXT_PUBLIC_PAYMENT_LINK).'); return }
    window.location.href = PAYMENT_LINK
  }

  return (
    <div>
      <Head>
        <title>Rabais Mache Goute 4 Saisons</title>
        <meta name="description" content="Produits alimentaires et cosmétiques caribéens" />
      </Head>

      <Header cartCount={cart.reduce((s,p)=>s+p.qty,0)} onOpenCart={() => setOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-24">
        <section className="mb-8">
          <div className="bg-white rounded-2xl shadow p-8 grid md:grid-cols-2 gap-4 items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#8b5a2b]">Saveurs & Soins des îles, toute l'année</h1>
              <p className="mt-3 text-gray-700">Découvrez nos spécialités caribéennes : aliments authentiques et cosmétiques naturels. Qualité, petits prix et service chaleureux.</p>
            </div>
            <div className="hidden md:block relative h-56"><Image src="/images/hero.svg" alt="tropical" fill style={{objectFit:'cover'}} /></div>
          </div>
        </section>

        <section id="alimentaires" className="mb-8">
          <h2 className="text-2xl font-bold text-[#5b3f2a] mb-4">Produits Alimentaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produitsAlimentaires.map(p => <ProductCard key={p.id} product={p} onAdd={() => add(p)} />)}
          </div>
        </section>

        <section id="cosmetiques" className="max-w-4xl mx-auto mb-8 bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-[#5b3f2a] text-center mb-6">Produits Cosmétiques</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {produitsCosmetiques.map(p => <ProductCard key={p.id} product={p} onAdd={() => add(p)} compact />)}
          </div>
        </section>

        <section id="contact" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#fff8ef] p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">Adresse & Contact</h3>
              <p>5563 BLV Leger, Montreal-Nord, QC H1G 1K4</p>
              <p className="mt-2">Téléphone : <a href="tel:4389201227" className="underline">438-920-1227</a></p>
              <p className="mt-2 text-sm text-gray-600">Heures : 9h AM – 10h PM</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-2">Contact</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('Merci — message (exemple)'); }} className="grid gap-3">
                <input className="border p-2 rounded" placeholder="Nom" required />
                <input type="email" className="border p-2 rounded" placeholder="Email" required />
                <textarea className="border p-2 rounded" placeholder="Message" rows={4} />
                <div className="flex justify-end"><button className="bg-[#8b5a2b] text-white px-4 py-2 rounded">Envoyer</button></div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Cart Drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold">Votre panier</h3>
              <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-gray-100"><X /></button>
            </div>
            <div className="p-4 flex-1 overflow-auto space-y-3">
              {cart.length===0 && <p className="text-gray-500">Votre panier est vide.</p>}
              {cart.map((item, i) => (
                <div key={i} className="flex items-center gap-3 border rounded-xl p-3">
                  <div className="w-16 h-16 relative"><Image src={item.image} alt={item.nom} fill style={{objectFit:'cover'}} /></div>
                  <div className="flex-1">
                    <div className="font-medium">{item.nom}</div>
                    <div className="text-sm text-gray-600">{formatCAD(item.prix)}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => changeQty(item.id, item.qty-1)} className="px-2 py-1 border rounded">-</button>
                      <div className="px-3">{item.qty}</div>
                      <button onClick={() => changeQty(item.id, item.qty+1)} className="px-2 py-1 border rounded">+</button>
                    </div>
                  </div>
                  <button onClick={() => remove(item.id)} className="text-sm text-red-500">Supprimer</button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t space-y-2">
              <div className="flex items-center justify-between"><span className="text-gray-600">Sous-total</span><span className="font-semibold">{formatCAD(subtotal)}</span></div>
              <div className="flex gap-2">
                <button disabled={cart.length===0} onClick={goToPayment} className="flex-1 bg-[#8b5a2b] text-white px-4 py-2 rounded">Payer maintenant</button>
                <button onClick={() => { setCart([]); alert('Panier vidé (exemple)'); }} className="flex-1 border rounded px-4 py-2">Vider</button>
              </div>
              <p className="text-xs text-gray-500">Paiement sécurisé via Stripe. Taxes & livraison calculées à la caisse.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
