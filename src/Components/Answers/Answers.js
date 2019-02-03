import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Key from '../Key/Key'
import { Button } from '../Button/Button'

const Container = styled('div')`
  display: grid;
  padding: 25px;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
  justify-items: center;
  min-height: 310px;
`

const removeKey = (combo, updateCombo, i, toggleWrongAnswer) => {
  const newCombo = [...combo]
  newCombo[i] = null
  toggleWrongAnswer(false)
  return updateCombo(newCombo)
}

const Answers = ({ combo, updateCombo, toggleWrongAnswer }) => (
  <Container>
    {['1', '2', '3', '4'].map((key, i) => (
      <div key={key}>
        <div>{key}</div>
        {combo[i] ? (
          <Key
            keyNumber={combo[i]}
            onClick={() => removeKey(combo, updateCombo, i, toggleWrongAnswer)}
          />
        ) : null}
      </div>
    ))}
    <div>
      <Button
        onClick={() => {
          updateCombo([])
          toggleWrongAnswer(false)
        }}
      >
        reset
      </Button>
    </div>
  </Container>
)

Answers.propTypes = {
  combo: PropTypes.arrayOf(PropTypes.number),
  updateCombo: PropTypes.func.isRequired,
}

Answers.defaultProps = {
  combo: [],
}
export default Answers
