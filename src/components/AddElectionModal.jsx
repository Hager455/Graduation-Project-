import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { UiActions } from '../store/ui-slice'

const AddElectionModal = () => {
    const dispatch = useDispatch()
    const [title, setTitle] =useState("")
    const [description, setDescription] =useState("")
    const [thumbnail, setThumbnail] =useState("")


    // close add election modal
    const closeModal = () => {
        dispatch(UiActions.closeElectionModal())
    }

    // const changeInputHandler = (e) => {
    //     if(e.target.name === 'title') {
    //         setTitle(e.target.value)
    //     } else if(e.target.name === 'description') {
    //         setDescription(e.target.value)
    //     } else if(e.target.name === 'thumbnail') {
    //         setThumbnail(e.target.value)
    //     }
    // }

    // const submitHandler = (e) => {
    //     e.preventDefault()
    //     console.log(title, description, thumbnail)
    // }

  return (
    <section className="modal">
        <div className="modal__content">
            <header className="modal__header">
                <h4>Create New Election</h4>
                <button className="modal__close" onClick={closeModal}><IoMdClose /></button>
            </header>
            <form>
                <div>
                    <h6>Election Title:</h6>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} name='title' />
                </div>
                <div>
                    <h6>Election Description:</h6>
                    <input type="text" value={title} onChange={e => setDescription(e.target.value)} name='description' />
                </div>
                <div>
                    <h6>Election Thumbnail:</h6>
                    <input type="file" name='thumbnail' onChange={e => setThumbnail(e.target.files[0])} accept="png,jpg, jpeg, webp, avif" />
                </div>
                <button type="submit"  className="btn primary">Add Election</button>
            </form>
        </div>
    </section>
  )
}

export default AddElectionModal