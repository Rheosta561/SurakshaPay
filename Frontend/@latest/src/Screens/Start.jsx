import React from 'react'
import { useNavigate } from 'react-router-dom'

function Start() {
  const navigate = useNavigate();
  const handleClic = ()=>{

    navigate('/login')
  }
  return (
    <div className=' flex flex-col justify-center h-screen w '>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-bold text-blue-500 md:text-7xl'><span className='text-zinc-950'>Suraksha</span>Pay</h1>
            <p className='text-md underline mt-2'>Suraksha Pay – Safe Transactions, Trusted Every Day </p>
            <button className='text-sm bg-zinc-900 text-white p-4 mt-4 rounded-full w-fit' onClick={handleClic}>Get Started</button>
        </div>
    </div>
  )
}

export default Start