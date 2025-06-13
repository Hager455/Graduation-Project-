import React, { useEffect } from 'react'
import Image from '../assets/404.gif'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {
  const navigate = useNavigate()

  //redirect user to the previous page after 6 seconds
  useEffect(() => {
    setTimeout(() => {
      navigate(-1)
    }, 6000)
  })

  return (
    <section className="errorPage">
      <div className="errorPage_container">
        <img src={Image} alt="Page not found" />
        <h1>404</h1>
        <p>This page doesn't exist. You will be redirect to the previous Page
        shortly.</p>
        
      </div>
    </section>
  )
}
export default ErrorPage