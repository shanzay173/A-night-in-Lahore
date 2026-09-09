import Hero from '../components/Hero'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'
import StreetGallery from '../components/StreetGallery'
import HorizontalStrip from '../components/HorizontalStrip'
import Quote from '../components/Quote'
import Timeline from '../components/Timeline'
import Button from '../components/Button'
import useParallax from '../animations/useParallax'
import { images } from '../data/images'
import './Home.css'

/* ============================================================
   INTRODUCTION
   ============================================================ */
function Intro() {
  return (
    <section className="h-intro">
      <div className="h-intro__glyph" aria-hidden="true">
        ل
      </div>
      <div className="container h-intro__inner">
        <Reveal as="p" className="h-intro__label">
          <SectionLabel center>One night, beginning now</SectionLabel>
        </Reveal>
        <Reveal as="h2" delay={0.08} className="h-intro__lead">
          After sunset, the city <em>finds its voice.</em>
        </Reveal>
        <Reveal as="p" delay={0.18} className="h-intro__body">
          As the sun slips behind the Ravi, the great mosque hums with amber
          light, rickshaws thread through the old city, and the smell of
          coal-smoked kebabs drifts past balconies that have watched a thousand
          nights arrive. This is not a website about Lahore.
        </Reveal>
        <Reveal as="p" delay={0.26} className="h-intro__body h-intro__body--strong">
          This is one night, spent inside it.
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================
   01 / THE STREETS
   ============================================================ */
function StreetsChapter() {
  const imgRef = useParallax(-0.1)
  return (
    <section className="h-chapter h-chapter--streets">
      <div className="container h-split h-split--media-right">
        <div className="h-split__copy">
          <Reveal as="p" className="h-chapter__label">
            <SectionLabel>01 / The Streets</SectionLabel>
          </Reveal>
          <h2 className="h-chapter__title">
            <Reveal as="span" className="h-chapter__line" delay={0.02}>The City</Reveal>
            <Reveal as="span" className="h-chapter__line" delay={0.08}>Never</Reveal>
            <Reveal as="span" className="h-chapter__line h-chapter__line--accent" delay={0.14}>Sleeps.</Reveal>
          </h2>
          <Reveal as="p" delay={0.2} className="h-chapter__desc">
            Half-lit alleys, warm shopfronts, the steady purr of rickshaws.
          </Reveal>
          <Reveal delay={0.26} className="h-split__cta">
            <Button to="/streets" variant="outline">
              Wander the Streets
            </Button>
            <span className="h-split__foot-line">
              Let the lanes take you where they will.
            </span>
          </Reveal>
        </div>

        <div className="h-split__media" data-cursor>
          <Reveal className="h-split__frame">
            <img
              ref={imgRef}
              src={images.home.streets}
              alt="A night street of Lahore that never sleeps, glowing under lamps"
              loading="lazy"
            />
          </Reveal>
          <span className="h-split__note">
            <i /> Walled City · lantern hour
          </span>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   STREET GALLERY
   ============================================================ */
function StreetGallerySection() {
  return (
    <section className="h-gallery">
      <div className="container h-gallery__head">
        <Reveal as="p">
          <SectionLabel>Faces of the street</SectionLabel>
        </Reveal>
        <Reveal as="h3" delay={0.06} className="h-gallery__title">
          Every corner keeps a <em>story</em>.
        </Reveal>
        <Reveal as="p" delay={0.14} className="h-gallery__desc">
          The street after dark is one long, unfolding sentence.
        </Reveal>
      </div>

      <div className="container container--wide">
        <StreetGallery
          labelStart="01"
          items={[
            {
              img: images.streets.lanternAlley,
              alt: 'A lantern-lit alley in the Walled City of Lahore',
              title: 'Walled City',
              place: 'Lahore',
              time: '10:42 PM',
            },
            {
              img: images.streets.paintedStreets,
              alt: 'Painted rickshaws resting in an old city lane',
              title: 'The Painted Fleet',
              place: 'Delhi Gate',
              time: '11:18 PM',
            },
            {
              img: images.streets.foodStreet,
              alt: 'Food Street glowing below Lahore Fort at night',
              title: 'Food Street',
              place: 'Heera Mandi Chowk',
              time: '12:07 AM',
            },
            {
              img: images.streets.oldCityCrossing,
              alt: 'A night crossing in the old quarters of Lahore',
              title: 'The Crossing',
              place: 'Anarkali',
              time: '01:02 AM',
            },
          ]}
        />
      </div>
    </section>
  )
}

/* ============================================================
   02 / THE TASTE
   ============================================================ */
function TasteChapter() {
  const imgRef = useParallax(0.08)
  return (
    <section className="h-chapter h-chapter--taste">
      <div className="container h-taste__grid">
        <div className="h-taste__media" data-cursor>
          <Reveal className="h-taste__frame">
            <img
              ref={imgRef}
              src={images.home.taste}
              alt="The taste of Lahore at night — food made to feel like home"
              loading="lazy"
            />
          </Reveal>
          <span className="h-taste__glass-note">
            Some nights begin with <em>chai.</em>
          </span>
        </div>

        <div className="h-taste__copy">
          <Reveal as="p" className="h-chapter__label">
            <SectionLabel variant="ember">02 / The Taste</SectionLabel>
          </Reveal>
          <h2 className="h-chapter__title">
            <Reveal as="span" className="h-chapter__line" delay={0.02}>Lahore</Reveal>
            <Reveal as="span" className="h-chapter__line" delay={0.08}>Tastes Like</Reveal>
            <Reveal as="span" className="h-chapter__line h-chapter__line--accent" delay={0.14}>Home.</Reveal>
          </h2>
          <Reveal as="p" delay={0.2} className="h-chapter__desc">
            Nihari simmered till dawn, kebabs over live coals, chai poured with
            a practised wrist — Lahore eats with its whole heart after dark.
          </Reveal>
          <Reveal delay={0.26} className="h-taste__cta">
            <Button to="/taste" variant="solid">
              Savour the night
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FOOD EXPERIENCE — pinned horizontal
   ============================================================ */
function FoodStrip() {
  return (
    <HorizontalStrip
      label="Late plates · the lantern menu"
      items={[
        {
          img: images.taste.nihari,
          alt: 'Steaming Nihari with ginger and naan in a night kitchen',
          title: 'Nihari',
          caption: 'Simmered from midnight to dawn, cut with ginger and patience.',
        },
        {
          img: images.taste.halwaPuri,
          alt: 'Golden spirals of Halwa Puri glowing under warm lamp light',
          title: 'Halwa Puri',
          caption: 'Golden circles, cardamom halwa — the city’s first sweet kiss.',
        },
        {
          img: images.taste.karahi,
          alt: 'A bubbling karahi of spiced meat simmered over the coals',
          title: 'Karahi',
          caption: 'One wok, whole question — minced, spiced, and finished at the fire.',
        },
        {
          img: images.taste.seekhKebab,
          alt: 'Hand-minced Seekh Kebabs seared at the edge of the flame',
          title: 'Seekh Kebab',
          caption: 'Hand-minced, spiced, and seared at the edge of the fire.',
        },
        {
          img: images.taste.chai,
          alt: 'Cups of chai poured high under the hanging lamps',
          title: 'Chai',
          caption: 'The last ritual — one cup of sweetness to hold the night.',
        },
      ]}
    />
  )
}

/* ============================================================
   QUOTE
   ============================================================ */
function Statement() {
  return (
    <Quote
      lines={['Some cities are visited.', 'Lahore is experienced.']}
      source="After midnight, this is what they mean"
    />
  )
}

/* ============================================================
   03 / HERITAGE
   ============================================================ */
function HeritageChapter() {
  const imgRef = useParallax(-0.1)
  return (
    <section className="h-chapter h-chapter--heritage">
      <div className="container h-split">
        <div className="h-split__media" data-cursor>
          <Reveal className="h-split__frame">
            <img
              ref={imgRef}
              src={images.home.heritage}
              alt="Where Lahore's history still breathes under the night sky"
              loading="lazy"
            />
          </Reveal>
          <span className="h-split__note">
            <i /> Badshahi Mosque · after sunset
          </span>
        </div>

        <div className="h-split__copy h-split__copy--right">
          <Reveal as="p" className="h-chapter__label">
            <SectionLabel variant="moon">03 / The Heritage</SectionLabel>
          </Reveal>
          <h2 className="h-chapter__title">
            <Reveal as="span" className="h-chapter__line" delay={0.02}>Where History</Reveal>
            <Reveal as="span" className="h-chapter__line h-chapter__line--accent" delay={0.08}>Still</Reveal>
            <Reveal as="span" className="h-chapter__line" delay={0.14}>Breathes.</Reveal>
          </h2>
          <Reveal as="p" delay={0.2} className="h-chapter__desc">
            Badshahi, the Fort, the thirteen gates. Stone that has outlived
            empires, still warm under the floodlights.
          </Reveal>
          <Reveal delay={0.26} className="h-split__cta h-split__cta--right">
            <Button to="/heritage" variant="outline">
              Walk the Heritage
            </Button>
            <span className="h-split__foot-line">
              Four centuries of light, still holding the dark at bay.
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   TIMELINE
   ============================================================ */
function NightTimeline() {
  return (
    <Timeline
      label="One night in Lahore"
      moments={[
        {
          time: '8:00 PM',
          title: 'The City Awakens',
          line: 'Shopfronts bloom, one warm bulb after another.',
        },
        {
          time: '10:30 PM',
          title: 'Streets Get Louder',
          line: 'Rickshaws queue and the braziers begin to hiss.',
        },
        {
          time: '12:00 AM',
          title: 'Food & Stories',
          line: 'Every lane stakes its claim in steam.',
        },
        {
          time: '2:00 AM',
          title: 'Lahore Slows Down',
          line: 'The kettle owns the hour; the city leans in close.',
        },
        {
          time: '4:00 AM',
          title: 'The City Breathes',
          line: 'A hush settles — but the lights never truly go out.',
        },
      ]}
    />
  )
}

/* ============================================================
   THE NIGHT ENDS — towards dawn
   ============================================================ */
function NightEnds() {
  const imgRef = useParallax(0.06)
  return (
    <section className="h-end">
      <div className="h-end__media">
        <img
          ref={imgRef}
          src={images.ending.closing}
          alt="The Badshahi Mosque as the first light of dawn begins to gather"
          loading="lazy"
        />
      </div>
      <div className="h-end__dawn" aria-hidden="true" />
      <div className="h-end__vignette" aria-hidden="true" />

      <div className="container h-end__inner">
        <Reveal as="p" className="h-end__label">
          <SectionLabel center variant="moon">04 / The End</SectionLabel>
        </Reveal>
        <h2 className="h-end__title">
          <Reveal as="span" className="h-end__line" delay={0.04}>The night ends.</Reveal>
          <Reveal as="span" className="h-end__line h-end__line--accent" delay={0.12}>
            But Lahore doesn’t.
          </Reveal>
        </h2>
        <Reveal as="p" delay={0.2} className="h-end__sub">
          By the time the first light gathers over the Ravi, you will already
          want the next night.
        </Reveal>
        <Reveal delay={0.26} className="h-end__cta">
          <Button to="/end" variant="ghost">
            See the night through
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <StreetsChapter />
      <StreetGallerySection />
      <TasteChapter />
      <FoodStrip />
      <Statement />
      <HeritageChapter />
      <NightTimeline />
      <NightEnds />
    </>
  )
}