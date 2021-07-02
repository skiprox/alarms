import * as Tone from 'tone';

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
    console.log('whats the notes counter', this.notesCounter);
    //play a note every quarter-note
    const loopA = new Tone.Loop(time => {
      this.fmSynth.triggerAttackRelease(FMNotes[this.notesCounter & FMNotes.length], "8n", time);
    }, "4n").start(0);
    //play another note every off quarter-note, by starting it "8n"
    const loopB = new Tone.Loop(time => {
      this.localCounter++;
      console.log(time, this.localCounter);
      if (this.localCounter > 10) {
        this.amSynth.envelope.release += 0.25;
        this.amSynth.volume.value += 0.1;
        this.amSynth.oscillator.count += 1;
      }
      this.amSynth.triggerAttackRelease(AMNotes[this.notesCounter % AMNotes.length], "8n", time);
    }, "4n").start("8n");
    Tone.Transport.bpm.value = 240;
    // the loops start when the Transport is started
    Tone.Transport.start();
  }
  createBassSynth() {
    this.fmSynth = new Tone.FMSynth().toDestination();
    this.fmSynth.volume.value = -16;
    this.fmSynth.oscillator.partialCount = 5;
  }
  createLeadSynth() {
    this.amSynth = new Tone.AMSynth().toDestination();
    this.amSynth.volume.value = 5;
    this.amSynth.envelope.release = 8.3;
  }
  stop() {
    console.log('we call stop');
    Tone.Transport.stop();
    Tone.Transport.cancel();
  }
}
