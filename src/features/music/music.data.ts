import type { Album } from "./music.contract.types"

export const ALBUMS: Album[] = [
  {
    id: "christian-music-english",
    title: "Christian Music in English",
    artist: "James E. Speer and Friends",
    description:
      "A collection of original Christian hymns and songs written and performed by James E. Speer and Friends.",
    coverImage:
      "/files/music/Christian Music in English/James E. Speer and Friends - Christian Music in English.png",
    zipDownload: "/files/music/Christian Music in English.zip",
    tracks: [
      {
        id: "eng-01",
        title: "Sing Unto the Lord!",
        src: "/files/music/Christian Music in English/01 - James E. Speer and Friends - Sing Unto the Lord! (Written by James E. Speer).mp3",
      },
      {
        id: "eng-02",
        title: "In His Time",
        src: "/files/music/Christian Music in English/02 - James E. Speer and Friends - In His Time-.mp3",
      },
      {
        id: "eng-03",
        title: "He Gave Me Everything",
        src: "/files/music/Christian Music in English/03 - James E. Speer and Friends - He Gave Me Everything (written by Kimberly Speer).mp3",
      },
      {
        id: "eng-04",
        title: "Pierced for Thee",
        src: "/files/music/Christian Music in English/04 - James E. Speer and Friends - Pierced for Thee (written by James E. Speer).mp3",
      },
      {
        id: "eng-05",
        title: "Live Above the Clouds",
        src: "/files/music/Christian Music in English/05 - James E. Speer and Friends - Live Above the Clouds (written by James E. Speer).mp3",
      },
      {
        id: "eng-06",
        title: "To the King Alone",
        src: "/files/music/Christian Music in English/06 - James E. Speer and Friends - To the King Alone.mp3",
      },
      {
        id: "eng-07",
        title: "You Told Me Not!",
        src: "/files/music/Christian Music in English/07 - James E. Speer and Friends - You Told Me Not! (Written by James E. Speer).mp3",
      },
    ],
  },
  {
    id: "christian-music-twi",
    title: "Christian Music in Twi",
    artist: "Voices of Praise and others",
    description:
      "Christian worship songs performed in Twi by Voices of Praise and other artists.",
    coverImage:
      "/files/music/Christian Music in Twi/Voices of Praise and others - Christian Music in Twi.png",
    zipDownload: "/files/music/Christian Music in Twi.zip",
    tracks: [
      {
        id: "twi-01",
        title: "In the Gap I'll Stand",
        src: "/files/music/Christian Music in Twi/01 - Voices of Praise and others - In the Gap I'll Stand - Twi.mp3",
      },
      {
        id: "twi-02",
        title: "Just Pray",
        src: "/files/music/Christian Music in Twi/02 - Voices of Praise and others - Just Pray - Twi.mp3",
      },
      {
        id: "twi-03",
        title: "Without the Cross",
        src: "/files/music/Christian Music in Twi/03 - Voices of Praise and others - Without the Cross - Twi.mp3",
      },
    ],
  },
]
