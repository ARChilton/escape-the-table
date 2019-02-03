import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import audio from '../../audio/hint.mp3'

const HintCard = styled('div')`
  border: 1px solid black;
  min-height: 50px;
  padding: 10px;
  margin-top: 10px;
  text-align: center;
  background-color: #fff;
  border-radius: 3px;
  display: grid;
  grid-gap: 5px;
`

const Hint = ({ hintNumber, hintText }) => {
  const [flipped, toggleFlip] = useState(false)

  return !flipped ? (
    <HintCard onClick={() => toggleFlip(true)}>
      <div>Hint {hintNumber}</div>
      <small>click to flip</small>
      <audio src={audio} autoPlay />
    </HintCard>
  ) : (
    <HintCard>
      <div>Hint {hintNumber}</div>
      <div>{hintText}</div>
    </HintCard>
  )
}

Hint.propTypes = {
  hintNumber: PropTypes.number,
  hintText: PropTypes.string,
}

Hint.defaultProps = {
  hintNumber: null,
  hintText: null,
}

export default Hint