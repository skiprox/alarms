import { useState, useEffect } from 'react';
import Head from 'next/head';
import classnames from 'classnames';
import moment from 'moment';

export default function Home() {
  // State
  const [currentTime, setCurrentTime] = useState(moment().format('h:mm a'));
  const [alarm, setAlarm] = useState({times: []});
  // Call a set interval,
  // to update timing every second
  useEffect(() => {
    // Populate array of times
    const updateTimes = () => {
      setAlarm({
        second: moment().format('ss'),
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
      updateTimes();
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
        {alarm.times.map((elem, index) => {
          return (
            <article className={classnames('alarm flex bb', {
              on: alarm.second < 50 && index === 0,
              active: index > 0
            })}
            key={index}>
              <div className="w-75 flex flex-column pl2">
                <h1 className="mb0 pb0">{elem}</h1>
                <h5 className="mt1">Alarm</h5>
              </div>
              <div className="w-25 flex justify-center items-center">
                <input class={classnames('alarm__switch', {
                  on: index > 0 || alarm.second < 50
                })}
                type="checkbox" />
              </div>
            </article>
          )
        })}
      </main>
    </div>
  )
}
