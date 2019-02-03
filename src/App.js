import React, { useState } from 'react'
import styled from '@emotion/styled'
import Timer from './Components/Timer/Timer'
import { Button } from './Components/Button/Button'
import Hints from './Components/Hints/Hints'
import Answers from './Components/Answers/Answers'
import updateCombo from './updateCombo'
import KeyList from './Components/KeyList/KeyList'
import Key from './Components/Key/Key'

const AppGrid = styled.div`
  display: grid;
  align-items: start;
  justify-content: center;
  grid-gap: 25px;
  grid-template-columns: 2fr 1fr;
  height: 100vh;
`
const Grid = styled('div')`
  display: grid;
  align-items: center;
  grid-gap: 25px;
`
const TopContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 25px;
  justify-items: center;
  align-items: center;
  margin: auto;
  padding-top: 10px;
`

const TimerContainer = styled('div')`
  color: red;
  font-size: 80px;
  text-align: center;
  font-family: digital;
`

const Part = styled('div')`
  font-family: monospace;
`

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
          <TopContainer>
            <Part>
              <div>Part {part}</div>
            </Part>
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

            <div>
              <Button onClick={() => toggleTimerRun(!timerRun)}>
                {timerRun ? 'Pause' : 'Start'}
              </Button>
            </div>
          </TopContainer>
          {timerRun && (
            <React.Fragment>
              <Answers
                combo={combination}
                updateCombo={updateCombination}
                toggleWrongAnswer={toggleWrongAnswer}
              />
              <div style={{ textAlign: 'center' }}>Keys</div>
              <KeyList>
                {[1, 2, 3, 4, 5, 6].map(keyNumber => (
                  <Key
                    key={keyNumber}
                    keyNumber={keyNumber}
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
                  />
                ))}
              </KeyList>
            </React.Fragment>
          )}
        </Grid>
      ) : (
        <Grid>Game Over</Grid>
      )}

      <Hints hintNumber={hintToShow} />
    </AppGrid>
  )
}
export default App
