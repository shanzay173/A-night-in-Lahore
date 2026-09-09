/**
 * Central image registry — A Night in Lahore.
 *
 * Imagery is grouped by chapter so the story stays consistent:
 * night → streets → taste → heritage → dawn.
 *
 * All files are local (/public/images), served from the same origin, so
 * they can never break. Sources and licenses live in /public/ATTRIBUTION.md.
 */

const local = (name) => `/images/${name}`

export const images = {
  /* ---- The Night (home / hero) ---- */
  night: {
    lanternAlley: local('streets/walled-city-alley.jpeg'),  // lantern alley in the Walled City
    cityGlow: local('hero/badshahi-night.jpg'),             // Lahore skyline glowing after dark
    foodStreet: local('streets/food-street.jpg'),           // Food Street below the Fort at dusk
    oldWalledCity: local('streets/walled-city-lane.jpg'),   // old lanes, warm lamplight
    paintedStreets: local('streets/rickshaw-fort.png'),     // painted rickshaw by the Fort
  },

  /* ---- The Home chapters (side-by-side hero imagery) ---- */
  home: {
    streets: local('home/the city never sleep.jpg'),
    taste: local('home/lahore taste like home.jpeg'),
    heritage: local('home/where histroy still breathes.jpeg'),
  },

  /* ---- The Streets ---- */
  streets: {
    lanternAlley: local('streets/walled-city-alley.jpeg'),
    oldWalledCity: local('streets/walled-city-lane.jpg'),
    paintedStreets: local('streets/rickshaw-fort.png'),
    nightLife: local('streets/shahi-guzargah.png'),
    oldCityCrossing: local('streets/delhi-gate.jpg'),
    foodStreet: local('streets/food-street.jpg'),
    badshahiNight: local('hero/badshahi-night.jpg'),
    fortNight: local('heritage/lahore-fort-night.jpg'),
    walledCityColors: local('streets/walled-city-colors.jpg'),
  },

  /* ---- The Taste ---- */
  taste: {
    nihari: local('taste/nihari.jpg'),                // slow-cooked Nihari bowl
    halwaPuri: local('taste/halwa-puri.jpg'),         // the first sweet of the day
    karahi: local('taste/karahi.jpg'),                // a wok of the night
    seekhKebab: local('taste/seekh-kebab.jpg'),       // hand-minced kebabs
    chai: local('taste/chai-cups.jpg'),               // the kettle hour
    kettleHour: local('taste/the hour that belongs to kettle.png'),
    foodStreet: local('streets/food-street.jpg'),     // dinner, below the Fort
  },

  /* ---- The Heritage ---- */
  heritage: {
    oldCity: local('streets/shahi-guzargah.png'),
    walledCity: local('heritage/wazir-khan.jpg'),
    nightCrossing: local('heritage/minar-e-pakistan-night.jpg'),
    badshahi: local('heritage/badshahi-lahore-02.jpg'),
    fort: local('heritage/lahore-fort-night.jpg'),
    foodStreet: local('heritage/fort-foodstreet-night.jpg'),
    lanternAlley: local('heritage/walled-city-alley-v.jpg'),
  },

  /* ---- The End (dawn) ---- */
  ending: {
    closing: local('ending/badshahi-sunset.jpeg'),
  },
}