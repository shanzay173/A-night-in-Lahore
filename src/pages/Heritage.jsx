import ChapterHero from '../components/ChapterHero'
import ChapterScene from '../components/ChapterScene'
import HorizontalStrip from '../components/HorizontalStrip'
import SectionLabel from '../components/SectionLabel'
import Reveal from '../components/Reveal'
import useParallax from '../animations/useParallax'
import Button from '../components/Button'
import { images } from '../data/images'
import './Heritage.css'

/**
 * The five monuments of the night — one scene each, laid like episodes.
 */
function Journey() {
  return (
    <div id="journey">
      <ChapterScene
        side="left"
        img={images.heritage.walledCity}
        alt="Mughal-era Walled City architecture glowing in narrow night lanes"
        eyebrow="Scene 01 · The Walled City"
        title={
          <>
            A City Inside <em>Its Walls</em>
          </>
        }
        meta="dating back to 1575"
        body="Behind its thirteen gates, Lahore keeps a secret: streets arranged like a living maze, where every turn is older than memory. At night the havelis exhale their lamplight, and the city breathes exactly as it did when its first dust was laid."
      />
      <ChapterScene
        side="right"
        img={images.heritage.badshahi}
        alt="The Badshahi Mosque glowing warmly under the night sky"
        eyebrow="Scene 02 · Badshahi Mosque"
        title={
          <>
            The Emperors’ <em>Prayer</em>
          </>
        }
        meta="built 1673 · Aurangzeb Alamgir"
        body="The great red gates and marble domes hold the largest courtyard ever raised for prayer. Come sundown the floodlights rise from its walls, and the mosque becomes a lantern — vast, silent, and sure of a thousand nights before this one."
      />
      <ChapterScene
        side="left"
        img={images.heritage.fort}
        alt="The Lahore Fort lit gold beside the night market below"
        eyebrow="Scene 03 · Lahore Fort"
        title={
          <>
            Shahjahani <em>Balconies</em>
          </>
        }
        meta="a UNESCO World Heritage citadel"
        body="Six centuries of kings left their mark in its stone — the Sheesh Mahal of mirror-work, the Picture Wall, gardens cut into geometry. Above the cookfires of the bazaar, the fort keeps watch like a patient ancestor."
      />
      <ChapterScene
        side="right"
        img={images.heritage.oldCity}
        alt="An old city street threading through the gate quarters after dusk"
        eyebrow="Scene 04 · Delhi Gate"
        title={
          <>
            The Streets <em>Still Talk</em>
          </>
        }
        meta="where the bazaars have never slept"
        body="Once the grand entrance for caravans and courts, Delhi Gate now frames a ribbon of lanterns, spice sacks, and carpet shops leaning into the dark. The oldest commerce of Lahore still gathers here, whispering to the modern night."
      />
      <ChapterScene
        side="left"
        img={images.heritage.nightCrossing}
        alt="A night crossing beneath the illuminated towers of Lahore"
        eyebrow="Scene 05 · Minar-e-Pakistan"
        title={
          <>
            The Tower of a <em>Nation’s Dawn</em>
          </>
        }
        meta="unveiled 1968 · a monument to freedom"
        body="Where the Lahore Resolution was signed, a slender tower of marble and steel climbs toward the stars. It is the youngest of these monuments, yet it crowns them — the night’s stone story ending not in the past, but at the beginning of a nation."
      />
    </div>
  )
}

/**
 * Stone after midnight — the monuments, gliding past like a slow shot.
 */
function StoneStrip() {
  return (
    <HorizontalStrip
      label="Stone after midnight"
      items={[
        {
          img: images.heritage.badshahi,
          alt: 'The Badshahi Mosque under a deep night sky',
          title: 'Badshahi Mosque',
          caption: '1673 — the largest courtyard ever raised for prayer.',
        },
        {
          img: images.heritage.fort,
          alt: 'The Lahore Fort glowing gold above the night bazaar',
          title: 'Lahore Fort',
          caption: 'Six centuries of kings, mirrored in Sheesh Mahal.',
        },
        {
          img: images.heritage.foodStreet,
          alt: 'Food Street glowing beneath the fort at night',
          title: 'Food Street',
          caption: 'History and the living city beneath one sky.',
        },
        {
          img: images.heritage.lanternAlley,
          alt: 'A lantern-lit alley under the night sky',
          title: 'The Old Gates',
          caption: 'Where the kingdom first stepped into the city.',
        },
      ]}
    />
  )
}

/**
 * A closing scene that binds old light to new: history steps into the modern
 * night.
 */
function Finale() {
  const imgRef = useParallax(0.08)
  return (
    <section className="he-finale">
      <div className="he-finale__media">
        <img
          ref={imgRef}
          src={images.heritage.foodStreet}
          alt="Historic Lahore glowing with modern night life below its ancient walls"
        />
      </div>
      <div className="he-finale__glow" aria-hidden="true" />
      <div className="container he-finale__inner">
        <Reveal as="p" className="he-finale__eyebrow">
          <SectionLabel center variant="moon">Old light, new night</SectionLabel>
        </Reveal>
        <Reveal as="h2" delay={0.06} className="he-finale__title">
          The stones have kept their <em>vigil</em>; now they watch the city glow.
        </Reveal>
        <Reveal as="p" delay={0.14} className="he-finale__sub">
          Beneath these walls the night has only changed its costume. The same
          moon that fell on emperors now falls on café courtyards and food
          streets — history and the living city, one sky.
        </Reveal>
        <Reveal delay={0.22} className="he-finale__cta">
          <Button to="/end" variant="solid">
            The Night Ends
          </Button>
          <Button to="/taste" variant="outline">
            Back to the Taste
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

export default function Heritage() {
  return (
    <>
      <ChapterHero
        chapter="03"
        label="Chapter Three · The Heritage"
        lines={[{ text: 'The City' }, { em: 'of Stone' }]}
        sub="Four centuries of light, still holding the dark at bay."
        img={images.heritage.lanternAlley}
        video="/images/heritage/heritage.mp4"
        alt="A lantern-lit alley of the old city beneath the night sky"
        accent="moon"
        particles="mote"
        scrollTarget="#journey"
        scrollLabel="enter the city"
      />
      <Journey />
      <StoneStrip />
      <Finale />
    </>
  )
}