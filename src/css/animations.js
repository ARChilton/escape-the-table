import { keyframes } from '@emotion/core'

export const loader = keyframes`
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }

`

export const fadeOut = keyframes`
  from {
      opacity: 1;
    }
  to {
      opacity: 0.1;
    }
`

export const fadeIn = keyframes`
  from {
      opacity: 0;
    }
  to {
      opacity: 1;
    }
`
