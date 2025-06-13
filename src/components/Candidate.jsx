import React from 'react';
//import CandidateRating from './CandidateRating';
import { useDispatch } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import { voteActions } from '../store/voice-slice';

const Candidate = ({ candidate, image, _id: id, fullName, motto }) => {
  const dispatch = useDispatch()
    
    // open confirm vote modal
    const openCandidateModal = () => {
        dispatch(UiActions.openVoteCandidateModal())
        dispatch(voteActions.changeSelectedVoteCandidate(id))
    }
  
  return (
    // <div className="candidate-card">
    //   <h2>{candidate.name}</h2>
    //   <p>Party: {candidate.party}</p>
    //   <p>Position: {candidate.position}</p>
    //   <CandidateRating rating={candidate.rating} />
    // </div>
    <article className="candidate">
      <div className="candidate__image">
        <img src={image} alt= {fullName} />
      </div>
      <h5>{fullName?.length > 20 ? fullName.substring(0,20) + "..." : fullName}</h5>
      <small>{motto?.length > 25 ? motto.substring(0,25) + "..." : motto}</small>
      <button className="btn primary" onClick={openCandidateModal}>Vote</button>
    </article>
  );
};

export default Candidate;
