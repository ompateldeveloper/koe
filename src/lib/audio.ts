import * as Tone from "tone";

export const audioEngine = {
    player: null as Tone.Player | null,
    eq: null as Tone.EQ3 | null,
    musicStartTime: 0 as number, // Track when the music starts

    // Initialize with the URL
    async init(url: string) {
        if (this.player) this.dispose(); // Dispose previous instance
        return new Promise<void>((resolve, reject) => {
            this.player = new Tone.Player({
                url,
                autostart: false,
                onload: () => {
                    resolve();
                },
                onerror: (error) => reject(error),
            }).toDestination();
            // this.eq = new Tone.EQ3(0, 0, 0).toDestination();
            // this.player.connect(this.eq);
        });
    },

    // Play the audio
    async play() {
        if (!this.player?.loaded) return console.error("Buffer not loaded yet!");
        await Tone.start(); // Ensure audio context is running
        this.musicStartTime = Tone.now(); // Record the start time
        this.player.start();
    },

    // Stop the audio
    stop() {
        this.player?.stop();
        this.musicStartTime = 0; // Reset the start time
    },

    // Set equalizer settings
    setEQ(low: number, mid: number, high: number) {
        if (!this.eq) return;
        this.eq.low.value = low;
        this.eq.mid.value = mid;
        this.eq.high.value = high;
    },

    // Set volume
    setVolume(value: number) {
        if (this.player) {
            this.player.volume.value = value;
        }
    },

    // Get the current time of the audio
    get getCurrentTime(): number {
        if (!this.player || this.player.state !== "started") return this.musicStartTime;
        return Tone.now() - this.musicStartTime; // Calculate elapsed time
    },

    // Get the total duration of the audio
    getDuration(): number {
        return this.player?.buffer?.duration ?? 0;
    },

    // Check if the audio is playing
    get isPlaying(): boolean {
        return this.player?.state === "started";
    },

    // Check if the buffer is loaded
    async isBufferLoaded(): Promise<boolean | undefined> {
        return this.player?.loaded;
    },

    // Seek to a specific time in the audio
    seek(time: number) {
        if (this.player) {
            this.player.seek(time);
            this.musicStartTime = Tone.now() - time; // Adjust start time for accurate tracking
        }
    },

    // Dispose of the player and EQ
    dispose() {
        this.player?.disconnect();
        this.player?.dispose();
        this.eq?.dispose();
        this.player = null;
        this.eq = null;
        this.musicStartTime = 0; // Reset start time
    },
};
