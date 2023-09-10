import React, {FC, useEffect} from 'react'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import NavTitle from '../../../components/NavTitle'
import RenderByStatus from '../../../components/RenderByStatus'
import { deleteMyPokemons, getPokemonDetail } from '../../../redux/slice/pokemonSlice'
import { AppDispatch } from '../../../redux/store'
import { pokeball2gif } from '../../../utils/assets'

const DetailCathedPokemon: FC = () => {
  interface Stats {
    name: string
    value: number
  }
  interface PokemonDetail {
    image: string
    name: string
    nickname: string
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
  const navigate = useNavigate()

  const pokemon = useSelector((state: Slices) => state.pokemon.pokemon_detail)
  const isLoading = useSelector((state: Slices) => state.pokemon.isLoading)
  const status = useSelector((state: Slices) => state.pokemon.status)

  useEffect(() => {
    dispatch(getPokemonDetail({
      name: params.name,
      my: true
    }))
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.name])

  return (
    <RenderByStatus status={status}>
      <NavTitle title="My Pokemon" isBack={true}/>
      {
        !isLoading && pokemon.name ?
        <div>
          {/* md info component */}
          <div className="hidden md:flex md:items-center md:justify-around">
            <section className='text-center'>
              <h2 className='font-bold text-2xl'>{pokemon.nickname || pokemon.name}</h2>
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
          <h2 className='md:hidden font-bold text-2xl text-center'>{pokemon.nickname || pokemon.name}</h2>
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

          {/* remove pokemon component */}
          <section className='w-full md:w-4/5 bg-red-500 rounded-full p-2 mt-5 md:mt-0 mx-auto hover:cursor-pointer' onClick={async () => {
            const isDelete = await Swal.fire({
                title: 'You sure?',
                text: "want to delete pokemon",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            })
            if(isDelete.isConfirmed){
              dispatch(deleteMyPokemons(pokemon.name))
              navigate('/pokemons/my')
            }
          }}>
            <FaTrash className='absolute mt-2 ml-2 text-white' size={30} />
            <p className='text-center my-3 font-bold text-white' id='catch-title'>Remove from my pokemons</p>
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
        <img src={pokeball2gif} width="300" className='mx-auto mt-32' alt="loading" />
      }
    </RenderByStatus>
  )
}

export default DetailCathedPokemon