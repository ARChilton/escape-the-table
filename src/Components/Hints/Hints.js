import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const HintContainer = styled('div')`
  /* overflow: scroll; */
  height: 100%;
  padding: 10px;
`

const Hints = ({ hintNumber }) => (
  <HintContainer>
    {hintNumber > 0 ? (
      <React.Fragment>
        <div>Hint 1</div>
        {hintNumber > 1 && <div>Hint 2</div>}
      </React.Fragment>
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
