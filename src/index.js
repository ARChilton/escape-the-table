import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'emotion-theming'
import './css/index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import theme from './css/theme'

const Escape = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)

const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<Escape />, rootElement)
} else {
  ReactDOM.render(<Escape />, rootElement)
}

// ReactDOM.render(
// ,
//   document.getElementById('root')
// )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
