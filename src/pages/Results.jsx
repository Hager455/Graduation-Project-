import React, { useEffect, useState } from 'react';
import { elections as dummyElections } from '../data.js';
import ResultElection from '../components/ResultElection';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Results = () => {
  const [elections, setElections] = useState([]); // Add fallback for undefined data
  const token = useSelector(state => state?.vote?.currentVoter?.token)

  const getElections = async (e) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/elections`, 
      {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      const elections = await response.data;
      setElections(elections)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getElections()
  }, [])
  
  return (
    <section className="results">
      <div className="container results__container">
        {elections.length > 0 ? (
          elections.map(election => (
            <ResultElection key={election._id} {...election} />
          ))
        ) : (
          <p>No elections available.</p>
        )}
      </div>
    </section>
  );
};

export default Results;