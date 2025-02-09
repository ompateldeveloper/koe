"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Play, Pause, Volume2, VolumeX, Repeat, Shuffle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import useAudioStore from "@/store/audioStore";
import { audioEngine } from "@/lib/audio"; // Import the updated audio engine

export default function Footer() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const [duration, setDuration] = useState(0); // Total duration of the audio
    const [currentTime, setCurrentTime] = useState(0); // Current playback time
    const { currentTrack, setTrack } = useAudioStore();

    // Initialize the player with the provided URL
    useEffect(() => {
        if (id) {
            fetch(`/api/music/${id}`)
                .then((res) => res.json())
                .then(async (data) => {
                    setTrack(data);
                    await audioEngine.init(data.url); // Initialize the audio engine
                    setDuration(audioEngine.getDuration()); // Set duration after initialization
                    // audioEngine.play();
                })
                .catch((err) => console.error("Error fetching track:", err));
        }
    }, [id]);

    // Track the current time of the audio every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(audioEngine.getCurrentTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const togglePlay = () => {
        if (audioEngine.isPlaying) {
            audioEngine.stop();
        } else {
            audioEngine.play();
        }
        setIsPlaying(audioEngine.isPlaying);
    };

    const handleSeek = (value: number[]) => {
        const seekValue = value[0];
        audioEngine.seek(seekValue); // Seek to the value
        setCurrentTime(seekValue); // Update current time state
    };

    return (
        <footer className="bg-background border-t border-t-zinc-800">
            <div className="w-full px-4">
                <div className="h-20 flex items-center justify-between">
                    {/* Track Info */}
                    <div className="flex items-center gap-4 w-1/4">
                        <div className="w-14 h-14 bg-amber-100 rounded-md flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium truncate">{currentTrack?.name || "Track Name"}</span>
                            <span className="text-xs text-muted-foreground truncate">{currentTrack?.artist || "Artist Name"}</span>
                        </div>
                    </div>

                    {/* Playback Controls */}
                    <div className="flex flex-col items-center gap-3 w-2/4">
                        <div className="flex items-center gap-4">
                            <button className="text-muted-foreground hover:text-foreground transition">
                                <Shuffle className="h-5 w-5" />
                            </button>
                            <button
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-105 transition"
                                onClick={togglePlay}
                                // disabled={!audioEngine.isBufferLoaded()}
                            >
                                {audioEngine.isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                            </button>
                            <button className="text-muted-foreground hover:text-foreground transition">
                                <Repeat className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Audio Duration and Progress */}
                        <div className="w-full flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                                {Math.floor(currentTime / 60)}:{String(currentTime % 60).padStart(2, "0")}
                            </span>
                            <Slider value={[currentTime]} max={duration} step={1} onValueChange={handleSeek} />
                            <span className="text-xs text-muted-foreground">
                                {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, "0")}
                            </span>
                        </div>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2 w-1/4 justify-end">
                        <button className="text-muted-foreground hover:text-foreground transition" onClick={() => setIsMuted(!isMuted)}>
                            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </button>
                        <Slider value={[isMuted ? 0 : volume]} max={100} step={1} className="!w-30" onValueChange={(value) => setVolume(value[0])} />
                    </div>
                </div>
            </div>
        </footer>
    );
}
