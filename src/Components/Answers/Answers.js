import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const Container = styled('div')`
  display: grid;
  padding: 25px;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  justify-items: center;
`

const Answers = ({ combo }) => (
  <Container>
    {['key 1', 'key 2', 'key 3', 'key 4'].map((key, i) => (
      <div key={key}>
        <div>{key}</div>
        <div>{combo[i] || null}</div>
      </div>
    ))}
  </Container>
)

Answers.propTypes = {
  combo: PropTypes.arrayOf(PropTypes.number),
}

Answers.defaultProps = {
  combo: [],
}
export default Answers
