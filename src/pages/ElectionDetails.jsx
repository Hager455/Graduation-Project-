import React, { useEffect, useState } from 'react';
import { elections as dummyElections, elections } from '../data';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { voters } from '../data';
import { candidates } from '../data';
import ElectionCandidate from '../components/ElectionCandidate';
import { IoAddOutline } from 'react-icons/io5';
import { UiActions } from '../store/ui-slice';
import AddCandidateModal from '../components/AddCandidateModal';

export const ElectionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const token = useSelector(state => state?.vote?.currentVoter?.token);

  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب بيانات الانتخابات والمرشحين من الـ API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // جلب بيانات الانتخابات
        const electionRes = await fetch(`${process.env.REACT_APP_API_URL}/elections/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!electionRes.ok) throw new Error('Failed to fetch election');
        const electionData = await electionRes.json();
        setElection(electionData);

        // جلب المرشحين
        const candidatesRes = await fetch(`${process.env.REACT_APP_API_URL}/elections/${id}/candidates`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!candidatesRes.ok) throw new Error('Failed to fetch candidates');
        const candidatesData = await candidatesRes.json();
        setCandidates(candidatesData);

        setLoading(false);
      } catch (err) {
        setError('حدث خطأ أثناء جلب البيانات');
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  const addCandidateModalShowing = useSelector(state => state.ui.addCandidateModalShowing);

  // open add candidate modal
  const openModal = () => {
    dispatch(UiActions.openAddCandidateModal());
  };

  // إعادة تحميل المرشحين بعد إضافة مرشح جديد
  const handleCandidateAdded = () => {
    // إعادة تحميل المرشحين فقط
    fetch(`${process.env.REACT_APP_API_URL}/elections/${id}/candidates`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(res => res.json())
      .then(setCandidates)
      .catch(() => {});
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
            {candidates.length > 0 ? (
              candidates.map(candidate => (
                <ElectionCandidate key={candidate._id || candidate.id} {...candidate} />
              ))
            ) : (
              <p>No candidates for this election.</p>
            )}
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
                {(election.voters && election.voters.length > 0) ? (
                  election.voters.map(voter => (
                    <tr key={voter._id || voter.id || voter.email}>
                      <td><h5>{voter.fullName || '-'}</h5></td>
                      <td>{voter.email || '-'}</td>
                      <td>{voter.time || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No voters yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </menu>
        </div>
      </section>
      {addCandidateModalShowing && <AddCandidateModal currentElection={id} onCandidateAdded={handleCandidateAdded} />}
    </>
  );
};

export default ElectionDetails;
