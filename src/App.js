import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
const ClientCart = React.lazy(() => import('./views/pages/clientCart/ClientCart'))
const EnterEmail = React.lazy(() => import('./views/pages/forgotPassword/EnterEmail.js'))
const SentEmail = React.lazy(() => import('./views/pages/forgotPassword/SentEmail.js'))
const ResetPassword = React.lazy(() => import('./views/pages/forgotPassword/ResetPassword.js'))
const Ticket = React.lazy(() => import('./views/pages/clientCart/Ticket.js'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/clientCart" name="Client Cart" element={<ClientCart/>} />
            <Route exact path="/EnterEmail" name="EnterEmail" element={<EnterEmail/>} />
            <Route exact path="/SentEmail" name="SentEmail" element={<SentEmail/>} />
            <Route exact path="/ResetPassword" name="ResetPassword" element={<ResetPassword/>} />
            <Route exact path="/ticket" name="Ticket" element={<Ticket/>} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
