import * as Tone from "tone";

export const audioEngine = {
    player: null as Tone.Player | null,
    eq: null as Tone.EQ3 | null,

    // Initialize with the URL
    init(url: string) {
        if (this.player) this.dispose(); // Dispose previous instance

        this.player = new Tone.Player({
            url,
            autostart: false,
            onload: () => console.log("Audio Loaded"),
        });
        

        this.eq = new Tone.EQ3(0, 0, 0).toDestination(); // Equalizer
        this.player.connect(this.eq);
    },

    // Play the audio
    async play() {
        if (!this.player?.loaded) return console.error("Buffer not loaded yet!");
        await Tone.start(); // Ensure audio context is running
        this.player.start();
    },

    // Stop the audio
    stop() {
        this.player?.stop();
    },

    // Set equalizer settings
    setEQ(low: number, mid: number, high: number) {
        if (!this.eq) return;
        this.eq.low.value = low;
        this.eq.mid.value = mid;
        this.eq.high.value = high;
    },

    // Get the current time of the audio
    getCurrentTime(): number {
        return this.player?.state === "started" ? this.player?.now() ?? 0 : 0;
    },

    // Get the total duration of the audio
    getDuration(): number {
        console.log(this.player?.buffer?.duration);

        return this.player?.buffer?.duration ?? 0;
    },

    // Check if the audio is playing
    get isPlaying(): boolean {
        return this.player?.state === "started";
    },
    isBufferLoaded(): boolean {
        
        return this.player?.loaded ?? false;
    },
    seek(time: number) {
        if (this.player) {
            this.player.seek(time);
        }
    },

    dispose() {
        this.player?.disconnect();
        this.player?.dispose();
        this.eq?.dispose();
        this.player = null;
        this.eq = null;
    },
};
