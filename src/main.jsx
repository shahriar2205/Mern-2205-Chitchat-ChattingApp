import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './firebaseConfig.jsx'
import 'react-toastify/dist/ReactToastify.css';
import SignUpPage from './Components/SignUp/SignUpPage.jsx'
import LoginPage from './Components/LoginPage/LoginPage.jsx'
import HomePage from './Components/Leyaout/HomePage/HomePage.jsx'
import Forget from './Components/Leyaout/ForgetPass/Forget.jsx'
import { store } from './assets/Stores/Store.jsx'
import { Provider } from 'react-redux'
import ReactLeyaOut from './Components/ReactLeyaout/ReactLeyaOut.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
   
    <Route
    >
      <Route path= "/"
       element= {<SignUpPage></SignUpPage>}
      > </Route>

      <Route path= "/login"
       element= { <LoginPage></LoginPage>}
      > </Route>

      <Route path= "/home"
       element= {<HomePage></HomePage>}
      > </Route>

      <Route path= "/forget"
       element= {<Forget></Forget>}
      > </Route>
      
    </Route>
  )
 
 
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
