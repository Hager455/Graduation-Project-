import React, { useState, useEffect } from 'react'
import Election from '../components/Election'
import AddElectionModal from '../components/AddElectionModal'
import UpdateElectionModal from '../components/UpdateElectionModal'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import axios from 'axios'


const Elections = () => {
  const [elections, setElections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const token = useSelector(state => state?.vote?.currentVoter?.token)

  // جلب الانتخابات من الـ API
  const fetchElections = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      )
      setElections(response.data)
    } catch (err) {
      setError("حدث خطأ أثناء جلب الانتخابات")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchElections()
    // eslint-disable-next-line
  }, [token])

  // open add election modal
  const openModal = () =>{
    dispatch(UiActions.openElectionModal())
  }

  const electionModalShowing = useSelector(state => state.ui.electionModalShowing)
  const updateElectionModalShowing = useSelector(state => state.ui.updateElectionModalShowing)

  // بعد إضافة انتخابات جديدة، أعد جلب القائمة
  const handleElectionCreated = () => {
    fetchElections()
  }

  // بعد تحديث انتخابات، أعد جلب القائمة
  const handleElectionUpdated = () => {
    fetchElections()
  }

  return (
    <>
<section className="elections py-4">
  <div className="container">
    <header className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <h1 className="mb-3 mb-md-0">Ongoing Elections</h1>
      <button className="btn btn-success" onClick={openModal}>Create New Election</button>
    </header>
    {loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div className="text-danger">{error}</div>
    ) : (
      <div className="row g-4">
        {elections.map((election) => (
          <div key={election._id || election.id} className="col-12 col-sm-6 col-md-4 col-xl-3 mb-4">
            <Election 
              id={election._id || election.id}
              title={election.title}
              description={election.description}
              thumbnail={election.thumbnail}
            />
          </div>
        ))}
      </div>
    )}
  </div>
</section>
      {electionModalShowing && <AddElectionModal onElectionCreated={handleElectionCreated} />}
      {updateElectionModalShowing && <UpdateElectionModal onElectionUpdated={handleElectionUpdated} />}
    </>
  )
}

export default Elections