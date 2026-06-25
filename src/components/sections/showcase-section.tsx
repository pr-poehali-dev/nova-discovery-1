import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const showcaseImages: { src: string; label: string }[] = [
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/ef9d12e9-8838-472b-92f2-c5618dc55897.jpg", label: "Princess · Boat Show 2016" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d0bb67c6-7227-420c-88bf-3f0b2e8970f7.JPG", label: "Sobranie · Millionaire Fair 2009" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/835219a3-628e-4f8c-b199-1dfd4fec1789.jpg", label: "Smeg · Мебель 2010" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/fb33528e-58ac-46fa-baa0-0332021c1f7f.png", label: "Антарес · Интеграция 2026" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/013fe6dd-d9d8-43eb-abb1-263c8637a398.png", label: "Family Cosmetics · Интершарм Весна 2026" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e8fb3bc7-4eb4-41f3-8d4f-541d25f212f9.jpg", label: "Frambini · Продэкспо 2026" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/acdebdff-4abc-4907-9f56-4caf6ebf3d7a.png", label: "Философт · Rosbuild 2026" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/663e2a32-4fd4-40ec-9d28-5df73819f999.png", label: "2M Group · Кабекс 2026" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/3a06b4f1-32ce-4320-ac9d-acd0540a254a.jpg", label: "Ravenol · MIMS 2012" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a483f7de-9eed-489a-9cf4-3203ed20d343.jpg", label: "Философт · Движение Экспо-Сочи 2025" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/9a2fc39c-18de-4eaf-ac8c-88dda969002b.jpg", label: "ELCO Group · Рупластика 2026" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d506ac1a-c544-4359-9afc-6f497925635d.jpg", label: "Moreto · Рупластика 2026" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/1bfa17ff-6dc6-401e-96d3-9947a926443e.jpg", label: "Linksim · Рупластика 2026" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/48d32a7b-afe4-41c2-8fef-5b5ad3a085a1.jpg", label: "Frambini · WorldFood 2025" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a46ac291-6f4d-4e7e-af44-3498168c84a4.jpg", label: "B-flexy · Интершарм 2025" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/c69fea19-6ec1-4600-83a6-91c08e17ca23.jpg", label: "Kelli Group · HouseHold 2025" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/7fb1266b-1e77-413b-a5ba-61574fc772d9.jpg", label: "Артак · БИОТ 2025" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/aeab5ef8-b23b-431c-ad31-bfbdb1a9a538.jpg", label: "Черкизово · Gastreet 2025" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e9ee4865-1327-41a4-837c-9132ecf57262.jpg", label: "Философт · Rosbuild 2025" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a6c8c23b-1db2-4598-a710-863f9a04ec03.jpg", label: "Sofi De Marko · HomeTextile&Design 2024" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/cc571d38-e5e2-4556-a031-e261d0fcb653.jpeg", label: "АО Заслон · МВМС 2019" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e174076e-f9a2-42fd-9ecd-9277dce36607.jpeg", label: "Лукойл · Mining World 2022, Новокузнецк" },
]

const TOTAL_SLOTS = 48
const placeholderCount = TOTAL_SLOTS - showcaseImages.length

export function ShowcaseSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i - 1 + showcaseImages.length) % showcaseImages.length : null))
  }, [])

  const next = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i + 1) % showcaseImages.length : null))
  }, [])

  useEffect(() => {
    if (selectedIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
      if (e.key === "Escape") setSelectedIndex(null)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [selectedIndex, prev, next])

  return (
    <section id="projects" className="bg-background px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-muted-foreground text-sm uppercase tracking-widest mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Наши проекты
        </motion.p>
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {showcaseImages.length} реализованных стендов
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {showcaseImages.map((item, i) => (
            <motion.div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
              onClick={() => setSelectedIndex(i)}
              data-clickable
            >
              <motion.img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Подпись при наведении */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs font-medium leading-tight">{item.label}</p>
              </div>
            </motion.div>
          ))}

          {Array.from({ length: placeholderCount }).map((_, i) => (
            <motion.div
              key={`ph-${i}`}
              className="relative aspect-square rounded-xl overflow-hidden bg-secondary"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: ((showcaseImages.length + i) % 4) * 0.07 }}
            >
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-xs">
                Фото {showcaseImages.length + i + 1}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-muted-foreground text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {showcaseImages.length} из {TOTAL_SLOTS} фото загружено — пришли остальные, я добавлю
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.button
              className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSelectedIndex(null)}
              data-clickable
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.button
              className="absolute left-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={(e) => { e.stopPropagation(); prev() }}
              data-clickable
            >
              <ChevronLeft className="w-7 h-7" />
            </motion.button>

            <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={showcaseImages[selectedIndex].src}
                  alt={showcaseImages[selectedIndex].label}
                  className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </AnimatePresence>
              <motion.p
                key={`label-${selectedIndex}`}
                className="text-white font-medium text-base text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {showcaseImages[selectedIndex].label}
              </motion.p>
            </div>

            <motion.button
              className="absolute right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={(e) => { e.stopPropagation(); next() }}
              data-clickable
            >
              <ChevronRight className="w-7 h-7" />
            </motion.button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-sm">
              {selectedIndex + 1} / {showcaseImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}