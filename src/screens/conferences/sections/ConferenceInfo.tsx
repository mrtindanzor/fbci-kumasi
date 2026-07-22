import { motion } from "framer-motion"
import type { Conference } from "@/features/conference"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"

type ConferenceInfoProps = {
  conference: Conference
}

export function ConferenceInfo({ conference }: ConferenceInfoProps) {
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    }

    if (start === end) {
      return startDate.toLocaleDateString("en-US", options)
    }

    const startStr = startDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    })
    const endStr = endDate.toLocaleDateString("en-US", options)
    return `${startStr} - ${endStr}`
  }

  const infoItems = [
    { icon: "bookmark", label: "Theme", value: conference.theme },
    {
      icon: "event",
      label: "Schedule",
      value: formatDateRange(conference.startDate, conference.endDate),
    },
    ...(conference.keyScripture
      ? [
          {
            icon: "menu_book",
            label: "Key Scripture",
            value: conference.keyScripture,
          },
        ]
      : []),
  ]

  return (
    <section className="section-gap bg-surface-container">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
            Conference Details
          </h2>
          <div className="w-8 h-0.5 bg-secondary rounded-full mb-12" />
        </AnimatePosition>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {infoItems.map((item) => (
            <motion.li
              key={item.label}
              variants={slideUp}
              className="bg-surface rounded-2xl p-6 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-3xl text-secondary mb-3 block">
                {item.icon}
              </span>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                {item.label}
              </p>
              <p className="text-lg text-primary">{item.value}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
