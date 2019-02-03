import React, { useState } from 'react'
import styled from '@emotion/styled'
import Timer from './Components/Timer/Timer'
import { Button, ClearButton } from './Components/Button/Button'
import Hints from './Components/Hints/Hints'
import Answers from './Components/Answers/Answers'
import imgRegister from './img/imgRegister'

const P1Answer = JSON.stringify([1, 2, 3, 4])

const AppGrid = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 25px;
  grid-template-columns: 2fr 1fr;
  height: 100vh;
`
const Grid = styled('div')`
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
  changePart,
  reset
) => {
  if (reset) {
    return changeCombo([])
  }
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
        return toggleWrongAnswer(true)
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
  const [endGame, toggleEndGame] = useState(false)
  return (
    <AppGrid>
      {!endGame ? (
        <Grid>
          <TimerContainer>
            <Timer
              seconds={3600}
              timerRun={timerRun}
              wrongAnswer={wrongAnswer}
              releaseHint={releaseHint}
              hint={hintToShow}
              toggleEndGame={toggleEndGame}
            />
          </TimerContainer>
          <Button onClick={() => toggleTimerRun(!timerRun)}>
            {timerRun ? 'Pause' : 'Start'}
          </Button>
          <Answers combo={combination} />
          {timerRun &&
            [1, 2, 3, 4, 5, 6].map(keyNumber => (
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
                <div>key {keyNumber}</div>
                <img
                  src={imgRegister[`key${keyNumber}`]}
                  alt={`key ${keyNumber}`}
                />
              </ClearButton>
            ))}
        </Grid>
      ) : (
        <Grid>Game Over</Grid>
      )}
      <div>
        <Hints hintNumber={hintToShow} />
      </div>
    </AppGrid>
  )
}
export default App
