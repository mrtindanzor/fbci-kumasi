import { motion } from "framer-motion"
import { slideUp, staggerContainer } from "@/shared/ui/Framer"

const mediaItems = [
  {
    icon: "radio",
    title: "SunSum 98.7 FM",
    description:
      "Broadcasting wisdom 24/7 across the nation. Join us on SunSum 98.7 FM, every Friday from 7:00 - 8:00 PM for a live radio program.",
  },
  {
    icon: "live_tv",
    title: "Fundamental Hour",
    description: "WATCH US ON GTV, every Saturday Morning from 6:30 - 7:00 AM.",
  },
]

export function MediaMinistry() {
  return (
    <section className="section-gap">
      <div className="container-app">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {mediaItems.map((item) => (
            <motion.div
              key={item.title}
              variants={slideUp}
              className="bg-surface-container rounded-2xl p-8 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-5xl text-secondary mb-4 block">
                {item.icon}
              </span>
              <h3 className="text-xl font-headline font-semibold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
