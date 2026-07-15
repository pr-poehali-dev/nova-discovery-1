import { motion } from "framer-motion"

const ORDER_LINK = "https://max.ru/u/f9LHodD0cOKYRaxlAkKdKTGL_hWiOgB9cs2JxNjWu6_vhdZ2-1o_ShPPeAg"

export function FloatingCtaButton() {
  return (
    <motion.a
      href={ORDER_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] bg-primary text-primary-foreground px-5 py-3 rounded-full font-bold shadow-2xl hover:bg-primary/90 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-clickable
    >
      Заказать стенд
    </motion.a>
  )
}
