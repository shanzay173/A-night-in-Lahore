import ChapterHero from '../components/ChapterHero'
import ChapterScene from '../components/ChapterScene'
import StreetGallery from '../components/StreetGallery'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { images } from '../data/images'
import './Streets.css'

/**
 * The vertical street journey: four scenes, one continuous night.
 */
function Journey() {
  return (
    <div id="journey">
      <ChapterScene
        side="left"
        img={images.streets.oldWalledCity}
        alt="Traditional Walled City architecture glowing warm in narrow night lanes"
        eyebrow="Scene 01 · Old Lahore"
        title={
          <>
            The City, <em>as it has</em>
            <br /> always been
          </>
        }
        body="Narrow lanes of limewashed brick, carved jharokas leaning over the dark, and the slow amber of hanging lamps. Layered, patient, lit from within."
      />
      <ChapterScene
        side="right"
        img={images.streets.paintedStreets}
        alt="A colourful painted rickshaw waiting in the Walled City after dusk"
        eyebrow="Scene 02 · The Rickshaw"
        title={
          <>
            Three Wheels, One <em>Brave</em>
            <br /> Headlamp
          </>
        }
        body="A driver who knows every gully by name. To cross the old city after dark is to ride it, carried on the playful hum of a painted machine."
      />
      <ChapterScene
        side="left"
        img={images.streets.foodStreet}
        alt="The busy Food Street below Lahore Fort glowing at night"
        eyebrow="Scene 03 · Street Life"
        title={
          <>
            Between the <em>Cookfires</em>
            <br /> and the Shadows
          </>
        }
        body="Chai stalls hiss over coals, shopfronts spill light onto cobble, and the city walks — slowly, hands in pockets — between one warmth and the next."
      />
      <ChapterScene
        side="right"
        img={images.streets.badshahiNight}
        alt="The Badshahi Mosque glowing under the night sky"
        eyebrow="Scene 04 · A City That Never Sleeps"
        title={
          <>
            Old Lahore <em>Changes Key</em>,
            <br /> Never Closes
          </>
        }
        body="Above the lanes, the great mosque hums with golden light. From daylight din to the hush and glow of midnight — the city only sings softer."
      />
    </div>
  )
}

/**
 * The lantern walk — a pinned horizontal gallery of night streets.
 */
function LanternWalk() {
  return (
    <section className="st-walk">
      <div className="container st-walk__head">
        <Reveal as="p">
          <SectionLabel>As the night walks</SectionLabel>
        </Reveal>
        <Reveal as="h3" delay={0.05} className="st-walk__title">
          One lane, unfurling <em>forever.</em>
        </Reveal>
      </div>
      <div className="st-walk__gallery">
        <StreetGallery
          labelStart="05"
          items={[
            {
              img: images.streets.oldCityCrossing,
              alt: 'An old city crossing at night',
              title: 'Night Crossing',
              place: 'Akbari Mandi',
              time: '01:41 AM',
            },
            {
              img: images.streets.nightLife,
              alt: 'Life spilling out of a shopfront after dark',
              title: 'Penny Arcade',
              place: 'Anarkali',
              time: '02:16 AM',
            },
            {
              img: images.streets.fortNight,
              alt: 'The Lahore Fort lit gold above the night bazaar',
              title: 'The Fort Below',
              place: 'Food Street',
              time: '02:44 AM',
            },
            {
              img: images.streets.walledCityColors,
              alt: 'The painted colours of the Walled City at night',
              title: 'Every Colours',
              place: 'Walled City',
              time: '03:03 AM',
            },
          ]}
        />
      </div>
    </section>
  )
}

/**
 * Transition into the taste of the night.
 */
function Closer() {
  return (
    <section className="st-closer">
      <div className="st-closer__glow" aria-hidden="true" />
      <div className="container st-closer__inner">
        <Reveal as="p" className="st-closer__label">
          <SectionLabel center>The night is hungry</SectionLabel>
        </Reveal>
        <Reveal as="h2" delay={0.06} className="st-closer__title">
          When the alleys dim, <em>the taste</em> wakes up.
        </Reveal>
        <Reveal as="p" delay={0.14} className="st-closer__sub">
          From coal-smoked kebabs to dawn-simmered nihari, the next chapter is
          served hot from the bazaar.
        </Reveal>
        <Reveal delay={0.22} className="st-closer__cta">
          <Button to="/taste" variant="solid">
            Taste of Lahore
          </Button>
          <Button to="/" variant="outline">
            Return to the Night
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

export default function Streets() {
  return (
    <>
      <ChapterHero
        chapter="01"
        label="Chapter One · The Streets"
        lines={[{ text: 'The' }, { em: 'Streets' }]}
        sub="When the sun goes down, Lahore comes alive."
        img={images.streets.paintedStreets}
        video="/images/streets/streets.mp4"
        alt="A painted rickshaw lane in the Walled City at night"
        accent="gold"
        particles="dust"
        scrollTarget="#journey"
        scrollLabel="wander in"
      />
      <Journey />
      <LanternWalk />
      <Closer />
    </>
  )
}