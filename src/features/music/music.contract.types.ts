export type Track = {
  id: string
  title: string
  src: string
}

export type Album = {
  id: string
  title: string
  artist: string
  description: string
  coverImage: string
  zipDownload: string
  tracks: Track[]
}
