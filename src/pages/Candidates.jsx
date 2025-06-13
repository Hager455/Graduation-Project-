import React, { useState, useEffect } from 'react'
//import {candidates as dummyCandidates } from '../data.js'
import { useParams } from 'react-router-dom'
import Candidate from '../components/Candidate'
import ConfirmVote from '../components/ConfirmVote'
import { useSelector } from 'react-redux'
import axios from 'axios'

export const Candidates = () => {
  const { id: selectedElection } = useParams()

  const voteCandidateModalShowing = useSelector(state => state.ui.voteCandidateModalShowing)

  const [candidates, setCandidates] = useState([])
  const [canVote, setCanVote] = useState(true)
  const token = useSelector(state => state?.vote?.currentVoter?.token)
  const voterId = useSelector(state => state?.vote?.currentVoter?.voterId)
  const votedElections = useSelector(state => state?.vote?.currentVoter?.votedElections)

  // get candidates that belong to this election
  useEffect(() => {
    const getCandidates = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/elections/${selectedElection}/candidates`,
          { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
        )
        setCandidates(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getCandidates()
    setCanVote(() => {
      if (Array.isArray(votedElections) && votedElections.includes(selectedElection)) {
        return false
      }
      return true
    })
  }, [selectedElection, votedElections, token])

  return (
    <>
      <section className="candidates">
        {canVote ? (
          <>
            {candidates.length > 0 ? (
              <>
                <header className="candidates__header">
                  <h1>Vote your candidate</h1>
                  <p>
                    These are the candidates for the selected election. Please vote once and wisely, because you won't 
                    be allowed to vote in this election again.
                  </p>
                </header>
                <div className="container candidates__container">
                  {candidates.map(candidate => (
                    <Candidate key={candidate._id} {...candidate} />
                  ))}
                </div>
              </>
            ) : (
              <header className="candidates__header">
                <h1>Inactive Election</h1>
                <p>There are no candidates found for this election. Please check back later.</p> 
              </header>
            )}
          </>
        ) : (
          <header className="candidates__header">
            <h1>Already Voted</h1>
            <p>You are only permitted to vote once in this election.</p>
          </header>
        )}
      </section>

      {voteCandidateModalShowing && <ConfirmVote selectedElection={selectedElection} />}
    </>
  )
}
export default Candidates