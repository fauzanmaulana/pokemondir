import React from 'react'

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

interface Props {
  pokemon: Pokemons
  idx: number
}

const PokemonCard = ({pokemon, idx}: Props) => {
  return (
    <section className={`w-100 p-5 ${'bg-normal'} rounded-lg flex justify-between items-center`}>
      <div>
        <h2 className='font-semibold text-xl text-white'>{pokemon.nickname || pokemon.name}</h2>
        <p className='font-semibold text-white mt-5'>type:</p>
        <p className='text-white'>{pokemon.types.map((type, idx: number) => type + `${pokemon.types.length > 1 && idx % 2 === 0 ? ', ' : ''}`)}</p>
      </div>
      <img src={pokemon.image} width="150" id={`pokemon-img-${idx}`} alt="pokemon" />
    </section>
  )
}

export default PokemonCard