import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import moment from 'moment';
import Head from 'next/head';
import Alarms from 'components/Alarms';
import Sound from 'components/Sound';
import GlitchText from 'helpers/glitch';

export default function Home() {
  // Ref
  const updateTimeout = useRef(30);
  const globalCounter = useRef(-1);
  // State
  const [currentTime, setCurrentTime] = useState(moment().format('h:mm a'));
  const [currentSecond, setCurrentSecond] = useState(moment().format('ss'));
  const [alarm, setAlarm] = useState({times: []});
  const alarmTimesRef = useRef(null);

  const startSound = () => {
    Tone.start();
    const duration = updateTimeout.current - 5;
    let counter = 0;
    let alarmSound = null;
    // Create array of times, first time
    const createAlarms = () => {
      console.log('we are creating the alarms');
      const glitchArr = GlitchText.split('');
      let timesArr = [];
      for (let i = 0; i < 14; i++) {
        let str = '';
        for (let j = 0; j < 40; j++) {
          str += `${glitchArr[Math.floor(Math.random() * glitchArr.length)]} `;
        }
        timesArr.push(str);
      }
      alarmTimesRef.current = timesArr;
      setAlarm({
        times: timesArr
      });
    }
    // Populate array of times
    const updateAlarms = () => {
      console.log('we are updating the alarms');
      const glitchArr = GlitchText.split('');
      let timesArr = alarmTimesRef.current.slice(1, alarmTimesRef.current.length);
      let str = '';
      for (let j = 0; j < 40; j++) {
        str += `${glitchArr[Math.floor(Math.random() * glitchArr.length)]} `;
      }
      timesArr.push(str);
      alarmTimesRef.current = timesArr;
      setAlarm({
        times: timesArr
      });
    }
    setInterval(() => {
      globalCounter.current = (globalCounter.current + 1) % updateTimeout.current;
      if (globalCounter.current === 0) {
        if (counter === 0) {
          createAlarms();
        } else {
          updateAlarms();
        }
        alarmSound = new Sound(duration, counter);
      } else if (globalCounter.current === duration) {
        console.log('we are at the duration and we are killing the alarm');
        alarmSound.stop();
        alarmSound = null;
        counter++;
      }
      setCurrentSecond(globalCounter.current);
    }, 1000);
  }
  return (
    <div className="container">
      <Head>
        <title>Alarms</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <header className="flex justify-center">
        <h5 className="ma0 pv2 blur" onClick={startSound}>ṕ̷̦̼̹̜̫̲̼̰̘͙̻̳͗͐̐̌̾̾͐̚̕͜͜͜͠o̴̻͖͐͒̍́͋͋̎̊̏͝͝s̸͎̩͓͈̿̾̎̒̓̉̆̿͝͝i̵̧̥̞̝͉̻̥̗͚̪̾̓̑̽͋̂̽̔̀̿͝t̶̨̢̡͖̮̭̫̙̗̮̪͙̮̺̿͆́̄̓͊͂̅͑̽͒̉͜͝i̸̛̜͎̋͋͛̾̒͗͆͘͝͝͝ơ̷̪̾͑̏̿̄̽̎̈̌̏̽̚̚ņ̴̧̦͚͚̰̗̪̞̀̌̊̄͌̎͒͐̉͑̓͘ ̴̖̟̼̣̝̐͝ͅt̴̰̙͚͉̤̞̭͇̙͍̼̹̂̇͗̉̽͛̚͜ḥ̶̠̙̆̈́͐̉̅̅ã̷̧̢̨̹̲̤͇͕͙̖̬̃̈́̋̀̾̓̏̎̇̌</h5>
      </header>
      <main>
        <Alarms second={currentSecond} alarm={alarm} duration={updateTimeout.current - 5} />
      </main>
    </div>
  )
}
