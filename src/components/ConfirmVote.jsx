import React, { useEffect, useState } from 'react'
//import { candidates } from '../data'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import axios from 'axios'
import { voteActions } from '../store/voice-slice.js'
import { useNavigate } from 'react-router-dom'


const ConfirmVote = async ({selectedElection}) => {
    const[modalCandidate, setModalCandidate] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    // close confirm vote modal
    const closeCandidateModal = () => {
        dispatch(UiActions.closeVoteCandidateModal())
    }

    // get selected candidate id from redux store
    const selectedVoteCandidate = useSelector(state => state.vote.selectedVoteCandidate)
    const token = useSelector(state => state?.vote?.currentVoter?.token)
    const currentVoter = useSelector(state => state?.vote?.currentVoter)

    // get the candidate selected to be voted for
    const fetchCandidate = async () => {
        // candidates.find(candidate => {
        //     if(candidate.id === selectedVoteCandidate) {
        //         setModalCandidate(candidate)
        //     }
        // })
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/candidates/${selectedVoteCandidate}`,
            {withCredentials: true, headers: {Authorization: `Bearer ${token}`}}
            )
            setModalCandidate(await response.data)
        } catch (error) {
            console.log(error)
        }

    }



    // confirm vote for selected candidate
    const confirmVote = async () => {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/candidates/${selectedVoteCandidate}/${selectedElection}`,
        {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
        const voteResult = await response.data     
        dispatch(voteActions.changeCurrentVoter({...currentVoter, votedElections: voteResult}))
        navigate('/congrats')
    }

    useEffect(() => {
        fetchCandidate()
    }, [selectedVoteCandidate, selectedElection])


  return (
    <section className="modal">
        <div className="modal__content confirm__vote-content">
            <h5>Please confirm your vote</h5>
            <div className="confirm__vote-image">
                <img src={modalCandidate.image} alt={modalCandidate.fullName}/>
            </div>
            <h2>{modalCandidate?.fullName?.length > 17 ? modalCandidate?.fullName.substring(0,17) + "..." : modalCandidate?.fullName}</h2>
            <p>{modalCandidate?.motto?.length > 45 ? modalCandidate?.motto.substring(0,45) + "..." : modalCandidate?.motto}</p>
            <div className="confirm__vote-cta">
                <button className="btn" onClick={closeCandidateModal}>Cancel</button>
                <button className="btn primary" onClick={confirmVote}>Confirm</button>
            </div>
        </div>
    </section>
  )
}

export default ConfirmVote
