import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react"

type MediaItem = { src: string; label: string; type: "image" | "video" }
type Collection = { name: string; items: MediaItem[] }

const collections: Collection[] = [
  {
    name: "jvc1",
    items: [
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d5eee2f3-cc3b-4a39-8e98-92ad77fa011f.JPG", label: "jvc1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/f40ecf27-caf3-4ae0-8df1-6f78e0203be7.JPG", label: "jvc1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/37160cb7-ea47-487e-b62b-af6badd59c12.JPG", label: "jvc1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e87ed973-d264-4480-b400-8d391044118a.JPG", label: "jvc1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/9979bea2-7c85-4708-930f-325a502fc9f6.JPG", label: "jvc1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/4f762773-3687-4408-8f5e-d6b0c89b8db4.JPG", label: "jvc1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/47a8759a-1520-4b23-8fa8-ac9d36d8d19a.JPG", label: "jvc1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/94d15315-aede-4bc4-a1af-e9bbacbc7c03.JPG", label: "jvc1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/53ddc2a1-98c3-404f-a170-c13fc097f666.JPG", label: "jvc1", type: "image" },
    ],
  },
  {
    name: "jvc 2",
    items: [
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e3c11a62-2396-4ecc-a85b-69214656e839.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/9544d589-f5c3-4b62-8138-5713be3db261.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/404dccf0-ad94-4fe6-99bf-071c48c8f18c.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/7a519976-9e68-4dc9-b6a4-88744c1d6b2f.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/888949bc-3102-4dec-9ac6-75262812ace7.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/b36db197-19e7-4f73-8525-a01f7519707a.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/90108812-d8e1-494e-8a70-7af76cca609c.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a4d13130-b17d-4de5-930e-13a5933c9225.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/ea73738a-5665-4e7f-9fc4-c233838ae347.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/df87961d-c642-4326-bec0-33c7623a6ef5.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/bedf383e-aea1-4246-9815-5bfe5f643439.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/293c586a-73aa-4785-9281-ba5176ae8dde.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/11acb00f-d4e0-4cec-9a26-8f0ff0bacfcd.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/afb5a19e-46e6-46c9-9c43-fbe5a04f4a5f.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/9ef1ff24-c86a-4814-b7dc-86b57b41b0d9.JPG", label: "jvc 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/400884bb-a220-4cf0-a2f3-a0235df480b2.JPG", label: "jvc 2", type: "image" },
    ],
  },
]

function CollectionCarousel({ collection }: { collection: Collection }) {
  const items = collection.items
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const carouselPrev = useCallback(() => {
    setCarouselIndex((i) => (i - 1 + items.length) % items.length)
  }, [items.length])

  const carouselNext = useCallback(() => {
    setCarouselIndex((i) => (i + 1) % items.length)
  }, [items.length])

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i - 1 + items.length) % items.length : null))
  }, [items.length])

  const next = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i + 1) % items.length : null))
  }, [items.length])

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
    <div>
      <motion.h3
        className="text-lg md:text-xl font-bold text-foreground mb-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {collection.name}
      </motion.h3>

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
            {items[carouselIndex].type === "video" ? (
              <motion.video
                key={carouselIndex}
                src={items[carouselIndex].src}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : (
              <motion.img
                key={carouselIndex}
                src={items[carouselIndex].src}
                alt={items[carouselIndex].label}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </AnimatePresence>

          {items[carouselIndex].type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 flex-wrap max-w-[80%] justify-center">
          {items.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${i === carouselIndex ? "bg-white" : "bg-white/40"}`}
              onClick={(e) => { e.stopPropagation(); setCarouselIndex(i) }}
              data-clickable
            />
          ))}
        </div>
      </motion.div>

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
                {items[selectedIndex]?.type === "video" ? (
                  <motion.video
                    key={selectedIndex}
                    src={items[selectedIndex].src}
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
                    src={items[selectedIndex]?.src}
                    alt={items[selectedIndex]?.label}
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
                {items[selectedIndex]?.label}
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
              {selectedIndex + 1} / {items.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function PricingSection() {
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

        {collections.length === 0 ? (
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
          <div className="flex flex-col gap-12">
            {collections.map((collection) => (
              <CollectionCarousel key={collection.name} collection={collection} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
