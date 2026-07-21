import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { routes } from "@/shared/routes"
import {
  AnimatePosition,
  slideInLeft,
  slideUp,
  staggerContainer,
} from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { LessonCard } from "./components/LessonCard"
import { LESSONS } from "./constants"

export function DiscipleshipPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-primary pt-header-claim pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/discipleship-lesson.avif')] bg-cover bg-center" />
        </div>

        <div className="container-app relative z-10">
          <AnimatePosition variants={slideInLeft}>
            <Link
              href={routes.resources.home}
              variant="none"
              size="none"
              className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="size-4" />
              Back to Resources
            </Link>

            <span className="text-secondary bg-neutral-50 rounded-xl w-fit font-bold px-4 py-1.5 font-label text-sm tracking-widest uppercase mb-4 block">
              Discipleship Course
            </span>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-6 max-w-2xl">
              Discipleship Lessons
            </h1>
          </AnimatePosition>

          <AnimatePosition variants={slideUp} className="max-w-2xl">
            <p className="text-lg text-white/80 mb-4">
              A 12-part booklet series designed to help you disciple someone
              else and strengthen new believers in their walk with Christ.
            </p>
            <p className="text-sm text-white/60">
              Level 1: Booklets 1-4 · Level 2: Booklets 5-12
            </p>
          </AnimatePosition>
        </div>
      </section>

      {/* Lesson Grid */}
      <section className="section-gap">
        <div className="container-app">
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {LESSONS.map((lesson) => (
              <motion.li key={lesson.id} variants={slideUp}>
                <LessonCard lesson={lesson} />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </main>
  )
}
