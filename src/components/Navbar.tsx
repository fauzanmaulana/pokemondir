import React, { FC, useRef } from 'react'
import { pokemonlogo } from '../utils/assets'
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice/authSlice';

const Navbar: FC = () => {
    const user = useSelector((state: any) => state.auth.auth_user)
    const navRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const toogleMenu = () => {
        if (navRef.current != null) {
            if(navRef.current.classList.contains('hidden')){
                navRef.current.classList.remove('hidden')
                navRef.current.classList.add('block')
            }else{
                navRef.current.classList.remove('block')
                navRef.current.classList.add('hidden')
            }
        }
    }
    
    return (
        <>
            <div id="navbar" className='w-full h-20 bg-gray-100 drop-shadow flex items-center md:justify-center'>
                <div className="md:container w-full flex justify-center md:justify-between items-center">
                    <img src={pokemonlogo} className="w-26 h-12 md:w-32 md:h-12 md:ml-4 hover:cursor-pointer" alt="logo" onClick={() => navigate('/pokemons')} />
                    <section className='hidden md:flex items-center hover:cursor-pointer' onClick={() => toogleMenu()}>
                        <FaUserCircle className='mx-4 text-gray-400' size={25}/>
                        <span className='hidden md:block text-gray-600'>{user.username}</span>
                        <FaChevronDown className='md:ml-2 mr-4' size={10} />
                    </section>
                </div>
            </div>
            <section id='nav-option' ref={navRef} className='hidden absolute right-6 top-16 p-2 rounded bg-white w-52 shadow-2xl' style={{zIndex: 9999}}>
                <ul>
                    <li onClick={() => {navigate('/user'); toogleMenu()}}>Profile</li>
                    <li onClick={() => {navigate('/pokemons/my'); toogleMenu()}}>My Pokemons</li>
                    <li onClick={() => dispatch(logout())}>Logout</li>
                </ul>
            </section>
        </>
    )
}

export default Navbar