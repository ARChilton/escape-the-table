import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import hints from '../../data/hints'
import Hint from '../Hint/Hint'

const HintContainer = styled('div')`
  height: 100%;
  text-align: center;
  overflow: hidden;
  grid-area: hints;
  border-left: 3px solid green;
  background-color: lightgreen;
  display: flex;
`
const Container = styled('div')`
  overflow: auto;
  height: 100%;
  padding: 10px;
  width: 100%;
`

const Hints = ({ hintNumber }) => (
  <HintContainer>
    <Container>
      {hintNumber > 0 ? (
        hints.map((hint, i) => {
          const { id, ...hintInfo } = hint

          return hintNumber > i ? (
            <Hint key={id} hintNumber={i + 1} {...hintInfo} />
          ) : null
        })
      ) : (
        <div>Your first hint will be shown after 5 minutes</div>
      )}
    </Container>
  </HintContainer>
)

Hints.propTypes = {
  hintNumber: PropTypes.number,
}
Hints.defaultProps = {
  hintNumber: 0,
}
export default Hints
