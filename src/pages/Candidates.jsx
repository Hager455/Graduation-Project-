import React from 'react'
//import {candidates as dummyCandidates } from '../data.js'
import { useParams } from 'react-router-dom'
import Candidate from '../components/Candidate'
import ConfirmVote from '../components/ConfirmVote'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useState, useEffect } from 'react'


export const Candidates = () => {
  const {id: selectedElection} =useParams()

  const voteCandidateModalShowing = useSelector(state => state.ui.voteCandidateModalShowing)

  const [candidates, setCandidates] = useState([])
  const [canVote, setCanVote] = useState(true)
  const token = useSelector(state => state?.vote?.currentVoter?.token)
  const voterId = useSelector(state => state?.vote?.currentVoter?.voterId)
  const votedElections = useSelector(state => state?.vote?.currentVoter?.votedElections)

  // // get candidates that belong to this election
  // const candidates = dummyCandidates.filter(candidate => candidate.election === id)
  
  const getCandidates = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/elections/${selectedElection}/candidates`, 
      {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      setCandidates(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   getCandidates()
  // }, [])

  // check if voter has already voted
  // const getVoter = async () => {
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/voters/${voterId}`, 
  //     {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
  //     const votedElections = await response.data.votedElections;
  //     if(votedElections.includes(selectedElection)) {
  //       setCanVote(false)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    getCandidates()
    //getVoter()

    if(votedElections.includes(selectedElection)) {
      setCanVote(false)
    }


  }, [])


  return (
    <>
      <section className="candidates">
        {canVote ? (
          <>
            {candidates.length > 0 ? (
              <>
                <header className="candidates__header">
                  <h1>Vote your candidate</h1>
                  <p>These are the candidates for the selected election. Please vote once and wisely, because you won't 
                  be allowed to e in this election again.</p>
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