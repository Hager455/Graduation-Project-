import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Congrats = () => {
  return (
    <section className="congrats">
      <div className="container congrats__container">
        <h2>Thanks for your vote!</h2>
        <p>Your vote is now added to your candidate's vote count. You will be redirected to see the new result.</p>
        <Link to="/results" className= 'btn sm primary'>See Results</Link>
      </div>
    </section>
  )
}
export default Congrats