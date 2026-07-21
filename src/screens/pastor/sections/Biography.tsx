import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { pastorData } from "../data"

export function Biography() {
  return (
    <section className="section-gap">
      <div className="container-app">
        <div id="biography" className="scroll-mt-28">
          <AnimatePosition variants={slideUp}>
            <div className="bg-surface-container rounded-2xl p-8 md:p-12 mb-12">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4 block">
                format_quote
              </span>
              <p className="text-xl md:text-2xl font-headline italic text-primary leading-relaxed">
                {pastorData.quote}
              </p>
              {pastorData.quoteReference && (
                <p className="text-sm text-secondary font-semibold mt-4 text-right">
                  &mdash; {pastorData.quoteReference}
                </p>
              )}
            </div>
          </AnimatePosition>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
            <AnimatePosition
              variants={slideUp}
              className="row-start-2 md:row-start-1"
            >
              <div className="grid h-fit gap-6 mb-8">
                {pastorData.credentials.map((cred) => (
                  <div key={cred.text} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl text-secondary">
                      {cred.icon}
                    </span>
                    <span className="text-on-surface-variant text-sm">
                      {cred.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl text-secondary">
                    favorite
                  </span>
                  <span className="text-on-surface-variant text-sm">
                    Married to Elizabeth since {new Date().getFullYear() - 1997}{" "}
                    years
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl text-secondary">
                    diversity_3
                  </span>
                  <span className="text-on-surface-variant text-sm">
                    Five children: Kimberly, James, Rachel, Grace & Michael
                  </span>
                </div>
              </div>
            </AnimatePosition>

            <AnimatePosition variants={slideUp}>
              <h2 className="text-3xl font-headline font-bold text-primary mb-6">
                From Virginia to Ghana
              </h2>
              {pastorData.biography.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-on-surface-variant leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </AnimatePosition>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-6 mt-12 max-w-md mx-auto"
        >
          {pastorData.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={slideUp}
              className="text-center bg-surface-container rounded-2xl p-6"
            >
              <p className="text-3xl font-headline font-bold text-primary">
                {stat.value}
              </p>
              <p className="text-on-surface-variant text-sm mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
