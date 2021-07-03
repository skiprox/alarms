import * as Tone from "tone";

// Variables
const AMNotes = ["C5", "D5", "B5", "G5"];
const FMNotes = ["C2", "B2", "G2", "D2", "E2"];

export default class Sound {
  constructor(duration, counter) {
    this.notesCounter = counter;
    this.duration = duration;
    this.localCounter = 0;
    this.run();
  }
  run() {
    // create two monophonic synths
    this.createBassSynth();
    this.createLeadSynth();
    console.log("whats the notes counter", this.notesCounter);
    //play a note every quarter-note
    const loopA = new Tone.Loop((time) => {
      this.lowSynth.triggerAttackRelease(
        FMNotes[this.notesCounter & FMNotes.length],
        "8n",
        time
      );
    }, "4n").start(0);
    //play another note every off quarter-note, by starting it "8n"
    const loopB = new Tone.Loop((time) => {
      this.localCounter++;
      console.log(time, this.localCounter);
      // this.highSynth.envelope.release += 0.25;
      this.highSynth.volume.value += 0.1;
      // this.highSynth.envelope.attack -= 0.0001;
      // this.highSynth.oscillator.count += 1;
      this.highSynth.triggerAttackRelease(
        AMNotes[this.notesCounter % AMNotes.length],
        "3n",
        time
      );
    }, "4n").start("8n");
    Tone.Transport.bpm.value = 240;
    // the loops start when the Transport is started
    Tone.Transport.start();
  }
  createBassSynth() {
    this.lowSynth = new Tone.FMSynth().toDestination();
    this.lowSynth.volume.value = 0;
    this.lowSynth.oscillator.partialCount = 5;
  }
  createLeadSynth() {
    this.highSynth = new Tone.FMSynth().toDestination();
    this.highSynth.volume.value = 5;
    this.highSynth.modulationEnvelope.sustain = 0.5;
    this.highSynth.oscillator.partialCount = 2;
    this.highSynth.envelope.attack = 0.01;
  }
  stop() {
    console.log("we call stop");
    Tone.Transport.stop();
    Tone.Transport.cancel();
  }
}
