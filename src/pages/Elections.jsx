import React, { useState } from 'react'
import { elections as dummyElections } from '../data'
import Election from '../components/Election'
import AddElectionModal from '../components/AddElectionModal'
import UpdateElectionModal from '../components/UpdateElectionModal'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'


const Elections = () => {
  // استخدم localStorage أو dummyElections
  const [elections, setElections] = useState(() => {
    const stored = localStorage.getItem('elections')
    return stored ? JSON.parse(stored) : dummyElections
  })

  const dispatch = useDispatch()

  // open add election modal
  const openModal = () =>{
    dispatch(UiActions.openElectionModal())
  }

  const electionModalShowing = useSelector(state => state.ui.electionModalShowing)
  const updateElectionModalShowing = useSelector(state => state.ui.updateElectionModalShowing)

  // Add new election to the list
  const handleElectionCreated = (newElection) => {
    setElections(prev => {
      const updated = [
        ...prev,
        {
          id: newElection._id || newElection.id,
          title: newElection.title,
          description: newElection.description,
          thumbnail: newElection.thumbnail,
          candidates: newElection.candidates || [],
          voters: newElection.voters || []
        }
      ]
      localStorage.setItem('elections', JSON.stringify(updated))
      return updated
    })
  }

  // عند كل تغيير في elections، حدث localStorage (لو أضفت طرق أخرى للتعديل)
  React.useEffect(() => {
    localStorage.setItem('elections', JSON.stringify(elections))
  }, [elections])

  return (
    <>
<section className="elections py-4">
  <div className="container">
    <header className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <h1 className="mb-3 mb-md-0">Ongoing Elections</h1>
      <button className="btn btn-success" onClick={openModal}>Create New Election</button>
    </header>
    <div className="row g-4">
      {elections.map((election) => (
        <div key={election.id} className="col-12 col-sm-6 col-md-4 col-xl-3 mb-4">
          <Election 
            id={election.id}
            title={election.title}
            description={election.description}
            thumbnail={election.thumbnail}
          />
        </div>
      ))}
    </div>
  </div>
</section>
      {electionModalShowing && <AddElectionModal onElectionCreated={handleElectionCreated} />}
      {updateElectionModalShowing && <UpdateElectionModal />}
    </>
  )
}

export default Elections