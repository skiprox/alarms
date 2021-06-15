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
      this.synthA.triggerAttackRelease(FMNotes[this.notesCounter & FMNotes.length], "8n", time);
    }, "4n").start(0);
    //play another note every off quarter-note, by starting it "8n"
    const loopB = new Tone.Loop(time => {
      this.localCounter++;
      if (this.localCounter > 80) {
        this.synthB.envelope.release += 0.5;
        this.synthB.volume.value += 0.1;
      }
      this.synthB.triggerAttackRelease(AMNotes[this.notesCounter % AMNotes.length], "8n", time);
    }, "4n").start("8n");
    Tone.Transport.bpm.value = 240;
    // the loops start when the Transport is started
    Tone.Transport.start();
  }
  createBassSynth() {
    this.synthA = new Tone.FMSynth().toDestination();
    this.synthA.oscillator.partialCount = 5;
  }
  createLeadSynth() {
    this.synthB = new Tone.AMSynth().toDestination();
    this.synthB.volume.value = 14;
    this.synthB.envelope.release = 8.3;
  }
  stop() {
    console.log('we call stop');
    Tone.Transport.stop();
    Tone.Transport.cancel();
  }
}
