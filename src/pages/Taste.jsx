import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ChapterHero from '../components/ChapterHero'
import ChapterScene from '../components/ChapterScene'
import HorizontalStrip from '../components/HorizontalStrip'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'
import useParallax from '../animations/useParallax'
import Button from '../components/Button'
import { images } from '../data/images'
import './Taste.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Lahore at dinner time — an atmospheric statement over a sweeping night
 * market image, with a slow parallax drift.
 */
function DinnerTime() {
  const imgRef = useParallax(-0.07)
  return (
    <section className="ta-dinner" id="dinner">
      <div className="ta-dinner__media">
        <img
          ref={imgRef}
          src={images.taste.foodStreet}
          alt="The busy Food Street of Lahore glowing beneath the fort at dinner time"
        />
      </div>
      <div className="ta-dinner__wash" />
      <div className="ta-dinner__inner">
        <div className="ta-dinner__text">
          <Reveal as="p" className="ta-dinner__eyebrow">
            <SectionLabel variant="ember">Scene 01 · Lahore at dinner time</SectionLabel>
          </Reveal>
          <Reveal as="h2" delay={0.06} className="ta-dinner__title">
            When the streetlights <em>bloom</em>, the smoke begins.
          </Reveal>
          <Reveal as="p" delay={0.14} className="ta-dinner__body">
            The braziers are lit as the call to rest fades. Kettles hiss, coals
            blush, and the whole of the old city leans in to eat — a low,
            patient murmur of orders, laughter, and the scent of char warming
            the air.
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/**
 * Signature dishes, told like scenes — a full-bleed plate and a single line.
 */
function Signatures() {
  const dishes = [
    {
      side: 'left',
      img: images.taste.nihari,
      alt: 'A deep bowl of slow-simmered Nihari with ginger and naan',
      eyebrow: 'The Dawn Bowl',
      title: (
        <>
          Nihari, <em>slow</em> into morning
        </>
      ),
      body: 'Simmered from midnight to dawn, cut with ginger and patience. The flavour you taste at 3 AM has been quietly working since dusk.',
    },
    {
      side: 'right',
      img: images.taste.halwaPuri,
      alt: 'Golden spirals of Halwa Puri served warm under lamp light',
      eyebrow: 'The First Sweet',
      title: (
        <>
          Halwa Puri at <em>first light</em>
        </>
      ),
      body: 'Golden circles and cardamom-halwa, eaten while the night still leans in. The city’s first sweet kiss of the day.',
    },
    {
      side: 'left',
      img: images.taste.karahi,
      alt: 'A bubbling karahi of spiced meat simmered over the coals',
      eyebrow: 'Over Coal',
      title: (
        <>
          Karahi, <em>bubbling</em> at the fire
        </>
      ),
      body: 'One iron wok over the coals, whole spices tossed in ghee, finished at the flame. A whole ritual practised on the same spot for generations.',
    },
    {
      side: 'right',
      img: images.taste.chai,
      alt: 'Cups of chai poured high at the kettle hour',
      eyebrow: 'The Kettle Hour',
      title: (
        <>
          Chai, <em>poured with a wrist</em>
        </>
      ),
      body: 'The last ritual of the meal and the first of the next. One cup of sweetness, poured high, to hold the night together.',
    },
  ]

  return (
    <div className="ta-signatures" id="journey">
      {dishes.map((d, i) => (
        <ChapterScene
          key={`dish-${String(i).padStart(2, '0')}`}
          side={d.side}
          img={d.img}
          alt={d.alt}
          eyebrow={`Scene ${String(i + 2).padStart(2, '0')} · ${d.eyebrow}`}
          title={d.title}
          body={d.body}
        />
      ))}
    </div>
  )
}

/**
 * Late plates — a pinned horizontal feast.
 */
function LatePlates() {
  return (
    <HorizontalStrip
      label="Late plates · the lantern menu"
      items={[
        {
          img: images.taste.seekhKebab,
          alt: 'Hand-minced Seekh Kebabs seared at the edge of the flame',
          title: 'Seekh Kebab',
          caption: 'Hand-minced, spiced, and seared at the edge of the fire.',
        },
        {
          img: images.taste.nihari,
          alt: 'A steaming bowl of Nihari at a night kitchen',
          title: 'Nihari',
          caption: 'The dawn dish that earns its patience.',
        },
        {
          img: images.taste.halwaPuri,
          alt: 'Golden spirals of Halwa Puri warm beneath the lamps',
          title: 'Halwa Puri',
          caption: 'Golden circles and the first sweet of the day.',
        },
        {
          img: images.taste.karahi,
          alt: 'A bubbling karahi finished over the coals',
          title: 'Karahi',
          caption: 'One wok over the flame, spiced and whole.',
        },
        {
          img: images.taste.chai,
          alt: 'Cups of chai glowing warmly at the kettle hour',
          title: 'Chai',
          caption: 'The last ritual. One cup of sweetness to hold the night.',
        },
      ]}
    />
  )
}

/**
 * Late-Night Bites — a private, full-screen moment at the hour the kettle
 * owns. The image resolves on scroll, the words arrive softly.
 */
function LateNightBites() {
  const scope = useRef(null)
  const imgRef = useParallax(-0.08)

  useEffect(() => {
    const el = scope.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      gsap.set('[data-b-img]', { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.set('[data-b-fade]', { autoAlpha: 1, x: 0 })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'center 45%',
        scrub: 0.8,
      },
      defaults: { ease: 'none' },
    })
    tl.fromTo(
      el.querySelector('[data-b-img]'),
      { clipPath: 'inset(0% 100% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 },
    ).fromTo(
      el.querySelectorAll('[data-b-fade]'),
      { autoAlpha: 0, x: 40 },
      { autoAlpha: 1, x: 0, duration: 1, stagger: 0.14 },
      0,
    )
    return () => tl.scrollTrigger?.kill()
  }, [])

  return (
    <section className="ta-bites" ref={scope}>
      <div className="ta-bites__frame" data-b-img>
        <img
          ref={imgRef}
          src={images.taste.kettleHour}
          alt="The hour that belongs to the kettle — a slow, private night moment"
        />
      </div>
      <div className="ta-bites__shade" />
      <div className="ta-bites__text">
        <p className="ta-bites__eyebrow" data-b-fade>
          Scene 03 · Late Night Bites
        </p>
        <h2 className="ta-bites__title" data-b-fade>
          The hour that <em>belongs</em> to the kettle.
        </h2>
        <p className="ta-bites__body" data-b-fade>
          Past midnight the crowds thin and the braziers stoke low and steady.
          A bowl of nihari, a wheel of naan, a small glass of chai — the
          solitary feast the night keeps for those who know to stay.
        </p>
      </div>
    </section>
  )
}

/**
 * Transition into the heritage of the night.
 */
function Closer() {
  return (
    <section className="ta-closer">
      <div className="ta-closer__glow" aria-hidden="true" />
      <div className="container ta-closer__inner">
        <Reveal as="p" className="ta-closer__label">
          <SectionLabel center>The flavours settle</SectionLabel>
        </Reveal>
        <Reveal as="h2" delay={0.06} className="ta-closer__title">
          Now the night turns to <em>stone and story</em>.
        </Reveal>
        <Reveal as="p" delay={0.14} className="ta-closer__sub">
          From the cookfire to the courtyard — the same moonlight falls on
          Lahore’s oldest walls.
        </Reveal>
        <Reveal delay={0.22} className="ta-closer__cta">
          <Button to="/heritage" variant="solid">
            Walk the Heritage
          </Button>
          <Button to="/streets" variant="outline">
            Back to the Streets
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

export default function Taste() {
  return (
    <>
      <ChapterHero
        chapter="02"
        label="Chapter Two · The Taste"
        lines={[{ text: 'The' }, { em: 'Night' }, { em: 'Serves' }]}
        sub="Lahore doesn't just feed you — it gathers you to the flame."
        img={images.taste.nihari}
        alt="A steaming bowl of Nihari under warm lamplight"
        accent="ember"
        particles="ember"
        scrollTarget="#dinner"
        scrollLabel="pull up a stool"
      />
      <DinnerTime />
      <Signatures />
      <LatePlates />
      <LateNightBites />
      <Closer />
    </>
  )
}