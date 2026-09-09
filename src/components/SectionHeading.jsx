import ScrollReveal from '../animations/ScrollReveal'
import './SectionHeading.css'

export default function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="section-heading">
      {eyebrow && (
        <ScrollReveal className="section-heading__eyebrow">{eyebrow}</ScrollReveal>
      )}
      <ScrollReveal delay={0.05} className="section-heading__title" as="h2">
        {title}
      </ScrollReveal>
      {sub && (
        <ScrollReveal delay={0.12} className="section-heading__sub">
          {sub}
        </ScrollReveal>
      )}
    </div>
  )
}
