import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { voteActions } from '../store/voice-slice'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // امسح بيانات المستخدم من localStorage وRedux
    localStorage.removeItem("currentUser")
    dispatch(voteActions.changeCurrentVoter(null))
    // إعادة التوجيه لصفحة تسجيل الدخول
    navigate('/')
  }, [dispatch, navigate])

  return (
    <div>Logging out...</div>
  )
}

export default Logout