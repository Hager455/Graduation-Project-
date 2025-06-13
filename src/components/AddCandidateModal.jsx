import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import axios from 'axios'


const AddCandidateModal = ({ currentElection, onCandidateAdded }) => {

    const [fullName, setFullName] = useState("")
    const [motto, setMotto] = useState("")
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const dispatch = useDispatch()
    const token = useSelector(state => state?.vote?.currentVoter?.token)

    // close add candidate modal
    const closeModal = () => {
        dispatch(UiActions.closeAddCandidateModal())
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('fullName', fullName)
            formData.append('motto', motto)
            if (image) formData.append('image', image)
            formData.append('currentElection', currentElection)

            await axios.post(
                `${process.env.REACT_APP_API_URL}/candidates`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            if (onCandidateAdded) onCandidateAdded()
            closeModal()
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add candidate")
        }
        setLoading(false)
    }


  return (
    <section className="modal">
        <div className="modal__content">
            <header className="modal__header">
                <h4>Add Candidate</h4>
                <button className="modal__close" onClick={closeModal}><IoMdClose /></button>
            </header>
            <form onSubmit={submitHandler}>
                {error && <p className="form__error-message">{error}</p>}
                <div>
                    <h6>Candidate Name:</h6>
                    <input type="text" value={fullName} name='fullName' onChange={e => setFullName(e.target.value)} required />
                </div>
                <div>
                    <h6>Candidate Motto:</h6>
                    <input type="text" value={motto} name='motto' onChange={e => setMotto(e.target.value)} required />
                </div>
                <div>
                    <h6>Candidate Image:</h6>
                    <input type="file" name='image' onChange={e => setImage(e.target.files[0])} accept="image/png,image/jpg,image/jpeg,image/webp,image/avif" />
                </div>
                <button type="submit" className="btn primary" disabled={loading}>
                    {loading ? "Adding..." : "Add Candidate"}
                </button>
            </form>
        </div>
    </section>
  )
}

export default AddCandidateModal