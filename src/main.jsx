import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './firebaseConfig.jsx'
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUpPage from './Components/SignUp/SignUpPage.jsx'
import LoginPage from './Components/LoginPage/LoginPage.jsx'
import HomePage from './Components/Leyaout/HomePage/HomePage.jsx'
import Forget from './Components/Leyaout/ForgetPass/Forget.jsx'
import { store } from './assets/Stores/Store.jsx'
import { Provider } from 'react-redux'
import MessagePage from './Components/Leyaout/Message/MessagePage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUpPage></SignUpPage>
  },
    {
    path: "/login",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/home",
    element: <HomePage></HomePage>
  }, {
    path: "/message",
    element: <MessagePage/>
  },
  {
    path: "/forget",
    element: <Forget></Forget>
  },
 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
