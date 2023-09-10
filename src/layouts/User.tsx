import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavTitle from '../components/NavTitle'
import { getMyPokemons } from '../redux/slice/pokemonSlice'
import { AppDispatch } from '../redux/store'

const User: FC = () => {

  const auth = useSelector((state:any) => state.auth.auth_user)
  const pokemons = useSelector((state: any) => state.pokemon.pokemons_my)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if(pokemons.length <= 0){
      dispatch(getMyPokemons())
    }else{
      dispatch(getMyPokemons())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NavTitle title="Profile" isBack={true}/>
      <section className='h-96 flex flex-col md:flex-row items-center justify-center'>
        <h3 className='text-2xl text-gray-500 m-auto'>Username: <span className='font-semibold'>{auth.username}</span></h3>
        <h3 className='text-2xl text-gray-500 m-auto'>My pokemon: <span className='font-semibold'>{pokemons.length}</span></h3>
      </section>
    </>
  )
}

export default User