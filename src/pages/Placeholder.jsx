import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import ScrollReveal from '../animations/ScrollReveal'
import './Placeholder.css'

export default function Placeholder({ number, title, tease, to }) {
  return (
    <section className="ph">
      <div className="ph__moon" aria-hidden="true" />
      <div className="ph__inner">
        <SectionHeading eyebrow={`Chapter ${number}`} title={title} sub={tease} />
        <ScrollReveal delay={0.15} className="ph__note">
          This chapter is being written — its cinematic scenes arrive next.
        </ScrollReveal>
        <ScrollReveal delay={0.25} className="ph__cta">
          <Button to={to} variant="outline">
            Continue the Journey
          </Button>
          <Button to="/" variant="solid">
            Return Home
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
