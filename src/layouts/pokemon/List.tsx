import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavTitle from '../../components/NavTitle';
import Paginate from '../../components/Paginate';
import PokemonCard from '../../components/PokemonCard';
import RenderByStatus from '../../components/RenderByStatus';
import { getPokemons } from '../../redux/slice/pokemonSlice';
import { AppDispatch } from '../../redux/store';
import { pokeball2gif } from '../../utils/assets';

const ListPokemon: FC = () => {
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
    pokemons: Array<Pokemons>
    offset: number
    status: number
  }

  interface Slices {
    pokemon: PokemonState
  }

  const pokemons = useSelector((state: Slices) => state.pokemon.pokemons)
  const offset = useSelector((state: Slices) => state.pokemon.offset)
  const isLoading = useSelector((state: Slices) => state.pokemon.isLoading)
  const status = useSelector((state: Slices) => state.pokemon.status)

  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(() => {
    if(pokemons.length <= 0){
      dispatch(getPokemons())
    }else{
      dispatch(getPokemons())
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons.length <= 0 && pokemons, offset])

  return (
    <RenderByStatus status={status}>
      <NavTitle title="Pokemon List" isBack={false}/>
      {
        !isLoading &&
        <Paginate/>
      }
      {
        !isLoading ?
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-3">
          {pokemons.map((pokemon, idx: number) => (
            <Link to={`/pokemon/${pokemon.name}`} key={idx}>
              <PokemonCard pokemon={pokemon} idx={idx} />
            </Link>
          ))}
        </div>
        :
        <img src={pokeball2gif} width="300" className='mx-auto mt-32' alt="loading" />
      }
    </RenderByStatus>
  )
}

export default ListPokemon