import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import axios from 'axios'

const AddElectionModal = ({ onElectionCreated }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [thumbnail, setThumbnail] = useState(null)
    const token = useSelector(state => state?.vote?.currentVoter?.token)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // close add election modal
    const closeModal = () => {
        dispatch(UiActions.closeElectionModal())
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            if (thumbnail) formData.append('thumbnail', thumbnail)

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/elections`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            if (onElectionCreated) {
                onElectionCreated(response.data)
            }
            closeModal()
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create election")
        }
        setLoading(false)
    }

    return (
        <section className="modal">
            <div className="modal__content">
                <header className="modal__header">
                    <h4>Create New Election</h4>
                    <button className="modal__close" onClick={closeModal}><IoMdClose /></button>
                </header>
                <form onSubmit={submitHandler}>
                    {error && <p className="form__error-message">{error}</p>}
                    <div>
                        <h6>Election Title:</h6>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} name='title' required />
                    </div>
                    <div>
                        <h6>Election Description:</h6>
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)} name='description' required />
                    </div>
                    <div>
                        <h6>Election Thumbnail:</h6>
                        <input type="file" name='thumbnail' onChange={e => setThumbnail(e.target.files[0])} accept="image/png,image/jpg,image/jpeg,image/webp,image/avif" />
                    </div>
                    <button type="submit" className="btn primary" disabled={loading}>
                        {loading ? "Creating..." : "Add Election"}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default AddElectionModal