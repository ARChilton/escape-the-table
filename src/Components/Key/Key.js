import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import imgRegister from '../../img/imgRegister'
import { ClearButton } from '../Button/Button'

const Grid = styled('div')`
  display: grid;
  grid-gap: 8px;
`

const KeyImg = styled('img')`
  max-width: 100px;
`

const Key = ({ keyNumber, ...otherProps }) => (
  <ClearButton key={keyNumber} {...otherProps}>
    <Grid>
      {/* <div>key {keyNumber}</div> */}
      <KeyImg src={imgRegister[`key${keyNumber}`]} alt={`key ${keyNumber}`} />
    </Grid>
  </ClearButton>
)

Key.propTypes = {
  keyNumber: PropTypes.number.isRequired,
}

export default React.memo(Key)
