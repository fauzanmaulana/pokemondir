import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import fetcher from '../../utils/fetcher'

interface Types {
    slot: number
    type: {
      name: string
      url: string
    }
  }
interface Pokemons {
    id: number
    name: String
    image: String
    types: Array<Types>
}
interface PokemonState {
    status: number
    isLoading: boolean
    pokemons: Array<object>
    pokemons_my: Array<object>
    pokemon_detail: object
    offset: number
}
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

interface AuthState {
    is_action_success: any
    auth_user: {
        id: string
    }
}

interface ResponseList {
    status: number
    data: Array<Pokemons>
}

interface ResponseDetail {
    status: number
    data: PokemonDetail
}

const catchOpportunity = (captureRate: number) => {
    const r = Math.random();
    const maxCaptureRate = 255
    
    const opportunity = captureRate / maxCaptureRate * 100
    if(r <= opportunity / 100){
        return true
    }else{
        return false
    }
}

export const catchPokemon = async (pokemon: PokemonDetail) => {
    const user = JSON.parse(localStorage.getItem('authenticated')!)

    if(!localStorage.getItem('user_pokemons')){
        localStorage.setItem('user_pokemons', JSON.stringify([]))
    }

    if(!JSON.parse(localStorage.getItem('user_pokemons')!).find((item: any) => item.user_id === user.id && item.name === pokemon.name)){
        document.querySelector('#pokeball')?.classList.add('animate-bounce')
        document.querySelector('#catch-title')!.textContent = 'Catching..'
    
        const catching = () => {
            return new Promise((resolve, reject) => {
                try {
                    setTimeout(() => {
                        const opportunity: boolean = catchOpportunity(pokemon.capture_rate)
                        if(opportunity){
                            resolve({
                                status: 'success',
                                message: `${pokemon.name} caught.. 🎉 `
                            })
                        }else{
                            resolve({
                                status: 'fails',
                                message: `Failed to caught ${pokemon.name}..`
                            })
                        }
            
                    }, 3 * 1000)
                } catch (error) {
                    reject(error)
                }
            })
        }
    
        try {
            const catched:any = await catching()
    
            if(catched.status === 'success'){
                document.querySelector('#catch-title')!.textContent = 'Catch!'
                document.querySelector('#pokeball')?.classList.remove('animate-bounce')

                const isNickname = await Swal.fire({
                    title: catched.message,
                    text: "want to give a nickname?",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No!'
                })

                const pokemonCaught = {
                    user_id: user.id,
                    nickname: '',
                    ...pokemon
                }
    
                if(isNickname.isConfirmed){
                    const nickname = await Swal.fire({
                        title: 'Nickname',
                        input: 'text',
                        inputAttributes: {
                            autocapitalize: 'off',
                            required: 'true'
                        },
                    })

                    pokemonCaught.nickname = nickname.value
                }

                const userPokemons = JSON.parse(localStorage.getItem('user_pokemons')!)
                userPokemons.push(pokemonCaught)

                localStorage.setItem('user_pokemons', JSON.stringify(userPokemons))

            }else if(catched.status === 'fails'){
                toast.error(catched.message)
    
                document.querySelector('#catch-title')!.textContent = 'Catch!'
                document.querySelector('#pokeball')?.classList.remove('animate-bounce')
            }
        } catch (error) {
            console.log(error)
        }
    }else{
        toast.error('Pokemon has been caught!')
    }
}

