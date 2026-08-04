import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react"

const storesMedia: { src: string; label: string; type: "image" | "video" }[] = [
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d5eee2f3-cc3b-4a39-8e98-92ad77fa011f.JPG", label: "jvc1", type: "image" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/f40ecf27-caf3-4ae0-8df1-6f78e0203be7.JPG", label: "jvc1", type: "image" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/37160cb7-ea47-487e-b62b-af6badd59c12.JPG", label: "jvc1", type: "image" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e87ed973-d264-4480-b400-8d391044118a.JPG", label: "jvc1", type: "image" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/9979bea2-7c85-4708-930f-325a502fc9f6.JPG", label: "jvc1", type: "image" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/4f762773-3687-4408-8f5e-d6b0c89b8db4.JPG", label: "jvc1", type: "image" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/47a8759a-1520-4b23-8fa8-ac9d36d8d19a.JPG", label: "jvc1", type: "image" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/94d15315-aede-4bc4-a1af-e9bbacbc7c03.JPG", label: "jvc1", type: "image" },
  { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/53ddc2a1-98c3-404f-a170-c13fc097f666.JPG", label: "jvc1", type: "image" },
]

export function PricingSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i - 1 + storesMedia.length) % storesMedia.length : null))
  }, [])

  const next = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i + 1) % storesMedia.length : null))
  }, [])

  const carouselPrev = useCallback(() => {
    setCarouselIndex((i) => (i - 1 + storesMedia.length) % storesMedia.length)
  }, [])

  const carouselNext = useCallback(() => {
    setCarouselIndex((i) => (i + 1) % storesMedia.length)
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
          <motion.div
            className="relative rounded-xl overflow-hidden bg-background ticket-edge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="relative aspect-video md:aspect-[16/7] cursor-pointer group"
              onClick={() => setSelectedIndex(carouselIndex)}
              data-clickable
            >
              <AnimatePresence mode="wait">
                {storesMedia[carouselIndex].type === "video" ? (
                  <motion.video
                    key={carouselIndex}
                    src={storesMedia[carouselIndex].src}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    playsInline
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                ) : (
                  <motion.img
                    key={carouselIndex}
                    src={storesMedia[carouselIndex].src}
                    alt={storesMedia[carouselIndex].label}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </AnimatePresence>

              {storesMedia[carouselIndex].type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm md:text-base font-bold leading-tight">
                  {storesMedia[carouselIndex].label}
                </p>
              </div>
            </div>

            <button
              className="absolute top-1/2 -translate-y-1/2 left-3 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
              onClick={(e) => { e.stopPropagation(); carouselPrev() }}
              data-clickable
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute top-1/2 -translate-y-1/2 right-3 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
              onClick={(e) => { e.stopPropagation(); carouselNext() }}
              data-clickable
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {storesMedia.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${i === carouselIndex ? "bg-white" : "bg-white/40"}`}
                  onClick={(e) => { e.stopPropagation(); setCarouselIndex(i) }}
                  data-clickable
                />
              ))}
            </div>
          </motion.div>
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