import { useCallback, useEffect, useRef, useState } from "react"
import type { Track } from "../music.contract.types"

export type PlayerState = {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  currentTime: number
  duration: number
}

export function useAudioPlayer(tracks: Track[]) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
  })

  const currentTrackIndex = tracks.findIndex(
    (t) => t.id === state.currentTrack?.id,
  )

  const play = useCallback(
    (track: Track) => {
      const audio = audioRef.current ?? new Audio()

      if (state.currentTrack?.id === track.id) {
        setState((prev) => ({ ...prev, isPlaying: !audio.paused }))

        if (audio.paused) return audio.play()
        return audio.pause()
      }

      audio.src = track.src
      setState((prev) => ({
        ...prev,
        currentTrack: track,
        isPlaying: true,
        progress: 0,
        currentTime: 0,
        duration: 0,
      }))
    },
    [state.currentTrack],
  )

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!state.currentTrack) {
      if (tracks.length > 0) play(tracks[0] as Track)
      return
    }
    if (audio.paused) {
      audio.play()
      setState((prev) => ({ ...prev, isPlaying: true }))
    } else {
      audio.pause()
      setState((prev) => ({ ...prev, isPlaying: false }))
    }
  }, [state.currentTrack, tracks, play])

  const seek = useCallback((percent: number) => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.duration) {
      audio.currentTime = (percent / 100) * audio.duration
    }
  }, [])

  const next = useCallback(() => {
    if (currentTrackIndex < tracks.length - 1) {
      play(tracks[currentTrackIndex + 1] as Track)
    }
  }, [currentTrackIndex, tracks, play])

  const prev = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }
    if (currentTrackIndex > 0) {
      play(tracks[currentTrackIndex - 1] as Track)
    }
  }, [currentTrackIndex, tracks, play])

  useEffect(() => {
    audioRef.current = new Audio()
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => {
      if (audio.duration) {
        setState((prev) => ({
          ...prev,
          currentTime: audio.currentTime,
          progress: (audio.currentTime / audio.duration) * 100,
        }))
      }
    }

    const onLoadedMetadata = () => {
      setState((prev) => ({ ...prev, duration: audio.duration }))
    }

    const onEnded = () => {
      if (currentTrackIndex < tracks.length - 1) {
        play(tracks[currentTrackIndex + 1] as Track)
      } else {
        setState((prev) => ({
          ...prev,
          isPlaying: false,
          progress: 0,
          currentTime: 0,
        }))
      }
    }

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("loadedmetadata", onLoadedMetadata)
    audio.addEventListener("ended", onEnded)

    if (state.isPlaying) audio.play()

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("loadedmetadata", onLoadedMetadata)
      audio.removeEventListener("ended", onEnded)
      audio.pause()
    }
  }, [currentTrackIndex, tracks, play, state.isPlaying])

  return {
    state,
    play,
    togglePlay,
    seek,
    next,
    prev,
  }
}
