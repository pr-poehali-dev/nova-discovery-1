import { motion } from "framer-motion"

const portfolioItems = [
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/files/1ee6ac45-742a-4db4-b6e2-3691ffe4122b.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/files/ddc2a2a8-dc3b-44ea-8f01-8c6fb1f052df.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/files/acdafb90-9898-41ad-9ec1-da4647040e69.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/files/261336ae-cb53-4dc8-be59-b447c54ed544.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/files/3ea12665-5098-4f73-afc7-ace458eedca8.jpg",
  "https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/files/563dee8a-c2da-4c5a-b85f-f5e551965d84.jpg",
]

export function CarouselSection() {
  // Duplicate for seamless loop
  const items = [...portfolioItems, ...portfolioItems]

  return (
    <section className="bg-primary py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-serif text-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Наши стенды на ведущих выставках.
        </motion.h2>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-6"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {items.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] md:w-[400px] rounded-xl overflow-hidden shadow-2xl"
              data-clickable
            >
              <img
                src={src || "/placeholder.svg"}
                alt={`Выставочный стенд ${(i % portfolioItems.length) + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}