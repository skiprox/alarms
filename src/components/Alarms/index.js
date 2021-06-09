import classnames from 'classnames';

export default function Alarms(props) {
  return (
    <>
      {props.alarm.times.map((elem, index) => {
        return (
          <article className={classnames('alarm flex bb', {
            on: props.second < 50 && index === 0,
            active: index > 0
          })}
          key={index}>
            <div className="w-75 flex flex-column pl2">
              <h1 className="mb0 pb0">{elem}</h1>
              <h5 className="mt1">Alarm</h5>
            </div>
            <div className="w-25 flex justify-center items-center">
              <input className={classnames('alarm__switch', {
                on: index > 0 || props.second < 50
              })}
              type="checkbox" />
            </div>
          </article>
        )
      })}
    </>
  )
}
