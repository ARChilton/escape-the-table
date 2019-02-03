import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import hints from '../../data/hints'
import Hint from '../Hint/Hint'

const HintContainer = styled('div')`
  /* overflow: scroll; */
  height: 100%;
  padding: 10px;
  text-align: center;
  border-left: 3px solid green;
  background-color: lightgreen;
  height: 100vh;
`

const Hints = ({ hintNumber }) => (
  <HintContainer>
    {hintNumber > 0 ? (
      hints.map((hint, i) =>
        hintNumber > i ? (
          <Hint key={hint} hintNumber={i + 1} hintText={hint} />
        ) : null
      )
    ) : (
      <div>Your first hint will be shown after 5 minutes</div>
    )}
  </HintContainer>
)

Hints.propTypes = {
  hintNumber: PropTypes.number,
}
Hints.defaultProps = {
  hintNumber: 0,
}
export default Hints
