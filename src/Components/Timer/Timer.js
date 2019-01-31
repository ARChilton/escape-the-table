import React from 'react'
import PropTypes from 'prop-types'

class Timer extends React.Component {
  static secondsToTime(secs) {
    const hours = Math.floor(secs / (60 * 60))

    const divisor_for_minutes = secs % (60 * 60)
    const minutes = Math.floor(divisor_for_minutes / 60)

    const divisor_for_seconds = divisor_for_minutes % 60
    const seconds = Math.ceil(divisor_for_seconds)

    const obj = {
      h: hours,
      m: minutes,
      s: seconds,
    }
    return obj
  }

  constructor(props) {
    super(props)
    let { seconds } = this.props
    if (localStorage.seconds) {
      seconds = +localStorage.seconds
    }
    this.state = { time: {}, seconds }
    this.timer = 0
    this.startTimer = this.startTimer.bind(this)
    this.countDown = this.countDown.bind(this)
    this.runTimer = this.runTimer.bind(this)
  }

  componentDidMount() {
    const { seconds } = this.state
    const timeLeftVar = Timer.secondsToTime(seconds)
    this.setState({ time: timeLeftVar })
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    const { timerRun } = this.props
    console.log(timerRun)
    console.log(timerRun !== prevProps.timerRun)
    if (timerRun !== prevProps.timerRun) {
      this.runTimer(timerRun)
    }
  }

  runTimer(isStart) {
    console.log(`runTimer:${isStart}`)
    return isStart ? this.startTimer() : this.stopTimer()
  }

  startTimer() {
    const { seconds } = this.state
    if (this.timer === 0 && seconds > 0) {
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  stopTimer() {
    const { seconds } = this.state
    clearInterval(this.timer)
    localStorage.seconds = seconds
  }

  countDown() {
    const { seconds: secs } = this.state
    // Remove one second, set state so a re-render happens.
    const seconds = secs - 1
    this.setState({
      time: Timer.secondsToTime(seconds),
      seconds,
    })

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer)
    }
  }

  render() {
    const { time } = this.state
    const { m: mins, s: secs } = time
    return (
      <div>
        {mins > 9 ? mins : `0${mins}`}:{secs > 9 ? secs : `0${secs}`}
      </div>
    )
  }
}

Timer.propTypes = { seconds: PropTypes.number, timerRun: PropTypes.bool }

Timer.defaultProps = {
  seconds: 3600,
  timerRun: false,
}

export default Timer
