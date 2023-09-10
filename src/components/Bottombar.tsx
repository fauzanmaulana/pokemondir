import React, { FC } from 'react'
import { FaUser, FaDoorOpen, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { MdCatchingPokemon } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../redux/slice/authSlice'
import { nextPage, prevPage } from '../redux/slice/pokemonSlice'

const Bottombar: FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    return (
            <div className='fixed bottom-0 w-full md:hidden'>
                <section className='h-16 bg-gray-300 drop-shadow flex items-center justify-around'>
                    <div className='flex flex-col items-center hover:cursor-pointer' onClick={() => dispatch(logout())}>
                        <FaDoorOpen className='text-white' size={25}/>
                        <p className='text-gray-600'>logout</p>
                    </div>
                    <div className='flex flex-col items-center hover:cursor-pointer' onClick={() => navigate('/user')}>
                        <FaUser className='text-white' size={25}/>
                        <p className='text-gray-600'>profile</p>
                    </div>
                    <div className='flex flex-col items-center hover:cursor-pointer' onClick={() => navigate('/pokemons/my')}>
                        <MdCatchingPokemon className='text-white' size={25}/>
                        <p className='text-gray-600'>My Pokemons</p>
                    </div>
                    {
                        pathname === '/pokemons' ? <>
                            <div className='flex flex-col items-center hover:cursor-pointer' onClick={() => dispatch(prevPage())}>
                                <FaArrowLeft className='text-white' size={25}/>
                                <p className='text-gray-600'>Prev</p>
                            </div>
                            <div className='flex flex-col items-center hover:cursor-pointer' onClick={() => dispatch(nextPage())}>
                                <FaArrowRight className='text-white' size={25}/>
                                <p className='text-gray-600'>Next</p>
                            </div>
                        </> : 
                        <></>
                    }
                </section>
            </div>
    )
}

export default Bottombar