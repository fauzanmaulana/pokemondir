import React from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { nextPage, prevPage } from '../redux/slice/pokemonSlice'
import { AppDispatch } from '../redux/store'

const Paginate = () => {

    const dispatch = useDispatch<AppDispatch>()

    return (
    <div className='w-9/12 drop-shadow-lg fixed bottom-0 md:bottom-5 md:left-24 lg:left-40 lg:right-60'>
        <section className='flex justify-between'>
            <FaArrowCircleLeft size={50} className='text-warning hover:cursor-pointer' onClick={() => dispatch(prevPage())}/>
            <FaArrowCircleRight size={50} className='text-warning hover:cursor-pointer' onClick={() => dispatch(nextPage())}/>
        </section>
    </div>
  )
}

export default Paginate