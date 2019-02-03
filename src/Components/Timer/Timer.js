import React from 'react'
import PropTypes from 'prop-types'
import buzzer from '../../audio/buzzer.mp3'

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
    this.timer = 0
    localStorage.seconds = seconds
  }

  loseOneMinute() {
    this.stopTimer()
    this.countDown(60)

    this.startTimer(true)
  }

  countDown(secsToRemove = 1) {
    const { seconds: secs } = this.state
    const { hint, releaseHint, toggleEndGame } = this.props
    // Remove one second, set state so a re-render happens.
    const seconds = secs - secsToRemove
    const time = Timer.secondsToTime(seconds)
    this.setState({
      time,
      seconds,
    })
    const { m: min } = time
    if (hint < 1 && min < 55) {
      releaseHint(1)
    }
    if (hint < 2 && min < 50) {
      releaseHint(2)
    }
    if (hint < 3 && min < 45) {
      releaseHint(3)
    }
    if (hint < 4 && min < 40) {
      releaseHint(4)
    }
    if (hint < 5 && min < 30) {
      releaseHint(5)
    }
    if (hint < 6 && min < 20) {
      releaseHint(6)
    }
    if (hint < 7 && min < 10) {
      releaseHint(7)
    }
    if (hint < 8 && min < 5) {
      releaseHint(8)
    }
    // Check if we're at zero.
    if (seconds < 1) {
      clearInterval(this.timer)
      toggleEndGame(true)
    }
  }

  render() {
    const { wrongAnswer } = this.props
    const { time } = this.state
    const { m: mins, s: secs } = time
    return (
      <div>
        {mins > 9 ? mins : `0${mins}`}:{secs > 9 ? secs : `0${secs}`}
        {wrongAnswer && <audio src={buzzer} autoPlay />}
      </div>
    )
  }
}

Timer.propTypes = {
  seconds: PropTypes.number,
  timerRun: PropTypes.bool,
  wrongAnswer: PropTypes.bool,
  releaseHint: PropTypes.func.isRequired,
  hint: PropTypes.number,
}

Timer.defaultProps = {
  seconds: 3600,
  timerRun: false,
  wrongAnswer: false,
  hint: 0,
}

export default Timer
