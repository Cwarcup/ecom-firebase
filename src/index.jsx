import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { CategoriesProvider } from './context/CategoriesContext'
import { CartProvider } from './context/CartContext'
import { Provider } from 'react-redux'
import React from 'react'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

// must wrap App in BrowserRouter to use react-router-dom

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
