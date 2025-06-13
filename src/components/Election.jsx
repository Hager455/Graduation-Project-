import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { UiActions } from '../store/ui-slice'

const Election = ({ id, title, description, thumbnail }) => {
  // const { election__image, election__content, election__thumbnail, election__title, election__description, election_cta, btn, sm, primary } = {
  //   election__image: 'election__image',
  //   election__content: 'election__content',
  //   election__thumbnail: 'election__thumbnail',
  //   election__title: 'election__title',
  //   election__description: 'election__description',
  //   election_cta: 'election-cta',
  //   btn: 'btn',
  //   sm: 'sm',
  //   primary: 'primary'
  // };

  const dispatch = useDispatch()

  // open update 
  const openModal = () => {
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