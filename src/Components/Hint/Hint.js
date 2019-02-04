import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import audio from '../../audio/hint.mp3'

const HintCard = styled('div')`
  border: 1px solid black;
  margin: auto;
  min-height: 50px;
  padding: 10px;
  margin-top: 10px;
  text-align: center;
  background-color: #fff;
  border-radius: 3px;
  display: grid;
  grid-gap: 5px;
  margin-bottom: 5px;
`
const Img = styled('img')`
  max-width: 100%;
`

const Warning = styled('div')`
  color: ${props => props.theme.color.danger};
`

const Hint = ({ hintNumber, text, answer, part, img }) => {
  const [flipped, toggleFlip] = useState(false)

  return !flipped ? (
    <HintCard onClick={() => toggleFlip(true)}>
      <div>Hint {hintNumber}</div>
      <small>click to flip</small>
      {answer && <Warning>Answer to part {part}</Warning>}
      <audio src={audio} autoPlay />
    </HintCard>
  ) : (
    <HintCard>
      <div>Hint {hintNumber}</div>
      {answer && <Warning>Answer to part {part}</Warning>}

      {text && <div>{text}</div>}
      {img && <Img src={img} alt="hint" />}
    </HintCard>
  )
}

Hint.propTypes = {
  hintNumber: PropTypes.number,
  text: PropTypes.string,
  answer: PropTypes.bool,
  part: PropTypes.number,
  img: PropTypes.string,
}

Hint.defaultProps = {
  hintNumber: null,
  text: null,
  answer: null,
  part: 1,
  img: null,
}

export default Hint
