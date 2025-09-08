import React from 'react'
export default function Footer() {
  return (
    <footer className="mt-12 bg-[#8b5a2b] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-bold">Rabais Mache Goute 4 Saisons</div>
          <div className="text-sm">© 2025 Tous droits réservés</div>
        </div>
        <div className="text-center">
          <div>5563 BLV Leger, Montréal-Nord, QC H1G 1K4</div>
          <div className="flex items-center justify-center gap-4 mt-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
          </div>
        </div>
        <div className="text-sm opacity-90">Téléphone : 438-920-1227 · Heures : 9h AM – 10h PM</div>
      </div>
    </footer>
  )
}
