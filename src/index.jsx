import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))

// must wrap App in BrowserRouter to use react-router-dom

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
