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
  {
    name: "офис",
    items: [
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d9b91b84-b191-4d98-bbe5-c288685c2289.jpg", label: "офис", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d57c89fe-d1b7-4b92-bfac-426a38f016c8.jpg", label: "офис", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/f094080b-6004-4134-a902-520ad0188439.jpg", label: "офис", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/681e8b45-103f-403f-a7f2-99afc692ace9.jpg", label: "офис", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a1f06a7f-7431-48c4-b439-af876f257c24.jpg", label: "офис", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/aedc46aa-7383-466b-aebf-b9f685f3e54a.jpg", label: "офис", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/6c0ab66c-979a-4031-a18a-5a72ffa14fd6.jpg", label: "офис", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/710ee132-a027-4790-b834-9b2803abd41d.jpg", label: "офис", type: "image" },
    ],
  },
  {
    name: "пересвет",
    items: [
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/05990e8b-fbbc-4688-8f34-ee65bd3b090a.jpg", label: "пересвет", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/ce091172-1c71-47a5-be06-0a09ad927db8.jpg", label: "пересвет", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d4da6350-e014-4633-9ca8-a3a3e61d2ec5.jpg", label: "пересвет", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/beda0aad-230d-4911-aa55-c82ef066cbb3.jpg", label: "пересвет", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/ee1ee88b-474c-408a-b65e-ce3112127408.jpg", label: "пересвет", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/f3dbd3e7-32ea-45af-84bd-dfe865ca0ac9.jpg", label: "пересвет", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/198d09be-6da3-4da8-8620-700e2504578d.jpg", label: "пересвет", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/41768019-0e3f-4989-99cd-e6d802f1d829.jpg", label: "пересвет", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/04a4a403-8ba1-4fdf-8ed6-2b7f882bec69.jpg", label: "пересвет", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/4fc44e42-78e5-491e-bb59-4b2c51cc7efa.jpg", label: "пересвет", type: "image" },
    ],
  },
  {
    name: "рамарт 1",
    items: [
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a18598f8-0bb6-4777-b148-421908a83134.JPG", label: "рамарт 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/3e099e8d-2fd5-4964-baf8-908856da0069.JPG", label: "рамарт 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/a4347208-bab5-4e5f-81a9-f67765ba635d.JPG", label: "рамарт 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/8f5382d3-8ebb-4341-837e-e879629ff8d9.JPG", label: "рамарт 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/05ce3876-c325-47cf-a1bf-57f51e1da35c.JPG", label: "рамарт 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/0199e317-2eda-47c9-ba76-037384a802db.JPG", label: "рамарт 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/ab9af2e7-5394-44be-95ca-a76f9a76d972.JPG", label: "рамарт 1", type: "image" },
    ],
  },
  {
    name: "рамарт 2",
    items: [
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/8d274b3f-3758-4bbf-88ab-aab2c0a79c48.JPG", label: "рамарт 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/5d470b0c-8ef5-4a19-9535-121f9c9a99d9.JPG", label: "рамарт 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/eb1a835b-cad3-491f-990d-501943037117.JPG", label: "рамарт 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d60377c6-5b24-4e18-9d4b-6c1ed56cf627.JPG", label: "рамарт 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/c41e11bf-e511-4814-a928-d4102f928d28.JPG", label: "рамарт 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/cd0cc1a6-2867-4793-b29d-b4a0a215073a.JPG", label: "рамарт 2", type: "image" },
    ],
  },
  {
    name: "югас 1",
    items: [
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/bb867d07-7f31-46bf-8a8c-456c1cf8f097.JPG", label: "югас 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/6f89fd32-faa0-427e-ad61-97efa845c4b3.JPG", label: "югас 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/890cd637-d87a-4535-8e4c-f8603981975b.JPG", label: "югас 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/1363e91e-5e3d-4b3a-a2a5-72308c4517e2.JPG", label: "югас 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/101e1002-5539-48c8-abd8-e389b601f2c6.JPG", label: "югас 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/44024008-62a2-42d1-8eaf-fe463da09203.JPG", label: "югас 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/01024472-368b-47d3-938b-5af62821c508.JPG", label: "югас 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/18140973-8092-4ee9-ae82-15f6461d56d8.JPG", label: "югас 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/480dc40f-57c7-4a1d-82a1-3424842d9fd5.JPG", label: "югас 1", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/309b0144-e61d-4709-a592-99c185f49128.JPG", label: "югас 1", type: "image" },
    ],
  },
  {
    name: "югас 2",
    items: [
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/88e64711-2abd-4dd2-983d-47e9885d3dc9.JPG", label: "югас 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/ead2414f-9ad2-44d9-b3cf-51e2ddc03864.JPG", label: "югас 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/bd2c5176-84d2-4989-a77a-6b4068c11287.JPG", label: "югас 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/97b9363f-9049-4026-b4ed-b6f59daab072.JPG", label: "югас 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/9a85addf-9858-46e8-9308-c430817dbc05.JPG", label: "югас 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/07494ebc-d7a5-4c56-a1ca-44e74bedb39f.JPG", label: "югас 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/11e1251a-aad1-4166-a9f4-ee3275210320.JPG", label: "югас 2", type: "image" },
      { src: "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/fc141b2a-f530-4909-ab55-038ae2a8c38b.JPG", label: "югас 2", type: "image" },
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