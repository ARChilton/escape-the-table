import React, { useState } from 'react'
import styled from '@emotion/styled'
import { timer } from 'rxjs'
import Timer from './Components/Timer/Timer'
import { Button, ClearButton } from './Components/Button/Button'

const P1Answer = JSON.stringify([1, 2, 3, 4])

const AppGrid = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 25px;
`

const TimerContainer = styled.div`
  color: red;
  font-size: 54px;
  text-align: center;
  font-family: digital;
`

const updateCombo = (
  key,
  currentCombo,
  part,
  changeCombo,
  toggleWrongAnswer,
  changePart
) => {
  const newCombo = [...currentCombo, key]
  console.log(newCombo)
  if (newCombo.length < 4) {
    toggleWrongAnswer(false)
    return changeCombo(newCombo)
  }
  if (newCombo.length === 4) {
    const newComboString = JSON.stringify(newCombo)
    changeCombo(newCombo)
    if (part === 1) {
      if (newComboString === P1Answer) {
        changePart(2)
      } else {
        toggleWrongAnswer(true)
      }
    }
  }
}

const App = () => {
  const [timerRun, toggleTimerRun] = useState(false)
  const [combination, updateCombination] = useState([])
  const [wrongAnswer, toggleWrongAnswer] = useState(false)
  const [part, changePart] = useState(1)
  const [hintToShow, releaseHint] = useState(0)

  return (
    <AppGrid>
      <TimerContainer>
        <Timer
          seconds={3600}
          timerRun={timerRun}
          wrongAnswer={wrongAnswer}
          releaseHint={releaseHint}
        />
      </TimerContainer>
      <Button onClick={() => toggleTimerRun(!timerRun)}>
        {timerRun ? 'Pause' : 'Start'}
      </Button>
      {[1, 2, 3, 4, 5, 6].map(keyNumber => (
        <ClearButton
          key={keyNumber}
          onClick={() =>
            updateCombo(
              keyNumber,
              combination,
              part,
              updateCombination,
              toggleWrongAnswer,
              changePart
            )
          }
        >
          key {keyNumber}
        </ClearButton>
      ))}

      {console.log(combination)}
    </AppGrid>
  )
}
export default App
