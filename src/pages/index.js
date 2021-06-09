import { useState, useEffect } from 'react';
import moment from 'moment';
import Head from 'next/head';
import Alarms from 'components/Alarms';

export default function Home() {
  // State
  const [currentTime, setCurrentTime] = useState(moment().format('h:mm a'));
  const [currentSecond, setCurrentSecond] = useState(moment().format('ss'));
  const [alarm, setAlarm] = useState({times: []});
  // Call a set interval,
  // to update timing every second
  useEffect(() => {
    // Populate array of times
    const updateAlarms = () => {
      setAlarm({
        times: [
        moment().add(0, 'minute').format('h:mm'),
        moment().add(1, 'minute').format('h:mm'),
        moment().add(2, 'minute').format('h:mm'),
        moment().add(3, 'minute').format('h:mm'),
        moment().add(4, 'minute').format('h:mm'),
        moment().add(5, 'minute').format('h:mm'),
        moment().add(6, 'minute').format('h:mm'),
        moment().add(7, 'minute').format('h:mm'),
        moment().add(8, 'minute').format('h:mm'),
        moment().add(9, 'minute').format('h:mm'),
        moment().add(10, 'minute').format('h:mm'),
        moment().add(11, 'minute').format('h:mm'),
        moment().add(12, 'minute').format('h:mm')
      ]});
    }
    setInterval(() => {
      // Set the current time, at top of screen
      setCurrentTime(moment().format('h:mm:ss a'));
      setCurrentSecond(moment().format('ss'));
      updateAlarms();
    }, 1000);
  }, []);
  return (
    <div className="container">
      <Head>
        <title>Alarms</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-center">
        <h5 className="ma0 pv2">{currentTime}</h5>
      </header>
      <main>
        <Alarms second={currentSecond} alarm={alarm} />
        {/*<Sound />*/}
      </main>
    </div>
  )
}
