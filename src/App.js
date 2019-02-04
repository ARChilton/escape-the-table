import React, { useState } from 'react'
import styled from '@emotion/styled'
import Timer from './Components/Timer/Timer'
import { Button } from './Components/Button/Button'
import Hints from './Components/Hints/Hints'
import Answers from './Components/Answers/Answers'
import updateCombo from './updateCombo'
import KeyList from './Components/KeyList/KeyList'
import Key from './Components/Key/Key'
import congratsAudio from './audio/congrats.mp3'

const AppGrid = styled.div`
  display: grid;
  align-items: start;
  justify-content: center;
  grid-gap: 25px;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
  height: 100vh;
  grid-template-areas: '. hints' '. hints';
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
  width: 200px;
  margin: auto;
`

const Part = styled('div')`
  font-family: monospace;
`
const Congrats = styled('div')`
  color: ${props => props.theme.color.success};
  font-size: 50px;
  text-align: center;
  margin: auto;
  min-height: 310px;
  align-self: center;
`

const App = () => {
  const [timerRun, toggleTimerRun] = useState(false)
  const [combination, updateCombination] = useState([])
  const [wrongAnswer, toggleWrongAnswer] = useState(false)
  const [part, changePart] = useState(1)
  const [hintToShow, releaseHint] = useState(0)
  const [endGame, toggleEndGame] = useState(null)
  const [congrats, updateCongrats] = useState(false)
  const [endTime, updateEndTime] = useState(null)

  return !endGame ? (
    <AppGrid>
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
              updateEndTime={updateEndTime}
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
            {!congrats ? (
              <Answers
                combo={combination}
                updateCombo={updateCombination}
                toggleWrongAnswer={toggleWrongAnswer}
              />
            ) : (
              <React.Fragment>
                <Congrats>{congrats}</Congrats>
                <audio src={congratsAudio} autoPlay />
              </React.Fragment>
            )}

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
                      changePart,
                      updateCongrats,
                      toggleTimerRun,
                      toggleEndGame
                    )
                  }
                />
              ))}
            </KeyList>
          </React.Fragment>
        )}
      </Grid>

      <Hints hintNumber={hintToShow} />
    </AppGrid>
  ) : (
    <Grid>
      {congrats ? (
        <React.Fragment>
          <Congrats>{congrats}</Congrats>
          <audio src={congratsAudio} />
        </React.Fragment>
      ) : (
        <div>Game Over</div>
      )}
      <TimerContainer>
        <Timer seconds={endTime} />
      </TimerContainer>
    </Grid>
  )
}

export default App
