import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, resetActionStatus, setAuthUser } from '../redux/slice/authSlice'
import { pokemonlogo } from '../utils/assets'

const Login: FC = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isLoginSuccess = useSelector((state: any) => state.auth.is_action_success)

  useEffect(() => {
    if(isLoginSuccess){
      dispatch(setAuthUser())
      navigate('/pokemons');
    }

    if(isLoginSuccess !== false){
      return () => {
        dispatch(resetActionStatus())
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginSuccess])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-12 max-w-lg">
        <img src={pokemonlogo} width="300" className='mb-6' alt='logo' />
        <form className="flex flex-col mb-4" onSubmit={(e) => {
          e.preventDefault()

          const formData = new FormData(e.target as HTMLFormElement)
          
          dispatch(login({
            username: formData.get('username'),
            password: formData.get('password')
          }))
        }}>
          <input
            type="text"
            id="username"
            className="border rounded p-2 w-full mb-4"
            placeholder="username"
            name="username"
          />
          <input
            type="password"
            id="password"
            className="border rounded p-2 w-full mb-4"
            placeholder="password"
            name="password"
          />
          <button
            type="submit"
            className="bg-blue-500 rounded py-2 px-4 mt-4 text-white font-bold"
          >
            Sign in
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-bold">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login