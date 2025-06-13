import React from 'react'
import { IoMdTrash } from 'react-icons/io'
import { useSelector } from 'react-redux'
import axios from 'axios'

const ElectionCandidate = ({ fullName, image, motto, _id: id, onCandidateDeleted }) => {
  const token = useSelector(state => state?.vote?.currentVoter?.token)

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this candidate?")) return;
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/candidates/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      )
      if (onCandidateDeleted) onCandidateDeleted()
    } catch (err) {
      alert("Failed to delete candidate")
    }
  }

  return (
    <li className="electionCandidate">
      <div className="electionCandidate__image">
        <img src={image} alt={fullName} />
      </div>
      <div>
        <h5>{fullName}</h5>
        <small>{motto?.length > 70 ? motto.substring(0,70) + "..." : motto}</small>
        <button className="electionCandidate__btn" onClick={handleDelete}><IoMdTrash /></button>
      </div>
    </li>
  )
}

export default ElectionCandidate