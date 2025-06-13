import React, { useEffect, useState } from 'react';
import { elections as dummyElections, elections } from '../data';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { voters } from '../data';
import { candidates } from '../data';
import ElectionCandidate from '../components/ElectionCandidate';
import { IoAddOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { UiActions } from '../store/ui-slice';
import AddCandidateModal from '../components/AddCandidateModal';

export const ElectionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // حالة لجلب بيانات الانتخابات من الـ API
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب بيانات الانتخابات من الـ API
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/elections/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setElection(data);
        setLoading(false);
      })
      .catch(err => {
        setError('حدث خطأ أثناء جلب البيانات');
        setLoading(false);
      });
  }, [id]);

  const addCandidateModalShowing = useSelector(state => state.ui.addCandidateModalShowing);

  // open add candidate modal
  const openModal = () => {
    dispatch(UiActions.openAddCandidateModal());
  };

  if (loading) return <div className="container py-5">Loading...</div>;
  if (error) return <div className="container py-5 text-danger">{error}</div>;
  if (!election) return null;

  return (
    <>
      <section className="electionDetails">
        <div className="container electionDetails__container">
          <h2>{election.title}</h2>
          <p>{election.description}</p>
          <div className="electionDetails__image">
            <img src={election.thumbnail} alt={election.title} />
          </div>

          <menu className="electionDetails__candidates">
            {
              (election.candidates || []).map(candidate => (
                <ElectionCandidate key={candidate.id || candidate._id} {...candidate} />
              ))
            }
            <button className="add__candidate-btn" onClick={openModal}><IoAddOutline /></button>
          </menu>

          <menu className="voters">
            <h2>Voters</h2>
            <table className="voters__table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {
                  (election.voters || []).map(voter => (
                    <tr key={voter.id || voter._id}>
                      <td><h5>{voter.fullName}</h5></td>
                      <td>{voter.email}</td>
                      <td>{voter.time || '-'}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </menu>
        </div>
      </section>
      {addCandidateModalShowing && <AddCandidateModal />}
    </>
  );
};

export default ElectionDetails;