const responsePokemonsCustom = async (offset: number) => {
    return new Promise((resolve, reject) => {
        const pokemons:Array<object> = []
        fetcher.get(`/pokemon?offset=${offset}&limit=${16}`).then((response: any) => {
            Promise.all(
                response.result.results.map((pokemon: Pokemons) => fetcher.get(`/pokemon/${pokemon.name}`).then(({result}: any) => ({
                    id: result.id,
                    name: result.name,
                    image: result.sprites.other['official-artwork'].front_default,
                    types: result.types.map(({type}: any) => type.name)
                })))
            ).then((datas) => {
                datas.forEach((data) => {
                    pokemons.push(data)
                })
            }).then(() => {
                resolve({
                    status: response.status,
                    data: pokemons
                })
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

export const getMyPokemons = createAsyncThunk('pokemon/getMyPokemons', (_, { getState }) => {
    try {
        if(!localStorage.getItem('user_pokemons')){
            localStorage.setItem('user_pokemons', '[]')
        }

        const {auth} = getState() as { auth: AuthState }
        const myPokemons = JSON.parse(localStorage.getItem('user_pokemons')!).filter((pokemon:any) => pokemon.user_id === auth.auth_user.id)
        return myPokemons
    } catch (error) {
        console.log(error)
    }
})

export const deleteMyPokemons = createAsyncThunk('pokemon/deleteMyPokemons', (name: string, { getState }) => {
    try {
        const {auth} = getState() as { auth: AuthState }
        const myPokemons = JSON.parse(localStorage.getItem('user_pokemons')!).filter((pokemon:any) => pokemon.user_id === auth.auth_user.id)

        const pokemon = myPokemons.findIndex((pokemon: any) => pokemon.name === name)
        myPokemons.splice(pokemon, 1)
        localStorage.setItem('user_pokemons', JSON.stringify(myPokemons))

        return myPokemons
    } catch (error) {
        console.log(error)
    }
})

export const getPokemons = createAsyncThunk('pokemon/getPokemons', async (_, { getState }) => {
    try {
        const {pokemon} = getState() as { pokemon: PokemonState }
        const pokemons = await responsePokemonsCustom(pokemon.offset) as ResponseList
        return pokemons
    } catch (error) {
        console.log(error)
    }
})

export const getPokemonDetail = createAsyncThunk('pokemon/getPokemonDetail', async (props:any, { getState }) => {
    const {auth} = getState() as { auth: AuthState }
    const pokemon = await fetcher.get(`/pokemon/${props.name}`)
    if(pokemon.status === 200){
        const species = await fetcher.get(pokemon.result.species.url, false)
        let nickname = ''

        if(props.my){
            if(localStorage.getItem('user_pokemons')){
                const myPokemon = JSON.parse(localStorage.getItem('user_pokemons')!).find((pokemon:any) => pokemon.user_id === auth.auth_user.id && pokemon.name === props.name)
    
                if(myPokemon){
                    nickname = myPokemon.nickname
                }else{
                    return {
                        status: 404,
                        data: {}
                    }
                }
            }
        }

        return {
            status: pokemon.status,
            data: {
                image: pokemon.result.sprites.other['official-artwork'].front_default,
                name: pokemon.result.name,
                nickname,
                types: pokemon.result.types.map(({type}: any) => type.name),
                weight: pokemon.result.weight,
                height: pokemon.result.height,
                habitat: species.result.habitat.name,
                description: species.result.flavor_text_entries.map(({flavor_text}: any) => flavor_text),
                stats: pokemon.result.stats.map(({base_stat, stat}:any) => ({name: stat.name, value: base_stat})),
                moves: pokemon.result.moves.map(({move}: any) => move.name),
                abilities: pokemon.result.abilities.map(({ability}: any) => ability.name),
                capture_rate: species.result.capture_rate
            }
        }
    }else{
        return {
            status: pokemon.status,
            data: {}
        }
    }
})

const pokemonSlice = createSlice({
    name: 'pokemon',
    
    initialState: {
        status: 0,
        isLoading: false,
        pokemons: [],
        pokemons_my: [],
        pokemon_detail: {},
        offset: 0
    } as PokemonState,

    reducers: {
        nextPage: (state) => {
            state.offset = state.offset + 16
        },
        prevPage: (state) => {
            if(state.offset > 0){
                state.offset = state.offset - 16
            }
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getPokemons.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getPokemons.fulfilled, (state, action) => {
            const {status, data} = action.payload as unknown as ResponseList
            state.pokemons = data
            state.isLoading = false
            state.status = status
        })

        builder.addCase(getMyPokemons.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getMyPokemons.fulfilled, (state, action) => {
            state.pokemons_my = action.payload as Array<object>
            state.isLoading = false
            state.status = 200
        })

        builder.addCase(deleteMyPokemons.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteMyPokemons.fulfilled, (state, action) => {
            state.pokemons_my = action.payload as Array<object>
            state.isLoading = false
            state.status = 200
        })

        builder.addCase(getPokemonDetail.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getPokemonDetail.fulfilled, (state, action) => {
            const {data, status} = action.payload as unknown as ResponseDetail
            state.pokemon_detail = data
            state.isLoading = false
            state.status = status
        })

    },
})

export const { nextPage, prevPage } = pokemonSlice.actions

export default pokemonSlice.reducer