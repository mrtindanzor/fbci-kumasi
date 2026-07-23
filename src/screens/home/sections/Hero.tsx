import { motion } from "framer-motion"
import { routes } from "@/shared/routes"
import { slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function Hero() {
  return (
    <section className="relative min-h-150 md:min-h-175 flex items-center bg-primary overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/church-side-1.avif')] bg-cover bg-center" />
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(115,92,0,0.15)_0%,transparent_70%)]" />

      <div className="container-app relative flex flex-col items-center text-center z-10 pt-header-claim pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <motion.h1
            variants={slideUp}
            className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold text-white leading-none tracking-tight mb-6"
          >
            Welcome
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Join us for worship grounded in the authority of God's Word. We are
            a family of believers pursuing truth, spiritual maturity, and the
            Great Commission.
          </motion.p>

          <motion.div variants={slideUp}>
            <Link
              href={routes.contact}
              variant="gold"
              size="lg"
              className="group shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300"
            >
              Contact Us
              <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <span className="material-symbols-outlined text-white/40 text-3xl animate-bounce">
            expand_more
          </span>
        </motion.div>
      </div>
    </section>
  )
}
