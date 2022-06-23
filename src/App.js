import React, { Component, Suspense } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Home = React.lazy(() => import('./views/pages/main/home'))
const ClientCart = React.lazy(() => import('./views/pages/clientCart/ClientCart'))
const EnterEmail = React.lazy(() => import('./views/pages/forgotPassword/EnterEmail.js'))
const SentEmail = React.lazy(() => import('./views/pages/forgotPassword/SentEmail.js'))


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/home" name="Page" element={<Home />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/clientCart" name="Client Cart" element={<ClientCart/>} />
            <Route exact path="/EnterEmail" name="EnterEmail" element={<EnterEmail/>} />
            <Route exact path="/SentEmail" name="SentEmail" element={<SentEmail/>} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
