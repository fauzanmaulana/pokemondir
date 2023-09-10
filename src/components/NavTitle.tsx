import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface Props {
  title: string
  isBack: boolean
}

const NavTitle = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-between md:w-9/12 mx-auto bg-gray-200 p-5 mb-10 rounded-full relative'>
        <h1 className='font-bold text-gray-500 text-lg'>{props.title}</h1>
        {props.isBack && <FaArrowLeft size={30} className='text-gray-500 hover:cursor-pointer' onClick={() => navigate(-1)} />}
    </div>
  )
}

export default NavTitle