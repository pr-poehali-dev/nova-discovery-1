import { motion } from "framer-motion"

const showcaseImages = [
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/ef9d12e9-8838-472b-92f2-c5618dc55897.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/d0bb67c6-7227-420c-88bf-3f0b2e8970f7.JPG",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/835219a3-628e-4f8c-b199-1dfd4fec1789.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/files/261336ae-cb53-4dc8-be59-b447c54ed544.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/files/3ea12665-5098-4f73-afc7-ace458eedca8.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/files/563dee8a-c2da-4c5a-b85f-f5e551965d84.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/files/1ee6ac45-742a-4db4-b6e2-3691ffe4122b.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/files/ddc2a2a8-dc3b-44ea-8f01-8c6fb1f052df.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/files/acdafb90-9898-41ad-9ec1-da4647040e69.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/fb33528e-58ac-46fa-baa0-0332021c1f7f.png",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/3a06b4f1-32ce-4320-ac9d-acd0540a254a.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/013fe6dd-d9d8-43eb-abb1-263c8637a398.png",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/e8fb3bc7-4eb4-41f3-8d4f-541d25f212f9.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/acdebdff-4abc-4907-9f56-4caf6ebf3d7a.png",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/663e2a32-4fd4-40ec-9d28-5df73819f999.png",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
  "/placeholder.jpg",
]

export function ShowcaseSection() {
  const realImages = showcaseImages.filter((src) => !src.includes("placeholder"))
  const placeholders = showcaseImages.filter((src) => src.includes("placeholder"))

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
          48 реализованных стендов
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {showcaseImages.map((src, i) => {
            const isPlaceholder = src.includes("placeholder")
            return (
              <motion.div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden group bg-secondary"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
                data-clickable
              >
                {isPlaceholder ? (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-xs">
                    Фото {i + 1}
                  </div>
                ) : (
                  <motion.img
                    src={src}
                    alt={`Выставочный стенд ${i + 1}`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>

        {placeholders.length > 0 && (
          <motion.p
            className="text-center text-muted-foreground text-sm mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {realImages.length} из 48 фото загружено — пришли остальные, я добавлю
          </motion.p>
        )}
      </div>
    </section>
  )
}