import React, { useState } from 'react'
import { elections as dummyElections } from '../data'
import Election from '../components/Election'
import AddElectionModal from '../components/AddElectionModal'
import UpdateElectionModal from '../components/UpdateElectionModal'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'


const Elections = () => {
  const [elections, setElections] = useState(dummyElections)

  const dispatch = useDispatch()

  // open add election modal
  const openModal = () =>{
    dispatch(UiActions.openElectionModal())
  }

  const electionModalShowing = useSelector(state => state.ui.electionModalShowing)
  const updateElectionModalShowing = useSelector(state => state.ui.updateElectionModalShowing)


  return (
    <>
      <section className="elections">
        <div className="container">
          <header className="elections__header">
            <h1>Ongoing Elections</h1>
            <button className="btn primary" onClick={openModal}>Create New Election</button>
          </header>
          <div className="elections__menu">
            {elections.map((election) => (
              <Election 
                key={election.id} 
                id={election.id}
                title={election.title}
                description={election.description}
                thumbnail={election.thumbnail}
              />
            ))}
          </div>
        </div>
      </section>
      {electionModalShowing && <AddElectionModal />}
      {updateElectionModalShowing && <UpdateElectionModal />}
    </>
  )
}

export default Elections