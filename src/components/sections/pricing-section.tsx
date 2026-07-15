import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react"

const storesMedia: { src: string; label: string; type: "image" | "video" }[] = []

export function PricingSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i - 1 + storesMedia.length) % storesMedia.length : null))
  }, [])

  const next = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i + 1) % storesMedia.length : null))
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
    <section id="pricing" className="bg-secondary px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-muted-foreground text-sm uppercase tracking-widest mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Наши работы
        </motion.p>
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Магазины, Шоу-румы
        </motion.h2>

        {storesMedia.length === 0 ? (
          <motion.div
            className="bg-background rounded-xl p-12 text-center ticket-edge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground">
              Здесь скоро появятся фото и видео наших магазинов и шоу-румов.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {storesMedia.map((item, i) => (
              <motion.div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden bg-background cursor-pointer group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
                onClick={() => setSelectedIndex(i)}
                data-clickable
              >
                {item.type === "video" ? (
                  <video src={item.src} className="w-full h-full object-cover" muted playsInline />
                ) : (
                  <motion.img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm md:text-base font-bold leading-tight">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
                {storesMedia[selectedIndex]?.type === "video" ? (
                  <motion.video
                    key={selectedIndex}
                    src={storesMedia[selectedIndex].src}
                    className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl"
                    controls
                    autoPlay
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                ) : (
                  <motion.img
                    key={selectedIndex}
                    src={storesMedia[selectedIndex]?.src}
                    alt={storesMedia[selectedIndex]?.label}
                    className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </AnimatePresence>
              <motion.p
                key={`label-${selectedIndex}`}
                className="text-white font-bold text-lg md:text-xl text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {storesMedia[selectedIndex]?.label}
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
              {selectedIndex + 1} / {storesMedia.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
