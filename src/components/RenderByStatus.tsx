import React, { ReactNode } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { pokeball2gif } from '../utils/assets'

interface Props {
    children: ReactNode
    status: number
}

const RenderByStatus = (props: Props) => {
    const navigate = useNavigate()

    if(props.status){
        if(props.status === 200){
            return <>{props.children}</>
        }else if(props.status === 404){
            return <section className='h-96 flex items-center justify-center'>
                        <div className='text-center'>
                            <h3 className='font-semibold text-2xl text-gray-500 m-auto'>Data not found</h3>
                            <button type="button" className="bg-blue-500 rounded py-2 px-4 mt-4 text-white font-bold" onClick={() => navigate('/')}>
                                Go back <FaArrowLeft size={18} className="float-left mt-1 mr-3"/>
                            </button>
                        </div>
                    </section>
        }else{
            return <section className='h-96 flex items-center justify-center'>
                        <div className='text-center'>
                            <h3 className='font-semibold text-2xl text-gray-500 m-auto'>Something went wrong</h3>
                            <button type="button" className="bg-blue-500 rounded py-2 px-4 mt-4 text-white font-bold" onClick={() => navigate('/')}>
                                Go back <FaArrowLeft size={18} className="float-left mt-1 mr-3"/>
                            </button>
                        </div>
                    </section>
        }
    }else{
        return <img src={pokeball2gif} width="300" className='mx-auto mt-32' alt="loading" />
    }
}

export default RenderByStatus