import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { UiActions } from '../store/ui-slice'
import { voteActions } from '../store/voice-slice'


const Election = ({ id, title, description, thumbnail }) => {
  const dispatch = useDispatch()

  // open update 
  const openModal = () => {
    dispatch(voteActions.changeIdOfElectionToUpdate(id)) // set id for update
    dispatch(UiActions.openUpdateElectionModal())
  }

  return (
    <article className="election">
      <div className="election__image">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="election__content">
        <Link to={`/elections/${id}`}>
          <h4 className="election__title">{title}</h4>
        </Link>
        <p className="election__description">
          {description?.length > 255 ? description.substring(0, 255) + "..." : description}
        </p>
        <div className="election-cta">
          <Link to={`/elections/${id}`} className="btn sm">View</Link>
          <button className="btn sm primary" onClick={openModal}>Edit</button>
        </div>
      </div>
    </article>
  )
}

export default Election