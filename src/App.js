import React, { useState } from 'react'
import styled from '@emotion/styled'
import Timer from './Components/Timer/Timer'
import { Button, ClearButton } from './Components/Button/Button'

const AppGrid = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 25px;
`

const TimerContainer = styled.div`
  color: red;
  font-size: 54px;
  text-align: center;
`

const updateCombo = (key, currentCombo, changeCombo) => {
  if (currentCombo.length < 4) {
    return changeCombo([...currentCombo, key])
  }
}

const App = () => {
  const [timerRun, toggleTimerRun] = useState(false)
  const [combination, updateCombination] = useState([])

  return (
    <AppGrid>
      <TimerContainer>
        <Timer seconds={3600} timerRun={timerRun} />
      </TimerContainer>
      <Button onClick={() => toggleTimerRun(!timerRun)}>click</Button>
      {[1, 2, 3, 4, 5, 6].map(keyNumber => (
        <ClearButton
          key={keyNumber}
          onClick={() => updateCombo(keyNumber, combination, updateCombination)}
        >
          key {keyNumber}
        </ClearButton>
      ))}

      {console.log(combination)}
    </AppGrid>
  )
}
export default App
