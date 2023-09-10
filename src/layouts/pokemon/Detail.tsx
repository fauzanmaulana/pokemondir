import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import NavTitle from '../../components/NavTitle'
import RenderByStatus from '../../components/RenderByStatus'
import { catchPokemon, getPokemonDetail } from '../../redux/slice/pokemonSlice'
import { AppDispatch } from '../../redux/store'
import { pokeball2gif, pokeballpng } from '../../utils/assets'

const DetailPokemon: FC = () => {
  interface Stats {
    name: string
    value: number
  }
  interface PokemonDetail {
    image: string
    name: string
    types: Array<string>
    weight: number
    height: number
    habitat: string
    description: Array<string>
    stats: Array<Stats>
    moves: Array<string>
    abilities: Array<string>
    capture_rate: number
  }
  interface PokemonState {
    isLoading: boolean
    status: number
    pokemon_detail: PokemonDetail
  }
  interface Slices {
    pokemon: PokemonState
  }

  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const pokemon = useSelector((state: Slices) => state.pokemon.pokemon_detail)
  const isLoading = useSelector((state: Slices) => state.pokemon.isLoading)
  const status = useSelector((state: Slices) => state.pokemon.status)

  useEffect(() => {
    dispatch(getPokemonDetail({
      name: params.name,
      my: false
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.name])

  return (
    <RenderByStatus status={status}>
      <NavTitle title={pokemon.name} isBack={true}/>
      {
        !isLoading && pokemon.name ?
        <>
          {
            status === 200 ?
            <div>
              {/* md info component */}
              <div className="hidden md:flex md:items-center md:justify-around">
                <section className='text-center'>
                  <img src={pokemon.image} alt="pokemon" />
                </section>
                <section className='w-2/5 text-center'>
                  <div className='p-2 bg-gray-100 rounded-lg'>
                    <h3 className='font-semibold text-lg'>{pokemon.types.toString().replace(',', ' / ')}</h3>
                    <p className='text-gray-500 text-sm'>Type</p>
                  </div>
                  <div className='p-2 bg-gray-100 rounded-lg my-5'>
                    <h3 className='font-semibold text-lg'>{pokemon.height}</h3>
                    <p className='text-gray-500 text-sm'>Height</p>
                  </div>
                  <div className='p-2 bg-gray-100 rounded-lg'>
                    <h3 className='font-semibold text-lg'>{pokemon.weight}</h3>
                    <p className='text-gray-500 text-sm'>Weight</p>
                  </div>
                </section>
              </div>

              {/* sm info component */}
              <img src={pokemon.image} className='md:hidden' alt="pokemon" />
              <section className='flex justify-between md:justify-around text-center items-center md:hidden'>
                <div className='p-2 bg-gray-100 rounded-lg'>
                  <h3 className='font-semibold text-lg'>{pokemon.types.toString().replace(',', ' / ')}</h3>
                  <p className='text-gray-500 text-sm'>Type</p>
                </div>
                <span>|</span>
                <div className='p-2 bg-gray-100 rounded-lg'>
                  <h3 className='font-semibold text-lg'>{pokemon.height}</h3>
                  <p className='text-gray-500 text-sm'>Height</p>
                </div>
                <span>|</span>
                <div className='p-2 bg-gray-100 rounded-lg'>
                  <h3 className='font-semibold text-lg'>{pokemon.weight}</h3>
                  <p className='text-gray-500 text-sm'>Weight</p>
                </div>
              </section>

              {/* catch pokemon component */}
              <section className='w-full md:w-4/5 bg-gray-100 rounded-full p-2 mt-5 md:mt-0 mx-auto hover:cursor-pointer' onClick={() => catchPokemon(pokemon)}>
                <img src={pokeballpng} width="50" className='absolute' id='pokeball' alt="pokeball" />
                <p className='text-center my-3 font-bold' id='catch-title'>Catch!</p>
              </section>

              {/* info component */}
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 mt-10 md:p-20">
                <section className='p-5 bg-gray-100 rounded-lg'>
                  <div className='p-3 bg-gray-200 rounded-lg'>
                    <h3 className='font-semibold text-lg'>Description</h3>
                  </div>
                  <p className='mt-5'>{pokemon.description[0]}</p>
                </section>
                <section className='p-5 bg-gray-100 rounded-lg'>
                  <div className='p-3 bg-gray-200 rounded-lg'>
                    <h3 className='font-semibold text-lg'>Habitat</h3>
                  </div>
                  <p className='mt-5'>{pokemon.habitat}</p>
                </section>
                <section className='p-5 bg-gray-100 rounded-lg'>
                  <div className='p-3 bg-gray-200 rounded-lg'>
                    <h3 className='font-semibold text-lg'>Base stats</h3>
                  </div>
                  <div className='mt-5'>
                    {pokemon.stats.map((item, idx) => <p key={idx}>{item.name} : {item.value}</p>)}
                  </div>
                </section>
                <section className='p-5 bg-gray-100 rounded-lg'>
                  <div className='p-3 bg-gray-200 rounded-lg'>
                    <h3 className='font-semibold text-lg'>Abilities</h3>
                  </div>
                  <div className='mt-5'>
                    {pokemon.abilities.map((ability, idx) => <p key={idx}>{ability}</p>)}
                  </div>
                </section>
                <section className='p-5 bg-gray-100 rounded-lg'>
                  <div className='p-3 bg-gray-200 rounded-lg'>
                    <h3 className='font-semibold text-lg'>Moves</h3>
                  </div>
                  <div className='mt-5'>
                    {pokemon.moves.map((move, idx) => <p key={idx}>{move}</p>)}
                  </div>
                </section>
              </div>
            </div>
            : 
            <section className='h-96 flex items-center justify-center'>
              <h3 className='font-semibold text-2xl text-gray-500 m-auto'>Something went wrong</h3>
            </section>
          }
        </>
        :
        <img src={pokeball2gif} width="300" className='mx-auto mt-32' alt="loading" />
      }
    </RenderByStatus>
  )
}

export default DetailPokemon