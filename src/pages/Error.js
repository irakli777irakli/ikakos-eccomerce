import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Error() {
  const navigate = useNavigate();
    return (
    <div className='err-page'>
        <p><strong>404</strong> Page Not Found</p>
        <button onClick={()=> navigate("/")}>Home Page</button>
    </div>
  )
}
