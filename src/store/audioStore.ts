import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AudioState {
    currentTrack: {
        id: string;
        name: string;
        url: string;
        artist?: string;
        cover?: string;
        duration?: number;
    } | null;
    playlist: Array<{
        id: string;
        name: string;
        url: string;
        artist?: string;
        cover?: string;
        duration?: number;
    }>;
    setTrack: (track: AudioState["currentTrack"]) => void;
    addToPlaylist: (track: AudioState["playlist"][0]) => void;
    removeFromPlaylist: (id: string) => void;
    clearPlaylist: () => void;
}

const useAudioStore = create<AudioState>()(
    persist(
        (set) => ({
            currentTrack: null,
            playlist: [],
            setTrack: (track) => set({ currentTrack: track }),
            addToPlaylist: (track) => set((state) => ({ playlist: [...state.playlist, track] })),
            removeFromPlaylist: (id) =>
                set((state) => ({
                    playlist: state.playlist.filter((track) => track.id !== id),
                })),
            clearPlaylist: () => set({ playlist: [] }),
        }),
        {
            name: "audio-storage",
        }
    )
);

export default useAudioStore;
