import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { voteActions } from '../store/voice-slice.js';

const Login = () => {
  const[userData, setUserData] = useState({fullName: "", email: "", password: "", password2: ""})
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //function to change our controlled input values
  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }


  const loginVoter = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/voters/login`, userData)
      if (!response?.data) {
        throw new Error('Invalid response from server')
      }
      const newVoter = response.data;
      // save new voter in local storage and update in redux store
      localStorage.setItem("currentUser", JSON.stringify(newVoter))
      dispatch(voteActions.changeCurrentVoter(newVoter))
      navigate('/results')
    } catch (error) {
      console.error('Login error:', error)
      setError(error.response?.data?.message || 'An error occurred during login')
    }
  }

  return (
    <section className='register'>
      <div className="container register__container">
        <h2>Sign In</h2>
        <form onSubmit={loginVoter}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="email" name='email' placeholder='Email Address' onChange={changeInputHandler} autoComplete='true' autoFocus/>
          <input type="text" name='password' placeholder='Password' onChange={changeInputHandler} autoComplete='true' />
          <p>Don't have an account? <Link to='/register'>Sign Up</Link></p>
          <button type='submit' className="btn primary">Login</button>
        </form>
      </div>
    </section>
  )
}
export default Login