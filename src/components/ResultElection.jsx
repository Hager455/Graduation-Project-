import React, { useEffect, useState } from 'react';
// import { candidates as dummyCandidates } from '../data.js';
import CandidateRating from './CandidateRating';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const ResultElection = ({_id: id, thumbnail, title }) => {
  const [totalVotes, setTotalVotes] = useState(0); 
  const [electionCandidates, setElectionCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector(state => state?.vote?.currentVoter?.token)

  // Filter candidates for the current election
  //const electionCandidates = (dummyCandidates || []).filter(candidate => candidate.election === id);

  const getCandidates = async (e) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/elections/${id}/candidates`, 
      {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      const candidates = await response.data;
      setElectionCandidates(candidates)
      // calculate the total votes in each election
      for(let i = 0; i < candidates.length; i++) {
        setTotalVotes(prevState => prevState += candidates[i].voteCount)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getCandidates()
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      <article className="result">
        <header className="result__header">
          <h4>{title}</h4>
          <div className="result__header-image">
            <img src={thumbnail} alt={title} />
          </div>
        </header>
        <ul className="results__list">
          {electionCandidates.length > 0 ? (
            electionCandidates.map(candidate => (
              <CandidateRating key={candidate._id} {...candidate} totalVotes={totalVotes} />
            ))
          ) : (
            <p>No candidates available for this election.</p>
          )}
        </ul>
        <Link to={`/elections/${id}/candidates`} className='btn primary full'>Enter Election</Link>
      </article>
    </>
  );
};

export default ResultElection;