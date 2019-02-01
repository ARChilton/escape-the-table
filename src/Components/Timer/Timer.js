import React from 'react'
import PropTypes from 'prop-types'

class Timer extends React.PureComponent {
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
    this.loseOneMinute = this.loseOneMinute.bind(this)
  }

  componentDidMount() {
    const { seconds } = this.state
    const timeLeftVar = Timer.secondsToTime(seconds)
    this.setState({ time: timeLeftVar })
  }

  componentDidUpdate(prevProps) {
    const { timerRun, wrongAnswer } = this.props
    if (timerRun !== prevProps.timerRun) {
      this.runTimer(timerRun)
    }
    if (wrongAnswer && wrongAnswer !== prevProps.wrongAnswer) {
      this.loseOneMinute()
    }
  }

  runTimer(isStart) {
    return isStart ? this.startTimer() : this.stopTimer()
  }

  startTimer(force) {
    const { seconds } = this.state
    if ((this.timer === 0 && seconds > 0) || force) {
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  stopTimer() {
    const { seconds } = this.state
    clearInterval(this.timer)
    localStorage.seconds = seconds
  }

  loseOneMinute() {
    this.stopTimer()
    this.countDown(60)

    this.startTimer(true)
  }

  countDown(secsToRemove = 1) {
    const { seconds: secs } = this.state
    const { hint, releaseHint } = this.props
    // Remove one second, set state so a re-render happens.
    const seconds = secs - secsToRemove
    const time = Timer.secondsToTime(seconds)
    this.setState({
      time,
      seconds,
    })

    switch (time.m) {
      case 54:
        return hint < 1 && releaseHint(1)
      case 49:
        return hint < 2 && releaseHint(2)
      case 44:
        return hint < 3 && releaseHint(3)
      case 39:
        return hint < 4 && releaseHint(4)
      case 34:
        return hint < 5 && releaseHint(5)
      default:
    }
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

Timer.propTypes = {
  seconds: PropTypes.number,
  timerRun: PropTypes.bool,
  wrongAnswer: PropTypes.bool,
  releaseHint: PropTypes.func.isRequired,
}

Timer.defaultProps = {
  seconds: 3600,
  timerRun: false,
  wrongAnswer: false,
}

export default Timer
