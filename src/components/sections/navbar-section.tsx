import { motion } from "framer-motion"
import { Phone } from "lucide-react"

export function NavbarSection() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-3 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border/40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3">
        <img
          src="https://cdn.poehali.dev/projects/58372c77-932b-4c5c-9a8b-ee75e9b14c57/bucket/37f196d0-5c3c-4fff-a618-da0ef79df9d5.png"
          alt="ЭкспоМаксГрупп"
          className="h-12 w-auto"
        />
        <span className="hidden sm:block font-serif text-lg text-foreground leading-tight">
          ЭкспоМАКС<br /><span className="text-sm text-muted-foreground font-sans">ГРУПП</span>
        </span>
      </div>

      <a
        href="tel:+79259442855"
        className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg hover:bg-foreground/90 transition-colors text-sm font-medium"
        data-clickable
      >
        <Phone className="w-4 h-4" />
        8 925 944 28 55
      </a>
    </motion.header>
  )
}