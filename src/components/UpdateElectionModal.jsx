import React, { useState, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import axios from 'axios'

const UpdateElectionModal = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [thumbnail, setThumbnail] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const electionId = useSelector(state => state.vote.idOfElectionToUpdate)
    const token = useSelector(state => state?.vote?.currentVoter?.token)

    // جلب بيانات الانتخابات عند فتح المودال
    useEffect(() => {
        const fetchElection = async () => {
            if (!electionId) return;
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/elections/${electionId}`,
                    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
                )
                const data = res.data
                setTitle(data.title || "")
                setDescription(data.description || "")
                setThumbnail(null) // لا تملأ الصورة، فقط عند التغيير
            } catch (err) {
                setError("Failed to fetch election data")
            }
        }
        fetchElection()
    }, [electionId, token])

    // close update election modal
    const closeModal = () => {
        dispatch(UiActions.closeUpdateElectionModal())
    }

    // submit update
    const submitHandler = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            if (thumbnail) formData.append('thumbnail', thumbnail)

            await axios.patch(
                `${process.env.REACT_APP_API_URL}/elections/${electionId}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            setSuccess("Election updated successfully")
            setTimeout(() => {
                closeModal()
                window.location.reload() // لتحديث الصفحة بعد التعديل
            }, 1000)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update election")
        }
        setLoading(false)
    }

    return (
        <section className="modal">
            <div className="modal__content">
                <header className="modal__header">
                    <h4>Edit Election</h4>
                    <button className="modal__close" onClick={closeModal}><IoMdClose /></button>
                </header>
                <form onSubmit={submitHandler}>
                    {error && <p className="form__error-message">{error}</p>}
                    {success && <p className="form__success-message">{success}</p>}
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
                        {loading ? "Updating..." : "Update Election"}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default UpdateElectionModal