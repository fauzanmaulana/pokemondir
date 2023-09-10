import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavTitle from '../../../components/NavTitle';
import PokemonCard from '../../../components/PokemonCard';
import RenderByStatus from '../../../components/RenderByStatus';
import { getMyPokemons } from '../../../redux/slice/pokemonSlice';
import { AppDispatch } from '../../../redux/store';
import { pokeball2gif } from '../../../utils/assets';

const ListDetailPokemon: FC = () => {
  interface Types {
    slot: number
    type: {
      name: string
      url: string
    }
  }
  interface Pokemons {
    id: number
    name: string
    nickname: string
    image: string
    types: Array<Types>
  }

  interface PokemonState {
    isLoading: boolean
    status: number
    pokemons_my: Array<Pokemons>
  }

  interface Slices {
    pokemon: PokemonState
  }

  const pokemons = useSelector((state: Slices) => state.pokemon.pokemons_my)
  const isLoading = useSelector((state: Slices) => state.pokemon.isLoading)
  const status = useSelector((state: Slices) => state.pokemon.status)

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
    <RenderByStatus status={status}>
        <NavTitle title="My Pokemon" isBack={true}/>
        {
          !isLoading ?
          <>
            {
              pokemons.length > 0 ?
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-3">
                  {pokemons.map((pokemon, idx: number) => (
                    <Link to={`/pokemon/my/${pokemon.name}`} key={idx}>
                      <PokemonCard pokemon={pokemon} idx={idx} key={idx} />
                    </Link>
                  ))}
                </div>
              :
              <section className='h-96 flex items-center justify-center'>
                <h3 className='font-semibold text-2xl text-gray-500 m-auto'>There's no pokemon</h3>
              </section>
            }
          </>
          :
          <img src={pokeball2gif} width="300" className='mx-auto mt-32' alt="loading" />
        }
    </RenderByStatus>
  )
}

export default ListDetailPokemon