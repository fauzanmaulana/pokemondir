import React, { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { pokemonlogo } from '../utils/assets'
import { register, resetActionStatus } from '../redux/slice/authSlice'

const Register: FC = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isRegisterSuccess = useSelector((state: any) => state.auth.is_action_success)

  useEffect(() => {
    if(isRegisterSuccess){
      navigate('/login');
    }

    if(isRegisterSuccess !== false){
      return () => {
        dispatch(resetActionStatus())
      }
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegisterSuccess])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-12 max-w-lg">
        <img src={pokemonlogo} width="300" className='mb-6' alt='logo' />
        <form className="flex flex-col mb-4" onSubmit={(e) => {
          e.preventDefault()

          const formData = new FormData(e.target as HTMLFormElement)
          dispatch(register({
            username: formData.get('username'),
            password: formData.get('password'),
            confirm_password: formData.get('confirm_password'),
          }))
        }}>
          <input
            type="text"
            id="username"
            className="border rounded p-2 w-full mb-4"
            placeholder="username"
            name="username"
            required
          />
          <input
            type="password"
            id="password"
            className="border rounded p-2 w-full mb-4"
            placeholder="password"
            name="password"
            required
          />
          <input
            type="password"
            id="confirmPassword"
            className="border rounded p-2 w-full mb-4"
            placeholder="confirm password"
            name="confirm_password"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 rounded py-2 px-4 mt-4 text-white font-bold"
          >
            Sign up
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register